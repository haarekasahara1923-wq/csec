import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { GraduationCap, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export const Footer = ({ settings }: { settings: any }) => {
    return (
        <footer className="bg-primary text-white pt-24 pb-12">
            <div className="container mx-auto px-4 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 xl:gap-16 mb-16">
                    {/* Column 1: Logo & Vision */}
                    <div className="space-y-8 lg:col-span-1">
                        <Link href="/" className="flex items-center group">
                            <div className="bg-white px-5 py-4 rounded-[2rem] shadow-2xl relative overflow-hidden transition-transform duration-500 group-hover:scale-105">
                                <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-100 opacity-40" />
                                <img 
                                    src="/logo_new.png" 
                                    alt="CSEC Logo" 
                                    className="h-16 w-auto object-contain relative z-10 contrast-[1.05]" 
                                />
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed font-medium">
                            Providing elite education consultancy since 2008. We transform global academic dreams into reality with expert precision and personalized guidance.
                        </p>
                        <div className="flex space-x-4">
                            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, idx) => (
                                <a key={idx} href="#" className="p-3 bg-white/5 rounded-2xl hover:bg-secondary hover:text-primary transition-all duration-300">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Our Precious Projects (New Section) */}
                    <div className="space-y-8">
                        <h4 className="text-xl font-black text-secondary tracking-tight uppercase border-b border-white/10 pb-4">{siteConfig.projects.title}</h4>
                        <ul className="space-y-3">
                            {siteConfig.projects.items.map((project) => (
                                <li key={project.title}>
                                    <a 
                                        href={project.href} 
                                        target="_blank" 
                                        className="text-gray-400 hover:text-secondary text-[13px] font-bold transition-all flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-secondary/30 rounded-full mr-2 group-hover:w-3 transition-all" />
                                        {project.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 & 4: Quick Links & Services */}
                    {siteConfig.footerLinks.slice(0, 2).map((group) => (
                        <div key={group.title} className="space-y-8">
                            <h4 className="text-xl font-black text-white tracking-tight uppercase border-b border-white/10 pb-4">{group.title}</h4>
                            <ul className="space-y-4">
                                {group.items.map((item) => (
                                    <li key={item.title}>
                                        <Link href={item.href} className="text-gray-400 hover:text-white text-[13px] font-bold transition-colors">
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Column 5: Global Contact (Enhanced) */}
                    <div className="space-y-8 lg:col-span-1">
                        <h4 className="text-xl font-black text-white tracking-tight uppercase border-b border-white/10 pb-4">Contact Gateway</h4>
                        <ul className="space-y-6">
                            {/* Main Office */}
                            <div className="space-y-3">
                                <li className="flex items-start space-x-3 text-[13px] text-gray-400">
                                    <MapPin className="w-5 h-5 text-secondary shrink-0" />
                                    <span>{settings?.address || siteConfig.contact.address}</span>
                                </li>
                                <li className="flex items-center space-x-3 text-[13px] text-gray-400">
                                    <Phone className="w-5 h-5 text-secondary shrink-0" />
                                    <span>{settings?.phone || siteConfig.contact.phone}</span>
                                </li>
                            </div>

                            {/* Delhi Office */}
                            <div className="space-y-3 pt-4 border-t border-white/5">
                                <li className="text-[10px] uppercase font-black text-secondary tracking-widest bg-secondary/10 px-3 py-1 rounded w-fit">Delhi Regional Center</li>
                                <li className="flex items-start space-x-3 text-[13px] text-gray-400">
                                    <MapPin className="w-5 h-5 text-secondary shrink-0" />
                                    <span>{siteConfig.contact.delhiAddress}</span>
                                </li>
                                <li className="flex items-center space-x-3 text-[13px] text-gray-400">
                                    <Phone className="w-5 h-5 text-secondary shrink-0" />
                                    <span>{siteConfig.contact.delhiPhone}</span>
                                </li>
                            </div>

                            <li className="flex items-center space-x-3 text-[13px] text-gray-400 pt-2 border-t border-white/5">
                                <Mail className="w-5 h-5 text-secondary shrink-0" />
                                <span>{settings?.email || siteConfig.contact.email}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-12 mt-16 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
                    <div className="flex space-x-8 mt-6 md:mt-0">
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms-conditions" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="/admin/login" className="hover:text-white transition-colors">Systems Access</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
