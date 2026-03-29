"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { GraduationCap, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function PartnerLogin() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        loginType: "partner", // This will be passed to next-auth credentials
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
                loginType: "partner",
            });

            if (result?.error) {
                toast.error("Invalid email or password");
            } else {
                toast.success("Login successful!");
                setTimeout(() => {
                    router.push("/partner/dashboard");
                    router.refresh();
                }, 1000);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
            <Link href="/" className="mb-12">
                <div className="flex items-center space-x-2">
                    <GraduationCap className="w-12 h-12 text-[#1a56db]" />
                    <div>
                        <span className="text-3xl font-black block leading-none text-slate-800">CSEC</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold block text-slate-400">
                            Partner Network
                        </span>
                    </div>
                </div>
            </Link>

            <Card className="w-full max-w-lg p-10 md:p-14 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] rounded-[40px] border-slate-100 overflow-hidden relative bg-white">
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#1a56db]/5 blur-[100px] -z-10 rounded-full"></div>
                
                <div className="space-y-8">
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center space-x-2 bg-[#1a56db]/5 px-4 py-2 rounded-full border border-[#1a56db]/10 mb-2">
                            <ShieldCheck className="w-4 h-4 text-[#1a56db]" />
                            <span className="text-[10px] font-black text-[#1a56db] uppercase tracking-[0.2em]">Secure Partner Login</span>
                        </div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Welcome Back</h1>
                        <p className="text-slate-500 font-medium leading-relaxed">Enter your credentials to access your global recruitment dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                            <Input 
                                type="email" 
                                name="email" 
                                required 
                                placeholder="name@company.com" 
                                value={formData.email}
                                onChange={handleInputChange}
                                className="h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-[#1a56db]/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-slate-700">Password</label>
                                <Link href="/partner/forgot-password">
                                    <span className="text-[10px] font-black uppercase text-[#1a56db] hover:underline cursor-pointer">Forgot Password?</span>
                                </Link>
                            </div>
                            <div className="relative">
                                <Input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password" 
                                    required 
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleInputChange} 
                                    className="h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-[#1a56db]/20"
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full h-14 rounded-2xl bg-[#1a56db] hover:bg-[#1a56db]/90 text-white font-black text-lg shadow-xl shadow-[#1a56db]/20 group"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    Sign In to Dashboard
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="text-center pt-8 border-t border-slate-100">
                        <p className="text-sm text-slate-500 font-medium">
                            Don't have a partner account?{" "}
                            <Link href="/partner/register" className="text-[#1a56db] font-black hover:underline uppercase tracking-tight">
                                Register Now
                            </Link>
                        </p>
                    </div>
                </div>
            </Card>

            <footer className="mt-12 text-center text-slate-400 text-sm font-medium">
                © {new Date().getFullYear()} CSEC Gwalior. All Rights Reserved.
            </footer>
        </div>
    );
}
