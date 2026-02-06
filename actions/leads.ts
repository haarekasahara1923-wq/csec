"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitLead(data: {
    name: string;
    email: string;
    phone: string;
    city?: string;
    course?: string;
    university?: string;
    message?: string;
    sourcePage?: string;
}) {
    try {
        await prisma.lead.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                city: data.city,
                course: data.course,
                university: data.university,
                message: data.message,
                sourcePage: data.sourcePage,
            },
        });

        revalidatePath("/admin/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Error submitting lead:", error);
        return { success: false, error: "Failed to store lead. Please try again." };
    }
}

export async function updateLeadStatus(id: string, status: string) {
    try {
        await prisma.lead.update({
            where: { id },
            data: { status },
        });
        revalidatePath("/admin/dashboard");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to update status." };
    }
}

export async function deleteLead(id: string) {
    try {
        await prisma.lead.delete({
            where: { id },
        });
        revalidatePath("/admin/dashboard");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete lead." };
    }
}
