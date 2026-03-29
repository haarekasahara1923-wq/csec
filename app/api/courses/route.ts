import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const take = searchParams.get("take") ? parseInt(searchParams.get("take")!) : 4;
    
    try {
        const courses = await prisma.course.findMany({ 
            where: { active: true },
            take,
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(courses);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
    }
}
