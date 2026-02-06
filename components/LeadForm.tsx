"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Input, Textarea } from "./ui/Input";
import { Button } from "./ui/Button";
import { submitLead } from "@/app/actions/leads";
import { CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const leadSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Invalid phone number"),
    city: z.string().min(2, "City is required"),
    course: z.string().optional(),
    university: z.string().optional(),
    message: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

export const LeadForm = ({
    sourcePage = "direct",
    whatsappNumber
}: {
    sourcePage?: string,
    whatsappNumber?: string
}) => {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LeadFormData>({
        resolver: zodResolver(leadSchema),
    });

    const onSubmit = async (data: LeadFormData) => {
        setStatus("loading");
        try {
            const result = await submitLead({ ...data, sourcePage });
            if (result.success) {
                setStatus("success");

                // Redirect to WhatsApp if number exists
                if (whatsappNumber) {
                    const msg = `Hi, I just submitted an application through the website.\nName: ${data.name}\nCourse: ${data.course || 'General'}\nEmail: ${data.email}\nPhone: ${data.phone}`;
                    const encodedMsg = encodeURIComponent(msg);
                    setTimeout(() => {
                        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMsg}`, "_blank");
                    }, 2000);
                }

                reset();
            } else {
                setStatus("error");
                setErrorMessage(result.error || "Something went wrong. Please try again.");
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage("Network error. Please try again later.");
        }
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-100 p-8 rounded-[32px] text-center space-y-6"
            >
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-black text-green-900 tracking-tight">Success!</h3>
                    <p className="text-green-700 font-medium">
                        Your application has been logged. {whatsappNumber && "We are now redirecting you to WhatsApp for instant chat."}
                    </p>
                </div>
                {whatsappNumber && (
                    <div className="flex items-center justify-center space-x-3 text-green-600 animate-pulse">
                        <MessageSquare className="w-5 h-5" />
                        <span className="text-sm font-bold uppercase tracking-widest">Opening WhatsApp...</span>
                    </div>
                )}
                <Button onClick={() => setStatus("idle")} variant="outline" className="mt-4 rounded-xl">
                    Submit Another
                </Button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <Input className="h-14 rounded-2xl bg-slate-50" placeholder="e.g. Rahul Sharma" {...register("name")} />
                    {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase ml-1 italic">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                    <Input className="h-14 rounded-2xl bg-slate-50" type="email" placeholder="rahul@example.com" {...register("email")} />
                    {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase ml-1 italic">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Mobile Number</label>
                    <Input className="h-14 rounded-2xl bg-slate-50" placeholder="10 Digit Number" {...register("phone")} />
                    {errors.phone && <p className="text-red-500 text-[10px] font-bold uppercase ml-1 italic">{errors.phone.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Current City</label>
                    <Input className="h-14 rounded-2xl bg-slate-50" placeholder="e.g. Gwalior" {...register("city")} />
                    {errors.city && <p className="text-red-500 text-[10px] font-bold uppercase ml-1 italic">{errors.city.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Interested Course</label>
                    <Input className="h-14 rounded-2xl bg-slate-50" placeholder="e.g. MBBS, B.Tech" {...register("course")} />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Preferred University</label>
                    <Input className="h-14 rounded-2xl bg-slate-50" placeholder="e.g. Amity University" {...register("university")} />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Any Specific Query?</label>
                <Textarea className="rounded-2xl bg-slate-50 min-h-[120px]" placeholder="Tell us more about your requirements..." {...register("message")} />
            </div>

            {status === "error" && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center space-x-3 text-red-800">
                    <AlertCircle className="shrink-0" />
                    <p className="text-sm font-bold">{errorMessage}</p>
                </div>
            )}

            <Button type="submit" className="w-full h-16 text-lg font-black rounded-2xl bg-primary hover:bg-secondary transition-all shadow-xl shadow-primary/20" disabled={status === "loading"}>
                {status === "loading" ? "Processing..." : "Submit My Application"}
            </Button>
            <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Our counsellors typically respond within 2-4 working hours.
            </p>
        </form>
    );
};
