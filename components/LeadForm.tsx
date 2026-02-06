"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Input, Textarea } from "./ui/Input";
import { Button } from "./ui/Button";
import { submitLead } from "@/app/actions/leads";
import { CheckCircle2, AlertCircle } from "lucide-react";
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

export const LeadForm = ({ sourcePage = "direct" }: { sourcePage?: string }) => {
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
                className="bg-green-50 border border-green-100 p-8 rounded-2xl text-center space-y-4"
            >
                <div className="flex justify-center">
                    <CheckCircle2 className="w-16 h-16 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-green-900">Application Submitted!</h3>
                <p className="text-green-700">
                    Thank you for choosing CSEC. Our advisor will contact you shortly to guide you further.
                </p>
                <Button onClick={() => setStatus("idle")} variant="outline" className="mt-4">
                    Send another application
                </Button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Full Name *</label>
                    <Input placeholder="John Doe" {...register("name")} />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Email Address *</label>
                    <Input type="email" placeholder="john@example.com" {...register("email")} />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Mobile Number *</label>
                    <Input placeholder="+91 00000 00000" {...register("phone")} />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">City *</label>
                    <Input placeholder="Gwalior" {...register("city")} />
                    {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Interested Course</label>
                    <Input placeholder="e.g. MBBS, B.Tech" {...register("course")} />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Preferred University</label>
                    <Input placeholder="e.g. Jiwaji University" {...register("university")} />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Message / Query</label>
                <Textarea placeholder="How can we help you?" {...register("message")} />
            </div>

            {status === "error" && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex items-center space-x-3 text-red-800">
                    <AlertCircle className="shrink-0" />
                    <p className="text-sm">{errorMessage}</p>
                </div>
            )}

            <Button type="submit" className="w-full py-6 text-lg" disabled={status === "loading"}>
                {status === "loading" ? "Submitting..." : "Submit Application"}
            </Button>
            <p className="text-center text-xs text-gray-500">
                By submitting this form, you agree to our Privacy Policy and Terms & Conditions.
            </p>
        </form>
    );
};
