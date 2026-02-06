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

        await prisma.settings.upsert({
            where: { id: "default" },
            update: data,
            create: {
                id: "default",
                ...data
            },
        });

        revalidatePath("/admin/settings");
        revalidatePath("/");
    } catch (error) {
        console.error("Update settings error:", error);
        // In server actions used directly in form 'action', throwing or non-returning is preferred if type issues occur
        // or just return void.
    }
}
