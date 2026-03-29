import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { StatsCards } from "@/components/partner/StatsCards";
import { AffiliateLinkBox } from "@/components/partner/AffiliateLinkBox";
import { RecentActivity } from "@/components/partner/RecentActivity";

export default async function DashboardHome() {
    const session = await auth();
    const partnerId = session?.user?.id;

    if (!partnerId) return null;

    const partner = await prisma.partner.findUnique({
        where: { id: partnerId },
        include: {
            students: {
                orderBy: { createdAt: "desc" },
                take: 5,
            },
        },
    });

    if (!partner) return null;

    const stats = {
        totalStudents: await prisma.student.count({ where: { partnerId } }),
        admittedStudents: await prisma.student.count({ where: { partnerId, status: "admitted" } }),
        totalEarnings: partner.totalEarnings,
        pendingEarnings: partner.pendingEarnings,
        paidEarnings: partner.paidEarnings,
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">Hello, {partner.fullName.split(' ')[0]}! 👋</h1>
                    <p className="text-slate-500 font-medium">Here's what's happening with your referral network today.</p>
                </div>
                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">System Online</span>
                </div>
            </div>

            <AffiliateLinkBox 
                affiliateLink={partner.affiliateLink} 
                affiliateCode={partner.affiliateCode} 
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                <StatsCards stats={stats} />
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase tracking-widest text-xs opacity-50">Recent Student Activity</h3>
                    <div className="h-px bg-slate-100 flex-1 mx-8 hidden sm:block"></div>
                </div>
                <RecentActivity students={partner.students} />
            </div>
        </div>
    );
}
