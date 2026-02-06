"use client";

import { useState } from "react";
import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { submitLead } from "@/app/actions/leads";

// Authentic WhatsApp SVG Icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
);

export const WhatsAppWidget = ({ settings }: { settings: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            message: formData.get("message") as string,
            sourcePage: window.location.pathname,
        };

        const res = await submitLead(data);
        if (res.success) {
            setSubmitted(true);

            // Redirect to WhatsApp with message
            const whatsappMsg = `Hi, I'm ${data.name}. I'm interested in your services. My Email: ${data.email}. Message: ${data.message}`;
            const encodedMsg = encodeURIComponent(whatsappMsg);
            const whatsappNumber = settings?.whatsapp || settings?.phone || "918982356715";

            setTimeout(() => {
                window.open(`https://wa.me/${whatsappNumber}?text=${encodedMsg}`, "_blank");
                setIsOpen(false);
                setSubmitted(false);
            }, 1500);
        }
        setLoading(false);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="bg-white rounded-[32px] shadow-2xl border border-slate-100 w-80 mb-4 overflow-hidden"
                    >
                        <div className="bg-[#25D366] p-6 text-white text-center relative">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 hover:bg-white/10 p-1 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="flex justify-center mb-2">
                                <WhatsAppIcon className="w-8 h-8" />
                            </div>
                            <h4 className="text-xl font-bold">Consult with Expert</h4>
                            <p className="text-sm text-white/80">Typical response: 5-10 mins</p>
                        </div>

                        <div className="p-6">
                            {submitted ? (
                                <div className="text-center py-8 space-y-4">
                                    <div className="w-16 h-16 bg-green-100 text-[#25D366] rounded-full flex items-center justify-center mx-auto">
                                        <WhatsAppIcon className="w-8 h-8" />
                                    </div>
                                    <p className="font-bold text-slate-800">Redirecting to WhatsApp...</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <Input name="name" placeholder="Full Name" required className="h-12 rounded-xl" />
                                    <Input name="phone" placeholder="WhatsApp Number" required className="h-12 rounded-xl" />
                                    <textarea
                                        name="message"
                                        placeholder="How can we help you?"
                                        required
                                        className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/20 transition-all h-24"
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-6 rounded-2xl shadow-lg shadow-green-600/20"
                                        disabled={loading}
                                    >
                                        {loading ? "Processing..." : (
                                            <span className="flex items-center justify-center">
                                                <Send className="w-4 h-4 mr-2" /> Start Chat
                                            </span>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 hover:bg-[#128C7E] transition-all relative group"
            >
                <WhatsAppIcon className="w-10 h-10" />
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">1</span>
                )}
            </motion.button>
        </div>
    );
};
