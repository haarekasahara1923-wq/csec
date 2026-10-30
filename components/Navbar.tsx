"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { Button } from "./ui/Button";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Split nav into two rows for desktop
const ROW_ONE = ["Home", "About Us", "Courses", "Universities", "Admission Process"];
const ROW_TWO = ["Services", "Study Abroad", "Gallery", "Contact Us"];

export const Navbar = ({ settings }: { settings: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => { setIsOpen(false); }, [pathname]);

    const navRow = (titles: string[]) =>
        siteConfig.nav.filter((item) => titles.includes(item.title));

    const NavLink = ({ item }: { item: { title: string; href: string } }) => {
        const isActive = pathname === item.href;
        if (item.title === "Services") {
            return (
                <div className="relative group">
                    <Link
                        href={item.href}
                        className={cn(
                            "text-[10px] xl:text-[11px] font-black uppercase tracking-wide transition-all hover:text-secondary relative whitespace-nowrap flex items-center gap-0.5",
                            isActive ? "text-secondary" : "text-primary"
                        )}
                    >
                        {item.title}
                        <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                        <span
                            className={cn(
                                "absolute -bottom-2 left-0 w-0 h-1 bg-secondary transition-all duration-300 group-hover:w-full",
                                isActive ? "w-full" : ""
                            )}
                        />
                    </Link>
                    {/* Dropdown */}
                    <div className="absolute top-full left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top-left w-64 bg-white rounded-2xl shadow-2xl shadow-primary/10 border border-slate-100 overflow-hidden z-50">
                        <div className="bg-primary px-4 py-3 border-b border-white/10">
                            <span className="text-[10px] uppercase tracking-widest text-secondary font-black block">
                                Our Precious Projects
                            </span>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto">
                            {siteConfig.projects.items.map((project) => (
                                <a
                                    key={project.title}
                                    href={project.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-3 text-[12px] font-bold text-slate-700 hover:text-secondary hover:bg-slate-50 transition-colors border-b border-slate-100 flex items-center group/item"
                                >
                                    <span className="w-1.5 h-1.5 bg-secondary/30 rounded-full mr-3 group-hover/item:w-3 group-hover/item:bg-secondary transition-all" />
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
                href={item.href}
                className={cn(
                    "text-[10px] xl:text-[11px] font-black uppercase tracking-wide transition-all hover:text-secondary group relative whitespace-nowrap",
                    isActive ? "text-secondary" : "text-primary"
                )}
            >
                {item.title}
                <span
                    className={cn(
                        "absolute -bottom-2 left-0 w-0 h-1 bg-secondary transition-all duration-300 group-hover:w-full",
                        isActive ? "w-full" : ""
                    )}
                />
            </Link>
        );
    };

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-500 flex flex-col",
                scrolled ? "royal-glass shadow-2xl" : "bg-transparent"
            )}
        >
            {/* Helpline Top Bar */}
            <a
                href="tel:+919589305152"
                className="w-full bg-secondary text-primary hover:bg-primary transition-colors hover:text-white group py-1.5 md:py-2 px-4 flex justify-center items-center text-[10px] md:text-xs font-black tracking-widest uppercase shadow-sm relative z-50 cursor-pointer"
            >
                <span className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3 md:h-4 md:w-4 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75" />
                        <Phone className="relative inline-flex rounded-full w-3 h-3 md:w-3.5 md:h-3.5 animate-pulse group-hover:animate-bounce" />
                    </span>
                    <span className="animate-pulse">CALL ADMISSION HELPLINE NO. 9589305152</span>
                </span>
            </a>

            <div className="container mx-auto px-4 lg:px-6 xl:px-8">
                <div className="flex items-start justify-between w-full">
                    {/* ── Logo & Branding ── */}
                    <div className="flex items-start shrink-0 py-2 md:py-3">
                        <Link href="/" className="flex items-start group gap-2 xl:gap-4 text-left">
                            <div className="relative h-14 sm:h-20 md:h-[6rem] lg:h-[7rem] xl:h-[7.5rem] w-auto flex items-center justify-center transition-all duration-700 hover:scale-105 bg-white px-2 py-1 md:px-3 md:py-[10px] rounded-[14px] md:rounded-[24px] shadow-2xl shadow-primary/20 border border-white/40 backdrop-blur-3xl overflow-hidden shrink-0">
                                <img
                                    src="/logo_new.png"
                                    alt="CSEC Logo"
                                    className="h-full w-auto object-contain relative z-10 brightness-[1.05] contrast-[1.1]"
                                    loading="eager"
                                />
                            </div>
                            <div className="flex flex-col justify-center mt-2 sm:mt-4 lg:mt-5">
                                <span className="text-[14px] sm:text-[17px] lg:text-[20px] xl:text-[24px] font-black leading-tight tracking-tight text-primary">
                                    Career Solution
                                </span>
                                <span className="text-[10px] sm:text-[12px] lg:text-[13px] xl:text-[15px] font-bold leading-tight tracking-wide text-secondary">
                                    Education Consultancy
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* ── Desktop Two-Row Nav + CTAs ── */}
                    <div className="hidden lg:flex flex-col items-end justify-between flex-1 ml-4 xl:ml-8 pt-2 md:pt-3 pb-2">
                        {/* CTA buttons — top right */}
                        <div className="flex items-center space-x-2 xl:space-x-3 self-end mb-2">
                            <Link href="/partner/register">
                                <Button
                                    variant="outline"
                                    className="border-primary/20 text-primary font-black uppercase tracking-widest text-[10px] h-8 xl:h-9 rounded-xl px-3 xl:px-5 hover:bg-primary hover:text-white transition-all"
                                >
                                    Partner
                                </Button>
                            </Link>
                            <Link href="/apply">
                                <Button className="font-black uppercase tracking-widest text-[10px] h-8 xl:h-9 rounded-xl px-3 xl:px-5 shadow-xl shadow-primary/20 hover:shadow-secondary/40 transition-all bg-secondary text-primary">
                                    Apply Now
                                </Button>
                            </Link>
                        </div>

                        {/* Row 1 */}
                        <div className="flex items-center gap-4 xl:gap-6 self-center mb-3">
                            {navRow(ROW_ONE).map((item) => (
                                <NavLink key={item.href} item={item} />
                            ))}
                        </div>

                        {/* Thin divider */}
                        <div className="w-full h-px bg-primary/10 mb-3" />

                        {/* Row 2 */}
                        <div className="flex items-center gap-4 xl:gap-6 self-center">
                            {navRow(ROW_TWO).map((item) => (
                                <NavLink key={item.href} item={item} />
                            ))}
                        </div>
                    </div>

                    {/* ── Mobile Hamburger ── */}
                    <div className="flex items-center lg:hidden ml-auto mt-3 sm:mt-4 py-2">
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

            {/* ── Mobile Slide-in Drawer ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 26, stiffness: 220 }}
                        className="fixed inset-0 z-40 lg:hidden bg-primary/97 backdrop-blur-2xl flex flex-col overflow-y-auto overscroll-contain"
                    >
                        {/* Drawer header */}
                        <div className="flex justify-between items-center px-6 py-5 border-b border-white/10">
                            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-left">
                                <div className="h-14 sm:h-16 w-auto flex items-center justify-center overflow-hidden bg-white rounded-[14px] px-3 py-2 shadow-2xl border border-white/20 shrink-0">
                                    <img
                                        src="/logo_new.png"
                                        alt="CSEC Logo"
                                        className="h-full w-auto object-contain brightness-[1.05] contrast-[1.1]"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-[18px] sm:text-[22px] font-black leading-tight tracking-tight text-white">
                                        Career Solution
                                    </span>
                                    <span className="text-[11px] sm:text-[13px] font-bold leading-tight tracking-wide text-secondary/90">
                                        Education Consultancy
                                    </span>
                                </div>
                            </Link>
                            <button
                                className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center text-white border border-white/10 shrink-0"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close menu"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Nav links — two columns on sm+, single on xs */}
                        <div className="flex-1 px-6 py-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                                {siteConfig.nav.map((item, idx) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.06 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 px-4 py-3.5 rounded-2xl font-black text-[15px] sm:text-[16px] tracking-tight transition-all",
                                                pathname === item.href
                                                    ? "bg-secondary/20 text-secondary border border-secondary/30"
                                                    : "text-white/70 hover:text-white hover:bg-white/10"
                                            )}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span
                                                className={cn(
                                                    "w-2 h-2 rounded-full shrink-0 transition-colors",
                                                    pathname === item.href ? "bg-secondary" : "bg-white/20"
                                                )}
                                            />
                                            {item.title}
                                        </Link>

                                        {/* Services sub-links inline */}
                                        {item.title === "Services" && (
                                            <div className="ml-4 mt-1 mb-2 pl-4 border-l-2 border-secondary/30 flex flex-col gap-1">
                                                <span className="text-secondary font-black uppercase tracking-widest text-[10px] mb-1">
                                                    Our Precious Projects
                                                </span>
                                                {siteConfig.projects.items.map((project) => (
                                                    <a
                                                        key={project.title}
                                                        href={project.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-white/60 hover:text-white font-bold text-[13px] py-1 flex items-center gap-2 transition-colors"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <span className="w-1 h-1 bg-secondary/50 rounded-full shrink-0" />
                                                        {project.title}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* CTA buttons at bottom */}
                        <div className="px-6 pb-8 space-y-3 border-t border-white/10 pt-6">
                            <Link href="/partner/register" onClick={() => setIsOpen(false)} className="block">
                                <Button
                                    variant="outline"
                                    className="w-full h-14 rounded-2xl border-white/20 text-white font-black text-base uppercase tracking-widest hover:bg-white hover:text-primary transition-all"
                                >
                                    Become a Partner
                                </Button>
                            </Link>
                            <Link href="/apply" onClick={() => setIsOpen(false)} className="block">
                                <Button className="w-full h-14 rounded-2xl font-black text-base uppercase tracking-widest bg-secondary text-primary shadow-2xl shadow-secondary/20 transition-all">
                                    Apply Now
                                </Button>
                            </Link>
                            {/* Quick call CTA */}
                            <a
                                href="tel:+919589305152"
                                className="flex items-center justify-center gap-2 w-full h-12 rounded-2xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all font-bold text-sm"
                            >
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
