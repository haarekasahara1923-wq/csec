"use client";

import useSWR from "swr";
import QRCode from "qrcode";
import Link from "next/link";
import { 
    Copy, 
    Share2, 
    Download, 
    MessageCircle, 
    Send, 
    Mail, 
    QrCode as QrIcon,
    Loader2,
    ShieldCheck,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function MyLinkPage() {
    const { data: partner, isLoading } = useSWR("/api/partner/me", fetcher);
    const [qrUrl, setQrUrl] = useState("");

    useEffect(() => {
        if (partner?.affiliateLink) {
            QRCode.toDataURL(partner.affiliateLink, { 
                width: 400, 
                margin: 4, 
                color: { dark: "#1a56db", light: "#ffffff" },
                errorCorrectionLevel: 'H'
            })
                .then(url => setQrUrl(url))
                .catch(err => console.error("QR Generation error:", err));
        }
    }, [partner]);

    const copyToClipboard = () => {
        if (partner?.affiliateLink) {
            navigator.clipboard.writeText(partner.affiliateLink);
            toast.success("Affiliate link copied!");
        }
    };

    const downloadQR = () => {
        if (!qrUrl) return;
        const link = document.createElement("a");
        link.href = qrUrl;
        link.download = `csec-qr-${partner?.affiliateCode}.png`;
        link.click();
    };

    if (isLoading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-[#1a56db]" /></div>;

    const shareOptions = [
        { name: "WhatsApp", icon: MessageCircle, color: "bg-[#25D366]", link: `https://wa.me/?text=${encodeURIComponent("Join CSEC via my link: " + partner?.affiliateLink)}` },
        { name: "Telegram", icon: Send, color: "bg-[#0088cc]", link: `https://t.me/share/url?url=${encodeURIComponent(partner?.affiliateLink)}&text=${encodeURIComponent("Join CSEC Gwalior")}` },
        { name: "Email", icon: Mail, color: "bg-slate-800", link: `mailto:?subject=${encodeURIComponent("Join CSEC Gwalior")}&body=${encodeURIComponent("Use my affiliate link to apply: " + partner?.affiliateLink)}` },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-1000">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 mb-2">
                    <ShieldCheck className="w-4 h-4 text-[#1a56db]" />
                    <span className="text-[10px] font-black text-[#1a56db] uppercase tracking-[0.2em]">Verified Affiliate Link</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">Expand Your Network</h1>
                <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
                    Share your unique link or QR code with students. When they apply using your referral, their application is automatically linked to your account.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                {/* Link Card */}
                <div className="bg-white p-10 md:p-14 rounded-[50px] border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col justify-between space-y-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 -mr-32 -mt-32 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-1000"></div>
                    
                    <div className="space-y-8 relative z-10">
                        <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Affiliate Code</p>
                            <h3 className="text-4xl font-black text-[#1a56db] tracking-tighter">{partner?.affiliateCode}</h3>
                        </div>

                        <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Affiliate URL</p>
                            <div className="p-6 bg-slate-50 rounded-[24px] border border-slate-100 flex items-center justify-between group/link">
                                <span className="font-bold text-slate-600 truncate mr-4">{partner?.affiliateLink}</span>
                                <button 
                                    onClick={copyToClipboard}
                                    className="shrink-0 p-3 bg-white rounded-xl text-slate-400 hover:text-[#1a56db] hover:shadow-lg transition-all"
                                >
                                    <Copy className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 relative z-10 pt-8 border-t border-slate-50">
                        {shareOptions.map((opt, i) => (
                            <a 
                                key={i} 
                                href={opt.link} 
                                target="_blank" 
                                className="flex flex-col items-center space-y-3 group/opt"
                            >
                                <div className={`w-14 h-14 ${opt.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-black/5 group-hover/opt:-translate-y-2 transition-transform duration-300`}>
                                    <opt.icon className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{opt.name}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* QR Code Card */}
                <div className="bg-slate-900 p-10 md:p-14 rounded-[50px] shadow-2xl shadow-slate-900/20 flex flex-col items-center justify-center text-center space-y-10 relative overflow-hidden group">
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 -ml-32 -mb-32 rounded-full group-hover:scale-110 transition-transform duration-1000"></div>
                    
                    <div className="space-y-2 relative z-10">
                         <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                            <QrIcon className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-black text-white tracking-tight">Smart QR Code</h3>
                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Scan for faster application</p>
                    </div>

                    <div className="bg-white p-6 rounded-[40px] shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-500">
                        {qrUrl ? (
                            <img src={qrUrl} alt="Affiliate QR Code" className="w-48 h-48 md:w-64 md:h-64 object-contain" />
                        ) : (
                            <div className="w-64 h-64 flex items-center justify-center">
                                <Loader2 className="w-8 h-8 animate-spin text-[#1a56db]" />
                            </div>
                        )}
                    </div>

                    <Button 
                        onClick={downloadQR}
                        className="bg-white text-slate-900 hover:bg-slate-100 rounded-2xl h-14 px-8 font-black flex items-center space-x-3 w-full relative z-10"
                    >
                        <Download className="w-5 h-5 text-[#1a56db]" />
                        <span>Download QR Image</span>
                    </Button>
                </div>
            </div>

            {/* Instruction Card */}
            <div className="bg-blue-600 p-12 rounded-[50px] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-blue-500/30 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 -mr-48 -mt-48 rounded-full blur-[80px]"></div>
                <div className="space-y-4 max-w-xl relative z-10">
                    <h3 className="text-3xl font-black tracking-tight">How it works?</h3>
                    <p className="text-blue-100 font-medium leading-relaxed">
                        When a student clicks your link, a cookie is saved on their browser for 30 days. Even if they don't apply immediately, you'll still get credited when they return and submit the application within that period.
                    </p>
                </div>
                <div className="shrink-0 relative z-10">
                    <Link href="/partner/dashboard/add-student">
                         <Button className="bg-white text-blue-600 hover:bg-blue-50 rounded-2xl h-16 px-10 font-black text-lg shadow-xl flex items-center space-x-3">
                            <span>Add Student Manually</span>
                            <ArrowRight className="w-6 h-6" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
