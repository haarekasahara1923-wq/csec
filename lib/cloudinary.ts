import { v2 as cloudinary } from "cloudinary";
import os from "os";
import path from "path";
import fs from "fs/promises";

// Setup and return configured Cloudinary instance
export function getCloudinary() {
    // 1. Try CLOUDINARY_URL format (e.g. cloudinary://api_key:api_secret@cloud_name)
    if (process.env.CLOUDINARY_URL) {
        try {
            const urlStr = process.env.CLOUDINARY_URL.trim();
            const parsed = new URL(urlStr);
            cloudinary.config({
                cloud_name: parsed.hostname,
                api_key: parsed.username,
                api_secret: parsed.password,
                secure: true,
            });
        } catch (e) {
            cloudinary.config({
                cloudinary_url: process.env.CLOUDINARY_URL.trim(),
                secure: true,
            });
        }
    }

    // 2. Check individual environment variables (overrides or sets if CLOUDINARY_URL not set)
    const cloudName =
        process.env.CLOUDINARY_CLOUD_NAME ||
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
        process.env.CLOUDINARY_NAME;
    const apiKey =
        process.env.CLOUDINARY_API_KEY ||
        process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ||
        process.env.CLOUDINARY_KEY;
    const apiSecret =
        process.env.CLOUDINARY_API_SECRET ||
        process.env.CLOUDINARY_SECRET;

    if (cloudName && apiKey && apiSecret) {
        cloudinary.config({
            cloud_name: cloudName.trim(),
            api_key: apiKey.trim(),
            api_secret: apiSecret.trim(),
            secure: true,
        });
    }

    return cloudinary;
}

export function isCloudinaryConfigured(): boolean {
    const c = getCloudinary();
    const config = c.config();
    return Boolean(config.cloud_name && config.api_key && config.api_secret);
}

export async function uploadMediaToCloudinary(
    buffer: Buffer,
    options: {
        filename: string;
        mimeType?: string;
        folder?: string;
    }
): Promise<{
    url: string;
    thumbnailUrl: string | null;
    mediaType: "IMAGE" | "VIDEO";
    publicId: string;
}> {
    const cld = getCloudinary();

    if (!isCloudinaryConfigured()) {
        throw new Error(
            "Cloudinary credentials are missing. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET (or CLOUDINARY_URL) in environment variables."
        );
    }

    const isVideo =
        (options.mimeType && options.mimeType.startsWith("video/")) ||
        /\.(mp4|webm|mov|mkv|avi|m4v|3gp|flv|wmv)$/i.test(options.filename);

    const resourceType: "video" | "image" | "auto" = isVideo ? "video" : "auto";
    const folder = options.folder || "csec_gallery";

    // Write buffer to temporary file in os.tmpdir() (supported in Vercel, AWS Lambda, Linux, Windows)
    const safeExt = path.extname(options.filename) || (isVideo ? ".mp4" : ".jpg");
    const safeBase = path
        .basename(options.filename, safeExt)
        .replace(/[^a-zA-Z0-9_-]/g, "_");
    const tempFilePath = path.join(os.tmpdir(), `upload_${Date.now()}_${safeBase}${safeExt}`);

    try {
        await fs.writeFile(tempFilePath, buffer);

        // Upload using upload_large for chunked streaming (supports files up to 100MB+)
        const uploadResult: any = await cld.uploader.upload_large(tempFilePath, {
            folder,
            resource_type: resourceType,
            chunk_size: 6000000, // 6 MB chunks
            timeout: 300000, // 5 min timeout
        });

        const url = uploadResult.secure_url || uploadResult.url;
        const determinedMediaType: "IMAGE" | "VIDEO" =
            uploadResult.resource_type === "video" || isVideo ? "VIDEO" : "IMAGE";

        // Generate poster thumbnail for videos
        let thumbnailUrl: string | null = null;
        if (determinedMediaType === "VIDEO") {
            thumbnailUrl = url.replace(/\.[^/.]+$/, ".jpg");
        } else {
            thumbnailUrl = url;
        }

        return {
            url,
            thumbnailUrl,
            mediaType: determinedMediaType,
            publicId: uploadResult.public_id,
        };
    } finally {
        // Clean up temporary file
        await fs.unlink(tempFilePath).catch(() => {});
    }
}
