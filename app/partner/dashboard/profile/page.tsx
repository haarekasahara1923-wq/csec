"use client";

import useSWR, { mutate } from "swr";
import { 
    User, 
    AtSign, 
    Phone, 
    Building2, 
    MapPin, 
    Globe, 
    Lock, 
    Save, 
    Loader2,
    CheckCircle2,
    Calendar,
    ShieldCheck
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { format } from "date-fns";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function ProfilePage() {
    const { data: partner, isLoading } = useSWR("/api/partner/me", fetcher);
    const [updating, setUpdating] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    
    const [profileData, setProfileData] = useState({
        fullName: "",
        mobile: "",
        whatsapp: "",
        city: "",
        country: "",
        organization: "",
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (partner) {
            setProfileData({
                fullName: partner.fullName || "",
                mobile: partner.mobile || "",
                whatsapp: partner.whatsapp || "",
                city: partner.city || "",
                country: partner.country || "India",
                organization: partner.organization || "",
            });
        }
    }, [partner]);

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const res = await fetch("/api/partner/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profileData),
            });
            if (res.ok) {
                toast.success("Profile updated successfully!");
                mutate("/api/partner/me");
            } else {
                toast.error("Failed to update profile");
            }
        } catch (error) {
            toast.error("Internal service error");
        } finally {
            setUpdating(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setChangingPassword(true);
        try {
            const res = await fetch("/api/partner/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(passwordData),
            });
            if (res.ok) {
                toast.success("Password updated successfully!");
                setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            } else {
                const data = await res.json();
                toast.error(data.message || "Failed to update password");
            }
        } catch (error) {
            toast.error("Internal service error");
        } finally {
            setChangingPassword(false);
        }
    };

    if (isLoading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-[#1a56db]" /></div>;

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-1000">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">Your Profile</h1>
                    <p className="text-slate-500 font-medium">Manage your personal information and account security.</p>
                </div>
                <div className="flex items-center space-x-3 bg-white px-6 py-4 rounded-[24px] border border-slate-100 shadow-sm grow-0">
                    <Calendar className="w-5 h-5 text-slate-300" />
                    <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Joined Since</p>
                        <p className="text-sm font-black text-slate-800 tracking-tight mt-0.5">
                            {partner?.createdAt ? format(new Date(partner.createdAt), "MMMM dd, yyyy") : "..."}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Profile Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-10 md:p-14 rounded-[50px] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 -ml-32 -mt-32 rounded-full opacity-50"></div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center space-x-4 mb-12">
                                <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
                                    <User className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">Personal Information</h3>
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Global Partner Identity</p>
                                </div>
                            </div>

                            <form onSubmit={handleProfileSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                                            <Input 
                                                value={profileData.fullName} 
                                                onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                                                className="pl-12 h-14 rounded-2xl bg-slate-50 border-slate-100" 
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2 opacity-60">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Registered Email (Disabled)</label>
                                        <div className="relative">
                                            <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                                            <Input value={partner?.email} disabled className="pl-12 h-14 rounded-2xl bg-slate-50 border-slate-100 italic" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Mobile Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                                            <Input 
                                                value={profileData.mobile} 
                                                onChange={(e) => setProfileData({...profileData, mobile: e.target.value})}
                                                className="pl-12 h-14 rounded-2xl bg-slate-50 border-slate-100" 
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">WhatsApp Number</label>
                                        <div className="relative">
                                            <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                                            <Input 
                                                value={profileData.whatsapp} 
                                                onChange={(e) => setProfileData({...profileData, whatsapp: e.target.value})}
                                                className="pl-12 h-14 rounded-2xl bg-slate-50 border-slate-100" 
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Organization / Institute</label>
                                        <div className="relative">
                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                                            <Input 
                                                value={profileData.organization} 
                                                onChange={(e) => setProfileData({...profileData, organization: e.target.value})}
                                                className="pl-12 h-14 rounded-2xl bg-slate-50 border-slate-100" 
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">City</label>
                                            <Input 
                                                value={profileData.city} 
                                                onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                                                className="h-14 rounded-2xl bg-slate-50 border-slate-100" 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Country</label>
                                            <Input 
                                                value={profileData.country} 
                                                onChange={(e) => setProfileData({...profileData, country: e.target.value})}
                                                className="h-14 rounded-2xl bg-slate-50 border-slate-100" 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-8">
                                    <Button 
                                        type="submit" 
                                        disabled={updating}
                                        className="bg-[#1a56db] hover:bg-[#1a56db]/90 h-16 px-10 rounded-2xl font-black text-white shadow-xl shadow-blue-500/10 min-w-[200px]"
                                    >
                                        {updating ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2 w-5 h-5" />}
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Password Form */}
                <div className="space-y-8">
                    <div className="bg-slate-900 p-10 md:p-14 rounded-[50px] shadow-2xl shadow-slate-900/10 text-white flex flex-col items-center text-center group">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 rotate-6 group-hover:rotate-0 transition-transform">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-black tracking-tight mb-4">Security Settings</h3>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-10 leading-none">Manage Account Password</p>

                        <form onSubmit={handlePasswordSubmit} className="w-full space-y-6">
                            <div className="space-y-2 text-left">
                                <label className="text-xs font-black uppercase text-white/50 ml-1">Current Password</label>
                                <Input 
                                    type="password" 
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                    className="h-14 rounded-2xl bg-white/5 border-white/10 text-white focus:bg-white/10" 
                                />
                            </div>
                            <div className="space-y-2 text-left">
                                <label className="text-xs font-black uppercase text-white/50 ml-1">New Password</label>
                                <Input 
                                    type="password" 
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                    className="h-14 rounded-2xl bg-white/5 border-white/10 text-white focus:bg-white/10" 
                                />
                            </div>
                            <div className="space-y-2 text-left">
                                <label className="text-xs font-black uppercase text-white/50 ml-1">Confirm New Password</label>
                                <Input 
                                    type="password" 
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                    className="h-14 rounded-2xl bg-white/5 border-white/10 text-white focus:bg-white/10" 
                                />
                            </div>
                            <Button 
                                type="submit" 
                                disabled={changingPassword}
                                className="w-full h-16 rounded-2xl bg-white text-slate-900 hover:bg-white/90 font-black shadow-xl"
                            >
                                {changingPassword ? <Loader2 className="animate-spin" /> : "Update Password"}
                            </Button>
                        </form>
                    </div>

                    <div className="bg-[#1a56db]/5 p-8 rounded-[40px] border border-[#1a56db]/10 flex flex-col items-center text-center space-y-4">
                        <ShieldCheck className="w-10 h-10 text-[#1a56db]" />
                        <div>
                            <p className="text-slate-800 font-black tracking-tight">Profile Integrity</p>
                            <p className="text-slate-500 text-xs font-medium px-4">Your data is secured using enterprise-grade encryption standard.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Re-using the lucide MessageCircle if needed, actually it's already imported
import { MessageCircle } from "lucide-react";
