import { v2 as cloudinary } from "cloudinary";

// Initialize and configure Cloudinary
export function getCloudinary() {
    const cloudName =
        process.env.CLOUDINARY_CLOUD_NAME ||
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (cloudName && apiKey && apiSecret) {
        cloudinary.config({
            cloud_name: cloudName.trim(),
            api_key: apiKey.trim(),
            api_secret: apiSecret.trim(),
            secure: true,
        });
    } else if (process.env.CLOUDINARY_URL) {
        cloudinary.config({
            cloudinary_url: process.env.CLOUDINARY_URL.trim(),
            secure: true,
        });
    }

    return cloudinary;
}

export function isCloudinaryConfigured(): boolean {
    const config = getCloudinary().config();
    return Boolean(config.cloud_name && (config.api_key || process.env.CLOUDINARY_URL));
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

    const isVideo =
        (options.mimeType && options.mimeType.startsWith("video/")) ||
        /\.(mp4|webm|mov|mkv|avi|m4v|3gp|flv|wmv)$/i.test(options.filename);

    const resourceType = isVideo ? "video" : "image";
    const folder = options.folder || "csec_gallery";

    return new Promise((resolve, reject) => {
        const uploadStream = cld.uploader.upload_stream(
            {
                folder,
                resource_type: resourceType,
                chunk_size: 6000000, // 6 MB chunks for large files / videos up to 100MB
                timeout: 300000, // 5 min timeout for 100MB videos
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload_stream error:", error);
                    return reject(error);
                }
                if (!result) {
                    return reject(new Error("Cloudinary upload returned an empty response."));
                }

                const url = result.secure_url || result.url;
                const mediaType: "IMAGE" | "VIDEO" =
                    result.resource_type === "video" || isVideo ? "VIDEO" : "IMAGE";

                // Generate thumbnail for video (Cloudinary creates poster frame by replacing extension with .jpg)
                let thumbnailUrl: string | null = null;
                if (mediaType === "VIDEO") {
                    thumbnailUrl = url.replace(/\.[^/.]+$/, ".jpg");
                } else {
                    thumbnailUrl = url;
                }

                resolve({
                    url,
                    thumbnailUrl,
                    mediaType,
                    publicId: result.public_id,
                });
            }
        );

        uploadStream.end(buffer);
    });
}
