"use client";

import useSWR, { mutate } from "swr";
import { 
    Search, 
    CheckCircle, 
    XCircle, 
    Eye,
    Loader2,
    Users as UsersIcon,
    Wallet,
    Building2,
    Globe
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function AdminPartnersPage() {
    const { data: partners, isLoading } = useSWR("/api/admin/partners", fetcher);
    const [search, setSearch] = useState("");

    const filteredPartners = partners ? (partners as any[]).filter(p => 
        p.fullName.toLowerCase().includes(search.toLowerCase()) || 
        p.email.toLowerCase().includes(search.toLowerCase()) ||
        p.organization?.toLowerCase().includes(search.toLowerCase())
    ) : [];

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(`/api/admin/partners/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            if (res.ok) {
                toast.success(`Partner ${status} successfully`);
                mutate("/api/admin/partners");
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            toast.error("Error updating partner");
        }
    };

    if (isLoading) return (
        <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary opacity-20" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Partner Network...</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Affiliate Partners</h2>
                    <p className="text-sm text-slate-500">Manage recruitment partners and their verification status.</p>
                </div>
                <div className="w-full md:w-96 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input 
                        placeholder="Search partners by name or org..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 h-11"
                    />
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Partner</th>
                                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Organization</th>
                                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Students</th>
                                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Earnings</th>
                                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {filteredPartners.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-20 text-center text-slate-400 italic font-medium">No partners found</td>
                                </tr>
                            ) : (
                                filteredPartners.map((p) => (
                                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold uppercase">
                                                    {p.fullName.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800 leading-none mb-1">{p.fullName}</p>
                                                    <p className="text-xs text-slate-400">{p.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-2 text-slate-600">
                                                <Building2 className="w-4 h-4 opacity-40" />
                                                <span className="font-medium">{p.organization || "Individual"}</span>
                                            </div>
                                            <p className="text-[10px] text-slate-400 mt-1 flex items-center">
                                                <Globe className="w-3 h-3 mr-1" /> {p.city}, {p.country}
                                            </p>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="font-bold text-slate-800">{p._count.students}</span>
                                                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Leads</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="font-bold text-emerald-600">₹{p.totalEarnings.toLocaleString()}</span>
                                                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Revenue</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                                p.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                                p.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                                                'bg-rose-50 text-rose-600 border-rose-100'
                                            }`}>
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                {p.status === 'pending' && (
                                                    <>
                                                        <button 
                                                            onClick={() => handleUpdateStatus(p.id, 'active')}
                                                            title="Approve Partner"
                                                            className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                                                        >
                                                            <CheckCircle className="w-5 h-5" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleUpdateStatus(p.id, 'rejected')}
                                                            title="Reject Partner"
                                                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                                        >
                                                            <XCircle className="w-5 h-5" />
                                                        </button>
                                                    </>
                                                )}
                                                <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
                                                    <Eye className="w-5 h-5" />
                                                </button>
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
