"use client";

import { useState } from "react";
import { Copy, Share2, MessageCircle, ExternalLink, QrCode } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export const AffiliateLinkBox = ({ affiliateLink, affiliateCode }: { affiliateLink: string, affiliateCode: string }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(affiliateLink);
        toast.success("Link copied to clipboard!");
    };

    const shareOnWhatsApp = () => {
        const text = `Join CSEC via my link: ${affiliateLink}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    };

    return (
        <div className="bg-gradient-to-br from-[#1a56db] to-blue-700 rounded-[32px] p-8 md:p-10 text-white shadow-2xl shadow-blue-500/20 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] -z-0 rounded-full group-hover:scale-110 transition-transform duration-1000"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-4">
                    <div className="inline-flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                        <Share2 className="w-3 h-3" />
                        <span>Ready to Referral</span>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight">Your Unique Affiliate Link</h2>
                    <p className="text-blue-100 font-medium max-w-lg">Share this link with students. When they apply using your referral, you earn rewards upon their admission.</p>
                </div>

                <div className="flex flex-col space-y-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center justify-between group/link">
                        <span className="text-sm font-black truncate max-w-[200px] md:max-w-xs">{affiliateLink}</span>
                        <div className="flex space-x-2 shrink-0">
                            <button onClick={copyToClipboard} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <Button 
                            onClick={shareOnWhatsApp} 
                            className="bg-green-500 hover:bg-green-600 border-none rounded-xl h-12 flex items-center justify-center space-x-2 font-bold"
                        >
                            <MessageCircle className="w-5 h-5 fill-white" />
                            <span>WhatsApp</span>
                        </Button>
                        <Button 
                            onClick={copyToClipboard} 
                            className="bg-white text-[#1a56db] hover:bg-blue-50 border-none rounded-xl h-12 flex items-center justify-center space-x-2 font-black"
                        >
                            <Copy className="w-5 h-5" />
                            <span>Copy Link</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
