import { LeadForm } from "@/components/LeadForm";
import { Card, CardContent } from "@/components/ui/Card";
import { Phone, Mail, MapPin } from "lucide-react";

export const metadata = {
    title: "Apply Now",
};

export default function ApplyPage() {
    return (
        <div className="pt-24 min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    <div className="lg:col-span-2">
                        <h1 className="text-4xl font-bold text-primary mb-2">Registration Form</h1>
                        <p className="text-gray-500 mb-12 text-lg">
                            Fill out the details below to start your admission process. Our counselor will get back to you within 24 hours.
                        </p>
                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
                            <LeadForm sourcePage="Apply Page" />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-primary p-8 rounded-3xl text-white">
                            <h3 className="text-2xl font-bold mb-6">Need Immediate Help?</h3>
                            <p className="text-gray-300 mb-8 leading-relaxed">
                                If you have urgent queries regarding deadlines or fee structures, feel free to contact us directly.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                        <Phone className="text-secondary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Call Us</p>
                                        <p className="font-bold">+91 99931 16644</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                        <Mail className="text-secondary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Email Us</p>
                                        <p className="font-bold">csecgwl@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Card className="p-8 border-none bg-secondary/10">
                            <h4 className="font-bold text-primary mb-4 flex items-center">
                                <MapPin className="mr-2 w-5 h-5" /> Visit Our Branch
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                CSEC Gwalior, Near Trade Fair Ground,<br /> Gwalior - 474005, MP, India.
                            </p>
                            <p className="text-xs text-secondary font-bold mt-4">Office Hours: 10:00 AM - 07:00 PM (Mon-Sat)</p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
