import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Users, GraduationCap, School, CheckCircle2, TrendingUp, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
    const leadsCount = await prisma.lead.count();
    const newLeadsCount = await prisma.lead.count({ where: { status: "NEW" } });
    const coursesCount = await prisma.course.count();
    const universitiesCount = await prisma.university.count();

    const recentLeads = await prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
    });

    const stats = [
        { title: "Total Leads", value: leadsCount, icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
        { title: "New Leads", value: newLeadsCount, icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
        { title: "Courses", value: coursesCount, icon: GraduationCap, color: "text-green-500", bg: "bg-green-50" },
        { title: "Universities", value: universitiesCount, icon: School, color: "text-purple-500", bg: "bg-purple-50" },
    ];

    return (
        <div className="space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.title} className="border-none shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                                    <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs text-green-600 font-bold">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                <span>+12% from last month</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Leads */}
                <Card className="lg:col-span-2 border-none shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Admission Leads</CardTitle>
                        <button className="text-sm text-primary font-bold hover:underline">View All</button>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-50">
                                        <th className="py-4 font-semibold">Student Name</th>
                                        <th className="py-4 font-semibold">Course</th>
                                        <th className="py-4 font-semibold">Date</th>
                                        <th className="py-4 font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {recentLeads.map((lead) => (
                                        <tr key={lead.id} className="group hover:bg-slate-50 transition-colors">
                                            <td className="py-4">
                                                <div>
                                                    <p className="font-bold text-slate-700">{lead.name}</p>
                                                    <p className="text-xs text-slate-400">{lead.email}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 font-medium text-slate-600">{lead.course || "General"}</td>
                                            <td className="py-4 text-sm text-slate-500">{formatDate(lead.createdAt)}</td>
                                            <td className="py-4 text-sm">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${lead.status === 'NEW' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                                                    }`}>
                                                    {lead.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions / Analytics Placeholder */}
                <div className="space-y-8">
                    <Card className="bg-primary text-white border-none shadow-xl">
                        <CardContent className="p-8">
                            <h4 className="text-xl font-bold mb-4">Quick Post</h4>
                            <p className="text-sm text-white/60 mb-6">Instantly add a new course or university to the portal.</p>
                            <div className="space-y-3">
                                <button className="w-full py-3 bg-white text-primary rounded-xl font-bold hover:bg-secondary hover:text-white transition-all">Add Course</button>
                                <button className="w-full py-3 border border-white/20 rounded-xl font-bold hover:bg-white/5 transition-all">Add University</button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-sm flex items-center">
                                <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> System Integrity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-slate-500">Database Connection</span>
                                <span className="text-green-600">Secure</span>
                            </div>
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-slate-500">SSL Certificate</span>
                                <span className="text-green-600">Active</span>
                            </div>
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-slate-500">Last Backup</span>
                                <span className="text-slate-500">2h ago</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
