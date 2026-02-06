"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { GraduationCap, Lock, Mail, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password");
            } else {
                router.push("/admin/dashboard");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <Card className="w-full max-w-md shadow-2xl border-none">
                <CardHeader className="text-center space-y-4 pt-12 pb-8">
                    <div className="flex justify-center">
                        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                            <GraduationCap className="text-white w-10 h-10" />
                        </div>
                    </div>
                    <div>
                        <CardTitle className="text-3xl font-bold text-primary">Admin Access</CardTitle>
                        <p className="text-gray-500">Sign in to manage CSEC Portal</p>
                    </div>
                </CardHeader>
                <CardContent className="px-8 pb-12">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 block">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    type="email"
                                    placeholder="admin@csecgwl.in"
                                    className="pl-12"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 block">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-12"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex items-center space-x-3 text-red-800 text-sm">
                                <AlertCircle className="shrink-0 w-5 h-5" />
                                <p>{error}</p>
                            </div>
                        )}

                        <Button type="submit" size="lg" className="w-full py-6 font-bold" disabled={loading}>
                            {loading ? "Verifying..." : "Login to Dashboard"}
                        </Button>
                    </form>
                    <div className="mt-8 text-center">
                        <a href="/" className="text-sm text-gray-400 hover:text-primary transition-colors">
                            ← Back to public site
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
