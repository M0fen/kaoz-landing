"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";

/* ────────────────────────────────────────────
   ScrambleText — identical logic to Hero CTA button,
   independent per-instance, triggers on hover.
──────────────────────────────────────────── */
const SCRAMBLE_CHARS = "!@#[]_*/░%?▓▒";

function ScrambleText({ text }: { text: string }) {
    const [display, setDisplay] = useState(text);
    const rafRef = useRef<number | undefined>(undefined);
    const hoverRef = useRef(false);

    const scramble = useCallback((fast: boolean) => {
        let frame = 0;
        const iterations = fast ? text.length * 3 : text.length;
        const perFrame = fast ? 1 : 2;
        const step = () => {
            frame++;
            setDisplay(
                text.split("").map((char, i) => {
                    if (char === " ") return " ";
                    if (i < Math.floor(frame / perFrame)) return text[i];
                    return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                }).join("")
            );
            if (frame < iterations) {
                rafRef.current = requestAnimationFrame(step);
            } else {
                setDisplay(text);
                if (!hoverRef.current) {
                    setTimeout(() => {
                        if (!hoverRef.current) {
                            const idx = Math.floor(Math.random() * text.replace(/ /g, "").length);
                            setDisplay(d => d.split("").map((c, i) =>
                                i === idx && c !== " " ? SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)] : c
                            ).join(""));
                            setTimeout(() => setDisplay(text), 90);
                        }
                    }, 3000 + Math.random() * 2000);
                }
            }
        };
        cancelAnimationFrame(rafRef.current!);
        step();
    }, [text]);

    useEffect(() => { scramble(false); return () => cancelAnimationFrame(rafRef.current!); }, [scramble]);
    const onEnter = () => { hoverRef.current = true; scramble(true); };
    const onLeave = () => { hoverRef.current = false; scramble(false); };

    return (
        <span
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            style={{ display: "inline-block", letterSpacing: "0.22em", fontFamily: "'Space Mono', monospace" }}
        >
            {display}
        </span>
    );
}

const navLinks = [
    { href: "#inicio", label: "INICIO" },
    { href: "#clan", label: "EL CLAN" },
    { href: "#lineup", label: "LINEUP" },
    { href: "#iniciacion", label: "INICIACIÓN" },
];

/** Randomly fires a 220ms glitch on the logo every 5–12 seconds. */
function useLogoGlitch() {
    const [glitching, setGlitching] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        const schedule = () => {
            const delay = 5000 + Math.random() * 7000;
            timerRef.current = setTimeout(() => {
                setGlitching(true);
                setTimeout(() => { setGlitching(false); schedule(); }, 220);
            }, delay);
        };
        schedule();
        return () => clearTimeout(timerRef.current);
    }, []);

    return glitching;
}

const glitchStyle = (glitching: boolean): React.CSSProperties => ({
    animation: glitching ? "logo-glitch 0.22s steps(1) 1" : "none",
    filter: glitching
        ? "brightness(1.4) drop-shadow(2px 0 0 #E50000) drop-shadow(-2px 0 0 #00FFFF)"
        : "none",
    transition: "filter 0.05s linear"
});

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const logoGlitching = useLogoGlitch();

    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (latest) => {
        const vh = typeof window !== "undefined" ? window.innerHeight : 800;
        setIsVisible(latest > vh * 0.9);
    });

    const handleLinkClick = () => setIsMobileMenuOpen(false);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out bg-black border-b border-brand-red ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">

                    {/* ── DESKTOP: nav links + logo ── */}
                    <div className="hidden md:flex items-center w-full justify-between">
                        <div className="flex gap-8 lg:gap-12">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-white text-sm lg:text-base font-bold uppercase transition-colors duration-300 hover:text-brand-red"
                                    style={{ fontFamily: "'Space Mono', monospace" }}
                                >
                                    <ScrambleText text={link.label} />
                                </a>
                            ))}
                        </div>
                        <a href="#inicio" className="cursor-pointer">
                            <Image
                                src="/logoeme.png"
                                alt="cromo Logo"
                                width={40}
                                height={40}
                                className="h-8 lg:h-10 w-auto"
                                quality={90}
                                style={glitchStyle(logoGlitching)}
                            />
                        </a>
                    </div>

                    {/* ── MOBILE: logo + brutalist [ SYS ] menu toggle ── */}
                    <div className="md:hidden flex items-center justify-between w-full">
                        {/* Logo */}
                        <a href="#inicio" className="flex-shrink-0">
                            <Image
                                src="/logoeme.png"
                                alt="cromo Logo"
                                width={32}
                                height={32}
                                className="h-7 w-auto"
                                quality={90}
                                style={glitchStyle(logoGlitching)}
                            />
                        </a>

                        {/* Brutalist // SYS toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="relative font-body text-xs tracking-[0.35em] text-white hover:text-brand-red transition-colors duration-200 uppercase border border-white/20 hover:border-brand-red/60 px-3 py-1.5 flex items-center gap-2"
                            aria-label="Toggle menu"
                            style={{
                                clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)"
                            }}
                        >
                            {isMobileMenuOpen ? (
                                <>
                                    <span className="text-brand-red">■</span>
                                    <span>CERRAR</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-brand-red">▶</span>
                                    <span>// SYS</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── MOBILE MENU OVERLAY ── */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="fixed inset-x-0 top-[52px] z-40 bg-black border-t border-brand-red md:hidden"
                        style={{ borderBottom: "1px solid rgba(229,0,0,0.3)" }}
                    >
                        {/* Tech UI header */}
                        <div className="flex items-center justify-between px-4 py-2 border-b border-brand-red/20">
                            <span className="font-body text-[8px] tracking-[0.5em] text-brand-red/60 uppercase">// NAV_SISTEMA</span>
                            <span className="font-body text-[8px] tracking-[0.4em] text-silver-dim/30 uppercase">KZ-2026</span>
                        </div>

                        {/* Links */}
                        <div className="flex flex-col">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={handleLinkClick}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                    className="flex items-center gap-3 px-6 py-4 border-b border-brand-red/10 text-white hover:text-brand-red hover:bg-brand-red/5 transition-colors duration-200 uppercase font-bold text-lg"
                                    style={{ fontFamily: "'Space Mono', monospace" }}
                                >
                                    <span className="text-brand-red/60 text-xs font-body tracking-widest">0{index + 1}</span>
                                    <ScrambleText text={link.label} />
                                </motion.a>
                            ))}
                        </div>

                        {/* Footer hint */}
                        <div className="px-4 py-2">
                            <span className="font-body text-[7px] tracking-[0.4em] text-silver-dim/25 uppercase">— SELECCIONA DESTINO —</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
