import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { GraduationCap, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export const Footer = ({ settings }: { settings: any }) => {
    return (
        <footer className="bg-primary text-white pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Logo & Info */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="bg-white p-2 rounded-xl">
                                <img 
                                    src="/logo_new.png" 
                                    alt="CSEC Logo" 
                                    className="h-12 md:h-16 w-auto object-contain" 
                                />
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering students with expert guidance for their higher education journey.
                            We bridge the gap between your dreams and global opportunities.
                        </p>
                        <div className="flex space-x-4">
                            <a href={settings?.facebook || siteConfig.links.facebook} target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-secondary transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href={settings?.instagram || siteConfig.links.instagram} target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-secondary transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href={settings?.twitter || siteConfig.links.twitter} target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-secondary transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href={settings?.linkedin || siteConfig.links.linkedin} target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-secondary transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    {siteConfig.footerLinks.map((group) => (
                        <div key={group.title}>
                            <h4 className="text-lg font-bold mb-6 text-white">{group.title}</h4>
                            <ul className="space-y-4">
                                {group.items.map((item) => (
                                    <li key={item.title}>
                                        <Link href={item.href} className="text-gray-400 hover:text-secondary text-sm transition-colors">
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
                        <ul className="space-y-6">
                            {/* Main Office */}
                            <div className="space-y-3">
                                <li className="flex items-start space-x-3 text-sm text-gray-400">
                                    <MapPin className="w-5 h-5 text-secondary shrink-0" />
                                    <span>{settings?.address || siteConfig.contact.address}</span>
                                </li>
                                <li className="flex items-center space-x-3 text-sm text-gray-400">
                                    <Phone className="w-5 h-5 text-secondary shrink-0" />
                                    <span>{settings?.phone || siteConfig.contact.phone}</span>
                                </li>
                            </div>

                            {/* Delhi Office */}
                            <div className="space-y-3 pt-2 border-t border-white/5">
                                <li className="text-[10px] uppercase tracking-[0.2em] font-black text-secondary">Regional Center Office</li>
                                <li className="flex items-start space-x-3 text-sm text-gray-400">
                                    <MapPin className="w-5 h-5 text-secondary shrink-0" />
                                    <span>{siteConfig.contact.delhiAddress}</span>
                                </li>
                                <li className="flex items-center space-x-3 text-sm text-gray-400">
                                    <Phone className="w-5 h-5 text-secondary shrink-0" />
                                    <span>{siteConfig.contact.delhiPhone}</span>
                                </li>
                            </div>

                            {settings?.whatsapp && (
                                <li className="flex items-center space-x-3 text-sm text-gray-400 font-bold">
                                    <span className="w-5 h-5 text-green-500 shrink-0 flex items-center justify-center font-bold">W</span>
                                    <span>{settings?.whatsapp}</span>
                                </li>
                            )}
                            <li className="flex items-center space-x-3 text-sm text-gray-400">
                                <Mail className="w-5 h-5 text-secondary shrink-0" />
                                <span>{settings?.email || siteConfig.contact.email}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} CSEC Gwalior. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/admin/login" className="hover:text-white transition-colors">Admin Login</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
