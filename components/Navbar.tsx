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
                "fixed top-0 w-full z-50 transition-all duration-500",
                scrolled ? "royal-glass py-3 md:py-4 shadow-2xl" : "bg-transparent py-4 md:py-6"
            )}
        >
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex items-center justify-between w-full">
                    {/* Logo & Branding */}
                    <div className="flex items-center shrink-0">
                        <Link href="/" className="flex items-center group gap-3">
                            <div className="relative h-14 md:h-28 w-auto flex items-center justify-center transition-all duration-700 hover:scale-105 bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-[16px] md:rounded-[24px] shadow-2xl shadow-primary/20 border border-white/40 backdrop-blur-3xl overflow-hidden shrink-0">
                                <img 
                                    src="/logo_new.png" 
                                    alt="CSEC Logo" 
                                    className="h-full w-auto object-contain relative z-10 brightness-[1.05] contrast-[1.1]"
                                    loading="eager"
                                />
                            </div>
                            <div className="flex flex-col lg:hidden justify-center text-left">
                                <span className={cn(
                                    "text-[15px] sm:text-[18px] font-black leading-tight tracking-tight",
                                    scrolled ? "text-primary" : "text-primary md:text-white"
                                )}>
                                    Career Solution
                                </span>
                                <span className={cn(
                                    "text-[11px] sm:text-[13px] font-bold leading-tight tracking-wide",
                                    scrolled ? "text-secondary" : "text-secondary md:text-white/80"
                                )}>
                                    Education Consultancy
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Nav Title & Menu */}
                    <div className="hidden lg:flex flex-col items-center justify-center gap-2 mx-auto">
                        <div className="flex flex-col items-center text-center">
                            <span className={cn(
                                "text-[18px] xl:text-[22px] font-black leading-tight tracking-tight",
                                scrolled ? "text-primary" : "text-primary"
                            )}>
                                Career Solution
                            </span>
                            <span className={cn(
                                "text-[12px] xl:text-[14px] font-bold leading-tight tracking-wide",
                                scrolled ? "text-secondary" : "text-secondary"
                            )}>
                                Education Consultancy
                            </span>
                        </div>
                        <div className="flex items-center space-x-3 xl:space-x-6">
                            {siteConfig.nav.map((item) => (
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
