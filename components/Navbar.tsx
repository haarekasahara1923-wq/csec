"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { Button } from "./ui/Button";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// 9 items split into 2 rows
const ROW_ONE = ["Home", "About Us", "Courses", "Universities", "Admission Process"];
const ROW_TWO = ["Services", "Study Abroad", "Gallery", "Contact Us"];

export const Navbar = ({ settings }: { settings: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Auto-close drawer on route change
    useEffect(() => { setIsOpen(false); }, [pathname]);

    const row1 = siteConfig.nav.filter((n) => ROW_ONE.includes(n.title));
    const row2 = siteConfig.nav.filter((n) => ROW_TWO.includes(n.title));

    // Reusable desktop nav link
    const DesktopLink = ({ item }: { item: { title: string; href: string } }) => {
        const active = pathname === item.href;
        const base =
            "text-[10px] xl:text-[11px] font-black uppercase tracking-wide transition-all whitespace-nowrap relative";
        const color = active ? "text-secondary" : "text-primary hover:text-secondary";

        if (item.title === "Services") {
            return (
                <div className="relative group">
                    <Link href={item.href} className={cn(base, color, "flex items-center gap-0.5")}>
                        {item.title}
                        <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
                        <span className={cn("absolute -bottom-1.5 left-0 h-[3px] bg-secondary rounded transition-all duration-300", active ? "w-full" : "w-0 group-hover:w-full")} />
                    </Link>
                    {/* Dropdown panel */}
                    <div className="pointer-events-none group-hover:pointer-events-auto absolute top-full left-0 mt-3 w-64 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-50 rounded-2xl shadow-2xl shadow-primary/10 border border-slate-100 overflow-hidden bg-white">
                        <div className="bg-primary px-4 py-2.5">
                            <span className="text-[10px] uppercase tracking-widest text-secondary font-black">Our Precious Projects</span>
                        </div>
                        <div className="max-h-[55vh] overflow-y-auto divide-y divide-slate-100">
                            {siteConfig.projects.items.map((p) => (
                                <a key={p.title} href={p.href} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold text-slate-600 hover:text-secondary hover:bg-slate-50 transition-colors">
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
            <Link href={item.href} className={cn(base, color, "group")}>
                {item.title}
                <span className={cn("absolute -bottom-1.5 left-0 h-[3px] bg-secondary rounded transition-all duration-300", active ? "w-full" : "w-0 group-hover:w-full")} />
            </Link>
        );
    };

    return (
        <nav className={cn(
            "fixed top-0 w-full z-50 transition-all duration-500",
            scrolled ? "royal-glass shadow-2xl" : "bg-transparent"
        )}>
            {/* ── Helpline Bar ── */}
            <a href="tel:+919589305152"
                className="w-full bg-secondary text-primary hover:bg-primary hover:text-white group py-1.5 md:py-2 px-4 flex justify-center items-center text-[10px] md:text-xs font-black tracking-widest uppercase transition-colors cursor-pointer">
                <span className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3 md:h-4 md:w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75" />
                        <Phone className="relative w-3 h-3 md:w-3.5 md:h-3.5 animate-pulse group-hover:animate-bounce" />
                    </span>
                    <span className="animate-pulse">CALL ADMISSION HELPLINE NO. 9589305152</span>
                </span>
            </a>

            {/* ── Main navbar body ── */}
            <div className="container mx-auto px-4 lg:px-6 xl:px-8 py-2 md:py-3">
                <div className="flex items-stretch gap-4 xl:gap-8 w-full">

                    {/* Logo */}
                    <div className="shrink-0 flex items-start">
                        <Link href="/" className="flex items-start gap-2 xl:gap-4 group">
                            <div className="h-16 sm:h-24 md:h-[7rem] lg:h-[7.5rem] xl:h-[8rem] w-auto bg-white rounded-[14px] md:rounded-[24px] shadow-2xl shadow-primary/20 border border-white/40 flex items-center justify-center px-2 py-1 md:px-3 md:py-2 overflow-hidden hover:scale-105 transition-transform duration-700 shrink-0">
                                <img src="/logo_new.png" alt="CSEC Logo"
                                    className="h-full w-auto object-contain brightness-[1.05] contrast-[1.1]"
                                    loading="eager" />
                            </div>
                            <div className="flex flex-col justify-center mt-3 sm:mt-5 lg:mt-6">
                                <span className="text-[15px] sm:text-[18px] lg:text-[21px] xl:text-[25px] font-black leading-tight tracking-tight text-primary">
                                    Career Solution
                                </span>
                                <span className="text-[11px] sm:text-[13px] lg:text-[14px] xl:text-[15px] font-bold leading-tight text-secondary">
                                    Education Consultancy
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* ── Desktop: two-row nav + CTA ── */}
                    <div className="hidden lg:flex flex-col flex-1 min-w-0 justify-between pt-1 pb-1.5">

                        {/* Top strip: Row 1 links  +  CTA buttons */}
                        <div className="flex items-center justify-between gap-4">
                            {/* Row 1 */}
                            <div className="flex items-center gap-3 xl:gap-5 flex-wrap">
                                {row1.map((item) => <DesktopLink key={item.href} item={item} />)}
                            </div>
                            {/* CTAs */}
                            <div className="flex items-center gap-2 xl:gap-3 shrink-0">
                                <Link href="/partner/register">
                                    <Button variant="outline"
                                        className="border-primary/25 text-primary font-black uppercase tracking-widest text-[10px] h-8 xl:h-9 rounded-xl px-3 xl:px-5 hover:bg-primary hover:text-white transition-all">
                                        Partner
                                    </Button>
                                </Link>
                                <Link href="/apply">
                                    <Button className="bg-secondary text-primary font-black uppercase tracking-widest text-[10px] h-8 xl:h-9 rounded-xl px-3 xl:px-5 shadow-lg shadow-secondary/30 hover:shadow-secondary/50 transition-all">
                                        Apply Now
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent my-1.5" />

                        {/* Row 2 */}
                        <div className="flex items-center gap-3 xl:gap-5 flex-wrap">
                            {row2.map((item) => <DesktopLink key={item.href} item={item} />)}
                        </div>
                    </div>

                    {/* ── Mobile: hamburger only ── */}
                    <div className="flex items-center lg:hidden ml-auto">
                        <button
                            className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg active:scale-95 transition-all"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Mobile full-screen drawer ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 26, stiffness: 220 }}
                        className="fixed inset-0 z-40 lg:hidden bg-primary flex flex-col overflow-y-auto overscroll-contain"
                    >
                        {/* Drawer header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-black/10 shrink-0">
                            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                                <div className="h-14 w-auto bg-white rounded-2xl px-3 py-2 flex items-center shrink-0 shadow-xl">
                                    <img src="/logo_new.png" alt="CSEC Logo" className="h-full w-auto object-contain" />
                                </div>
                                <div>
                                    <p className="text-[17px] font-black text-white leading-tight">Career Solution</p>
                                    <p className="text-[11px] font-bold text-secondary/90">Education Consultancy</p>
                                </div>
                            </Link>
                            <button onClick={() => setIsOpen(false)}
                                className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0"
                                aria-label="Close">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Links */}
                        <div className="flex-1 px-5 py-6 space-y-1">
                            {siteConfig.nav.map((item, idx) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: 24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3.5 rounded-2xl font-black text-[15px] tracking-tight transition-all w-full",
                                            pathname === item.href
                                                ? "bg-white/15 text-secondary border border-white/10"
                                                : "text-white/75 hover:text-white hover:bg-white/10"
                                        )}
                                    >
                                        <span className={cn("w-2 h-2 rounded-full shrink-0",
                                            pathname === item.href ? "bg-secondary" : "bg-white/25")} />
                                        {item.title}
                                    </Link>

                                    {/* Services sub-items */}
                                    {item.title === "Services" && (
                                        <div className="mt-1 mb-2 ml-9 pl-3 border-l-2 border-secondary/30 space-y-0.5">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1.5">Our Precious Projects</p>
                                            {siteConfig.projects.items.map((p) => (
                                                <a key={p.title} href={p.href} target="_blank" rel="noopener noreferrer"
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex items-center gap-2 py-1 text-[13px] font-semibold text-white/60 hover:text-white transition-colors">
                                                    <span className="w-1 h-1 rounded-full bg-secondary/50 shrink-0" />
                                                    {p.title}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Bottom CTAs */}
                        <div className="shrink-0 px-5 pb-8 pt-5 border-t border-white/10 space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <Link href="/partner/register" onClick={() => setIsOpen(false)}>
                                    <Button variant="outline"
                                        className="w-full h-12 rounded-2xl border-white/20 text-white font-black text-sm uppercase tracking-wider hover:bg-white hover:text-primary transition-all">
                                        Partner
                                    </Button>
                                </Link>
                                <Link href="/apply" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full h-12 rounded-2xl bg-secondary text-primary font-black text-sm uppercase tracking-wider shadow-xl transition-all">
                                        Apply Now
                                    </Button>
                                </Link>
                            </div>
                            <a href="tel:+919589305152"
                                className="flex items-center justify-center gap-2 w-full h-11 rounded-2xl bg-white/8 border border-white/10 text-white/70 hover:text-white hover:bg-white/15 transition-all font-bold text-sm">
                                <Phone className="w-4 h-4 text-secondary" />
                                Call: 9589305152
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
