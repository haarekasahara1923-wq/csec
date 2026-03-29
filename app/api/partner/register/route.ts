import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateAffiliateCode, buildAffiliateLink } from "@/lib/affiliate";
import { emailTemplates, sendMail } from "@/lib/email";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { fullName, email, mobile, whatsapp, password, city, organization, country } = body;

        // 1. Validation
        if (!fullName || !email || !mobile || !password) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // 2. Check uniqueness
        const existingPartner = await prisma.partner.findUnique({
            where: { email },
        });

        if (existingPartner) {
            return NextResponse.json({ message: "Email already registered" }, { status: 400 });
        }

        // 3. Hash password
        const passwordHash = await bcrypt.hash(password, 12);

        // 4. Generate unique affiliateCode
        let affiliateCode = generateAffiliateCode();
        let isUnique = false;
        let attempts = 0;
        while (!isUnique && attempts < 5) {
            const check = await prisma.partner.findUnique({ where: { affiliateCode } });
            if (!check) {
                isUnique = true;
            } else {
                affiliateCode = generateAffiliateCode();
                attempts++;
            }
        }

        // 5. Build affiliateLink
        const affiliateLink = buildAffiliateLink(affiliateCode);

        // 6. Save to DB
        const partner = await prisma.partner.create({
            data: {
                fullName,
                email,
                mobile,
                whatsapp: whatsapp || mobile,
                passwordHash,
                affiliateCode,
                affiliateLink,
                status: "active",
                country,
                city,
                organization,
            },
        });

        // 7. Send Emails (Async, non-blocking if possible)
        const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://csecgwl.com'}/partner/login`;
        
        // Send email to partner
        sendMail({
            to: email,
            ...emailTemplates.welcome(fullName, affiliateLink, loginUrl)
        }).catch(err => console.error("Email error:", err));

        // Send notification to admin
        sendMail({
            to: process.env.ADMIN_EMAIL || 'csecgwl@gmail.com',
            ...emailTemplates.adminNewPartner(fullName, email, mobile)
        }).catch(err => console.error("Admin Email error:", err));

        return NextResponse.json({ 
            message: "Registration successful", 
            partnerId: partner.id,
            affiliateCode 
        }, { status: 201 });

    } catch (error: any) {
        console.error("Partner registration API error:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
