"use strict";
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const UniversitySchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    location: z.string().min(1, "Location is required"),
    description: z.string().min(1, "Description is required"),
});

export async function createUniversity(formData: FormData) {
    try {
        const data = {
            name: formData.get("name") as string,
            slug: formData.get("slug") as string,
            location: formData.get("location") as string,
            description: formData.get("description") as string,
        };

        const validated = UniversitySchema.parse(data);

        await prisma.university.create({
            data: validated,
        });

        revalidatePath("/admin/universities");
        revalidatePath("/universities");
        return { success: true };
    } catch (error) {
        console.error("Create university error:", error);
        return { error: "Failed to create university" };
    }
}

export async function deleteUniversity(id: string) {
    try {
        await prisma.university.delete({
            where: { id },
        });
        revalidatePath("/admin/universities");
        revalidatePath("/universities");
        return { success: true };
    } catch (error) {
        return { error: "Failed to delete university" };
    }
}
