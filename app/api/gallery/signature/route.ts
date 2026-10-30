import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getCloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized: Admin session required" },
                { status: 401 }
            );
        }

        if (!isCloudinaryConfigured()) {
            return NextResponse.json(
                {
                    error:
                        "Cloudinary is not configured. Please verify CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
                },
                { status: 400 }
            );
        }

        const cld = getCloudinary();
        const config = cld.config();
        const timestamp = Math.round(new Date().getTime() / 1000);
        const folder = "csec_gallery";

        const paramsToSign = {
            folder,
            timestamp,
        };

        const signature = cld.utils.api_sign_request(
            paramsToSign,
            config.api_secret!
        );

        return NextResponse.json({
            success: true,
            signature,
            timestamp,
            apiKey: config.api_key,
            cloudName: config.cloud_name,
            folder,
        });
    } catch (error: any) {
        console.error("Signature error:", error);
        return NextResponse.json(
            { error: error?.message || "Failed to generate upload signature" },
            { status: 500 }
        );
    }
}

