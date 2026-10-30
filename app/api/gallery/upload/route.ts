import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";

// Initialize Cloudinary if credentials exist
if (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Detect if image or video
        const mimeType = file.type || "";
        const isVideo = mimeType.startsWith("video/") || /\.(mp4|webm|mov|mkv|avi)$/i.test(file.name);
        const resourceType = isVideo ? "video" : "image";

        // If Cloudinary configured, upload to Cloudinary
        const hasCloudinary = Boolean(
            process.env.CLOUDINARY_CLOUD_NAME &&
            process.env.CLOUDINARY_API_KEY &&
            process.env.CLOUDINARY_API_SECRET
        );

        if (hasCloudinary) {
            try {
                const base64Str = `data:${mimeType};base64,${buffer.toString("base64")}`;
                const uploadResult = await cloudinary.uploader.upload(base64Str, {
                    folder: "csec_gallery",
                    resource_type: resourceType,
                });

                return NextResponse.json({
                    success: true,
                    url: uploadResult.secure_url,
                    thumbnailUrl: isVideo ? uploadResult.secure_url.replace(/\.[^/.]+$/, ".jpg") : uploadResult.secure_url,
                    fileName: file.name,
                    mediaType: isVideo ? "VIDEO" : "IMAGE",
                });
            } catch (cloudErr) {
                console.warn("Cloudinary upload failed, falling back to local storage:", cloudErr);
            }
        }

        // Local storage fallback in /public/uploads/gallery
        const uploadDir = path.join(process.cwd(), "public", "uploads", "gallery");
        if (!existsSync(uploadDir)) {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        const ext = path.extname(file.name) || (isVideo ? ".mp4" : ".jpg");
        const safeBaseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
        const uniqueFileName = `${Date.now()}_${safeBaseName}${ext}`;
        const filePath = path.join(uploadDir, uniqueFileName);

        await fs.writeFile(filePath, buffer);

        const publicUrl = `/uploads/gallery/${uniqueFileName}`;

        return NextResponse.json({
            success: true,
            url: publicUrl,
            thumbnailUrl: isVideo ? null : publicUrl,
            fileName: file.name,
            mediaType: isVideo ? "VIDEO" : "IMAGE",
        });
    } catch (error: any) {
        console.error("Gallery upload error:", error);
        return NextResponse.json(
            { error: error?.message || "Failed to upload media file" },
            { status: 500 }
        );
    }
}
