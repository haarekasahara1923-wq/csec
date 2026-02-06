"use strict";
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const CourseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().min(1, "Description is required"),
    active: z.boolean().default(true),
});

export async function createCourse(formData: FormData) {
    try {
        const data = {
            title: formData.get("title") as string,
            slug: formData.get("slug") as string,
            description: formData.get("description") as string,
            active: formData.get("active") === "true",
        };

        const validated = CourseSchema.parse(data);

        await prisma.course.create({
            data: validated,
        });

        revalidatePath("/admin/courses");
        revalidatePath("/courses");
        return { success: true };
    } catch (error) {
        console.error("Create course error:", error);
        return { error: "Failed to create course" };
    }
}

export async function deleteCourse(id: string) {
    try {
        await prisma.course.delete({
            where: { id },
        });
        revalidatePath("/admin/courses");
        revalidatePath("/courses");
        return { success: true };
    } catch (error) {
        return { error: "Failed to delete course" };
    }
}
