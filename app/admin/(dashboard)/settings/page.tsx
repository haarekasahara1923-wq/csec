import prisma from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Save, Globe, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default async function AdminSettingsPage() {
    const settings = await prisma.settings.findFirst();

    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Site Settings</h2>
                <p className="text-sm text-slate-500">Global contact details and social media links.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center">
                                <Phone className="w-5 h-5 mr-3 text-primary" /> Contact Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-slate-400">Phone Number</label>
                                    <Input defaultValue={settings?.phone || ""} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-slate-400">Email Address</label>
                                    <Input defaultValue={settings?.email || ""} />
                                </div>
                            </div>
                            <div className="space-y-2 text-primary">
                                <label className="text-xs font-bold uppercase text-slate-400">Office Address</label>
                                <Input defaultValue={settings?.address || ""} />
                            </div>
                            <div className="space-y-2 pt-4 border-t border-slate-50">
                                <label className="text-xs font-bold uppercase text-slate-400 flex items-center">
                                    <Globe className="w-3 h-3 mr-1" /> Meta Pixel ID (Facebook)
                                </label>
                                <Input defaultValue={settings?.metaPixelId || ""} placeholder="e.g. 1234567890" />
                                <p className="text-[10px] text-slate-400 italic font-medium">This will enable Facebook Pixel tracking across all public pages.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center">
                                <Globe className="w-5 h-5 mr-3 text-primary" /> Social Media Links
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-slate-400 flex items-center"><Facebook className="w-3 h-3 mr-1" /> Facebook</label>
                                    <Input defaultValue={settings?.facebook || ""} placeholder="https://..." />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-slate-400 flex items-center"><Instagram className="w-3 h-3 mr-1" /> Instagram</label>
                                    <Input defaultValue={settings?.instagram || ""} placeholder="https://..." />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-slate-400 flex items-center"><Twitter className="w-3 h-3 mr-1" /> Twitter</label>
                                    <Input defaultValue={settings?.twitter || ""} placeholder="https://..." />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-slate-400 flex items-center"><Linkedin className="w-3 h-3 mr-1" /> LinkedIn</label>
                                    <Input defaultValue={settings?.linkedin || ""} placeholder="https://..." />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button size="lg" className="px-12">
                            <Save className="w-4 h-4 mr-2" /> Save All Changes
                        </Button>
                    </div>
                </div>

                <div className="space-y-6">
                    <Card className="bg-slate-800 text-white border-none shadow-xl">
                        <CardContent className="p-6 space-y-4">
                            <h4 className="font-bold">System Info</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-white/40">Next.js Version</span>
                                    <span>14.2.23</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-white/40">Database Status</span>
                                    <span className="text-green-400">Healthy</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-white/40">Environment</span>
                                    <span>Production</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
