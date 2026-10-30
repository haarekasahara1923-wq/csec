import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { uploadMediaToCloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";
import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";

export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 minutes duration for 100MB files

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB limit

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
                    error: `File size (${sizeInMB} MB) exceeds the maximum allowed limit of 100 MB. Please choose a file under 100 MB.`,
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

        const isServerless = Boolean(
            process.env.VERCEL ||
            process.env.AWS_LAMBDA_FUNCTION_NAME ||
            process.cwd().startsWith("/var/task")
        );

        // Upload to Cloudinary
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
                console.error("Cloudinary upload failed:", cloudErr);
                return NextResponse.json(
                    {
                        error: `Cloudinary upload failed: ${cloudErr?.message || cloudErr}`,
                    },
                    { status: 500 }
                );
            }
        }

        // If Cloudinary is not configured and running in serverless environment (e.g. Vercel)
        if (isServerless) {
            return NextResponse.json(
                {
                    error:
                        "Cloudinary is not configured in your Vercel deployment. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET (or CLOUDINARY_URL) in your Vercel Project Settings > Environment Variables.",
                },
                { status: 400 }
            );
        }

        // Local Storage fallback for local development only (outside serverless)
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
            mediaType: isVideo ? "VIDEO" : "IMAGE",
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
