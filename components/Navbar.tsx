"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { Button } from "./ui/Button";
import { Menu, X, GraduationCap, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = ({ settings }: { settings: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-500 flex flex-col",
                scrolled ? "royal-glass shadow-2xl" : "bg-transparent"
            )}
        >
            {/* Helpline Top Bar */}
            <div className="w-full bg-secondary text-primary py-1.5 md:py-2 px-4 flex justify-center items-center text-[10px] md:text-xs font-black tracking-widest uppercase shadow-sm">
                <span className="flex items-center gap-2">
                    <Phone className="w-3 h-3 md:w-3.5 md:h-3.5 animate-pulse" />
                    Admission Helpline No. 9589305152
                </span>
            </div>

            <div className={cn("container mx-auto px-6 md:px-12 transition-all duration-500", scrolled ? "py-2 md:py-3" : "py-2 md:py-3")}>
                <div className="flex items-center justify-between w-full">
                    {/* Logo & Branding */}
                    <div className="flex items-center shrink-0">
                        <Link href="/" className="flex items-center group gap-2 xl:gap-3">
                            <div className="relative h-14 md:h-20 lg:h-28 w-auto flex items-center justify-center transition-all duration-700 hover:scale-105 bg-white px-2 py-1 md:px-3 md:py-2 rounded-[14px] md:rounded-[24px] shadow-2xl shadow-primary/20 border border-white/40 backdrop-blur-3xl overflow-hidden shrink-0">
                                <img 
                                    src="/logo_new.png" 
                                    alt="CSEC Logo" 
                                    className="h-full w-auto object-contain relative z-10 brightness-[1.05] contrast-[1.1]"
                                    loading="eager"
                                />
                            </div>
                            <div className="flex flex-col justify-center text-left -translate-y-1 lg:-translate-y-3">
                                <span className={cn(
                                    "text-[15px] sm:text-[18px] lg:text-[20px] xl:text-[24px] font-black leading-tight tracking-tight text-primary transition-colors"
                                )}>
                                    Career Solution
                                </span>
                                <span className={cn(
                                    "text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px] font-bold leading-tight tracking-wide text-secondary transition-colors"
                                )}>
                                    Education Consultancy
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Nav Links */}
                    <div className="hidden lg:flex items-center justify-center mx-auto">
                        <div className="flex items-center space-x-2 xl:space-x-4">
                            {siteConfig.nav.map((item) => (
                                item.title === "Services" ? (
                                    <div key={item.href} className="relative group py-2">
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "text-[10px] xl:text-[11px] font-black uppercase tracking-wide transition-all hover:text-secondary relative whitespace-nowrap flex items-center gap-1",
                                                pathname === item.href ? "text-secondary" : "text-primary"
                                            )}
                                        >
                                            {item.title}
                                            <span className={cn(
                                                "absolute -bottom-2 left-0 w-0 h-1 bg-secondary transition-all duration-300 group-hover:w-full",
                                                pathname === item.href ? "w-full" : ""
                                            )} />
                                        </Link>
                                        <div className="absolute top-full right-0 mt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top w-64 bg-white rounded-2xl shadow-2xl shadow-primary/10 border border-slate-100 overflow-hidden flex flex-col z-50">
                                            <div className="bg-primary px-4 py-3 border-b border-white/10">
                                                <span className="text-[10px] uppercase tracking-widest text-secondary font-black block">Our Precious Projects</span>
                                            </div>
                                            <div className="max-h-[60vh] overflow-y-auto">
                                                {siteConfig.projects.items.map(project => (
                                                    <a 
                                                        key={project.title}
                                                        href={project.href}
                                                        target="_blank"
                                                        className="px-4 py-3 text-[12px] font-bold text-slate-700 hover:text-secondary hover:bg-slate-50 transition-colors border-b border-slate-100 flex items-center group/item"
                                                    >
                                                        <span className="w-1.5 h-1.5 bg-secondary/30 rounded-full mr-3 group-hover/item:w-3 group-hover/item:bg-secondary transition-all" />
                                                        {project.title}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "text-[10px] xl:text-[11px] font-black uppercase tracking-wide transition-all hover:text-secondary group relative whitespace-nowrap",
                                            pathname === item.href ? "text-secondary" : "text-primary"
                                        )}
                                    >
                                        {item.title}
                                        <span className={cn(
                                            "absolute -bottom-2 left-0 w-0 h-1 bg-secondary transition-all duration-300 group-hover:w-full",
                                            pathname === item.href ? "w-full" : ""
                                        )} />
                                    </Link>
                                )
                            ))}
                        </div>
                    </div>

                    {/* Right Action Buttons */}
                    <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 shrink-0">
                        <Link href="/partner/register" className="h-full">
                            <Button variant="outline" className="border-primary/20 text-primary font-black uppercase tracking-widest text-[10px] h-10 xl:h-12 rounded-2xl px-4 xl:px-6 hover:bg-primary hover:text-white transition-all">
                                Partner
                            </Button>
                        </Link>
                        <Link href="/apply" className="h-full">
                            <Button className="font-black uppercase tracking-widest text-[10px] h-10 xl:h-12 rounded-2xl px-6 xl:px-8 shadow-xl shadow-primary/20 hover:shadow-secondary/40 transition-all bg-secondary text-primary">
                                Apply
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center lg:hidden ml-auto">
                        <button 
                            className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg active:scale-95 transition-all" 
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-40 lg:hidden bg-primary/95 backdrop-blur-2xl flex flex-col p-8 md:p-12 overflow-y-auto overscroll-contain"
                    >
                        <div className="flex justify-between items-center mb-16">
                              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                                <div className="h-14 w-auto flex items-center justify-center overflow-hidden bg-white rounded-[16px] px-2 py-1 shadow-2xl border border-white/20 shrink-0">
                                     <img 
                                         src="/logo_new.png" 
                                         alt="CSEC Logo" 
                                         className="h-full w-auto object-contain brightness-[1.05] contrast-[1.1]"
                                     />
                                 </div>
                                 <div className="flex flex-col justify-center text-left">
                                     <span className="text-[15px] sm:text-[18px] font-black leading-tight tracking-tight text-white">
                                         Career Solution
                                     </span>
                                     <span className="text-[11px] sm:text-[13px] font-bold leading-tight tracking-wide text-secondary/90">
                                         Education Consultancy
                                     </span>
                                 </div>
                            </Link>
                            <button 
                                className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white border border-white/10" 
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="w-7 h-7" />
                            </button>
                        </div>

                        <div className="space-y-4 flex flex-col">
                            {siteConfig.nav.map((item, idx) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "text-3xl font-black tracking-tight transition-all block py-3",
                                            pathname === item.href ? "text-secondary italic" : "text-white/60 hover:text-white"
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.title}
                                    </Link>

                                    {item.title === "Services" && (
                                        <div className="flex flex-col space-y-3 pl-4 border-l-2 border-secondary/30 mt-2 mb-4">
                                            <span className="text-secondary font-black uppercase tracking-widest text-[11px] mb-2 block">Our Precious Projects</span>
                                            {siteConfig.projects.items.map(project => (
                                                <a 
                                                    key={project.title} 
                                                    href={project.href} 
                                                    target="_blank" 
                                                    className="text-white/70 hover:text-white font-bold text-xl py-1 flex items-center"
                                                >
                                                    {project.title}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-auto space-y-6">
                            <div className="h-[1px] bg-white/10 w-full mb-8" />
                            <Link href="/partner/register" onClick={() => setIsOpen(false)} className="block">
                                <Button variant="outline" className="w-full h-16 rounded-2xl border-white/20 text-white font-black text-lg uppercase tracking-widest hover:bg-white hover:text-primary transition-all">
                                    Become a Partner
                                </Button>
                            </Link>
                            <Link href="/apply" onClick={() => setIsOpen(false)} className="block">
                                <Button className="w-full h-16 rounded-2xl font-black text-lg uppercase tracking-widest bg-secondary text-primary shadow-2xl shadow-secondary/20 transition-all">
                                    Apply Now
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
