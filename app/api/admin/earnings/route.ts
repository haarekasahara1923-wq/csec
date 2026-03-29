import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const session = await auth();
        const user = session?.user as any;
        if (!session || !user || user.role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const earnings = await (prisma as any).earning.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                partner: {
                    select: { fullName: true, affiliateCode: true, paymentDetails: true }
                }
            }
        });

        const studentIds = earnings
            .map((e: any) => e.studentId)
            .filter(Boolean) as string[];

        const students = await (prisma as any).student.findMany({
            where: { id: { in: studentIds } },
            select: { id: true, studentName: true }
        });

        const studentsMap = Object.fromEntries(
            students.map((s: any) => [s.id, s.studentName])
        );

        const results = earnings.map((e: any) => ({
            ...e,
            studentName: studentsMap[e.studentId] || "Direct Reward"
        }));

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching earnings" }, { status: 500 });
    }
}
