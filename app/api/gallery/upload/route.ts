import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { uploadMediaToCloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";
import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";

export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 minutes duration for large 100MB files

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB max file size limit

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized: Admin session required" },
                { status: 401 }
            );
        }

        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { error: "No file was provided for upload" },
                { status: 400 }
            );
        }

        // Validate 100 MB limit
        if (file.size > MAX_FILE_SIZE) {
            const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
            return NextResponse.json(
                {
                    error: `File size (${sizeInMB} MB) exceeds the maximum allowed limit of 100 MB. Please upload a smaller file.`,
                },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const mimeType = file.type || "";
        const isVideo =
            mimeType.startsWith("video/") ||
            /\.(mp4|webm|mov|mkv|avi|m4v|3gp|flv|wmv)$/i.test(file.name);
        const mediaType: "IMAGE" | "VIDEO" = isVideo ? "VIDEO" : "IMAGE";

        // Try Cloudinary upload first if configured
        if (isCloudinaryConfigured()) {
            try {
                const cloudResult = await uploadMediaToCloudinary(buffer, {
                    filename: file.name,
                    mimeType: file.type,
                    folder: "csec_gallery",
                });

                return NextResponse.json({
                    success: true,
                    url: cloudResult.url,
                    thumbnailUrl: cloudResult.thumbnailUrl,
                    fileName: file.name,
                    mediaType: cloudResult.mediaType,
                    provider: "cloudinary",
                });
            } catch (cloudErr: any) {
                console.error("Cloudinary upload failed, falling back to local storage:", cloudErr);
            }
        }

        // Fallback: Local Storage in /public/uploads/gallery
        const uploadDir = path.join(process.cwd(), "public", "uploads", "gallery");
        if (!existsSync(uploadDir)) {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        const ext = path.extname(file.name) || (isVideo ? ".mp4" : ".jpg");
        const safeBaseName = path
            .basename(file.name, ext)
            .replace(/[^a-zA-Z0-9_-]/g, "_");
        const uniqueFileName = `${Date.now()}_${safeBaseName}${ext}`;
        const filePath = path.join(uploadDir, uniqueFileName);

        await fs.writeFile(filePath, buffer);

        const publicUrl = `/uploads/gallery/${uniqueFileName}`;

        return NextResponse.json({
            success: true,
            url: publicUrl,
            thumbnailUrl: isVideo ? null : publicUrl,
            fileName: file.name,
            mediaType,
            provider: "local",
        });
    } catch (error: any) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: error?.message || "Failed to process media upload" },
            { status: 500 }
        );
    }
}
