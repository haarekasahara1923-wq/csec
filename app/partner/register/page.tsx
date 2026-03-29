"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { GraduationCap, Eye, EyeOff, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function PartnerRegister() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        whatsapp: "",
        password: "",
        confirmPassword: "",
        country: "India",
        city: "",
        organization: "",
        source: "",
        acceptTerms: false,
    });
    const [sameAsMobile, setSameAsMobile] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const updated = { ...prev, [name]: value };
            if (name === "mobile" && sameAsMobile) {
                updated.whatsapp = value;
            }
            return updated;
        });
    };

    const toggleSameAsMobile = () => {
        setSameAsMobile(!sameAsMobile);
        if (!sameAsMobile) {
            setFormData((prev) => ({ ...prev, whatsapp: prev.mobile }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (!formData.acceptTerms) {
            toast.error("Please accept the terms and conditions");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch("/api/partner/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Registration failed");
            }

            toast.success("Registration successful! Redirecting...");
            
            // Auto-login or redirect to login
            setTimeout(() => {
                router.push("/partner/login");
            }, 2000);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 md:p-8">
            <Link href="/" className="flex items-center space-x-2 mb-12">
                <GraduationCap className="w-12 h-12 text-[#1a56db]" />
                <div>
                    <span className="text-3xl font-black block leading-none text-slate-800">CSEC</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold block text-slate-400">
                        Partner Network
                    </span>
                </div>
            </Link>

            <Card className="w-full max-w-4xl p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] rounded-[40px] border-slate-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#1a56db]/5 blur-[100px] -z-10 rounded-full orbit"></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">Become a <span className="text-[#1a56db]">Partner</span></h1>
                            <p className="text-slate-500 font-medium leading-relaxed">
                                Join India's fastest growing B2B student recruitment network. Submit leads, track status, and earn commissions in real-time.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                "Global Affiliate Link",
                                "Private Dashboard",
                                "Real-time Earnings",
                                "Document Management",
                                "Dedicated Support"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center space-x-3">
                                    <div className="w-6 h-6 rounded-full bg-[#1a56db]/10 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-[#1a56db]" />
                                    </div>
                                    <span className="text-slate-700 font-semibold">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-12 border-t border-slate-100">
                            <p className="text-sm text-slate-400 mb-4 font-bold uppercase tracking-widest">Already a Partner?</p>
                            <Link href="/partner/login">
                                <Button variant="outline" className="w-full border-slate-200 text-slate-600 hover:bg-[#1a56db] hover:text-white hover:border-[#1a56db] group">
                                    Login to Dashboard
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Full Name *</label>
                                    <Input 
                                        name="fullName" 
                                        required 
                                        placeholder="John Doe" 
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-[#1a56db]/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Email Address *</label>
                                    <Input 
                                        type="email" 
                                        name="email" 
                                        required 
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleInputChange} 
                                        className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-[#1a56db]/20"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Mobile Number *</label>
                                    <div className="flex">
                                        <div className="bg-slate-50 border border-slate-100 h-12 rounded-l-xl px-3 flex items-center text-slate-500 border-r-0 font-bold">+91</div>
                                        <Input 
                                            name="mobile" 
                                            required 
                                            placeholder="999xxxx44"
                                            value={formData.mobile}
                                            onChange={handleInputChange}
                                            className="h-12 rounded-l-none rounded-r-xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-[#1a56db]/20"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-sm font-bold text-slate-700">WhatsApp Number *</label>
                                        <button 
                                            type="button" 
                                            onClick={toggleSameAsMobile}
                                            className="text-[10px] font-black uppercase text-[#1a56db] hover:underline"
                                        >
                                            {sameAsMobile ? "Edit Manually" : "Same as Mobile"}
                                        </button>
                                    </div>
                                    <div className="flex">
                                        <div className="bg-slate-50 border border-slate-100 h-12 rounded-l-xl px-3 flex items-center text-slate-500 border-r-0 font-bold">+91</div>
                                        <Input 
                                            name="whatsapp" 
                                            required 
                                            placeholder="999xxxx44"
                                            value={formData.whatsapp}
                                            onChange={handleInputChange}
                                            disabled={sameAsMobile}
                                            className="h-12 rounded-l-none rounded-r-xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-[#1a56db]/20 disabled:opacity-50"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Password *</label>
                                    <div className="relative">
                                        <Input 
                                            type={showPassword ? "text" : "password"} 
                                            name="password" 
                                            required 
                                            placeholder="Min 8 characters"
                                            value={formData.password}
                                            onChange={handleInputChange} 
                                            className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-[#1a56db]/20"
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Confirm Password *</label>
                                    <Input 
                                        type="password" 
                                        name="confirmPassword" 
                                        required 
                                        placeholder="Repeat password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange} 
                                        className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-[#1a56db]/20"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Country *</label>
                                    <select 
                                        name="country" 
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full h-12 rounded-xl bg-slate-50 border border-slate-100 px-4 focus:bg-white focus:ring-2 focus:ring-[#1a56db]/20 outline-none text-slate-600 font-medium transition-all"
                                    >
                                        <option value="India">India</option>
                                        <option value="Nepal">Nepal</option>
                                        <option value="Bangladesh">Bangladesh</option>
                                        <option value="UAE">UAE</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">City *</label>
                                    <Input 
                                        name="city" 
                                        required 
                                        placeholder="Enter your city"
                                        value={formData.city}
                                        onChange={handleInputChange} 
                                        className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-[#1a56db]/20"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Organization / Institute Name (Optional)</label>
                                <Input 
                                    name="organization" 
                                    placeholder="e.g. ABC Career Point"
                                    value={formData.organization}
                                    onChange={handleInputChange} 
                                    className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-[#1a56db]/20"
                                />
                            </div>

                            <div className="flex items-start space-x-3 pt-4">
                                <input 
                                    id="acceptTerms" 
                                    type="checkbox" 
                                    checked={formData.acceptTerms}
                                    onChange={(e) => setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                                    className="mt-1 w-4 h-4 rounded text-[#1a56db] focus:ring-[#1a56db]"
                                />
                                <label htmlFor="acceptTerms" className="text-sm text-slate-500 font-medium">
                                    I agree to the <Link href="/terms-conditions" className="text-[#1a56db] font-bold underline">Terms & Conditions</Link> and privacy policy.
                                </label>
                            </div>

                            <Button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full h-14 rounded-2xl bg-[#1a56db] hover:bg-[#1a56db]/90 text-white font-black text-lg shadow-xl shadow-[#1a56db]/20 group"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Register Now
                                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </Card>

            <footer className="mt-12 text-center text-slate-400 text-sm font-medium">
                © {new Date().getFullYear()} CSEC Gwalior. All Rights Reserved.
            </footer>
        </div>
    );
}
