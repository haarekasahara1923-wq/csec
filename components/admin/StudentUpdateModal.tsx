"use client";

import { useState } from "react";
import { X, Loader2, DollarSign, Edit3, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";

interface StudentUpdateModalProps {
    student: any;
    onClose: () => void;
    onUpdate: () => void;
}

export const StudentUpdateModal = ({ student, onClose, onUpdate }: StudentUpdateModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        status: student.status,
        commissionAmount: "",
        note: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch(`/api/admin/partner-students/${student.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success("Student updated successfully!");
                onUpdate();
                onClose();
            } else {
                toast.error("Failed to update student");
            }
        } catch (error) {
            toast.error("Internal service error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
                <button 
                    onClick={onClose}
                    className="absolute top-8 right-8 p-3 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-2xl transition-all"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="p-10 md:p-14 space-y-8">
                    <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <Edit3 className="w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Update Status</h3>
                            <p className="text-sm font-medium text-slate-500">{student.studentName}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">New Status</label>
                            <select 
                                value={formData.status} 
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 font-black text-slate-700 outline-none focus:bg-white transition-all uppercase tracking-widest text-xs"
                            >
                                <option value="new">NEW</option>
                                <option value="in_review">IN REVIEW</option>
                                <option value="admitted">ADMITTED</option>
                                <option value="rejected">REJECTED</option>
                            </select>
                        </div>

                        {formData.status === 'admitted' && (
                             <div className="space-y-6 animate-in slide-in-from-top duration-300">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Commission Amount (₹)</label>
                                    <div className="relative">
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500 font-bold">₹</div>
                                        <Input 
                                            type="number" 
                                            placeholder="5000" 
                                            className="h-14 bg-emerald-50/50 border-emerald-100 pl-11 font-black text-lg text-emerald-700 focus:bg-white"
                                            value={formData.commissionAmount}
                                            onChange={(e) => setFormData({...formData, commissionAmount: e.target.value})}
                                        />
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 px-1">Adding commission will immediately update partner's dashboard.</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Payment Note (Optional)</label>
                                    <div className="relative">
                                        <ClipboardList className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                                        <Input 
                                            placeholder="Admission reward" 
                                            className="h-14 bg-slate-50 border-slate-100 pl-14 font-medium"
                                            value={formData.note}
                                            onChange={(e) => setFormData({...formData, note: e.target.value})}
                                        />
                                    </div>
                                </div>
                             </div>
                        )}

                        <div className="pt-4 grid grid-cols-2 gap-4">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={onClose}
                                className="h-14 rounded-2xl font-black uppercase tracking-widest text-xs border-slate-100"
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={isLoading}
                                className="h-14 rounded-2xl font-black uppercase tracking-widest text-xs bg-slate-900 hover:bg-slate-800 text-white shadow-xl"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
