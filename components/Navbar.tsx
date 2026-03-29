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
                scrolled ? "royal-glass py-4 shadow-2xl" : "bg-transparent py-8"
            )}
        >
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex items-center w-full">
                    {/* Logo & Branding */}
                    <div className="flex items-center space-x-1 shrink-0">
                        <Link href="/" className="flex items-center group">
                            <div className="relative h-10 md:h-16 w-24 md:w-36 flex items-center justify-start transition-all duration-500 hover:scale-105">
                                <img 
                                    src="/logo.jpg" 
                                    alt="CSEC Gwalior Logo" 
                                    className="h-full w-auto object-contain object-left"
                                    loading="eager"
                                />
                            </div>
                        </Link>
                        <div className="flex flex-col justify-center border-l border-secondary/20 pl-1.5 md:pl-2 h-10 md:h-14">
                            <span className="text-[11px] md:text-xl font-black bg-gradient-to-r from-primary via-slate-700 to-primary bg-clip-text text-transparent leading-none uppercase tracking-tighter">
                                Career Solution
                            </span>
                            <span className="text-[9px] md:text-sm font-bold text-secondary italic leading-none uppercase mt-0.5 whitespace-nowrap">
                                Education Consultancy
                            </span>
                        </div>
                    </div>

                    {/* Desktop Nav - Moved closer to branding */}
                    <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 ml-6 xl:ml-10">
                        {siteConfig.nav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-[10px] xl:text-[11px] font-black uppercase tracking-tighter transition-all hover:text-secondary group relative whitespace-nowrap",
                                    pathname === item.href ? "text-secondary" : "text-primary"
                                )}
                            >
                                {item.title}
                                <span className={cn(
                                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full",
                                    pathname === item.href ? "w-full" : ""
                                )} />
                            </Link>
                        ))}
                    </div>

                    {/* Right Action Buttons */}
                    <div className="hidden lg:flex items-center space-x-2 ml-auto">
                        <Link href="/partner/register">
                            <Button variant="outline" className="border-primary/20 text-primary font-black uppercase tracking-widest text-[9px] h-10 rounded-xl px-4 hover:bg-primary hover:text-white transition-all">
                                Partner
                            </Button>
                        </Link>
                        <Link href="/apply">
                            <Button className="font-black uppercase tracking-widest text-[9px] h-10 rounded-xl px-6 shadow-xl shadow-primary/20 hover:shadow-secondary/40 transition-all">
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
                             <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-3">
                                <div className="h-10 w-auto flex items-center justify-center overflow-hidden">
                                    <img 
                                        src="/logo.jpg" 
                                        alt="CSEC Gwalior Logo" 
                                        className="h-full w-auto object-contain"
                                    />
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
