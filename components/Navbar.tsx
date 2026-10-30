"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { Button } from "./ui/Button";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = ({ settings }: { settings: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => { setIsOpen(false); }, [pathname]);

    return (
        <nav className={cn(
            "fixed top-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-slate-200/80",
            scrolled ? "shadow-lg shadow-slate-900/5" : "shadow-sm"
        )}>

            {/* ── Helpline Top Bar ── */}
            <a
                href="tel:+919589305152"
                className="w-full bg-secondary text-primary hover:bg-primary hover:text-white group py-1 px-4 flex justify-center items-center text-[10px] md:text-xs font-black tracking-widest uppercase transition-colors cursor-pointer"
            >
                <span className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75" />
                        <Phone className="relative w-2.5 h-2.5 md:w-3 md:h-3 animate-pulse group-hover:animate-bounce" />
                    </span>
                    <span className="animate-pulse">CALL ADMISSION HELPLINE NO. 9589305152</span>
                </span>
            </a>

            {/* ══════════════════════════════════════════════════
                ROW 1 (Desktop): Logo (Left)  ←→  CTAs (Right)
            ══════════════════════════════════════════════════ */}
            <div className="hidden lg:flex items-center justify-between container mx-auto px-6 xl:px-8 py-2 border-b border-slate-100">

                {/* Left: Logo & Consultancy Name */}
                <Link href="/" className="flex items-center gap-3 group shrink-0">
                    <div className="h-11 xl:h-12 w-auto bg-white rounded-xl shadow-md shadow-primary/10 border border-slate-100 flex items-center px-2 py-1 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                        <img
                            src="/logo_new.png"
                            alt="CSEC Logo"
                            className="h-full w-auto object-contain brightness-[1.05] contrast-[1.1]"
                            loading="eager"
                        />
                    </div>
                    <div className="flex flex-col justify-center leading-tight">
                        <span className="text-[16px] xl:text-[18px] font-black tracking-tight text-primary">
                            Career Solution
                        </span>
                        <span className="text-[10px] xl:text-[11px] font-bold text-secondary tracking-wide">
                            Education Consultancy
                        </span>
                    </div>
                </Link>

                {/* Right: CTA Buttons */}
                <div className="flex items-center gap-2.5 shrink-0">
                    <Link href="/partner/register">
                        <Button
                            variant="outline"
                            className="border-primary/25 text-primary font-black uppercase tracking-widest text-[10px] xl:text-[11px] h-8 xl:h-9 rounded-xl px-4 xl:px-5 hover:bg-primary hover:text-white transition-all shadow-xs"
                        >
                            Partner
                        </Button>
                    </Link>
                    <Link href="/apply">
                        <Button
                            className="bg-secondary text-primary font-black uppercase tracking-widest text-[10px] xl:text-[11px] h-8 xl:h-9 rounded-xl px-4 xl:px-6 shadow-md shadow-secondary/25 hover:brightness-105 transition-all"
                        >
                            Apply Now
                        </Button>
                    </Link>
                </div>
            </div>

            {/* ══════════════════════════════════════════════════
                ROW 2 (Desktop): All 9 Menu Items in 1 Compact Row
            ══════════════════════════════════════════════════ */}
            <div className="hidden lg:flex items-center justify-center container mx-auto px-4 py-1.5">
                <div className="flex items-center gap-0.5 xl:gap-2 flex-nowrap">
                    {siteConfig.nav.map((item) => {
                        const active = pathname === item.href;

                        if (item.title === "Services") {
                            return (
                                <div key={item.href} className="relative group">
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-1 px-2.5 xl:px-3.5 py-1.5 rounded-lg text-[10px] xl:text-[11px] font-black uppercase tracking-wide transition-all whitespace-nowrap",
                                            active
                                                ? "text-secondary bg-secondary/10"
                                                : "text-slate-700 hover:text-secondary hover:bg-slate-50"
                                        )}
                                    >
                                        {item.title}
                                        <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
                                    </Link>
                                    {/* Services dropdown */}
                                    <div className="pointer-events-none group-hover:pointer-events-auto absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-50 rounded-2xl shadow-2xl shadow-primary/10 border border-slate-100 overflow-hidden bg-white">
                                        <div className="bg-primary px-4 py-2.5">
                                            <span className="text-[10px] uppercase tracking-widest text-secondary font-black">
                                                Our Precious Projects
                                            </span>
                                        </div>
                                        <div className="max-h-[55vh] overflow-y-auto divide-y divide-slate-100">
                                            {siteConfig.projects.items.map((p) => (
                                                <a
                                                    key={p.title}
                                                    href={p.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold text-slate-600 hover:text-secondary hover:bg-slate-50 transition-colors"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/40 shrink-0" />
                                                    {p.title}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "px-2.5 xl:px-3.5 py-1.5 rounded-lg text-[10px] xl:text-[11px] font-black uppercase tracking-wide transition-all whitespace-nowrap",
                                    active
                                        ? "text-secondary bg-secondary/10"
                                        : "text-slate-700 hover:text-secondary hover:bg-slate-50"
                                )}
                            >
                                {item.title}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* ══════════════════════════════════════════════════
                MOBILE HEADER: Logo (Left)  ←→  Hamburger (Right)
            ══════════════════════════════════════════════════ */}
            <div className="flex items-center justify-between px-4 py-2.5 lg:hidden">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="h-10 w-auto bg-white rounded-xl shadow-xs border border-slate-200 flex items-center px-2 py-1 overflow-hidden shrink-0">
                        <img
                            src="/logo_new.png"
                            alt="CSEC Logo"
                            className="h-full w-auto object-contain"
                            loading="eager"
                        />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-[14px] font-black tracking-tight text-primary">
                            Career Solution
                        </span>
                        <span className="text-[10px] font-bold text-secondary mt-0.5">
                            Education Consultancy
                        </span>
                    </div>
                </Link>
                <button
                    className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-md active:scale-95 transition-all"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* ══════════════════════════════════════════════════
                MOBILE DRAWER
            ══════════════════════════════════════════════════ */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 26, stiffness: 220 }}
                        className="fixed inset-0 z-40 lg:hidden bg-primary flex flex-col overflow-y-auto overscroll-contain"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
                            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                                <div className="h-11 w-auto bg-white rounded-xl px-2 py-1 flex items-center shrink-0 shadow-lg">
                                    <img src="/logo_new.png" alt="CSEC Logo" className="h-full w-auto object-contain" />
                                </div>
                                <div>
                                    <p className="text-[16px] font-black text-white leading-tight">Career Solution</p>
                                    <p className="text-[11px] font-bold text-secondary/90 mt-0.5">Education Consultancy</p>
                                </div>
                            </Link>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Nav Links */}
                        <div className="flex-1 px-4 py-5 space-y-1">
                            {siteConfig.nav.map((item, idx) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.04 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-2xl font-black text-[14px] tracking-tight transition-all",
                                            pathname === item.href
                                                ? "bg-white/15 text-secondary border border-white/10"
                                                : "text-white/75 hover:text-white hover:bg-white/10"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "w-2 h-2 rounded-full shrink-0",
                                                pathname === item.href ? "bg-secondary" : "bg-white/25"
                                            )}
                                        />
                                        {item.title}
                                    </Link>

                                    {item.title === "Services" && (
                                        <div className="mt-1 mb-1 ml-9 pl-3 border-l-2 border-secondary/30 space-y-0.5">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">
                                                Our Precious Projects
                                            </p>
                                            {siteConfig.projects.items.map((p) => (
                                                <a
                                                    key={p.title}
                                                    href={p.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex items-center gap-2 py-1 text-[12px] font-semibold text-white/60 hover:text-white transition-colors"
                                                >
                                                    <span className="w-1 h-1 rounded-full bg-secondary/50 shrink-0" />
                                                    {p.title}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Mobile Bottom CTAs */}
                        <div className="shrink-0 px-4 pb-8 pt-4 border-t border-white/10 space-y-2.5">
                            <div className="grid grid-cols-2 gap-2.5">
                                <Link href="/partner/register" onClick={() => setIsOpen(false)}>
                                    <Button
                                        variant="outline"
                                        className="w-full h-11 rounded-2xl border-white/20 text-white font-black text-xs uppercase tracking-wider hover:bg-white hover:text-primary transition-all"
                                    >
                                        Partner
                                    </Button>
                                </Link>
                                <Link href="/apply" onClick={() => setIsOpen(false)}>
                                    <Button
                                        className="w-full h-11 rounded-2xl bg-secondary text-primary font-black text-xs uppercase tracking-wider shadow-xl transition-all"
                                    >
                                        Apply Now
                                    </Button>
                                </Link>
                            </div>
                            <a
                                href="tel:+919589305152"
                                className="flex items-center justify-center gap-2 w-full h-10 rounded-2xl bg-white/8 border border-white/10 text-white/70 hover:text-white hover:bg-white/12 transition-all font-bold text-xs"
                            >
                                <Phone className="w-3.5 h-3.5 text-secondary" />
                                Call Helpline: 9589305152
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
