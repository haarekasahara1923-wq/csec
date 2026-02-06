import { LeadForm } from "@/components/LeadForm";
import { Card, CardContent } from "@/components/ui/Card";
import { Phone, Mail, MapPin, Sparkles } from "lucide-react";
import prisma from "@/lib/prisma";
import { siteConfig } from "@/lib/config";

export const metadata = {
    title: "Apply Online | CSEC Gwalior",
};

export default async function ApplyPage() {
    const settings = await prisma.settings.findFirst({ where: { id: "default" } });

    return (
        <div className="pt-32 min-h-screen bg-[#FDFDFD]">
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
                    {/* Form Section */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className="space-y-4">
                            <div className="inline-flex items-center space-x-2 bg-secondary/10 px-4 py-2 rounded-full border border-secondary/20">
                                <Sparkles className="w-4 h-4 text-secondary" />
                                <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Admission Season 2024-25</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter">Registration <span className="text-primary italic">Portal</span></h1>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl">
                                Secure your future today. Fill out our simplified registration form and let our top-rated counselors handle the rest.
                            </p>
                        </div>

                        <div className="bg-white p-8 md:p-16 rounded-[48px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)] border border-slate-50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                            <LeadForm sourcePage="Main Apply Page" whatsappNumber={settings?.whatsapp || settings?.phone} />
                        </div>
                    </div>

                    {/* Sidebar / Contact Info */}
                    <div className="space-y-10">
                        <div className="bg-[#0F172A] p-12 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-full h-full bg-secondary/5 skew-x-12 translate-x-1/2 group-hover:translate-x-1/3 transition-transform duration-1000"></div>
                            <h3 className="text-3xl font-black mb-8 tracking-tight relative z-10">Direct Help?</h3>
                            <div className="space-y-8 relative z-10">
                                <div className="space-y-2">
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">Call Support</p>
                                    <p className="text-2xl font-black text-secondary">{settings?.phone || siteConfig.contact.phone}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">Email Query</p>
                                    <p className="text-lg font-bold text-slate-200 truncate">{settings?.email || siteConfig.contact.email}</p>
                                </div>
                                {settings?.whatsapp && (
                                    <div className="space-y-2">
                                        <p className="text-xs font-black uppercase tracking-widest text-slate-400">WhatsApp Chat</p>
                                        <p className="text-lg font-bold text-green-400">{settings.whatsapp}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Card className="p-12 border-none bg-[#F1F5F9] rounded-[48px] relative overflow-hidden group">
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/50 rounded-full translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-150 duration-700"></div>
                            <h4 className="font-black text-slate-800 text-xl mb-6 flex items-center">
                                <MapPin className="mr-3 w-6 h-6 text-primary" /> Branch Office
                            </h4>
                            <p className="text-slate-500 font-medium leading-relaxed">
                                {settings?.address || siteConfig.contact.address}
                            </p>
                            <div className="mt-8 flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                                <span className="text-[10px] text-secondary font-black uppercase tracking-widest">Office Open Now</span>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
