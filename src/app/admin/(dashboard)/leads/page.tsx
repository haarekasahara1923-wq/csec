import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Search, Download, Trash2, CheckCircle, Clock, MoreVertical } from "lucide-react";
import { updateLeadStatus, deleteLead } from "@/app/actions/leads";

export default async function LeadsPage() {
    const leads = await prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Leads Management</h2>
                    <p className="text-sm text-slate-500">Track and respond to all admission inquiries.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <Button variant="outline" className="text-slate-600 border-slate-200">
                        <Download className="w-4 h-4 mr-2" /> Export CSV
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-sm">
                <CardHeader className="border-b border-slate-50 pb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                placeholder="Search students, courses..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <div className="flex space-x-2">
                            <select className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none">
                                <option>All Status</option>
                                <option>New</option>
                                <option>Contacted</option>
                                <option>Converted</option>
                            </select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                                    <th className="px-6 py-4">Student</th>
                                    <th className="px-6 py-4">Contact Details</th>
                                    <th className="px-6 py-4">Course & Uni</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-5">
                                            <p className="font-bold text-slate-800">{lead.name}</p>
                                            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-tight">ID: {lead.id.substring(0, 8)}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-sm font-medium text-slate-600 flex items-center mb-1">
                                                <span className="w-4 text-primary shrink-0">✉</span> {lead.email}
                                            </p>
                                            <p className="text-sm font-medium text-slate-600 flex items-center">
                                                <span className="w-4 text-primary shrink-0">☏</span> {lead.phone}
                                            </p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-sm font-bold text-slate-700">{lead.course || "NA"}</p>
                                            <p className="text-xs text-slate-400">{lead.university || "No preference"}</p>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-slate-500">
                                            {formatDate(lead.createdAt)}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${lead.status === 'NEW' ? 'bg-amber-100 text-amber-600' :
                                                    lead.status === 'CONTACTED' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                                                }`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-2">
                                                <button className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all">
                                                    <CheckCircle className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
