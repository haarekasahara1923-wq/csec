"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSettings(formData: FormData) {
    try {
        const data = {
            phone: formData.get("phone") as string,
            email: formData.get("email") as string,
            address: formData.get("address") as string,
            facebook: formData.get("facebook") as string,
            instagram: formData.get("instagram") as string,
            twitter: formData.get("twitter") as string,
            linkedin: formData.get("linkedin") as string,
            metaPixelId: formData.get("metaPixelId") as string,
        };

        // Since we only have one settings row (id: 'default')
        await prisma.settings.upsert({
            where: { id: "default" },
            update: data,
            create: {
                id: "default",
                ...data
            },
        });

        revalidatePath("/admin/settings");
        revalidatePath("/"); // Update public site links
        return { success: true };
    } catch (error) {
        console.error("Update settings error:", error);
        return { success: false, error: "Failed to update settings" };
    }
}
