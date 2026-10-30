/**
 * Client-side uploader that uploads directly to Cloudinary using signed upload
 * This completely bypasses Vercel's 4.5 MB request body limit, allowing smooth
 * upload of videos and photos up to 100 MB directly to Cloudinary.
 */

export async function uploadMediaClient(
    file: File,
    onProgress?: (percent: number, loadedMB: string, totalMB: string) => void
): Promise<{
    url: string;
    thumbnailUrl: string | null;
    mediaType: "IMAGE" | "VIDEO";
}> {
    const isVideo =
        file.type.startsWith("video/") ||
        /\.(mp4|webm|mov|mkv|avi|m4v|3gp|flv|wmv)$/i.test(file.name);

    // 1. Request signed upload credentials from our API
    let signatureData: any = null;
    try {
        const sigRes = await fetch("/api/gallery/signature", {
            method: "POST",
        });
        if (sigRes.ok) {
            signatureData = await sigRes.json();
        }
    } catch (e) {
        console.warn("Failed to obtain Cloudinary signature, falling back to server route:", e);
    }

    // 2. Direct upload to Cloudinary (bypassing Vercel 4.5 MB limit)
    if (signatureData && signatureData.signature && signatureData.cloudName) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const formData = new FormData();

            formData.append("file", file);
            formData.append("api_key", signatureData.apiKey);
            formData.append("timestamp", String(signatureData.timestamp));
            formData.append("signature", signatureData.signature);
            formData.append("folder", signatureData.folder || "csec_gallery");

            const uploadUrl = `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/auto/upload`;

            xhr.open("POST", uploadUrl, true);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable && onProgress) {
                    const percent = Math.round((event.loaded / event.total) * 98);
                    const loadedMB = (event.loaded / (1024 * 1024)).toFixed(1);
                    const totalMB = (event.total / (1024 * 1024)).toFixed(1);
                    onProgress(percent, loadedMB, totalMB);
                }
            };

            xhr.onload = () => {
                try {
                    const data = JSON.parse(xhr.responseText);
                    if (xhr.status >= 200 && xhr.status < 300 && (data.secure_url || data.url)) {
                        const url = data.secure_url || data.url;
                        const mediaType: "IMAGE" | "VIDEO" =
                            data.resource_type === "video" || isVideo ? "VIDEO" : "IMAGE";
                        const thumbnailUrl =
                            mediaType === "VIDEO"
                                ? url.replace(/\.[^/.]+$/, ".jpg")
                                : url;

                        resolve({
                            url,
                            thumbnailUrl,
                            mediaType,
                        });
                    } else {
                        reject(
                            new Error(
                                data.error?.message ||
                                    `Cloudinary upload failed with status ${xhr.status}`
                            )
                        );
                    }
                } catch (err: any) {
                    reject(new Error("Invalid response from Cloudinary upload server."));
                }
            };

            xhr.onerror = () => {
                reject(new Error("Network connection error while uploading to Cloudinary."));
            };

            xhr.ontimeout = () => {
                reject(new Error("Upload timed out. Please check your internet connection and try again."));
            };

            // 10 minutes timeout for 100 MB videos
            xhr.timeout = 600000;
            xhr.send(formData);
        });
    }

    // 3. Fallback to server route /api/gallery/upload (for local development)
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append("file", file);

        xhr.open("POST", "/api/gallery/upload", true);

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable && onProgress) {
                const percent = Math.round((event.loaded / event.total) * 95);
                const loadedMB = (event.loaded / (1024 * 1024)).toFixed(1);
                const totalMB = (event.total / (1024 * 1024)).toFixed(1);
                onProgress(percent, loadedMB, totalMB);
            }
        };

        xhr.onload = () => {
            try {
                const data = JSON.parse(xhr.responseText);
                if (xhr.status >= 200 && xhr.status < 300 && data.url) {
                    resolve({
                        url: data.url,
                        thumbnailUrl: data.thumbnailUrl || data.url,
                        mediaType: data.mediaType || (isVideo ? "VIDEO" : "IMAGE"),
                    });
                } else {
                    reject(new Error(data.error || `Upload failed with status ${xhr.status}`));
                }
            } catch (err: any) {
                reject(new Error("Server returned an invalid upload response."));
            }
        };

        xhr.onerror = () => reject(new Error("Network error during upload."));
        xhr.ontimeout = () => reject(new Error("Upload timed out."));
        xhr.timeout = 600000;
        xhr.send(formData);
    });
}

