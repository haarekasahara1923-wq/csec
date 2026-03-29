import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const students = await prisma.student.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                partner: {
                    select: { fullName: true, affiliateCode: true }
                }
            }
        });

        return NextResponse.json(students);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching partner students" }, { status: 500 });
    }
}
