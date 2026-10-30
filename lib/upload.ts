import { getCloudinary } from "./cloudinary";

export async function uploadFile(file: string, folder: string = "csec_students") {
    try {
        const cloudinary = getCloudinary();
        const result = await cloudinary.uploader.upload(file, {
            folder,
            resource_type: "auto",
        });
        return {
            fileUrl: result.secure_url,
            fileName: result.original_filename,
            fileType: result.format,
        };
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw error;
    }
}
