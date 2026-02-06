"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { submitLead } from "@/app/actions/leads";

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
            const whatsappNumber = settings?.whatsapp || settings?.phone || "918982356715"; // fallback
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMsg}`, "_blank");

            setTimeout(() => {
                setIsOpen(false);
                setSubmitted(false);
            }, 3000);
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
                        className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-80 mb-4 overflow-hidden"
                    >
                        <div className="bg-green-600 p-6 text-white text-center relative">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 hover:bg-white/10 p-1 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h4 className="text-xl font-bold">Quick Inqiury</h4>
                            <p className="text-sm text-white/80">Submit and chat on WhatsApp</p>
                        </div>

                        <div className="p-6">
                            {submitted ? (
                                <div className="text-center py-8 space-y-4">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                        <MessageCircle className="w-8 h-8" />
                                    </div>
                                    <p className="font-bold text-slate-800">Opening WhatsApp...</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <Input name="name" placeholder="Your Name" required />
                                    <Input name="phone" placeholder="Mobile Number" required />
                                    <textarea
                                        name="message"
                                        placeholder="How can we help you?"
                                        required
                                        className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all h-24"
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 rounded-2xl shadow-lg shadow-green-600/20"
                                        disabled={loading}
                                    >
                                        {loading ? "Processing..." : "Submit & Chat Now"}
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
                className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-green-500/40 hover:bg-green-600 transition-colors"
            >
                <MessageCircle className="w-8 h-8" />
            </motion.button>
        </div>
    );
};
