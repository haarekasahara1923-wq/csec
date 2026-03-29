"use client";

import useSWR, { mutate } from "swr";
import { 
    Search, 
    Banknote, 
    CreditCard, 
    CheckCircle, 
    Clock, 
    Loader2,
    Building,
    User,
    Wallet
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { toast } from "sonner";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function AdminEarningsPage() {
    const { data: earnings, isLoading } = useSWR("/api/admin/earnings", fetcher);
    const [search, setSearch] = useState("");

    const filteredEarnings = earnings ? (earnings as any[]).filter(e => 
        e.partner.fullName.toLowerCase().includes(search.toLowerCase()) || 
        e.studentName.toLowerCase().includes(search.toLowerCase()) ||
        e.partner.affiliateCode.toLowerCase().includes(search.toLowerCase())
    ) : [];

    const handleMarkPaid = async (id: string) => {
        if (!confirm("Are you sure you want to mark this as PAID? This will update partner's balance.")) return;

        try {
            const res = await fetch(`/api/admin/earnings/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "paid" }),
            });

            if (res.ok) {
                toast.success("Payment confirmed!");
                mutate("/api/admin/earnings");
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            toast.error("Error updating payment");
        }
    };

    if (isLoading) return (
        <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary opacity-20" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs tracking-tight">Syncing Financial Ledger...</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center">
                        <Wallet className="mr-3 w-8 h-8 text-primary" />
                        Network Earnings
                    </h2>
                    <p className="text-sm text-slate-500 font-medium mt-1">Review and process commission payouts for partners.</p>
                </div>
                <div className="w-full md:w-1/3 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-primary transition-colors" />
                    <Input 
                        placeholder="Search by student, partner or code..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-12 h-12 border-slate-200 focus:bg-slate-50"
                    />
                </div>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden relative">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Partner & Affiliate</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none text-center">Student / Reward info</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none text-center">Commission Amount</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none text-center">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {filteredEarnings.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-24 text-center">
                                        <div className="flex flex-col items-center space-y-4 opacity-50">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                                                <Banknote className="w-8 h-8 text-slate-200" />
                                            </div>
                                            <p className="text-slate-400 font-bold italic uppercase text-[10px] tracking-widest">No transaction history discovered</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredEarnings.map((e) => (
                                    <tr key={e.id} className="hover:bg-slate-100/30 transition-all duration-300 group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-black group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                                                    <User className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 text-base leading-none mb-1">{e.partner.fullName}</p>
                                                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">{e.partner.affiliateCode}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <p className="font-bold text-slate-700">{e.studentName}</p>
                                            <div className="flex items-center justify-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                                <Clock className="w-3 h-3 text-slate-300" />
                                                <span>Added on {format(new Date(e.createdAt), "dd MMM, yyyy")}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <p className="text-xl font-black text-slate-900 tracking-tighter">₹{e.amount.toLocaleString()}</p>
                                            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{e.type}</p>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border whitespace-nowrap inline-block ${
                                                e.status === 'paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100/50'
                                            }`}>
                                                {e.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end">
                                                {e.status === 'pending' ? (
                                                    <Button 
                                                        onClick={() => handleMarkPaid(e.id)}
                                                        className="h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black uppercase text-[10px] tracking-widest px-6"
                                                    >
                                                        Mark as Paid
                                                    </Button>
                                                ) : (
                                                    <div className="flex items-center space-x-2 text-emerald-500 font-black uppercase text-[10px] tracking-widest pr-4">
                                                        <CheckCircle className="w-4 h-4" />
                                                        <span>Processed</span>
                                                    </div>
                                                )}
                                            </div>
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
