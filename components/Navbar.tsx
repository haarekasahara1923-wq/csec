"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { Button } from "./ui/Button";
import { Menu, X, Phone, ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = ({ settings }: { settings: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 15);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent body scrolling when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 w-full z-40 transition-all duration-300",
                    scrolled
                        ? "bg-white/95 backdrop-blur-2xl shadow-xl border-b border-slate-200/80"
                        : "bg-white/90 backdrop-blur-xl shadow-md border-b border-white/40"
                )}
            >
                {/* ── Helpline Top Bar CTA ── */}
                <a
                    href="tel:+919589305152"
                    className="w-full bg-secondary text-primary hover:bg-primary hover:text-white group py-1.5 px-4 flex justify-center items-center text-[10px] md:text-xs font-black tracking-widest uppercase transition-colors cursor-pointer relative z-10"
                >
                    <span className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75" />
                            <Phone className="relative w-3 h-3 animate-pulse group-hover:animate-bounce" />
                        </span>
                        <span className="animate-pulse">CALL ADMISSION HELPLINE NO. 9589305152</span>
                    </span>
                </a>

                {/* ── Main Header Content ── */}
                <div className="w-full max-w-[1550px] mx-auto px-3 sm:px-4 lg:px-5 xl:px-8 py-2 md:py-2.5">
                    <div className="flex items-center justify-between gap-3 xl:gap-5 w-full">

                        {/* ── Left: Majestic Royal Crest Logo & Branding ── */}
                        <Link href="/" className="flex items-center group gap-2.5 xl:gap-4 shrink-0 text-left mr-3 xl:mr-6">
                            <div className="relative h-13 sm:h-16 md:h-18 lg:h-[4.75rem] xl:h-[5.5rem] w-auto flex items-center justify-center transition-all duration-500 group-hover:scale-105 bg-white px-2 py-1 md:px-2.5 md:py-1.5 rounded-2xl shadow-xl shadow-primary/15 border border-slate-100 overflow-hidden shrink-0">
                                <img
                                    src="/logo_new.png"
                                    alt="CSEC Logo"
                                    className="h-full w-auto object-contain brightness-[1.05] contrast-[1.1]"
                                    loading="eager"
                                />
                            </div>
                            <div className="flex flex-col justify-center leading-tight">
                                <span className="text-[15px] sm:text-[18px] lg:text-[19px] xl:text-[24px] font-black tracking-tight text-primary transition-colors whitespace-nowrap">
                                    Career Solution
                                </span>
                                <span className="text-[10px] sm:text-[11.5px] lg:text-[11.5px] xl:text-[13.5px] font-bold tracking-wide text-secondary transition-colors mt-0.5 whitespace-nowrap">
                                    Education Consultancy
                                </span>
                            </div>
                        </Link>

                        {/* ── Desktop: 2-Tier Stack on Right (Well-Spaced, No Overlap!) ── */}
                        <div className="hidden lg:flex flex-col items-end justify-center flex-1 min-w-0 pl-2">

                            {/* Tier 1: Inspirational Career Quote (Left) + Corner CTAs (Right) */}
                            <div className="flex items-center justify-between w-full mb-1.5 gap-3 min-w-0">
                                {/* Career Quote to replace blank space */}
                                <div className="flex items-center gap-1.5 text-slate-600 truncate min-w-0">
                                    <span className="flex items-center justify-center w-4 h-4 xl:w-5 xl:h-5 rounded-full bg-primary/10 text-primary shrink-0">
                                        <Sparkles className="w-2.5 h-2.5 xl:w-3 xl:h-3 text-secondary" />
                                    </span>
                                    <span className="text-[10px] xl:text-[11.5px] font-semibold tracking-tight text-slate-700 italic truncate">
                                        &ldquo;Your Trusted Gateway to Top Universities &amp; Global Careers&rdquo;
                                    </span>
                                </div>

                                {/* CTAs */}
                                <div className="flex items-center gap-2 xl:gap-2.5 shrink-0">
                                    <Link href="/partner/register">
                                        <Button
                                            variant="outline"
                                            className="border-primary/25 text-primary font-black uppercase tracking-widest text-[9.5px] xl:text-[10.5px] h-7.5 xl:h-8 rounded-xl px-3.5 xl:px-4.5 hover:bg-primary hover:text-white transition-all shadow-xs"
                                        >
                                            Partner
                                        </Button>
                                    </Link>
                                    <Link href="/apply">
                                        <Button
                                            className="bg-secondary text-primary font-black uppercase tracking-widest text-[9.5px] xl:text-[10.5px] h-7.5 xl:h-8 rounded-xl px-3.5 xl:px-4.5 shadow-md shadow-secondary/25 hover:brightness-105 transition-all"
                                        >
                                            Apply Now
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Tier 2: All 9 Menu Items in ONE Row with Optimized Padding (No Overlap with Brand) */}
                            <div className="flex items-center justify-end gap-0.5 xl:gap-1.5 flex-nowrap w-full">
                                {siteConfig.nav.map((item) => {
                                    const active = pathname === item.href;

                                    if (item.title === "Services") {
                                        return (
                                            <div key={item.href} className="relative group py-0.5">
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        "text-[9px] xl:text-[10.5px] font-black uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-0.5 px-1.5 xl:px-2.5 py-1 rounded-md",
                                                        active
                                                            ? "bg-primary text-white shadow-xs"
                                                            : "text-slate-700 hover:text-primary hover:bg-primary/10"
                                                    )}
                                                >
                                                    {item.title}
                                                    <ChevronDown className={cn(
                                                        "w-2.5 h-2.5 xl:w-3 xl:h-3 transition-transform duration-200 group-hover:rotate-180",
                                                        active ? "text-white" : "text-slate-500 group-hover:text-primary"
                                                    )} />
                                                </Link>
                                                {/* Dropdown panel */}
                                                <div className="pointer-events-none group-hover:pointer-events-auto absolute top-full right-0 mt-1 w-64 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-50 rounded-2xl shadow-2xl shadow-primary/10 border border-slate-100 overflow-hidden bg-white">
                                                    <div className="bg-primary px-4 py-2.5">
                                                        <span className="text-[10px] uppercase tracking-widest text-secondary font-black">
                                                            Our Precious Projects
                                                        </span>
                                                    </div>
                                                    <div className="max-h-[55vh] overflow-y-auto divide-y divide-slate-100">
                                                        {siteConfig.projects.items.map((project) => (
                                                            <a
                                                                key={project.title}
                                                                href={project.href}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors"
                                                            >
                                                                <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                                                                {project.title}
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
                                                "text-[9px] xl:text-[10.5px] font-black uppercase tracking-wider transition-all whitespace-nowrap px-1.5 xl:px-2.5 py-1 rounded-md relative",
                                                active
                                                    ? "bg-primary text-white shadow-xs"
                                                    : "text-slate-700 hover:text-primary hover:bg-primary/10"
                                            )}
                                        >
                                            {item.title}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ── Mobile: Hamburger Toggle Button ── */}
                        <div className="flex items-center lg:hidden ml-auto">
                            <button
                                type="button"
                                className="w-10 h-10 sm:w-11 sm:h-11 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg active:scale-95 transition-all cursor-pointer"
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* ══════════════════════════════════════════════════
                MOBILE DRAWER: Rendered Outside <header>
                to ensure 100% reliable full-screen overlay
            ══════════════════════════════════════════════════ */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 220 }}
                        className="fixed inset-0 z-[9999] lg:hidden bg-primary flex flex-col overflow-y-auto overscroll-contain"
                    >
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0 bg-black/15">
                            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                                <div className="h-13 w-auto bg-white rounded-2xl px-2.5 py-1.5 flex items-center shrink-0 shadow-xl border border-white/30">
                                    <img src="/logo_new.png" alt="CSEC Logo" className="h-full w-auto object-contain" />
                                </div>
                                <div>
                                    <p className="text-[17px] sm:text-[19px] font-black text-white leading-tight">
                                        Career Solution
                                    </p>
                                    <p className="text-[11.5px] font-bold text-secondary/90 mt-0.5">
                                        Education Consultancy
                                    </p>
                                </div>
                            </Link>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-white/20 active:scale-95 transition-all shrink-0 cursor-pointer"
                                aria-label="Close"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Nav Links */}
                        <div className="flex-1 px-5 py-6 space-y-1.5">
                            {siteConfig.nav.map((item, idx) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: 25 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.04 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3.5 rounded-2xl font-black text-[15px] tracking-tight transition-all",
                                            pathname === item.href
                                                ? "bg-white/15 text-secondary border border-white/10"
                                                : "text-white/80 hover:text-white hover:bg-white/10"
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
                                        <div className="mt-1 mb-2 ml-9 pl-3.5 border-l-2 border-secondary/30 space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1.5">
                                                Our Precious Projects
                                            </p>
                                            {siteConfig.projects.items.map((p) => (
                                                <a
                                                    key={p.title}
                                                    href={p.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex items-center gap-2 py-1 text-[13px] font-semibold text-white/65 hover:text-white transition-colors"
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

                        {/* Drawer Bottom Actions */}
                        <div className="shrink-0 px-5 pb-8 pt-4 border-t border-white/10 space-y-3 bg-black/10">
                            <div className="grid grid-cols-2 gap-3">
                                <Link href="/partner/register" onClick={() => setIsOpen(false)}>
                                    <Button
                                        variant="outline"
                                        className="w-full h-12 rounded-2xl border-white/20 text-white font-black text-xs uppercase tracking-wider hover:bg-white hover:text-primary transition-all"
                                    >
                                        Partner
                                    </Button>
                                </Link>
                                <Link href="/apply" onClick={() => setIsOpen(false)}>
                                    <Button
                                        className="w-full h-12 rounded-2xl bg-secondary text-primary font-black text-xs uppercase tracking-wider shadow-xl hover:brightness-105 transition-all"
                                    >
                                        Apply Now
                                    </Button>
                                </Link>
                            </div>
                            <a
                                href="tel:+919589305152"
                                className="flex items-center justify-center gap-2 w-full h-11 rounded-2xl bg-white/10 border border-white/10 text-white hover:bg-white/15 transition-all font-bold text-xs"
                            >
                                <Phone className="w-3.5 h-3.5 text-secondary" />
                                Call Helpline: 9589305152
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
