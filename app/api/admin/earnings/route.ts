import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const earnings = await prisma.earning.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                partner: {
                    select: { fullName: true, affiliateCode: true, paymentDetails: true }
                }
            }
        });

        // Fetch student names for display
        const studentIds = earnings.map(e => e.studentId).filter(Boolean) as string[];
        const students = await prisma.student.findMany({
            where: { id: { in: studentIds } },
            select: { id: true, studentName: true }
        });
        const studentsMap = Object.fromEntries(students.map(s => [s.id, s.studentName]));

        const results = earnings.map(e => ({
            ...e,
            studentName: studentsMap[e.studentId as string] || "Direct Reward"
        }));

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching earnings" }, { status: 500 });
    }
}
