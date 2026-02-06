import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { LeadForm } from "@/components/LeadForm";

export const metadata = {
    title: "Contact Us",
};

export default function ContactPage() {
    return (
        <div className="pt-24 min-h-screen bg-white">
            <section className="bg-slate-50 py-20 border-b">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-primary mb-4">Contact Us</h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        We are here to help you. Reach out for any queries or to book a free counseling session.
                    </p>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                        {/* Contact Info */}
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold text-primary">Get In Touch</h2>
                                <p className="text-gray-500 leading-relaxed">
                                    Whether you are a student looking for admission or a parent seeking guidance,
                                    our team is ready to assist you. Visit us or use the contact details below.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-8 bg-slate-50 rounded-2xl space-y-4">
                                    <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center">
                                        <Phone />
                                    </div>
                                    <h4 className="font-bold text-primary text-xl">Phone</h4>
                                    <p className="text-gray-600 font-medium">{siteConfig.contact.phone}</p>
                                </div>
                                <div className="p-8 bg-slate-50 rounded-2xl space-y-4">
                                    <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center">
                                        <Mail />
                                    </div>
                                    <h4 className="font-bold text-primary text-xl">Email</h4>
                                    <p className="text-gray-600 font-medium">{siteConfig.contact.email}</p>
                                </div>
                            </div>

                            <div className="p-8 bg-slate-50 rounded-2xl flex items-start space-x-6">
                                <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center shrink-0">
                                    <MapPin />
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary text-xl mb-2">Our Office</h4>
                                    <p className="text-gray-600 leading-relaxed font-medium">
                                        {siteConfig.contact.address}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-bold text-primary">Follow Us</h4>
                                <div className="flex space-x-4">
                                    {[Facebook, Instagram, Twitter, Linkedin].map((Icon, idx) => (
                                        <a key={idx} href="#" className="p-4 bg-primary text-white rounded-full hover:bg-secondary transition-colors">
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
                            <h3 className="text-2xl font-bold text-primary mb-8">Send us a Message</h3>
                            <LeadForm sourcePage="Contact Page" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Placeholder */}
            <section className="h-[400px] w-full bg-gray-200 grayscale contrast-125 overflow-hidden">
                <iframe
                    title="office-location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114511.23354388302!2d78.0934079!3d26.2494191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c6e5d39148d7%3A0x43da396323a664e1!2sGwalior%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                />
            </section>
        </div>
    );
}
