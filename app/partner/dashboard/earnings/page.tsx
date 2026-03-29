"use client";

import useSWR from "swr";
import { format } from "date-fns";
import { 
    Wallet, 
    CreditCard, 
    Banknote, 
    Download,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function EarningsPage() {
    const { data: userData, isLoading: userLoading } = useSWR("/api/partner/me", fetcher);
    const { data: earnings, isLoading: earningsLoading } = useSWR("/api/partner/earnings", fetcher);

    if (userLoading || earningsLoading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-16 h-16 animate-spin text-[#1a56db]" />
                <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Fetching Revenue Streams...</p>
            </div>
        );
    }

    const stats = [
        { title: "Total Earnings", value: userData?.totalEarnings || 0, icon: Wallet, color: "text-blue-600", bg: "bg-blue-50" },
        { title: "Paid", value: userData?.paidEarnings || 0, icon: Banknote, color: "text-emerald-600", bg: "bg-emerald-50" },
        { title: "Pending", value: userData?.pendingEarnings || 0, icon: CreditCard, color: "text-amber-600", bg: "bg-amber-50" },
    ];

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">Earnings History</h1>
                    <p className="text-slate-500 font-medium leading-relaxed">View and track your student referral rewards.</p>
                </div>
                <Button className="h-14 px-8 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black shadow-xl shadow-slate-200/50 flex items-center space-x-3 group">
                    <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                    <span>Download Statements</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bg} -mr-16 -mt-16 rounded-full group-hover:scale-110 transition-transform duration-500 opacity-50`}></div>
                        <div className="space-y-6 relative z-10">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} shadow-sm group-hover:rotate-6 transition-transform`}>
                                <stat.icon className="w-7 h-7" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-slate-400 font-black text-[10px] uppercase tracking-widest leading-none">{stat.title}</h4>
                                <p className={`text-4xl font-black ${i === 1 ? 'text-emerald-600' : 'text-slate-800'} tracking-tight`}>₹{stat.value.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Date</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Student Name / Entry</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Type</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Amount</th>
                                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {(!earnings || earnings.length === 0) ? (
                                <tr>
                                    <td colSpan={5} className="py-24 text-center">
                                        <div className="flex flex-col items-center space-y-4 opacity-50 text-slate-300">
                                            <Wallet className="w-20 h-20" />
                                            <p className="font-bold text-slate-400 uppercase text-xs tracking-widest">No transaction records found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                (earnings as any[]).map((row: any) => (
                                    <tr key={row.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                                        <td className="px-10 py-8 text-sm font-bold text-slate-400">
                                            {format(new Date(row.createdAt), "dd MMM, yyyy")}
                                        </td>
                                        <td className="px-10 py-8 text-center">
                                            <p className="font-black text-slate-800 tracking-tight">{row.student?.studentName || "Direct Commission"}</p>
                                            {row.note && <p className="text-[10px] font-bold text-slate-400 uppercase">{row.note}</p>}
                                        </td>
                                        <td className="px-10 py-8 text-center">
                                            <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100/50">
                                                {row.type}
                                            </span>
                                        </td>
                                        <td className="px-10 py-8 text-center text-xl font-black text-slate-800">
                                            ₹{row.amount.toLocaleString()}
                                        </td>
                                        <td className="px-10 py-8 text-center">
                                            <span className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border whitespace-nowrap inline-block ${row.status === 'paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
