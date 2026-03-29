import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "PARTNER") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const earnings = await prisma.earning.findMany({
            where: { partnerId: session.user.id },
            orderBy: { createdAt: "desc" },
            // include: { student: { select: { studentName: true } } } 
            // Wait, I need to check schema if I added back-relation to Earning from Student
        });

        // Actually the prompt schema didn't define back-relation in Student for Earnings, 
        // but Earning has studentId.
        // I should also fetch student names manually or update schema.
        
        // Let's fetch student names manually to avoid schema changes if possible, 
        // or just use what we have.
        const students = await prisma.student.findMany({
            where: { id: { in: earnings.map(e => e.studentId).filter(Boolean) as string[] } },
            select: { id: true, studentName: true }
        });

        const studentsMap = Object.fromEntries(students.map(s => [s.id, s.studentName]));

        const results = earnings.map(e => ({
            ...e,
            student: { studentName: studentsMap[e.studentId] || "Commission" }
        }));

        return NextResponse.json(results);
    } catch (error) {
        console.error("Earnings API Error:", error);
        return NextResponse.json({ message: "Error fetching earnings" }, { status: 500 });
    }
}
