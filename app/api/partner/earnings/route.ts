import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const session = await auth();
        const user = session?.user as any;
        if (!session || !user || user.role !== "PARTNER") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const partnerId = user.id as string;

        const earnings = await prisma.earning.findMany({
            where: { partnerId },
            orderBy: { createdAt: "desc" },
        });

        const students = await prisma.student.findMany({
            where: { id: { in: earnings.map((e: any) => e.studentId).filter(Boolean) as string[] } },
            select: { id: true, studentName: true }
        });

        const studentsMap = Object.fromEntries(students.map((s: any) => [s.id, s.studentName]));

        const results = earnings.map((e: any) => ({
            ...e,
            student: { studentName: studentsMap[e.studentId] || "Commission" }
        }));

        return NextResponse.json(results);
    } catch (error) {
        console.error("Earnings API Error:", error);
        return NextResponse.json({ message: "Error fetching earnings" }, { status: 500 });
    }
}
