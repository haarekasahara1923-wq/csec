import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Sparkles, MessageCircle } from "lucide-react";
import prisma from "@/lib/prisma";
import { siteConfig } from "@/lib/config";
import { LeadForm } from "@/components/LeadForm";

export const metadata = {
    title: "Contact Us | CSEC Gwalior",
};

export default async function ContactPage() {
    const settings = await prisma.settings.findFirst({ where: { id: "default" } });
    const whatsappNumber = settings?.whatsapp || settings?.phone;

    return (
        <div className="min-h-screen bg-white">
            {/* Catchy Header */}
            <section className="bg-[#F8FAFC] pt-32 pb-40 border-b border-slate-100 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center space-x-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/10 mb-8">
                        <MessageCircle className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Contact Expert Counselors</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 tracking-tighter">
                        Let's Talk About Your <span className="text-primary italic">Succes</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                        We are here to provide clarity and guidance. Reach out today for a personalized counseling session.
                    </p>
                </div>
            </section>

            <section className="py-32 relative">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        {/* Dynamic Contact Info */}
                        <div className="space-y-16">
                            <div className="space-y-6">
                                <h2 className="text-4xl font-black text-slate-800 tracking-tight">Connect with Us</h2>
                                <p className="text-slate-500 font-medium leading-relaxed max-w-md">
                                    Whether you're exploring career options or need help with a specific university application, our team is just a call or message away.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-10 bg-[#F1F5F9] rounded-[40px] space-y-6 group hover:bg-primary transition-all duration-500">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <Phone className="text-primary group-hover:text-secondary transition-colors" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-black text-slate-800 group-hover:text-white text-xl">Phone</h4>
                                        <p className="text-slate-500 group-hover:text-slate-300 font-bold">{settings?.phone || siteConfig.contact.phone}</p>
                                    </div>
                                </div>
                                <div className="p-10 bg-[#F1F5F9] rounded-[40px] space-y-6 group hover:bg-secondary transition-all duration-500">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <Mail className="text-secondary group-hover:text-primary transition-colors" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-black text-slate-800 group-hover:text-white text-xl">Email</h4>
                                        <p className="text-slate-500 group-hover:text-slate-200 font-bold break-words">{settings?.email || siteConfig.contact.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 flex items-start space-x-8 group">
                                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-slate-200/50 group-hover:rotate-6 transition-transform duration-500">
                                    <MapPin className="text-primary w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-800 text-2xl mb-3 tracking-tight">Visit Branch</h4>
                                    <p className="text-slate-500 leading-relaxed font-medium">
                                        {settings?.address || siteConfig.contact.address}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6 pt-4">
                                <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs">Stay Connected</h4>
                                <div className="flex space-x-6">
                                    {[
                                        { Icon: Facebook, link: settings?.facebook || siteConfig.links.facebook },
                                        { Icon: Instagram, link: settings?.instagram || siteConfig.links.instagram },
                                        { Icon: Twitter, link: settings?.twitter || siteConfig.links.twitter },
                                        { Icon: Linkedin, link: settings?.linkedin || siteConfig.links.linkedin }
                                    ].map((item, idx) => (
                                        <a
                                            key={idx}
                                            href={item.link}
                                            target="_blank"
                                            className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-secondary hover:-translate-y-2 transition-all duration-300 shadow-xl shadow-slate-900/10"
                                        >
                                            <item.Icon className="w-6 h-6" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Interactive Form */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/5 blur-[100px] -z-10 rounded-full"></div>
                            <div className="bg-white p-12 md:p-16 rounded-[60px] shadow-[0_48px_80px_-16px_rgba(0,0,0,0.08)] border border-slate-50">
                                <div className="space-y-2 mb-10">
                                    <h3 className="text-3xl font-black text-slate-800 tracking-tight">Send Message</h3>
                                    <p className="text-slate-400 font-medium whitespace-nowrap">Response within 2-4 hours guaranteed</p>
                                </div>
                                <LeadForm sourcePage="Contact Page" whatsappNumber={whatsappNumber} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Map Section */}
            <section className="px-4 pb-20">
                <div className="container mx-auto bg-slate-100 h-[500px] rounded-[60px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl relative group">
                    <iframe
                        title="office-location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114511.23354388302!2d78.0934079!3d26.2494191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c6e5d39148d7%3A0x43da396323a664e1!2sGwalior%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                    />
                    <div className="absolute inset-0 pointer-events-none border-[20px] border-white/10 rounded-[60px]"></div>
                </div>
            </section>
        </div>
    );
}
