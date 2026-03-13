"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Countdown from "./Countdown";
import Image from "next/image";
import Link from "next/link";

/* ──────────────────────────────────────────
   Scramble text — idle + hover decrypt loop
────────────────────────────────────────── */
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
        <span onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ display: "inline-block", letterSpacing: "0.25em" }}>
            {display}
        </span>
    );
}

/* ──────────────────────────────────────────
   Canvas-based black-pixel knockout for cromo lettering.
   Works regardless of background color.
────────────────────────────────────────── */
function CromoLettering({ src, className, style }: { src: string; className?: string; style?: React.CSSProperties }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.src = src;
        img.onload = () => {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
            const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const d = data.data;
            for (let i = 0; i < d.length; i += 4) {
                const luma = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
                const alpha = Math.max(0, Math.min(255, (luma - 30) * (255 / 80)));
                d[i + 3] = alpha;
            }
            ctx.putImageData(data, 0, 0);
        };
    }, [src]);

    return <canvas ref={canvasRef} className={className} style={style} />;
}

/* ──────────────────────────────────────────
   SVG Circular Transmission Dial — 71% on mount
────────────────────────────────────────── */
function HudSignalBar() {
    const [count, setCount] = useState(0);
    const [glitch, setGlitch] = useState(false);

    const SIZE = 56;
    const STROKE = 4;
    const R = (SIZE - STROKE) / 2;
    const CIRCUMFERENCE = 2 * Math.PI * R;

    useEffect(() => {
        const total = 71;
        const duration = 1000; // ms
        const start = performance.now();
        let rafId: number;
        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * total);
            setCount(current);
            if (progress < 1) {
                rafId = requestAnimationFrame(tick);
            } else {
                setCount(total);
                setGlitch(true);
                setTimeout(() => setGlitch(false), 250);
            }
        };
        setTimeout(() => { rafId = requestAnimationFrame(tick); }, 300);
        return () => cancelAnimationFrame(rafId);
    }, []);

    const pct = count / 71;
    const dashOffset = CIRCUMFERENCE * (1 - pct);

    return (
        <div className="flex items-center gap-3 mb-1.5">
            <span className="font-body text-[8px] text-brand-red/60 tracking-widest">SIG</span>

            {/* ── Circular SVG dial ── */}
            <div className="relative flex-shrink-0" style={{ width: SIZE, height: SIZE }}>
                <svg
                    width={SIZE}
                    height={SIZE}
                    viewBox={`0 0 ${SIZE} ${SIZE}`}
                    style={{ transform: "rotate(-90deg)" }}
                >
                    {/* Outer rotating track ring */}
                    <circle
                        cx={SIZE / 2}
                        cy={SIZE / 2}
                        r={R}
                        fill="none"
                        stroke="rgba(229,0,0,0.08)"
                        strokeWidth={STROKE}
                    />
                    {/* Thin outer orbit ring with gaps — decorative */}
                    <circle
                        cx={SIZE / 2}
                        cy={SIZE / 2}
                        r={R + 4}
                        fill="none"
                        stroke="rgba(229,0,0,0.15)"
                        strokeWidth={0.5}
                        strokeDasharray="2 6"
                        style={{
                            transformOrigin: `${SIZE / 2}px ${SIZE / 2}px`,
                            animation: "spin 12s linear infinite",
                        }}
                    />
                    {/* Progress arc */}
                    <circle
                        cx={SIZE / 2}
                        cy={SIZE / 2}
                        r={R}
                        fill="none"
                        stroke="#E50000"
                        strokeWidth={STROKE}
                        strokeLinecap="butt"
                        strokeDasharray={`${CIRCUMFERENCE}`}
                        strokeDashoffset={dashOffset}
                        style={{
                            transition: "stroke-dashoffset 0.04s linear",
                            filter: count > 0 ? "drop-shadow(0 0 3px rgba(229,0,0,0.7))" : "none",
                        }}
                    />
                </svg>

                {/* Center text */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{
                        gap: "0px",
                        color: glitch ? "#E50000" : "rgba(255,255,255,0.85)",
                        textShadow: glitch ? "1px 0 0 #00FFFF" : "none",
                        transition: "color 0.05s",
                    }}
                >
                    <span className="font-body tabular-nums" style={{ fontSize: "12px", lineHeight: 1, fontWeight: 700 }}>
                        {count}
                    </span>
                    <span className="font-body" style={{ fontSize: "7px", lineHeight: 1.2, color: "rgba(229,0,0,0.7)" }}>
                        %
                    </span>
                </div>
            </div>
        </div>
    );
}

/* ──────────────────────────────────────────
   Detects if the device is coarse-pointer (touch)
   to disable mouse parallax on mobile/tablet.
────────────────────────────────────────── */
function useIsCoarsePointer() {
    const [coarse, setCoarse] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(pointer: coarse)");
        setCoarse(mq.matches);
        const handler = (e: MediaQueryListEvent) => setCoarse(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);
    return coarse;
}

/* ──────────────────────────────────────────
   Hero Component
────────────────────────────────────────── */
export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const isCoarsePointer = useIsCoarsePointer();

    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const spring = { damping: 22, stiffness: 90, mass: 0.6 };
    // Parallax values — clamped to 0 on touch devices
    const skullX = useSpring(useTransform(mouseX, [-0.5, 0.5], isCoarsePointer ? [0, 0] : [-25, 25]), spring);
    const skullYm = useSpring(useTransform(mouseY, [-0.5, 0.5], isCoarsePointer ? [0, 0] : [-20, 20]), spring);
    const logoX = useSpring(useTransform(mouseX, [-0.5, 0.5], isCoarsePointer ? [0, 0] : [-12, 12]), spring);
    const logoYm = useSpring(useTransform(mouseY, [-0.5, 0.5], isCoarsePointer ? [0, 0] : [-10, 10]), spring);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isCoarsePointer || !containerRef.current) return;
        const r = containerRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - r.left) / r.width - 0.5);
        mouseY.set((e.clientY - r.top) / r.height - 0.5);
    };
    const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

    return (
        <section
            ref={containerRef}
            id="inicio"
            /* Use 100svh for mobile (accounts for iOS bottom bar) */
            className="w-full sticky top-0 z-10 overflow-hidden"
            style={{
                backgroundColor: "#050505",
                perspective: 1200,
                height: "100svh",
                minHeight: "100dvh",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* ════════════ CROP MARKS ════════════ */}
            {/* Only show full crop marks on sm+ screens */}
            <div className="absolute top-4 left-4 z-50 pointer-events-none opacity-40">
                <div className="absolute top-0 left-0 w-5 h-px bg-brand-red" />
                <div className="absolute top-0 left-0 w-px h-5 bg-brand-red" />
                <span className="absolute top-2.5 left-2.5 font-body text-[6px] text-brand-red tracking-widest hidden sm:block">38.4N // 28.7W</span>
            </div>
            <div className="absolute top-4 right-4 z-50 pointer-events-none opacity-40 text-right">
                <div className="absolute top-0 right-0 w-5 h-px bg-silver-dim" />
                <div className="absolute top-0 right-0 w-px h-5 bg-silver-dim" />
                <span className="absolute top-2.5 right-2.5 font-body text-[6px] text-silver-dim tracking-widest hidden sm:block">SYS.ID: KZ-2026</span>
            </div>
            <div className="absolute bottom-6 right-4 z-50 pointer-events-none opacity-40 text-right hidden sm:block">
                <div className="absolute bottom-0 right-0 w-5 h-px bg-brand-red" />
                <div className="absolute bottom-0 right-0 w-px h-5 bg-brand-red" />
                <span className="absolute bottom-2.5 right-2.5 font-body text-[6px] text-brand-red tracking-widest">クロモ // v.01</span>
            </div>

            {/* ════════════ BASE BG — noise grain ════════════ */}
            <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY, backgroundColor: "#050505" }}>
                <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')",
                        backgroundSize: "300px 300px"
                    }}
                />
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, transparent 40%, rgba(5,5,5,0.7) 100%)" }} />
            </motion.div>

            {/* ════════════ LAYER 1: SKULL ════════════ */}
            {/*
              MOBILE:  Centered, fills ~100% vw, opacity-20 → pure texture/atmosphere
              DESKTOP: Massive bleed off right+top, opacity-45, luminosity blend
            */}
            <motion.div
                className="absolute z-[10] pointer-events-none"
                style={{
                    // Mobile: centered texture
                    inset: 0,
                    x: skullX,
                    y: skullYm
                }}
            >
                {/* Mobile skull — centered, faded, texture-only */}
                <div className="absolute inset-0 md:hidden flex items-center justify-center">
                    <div className="relative w-full h-full">
                        <Image
                            src="/mask.jpg"
                            alt=""
                            fill
                            priority
                            className="object-cover object-center"
                            style={{ opacity: 0.18, filter: "brightness(0.6) contrast(1.2)" }}
                        />
                        {/* Full screen fade so it's pure atmosphere */}
                        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(5,5,5,0) 30%, rgba(5,5,5,0.9) 80%)" }} />
                    </div>
                </div>

                {/* Desktop skull — asymmetric bleed right+top */}
                <div
                    className="absolute hidden md:block"
                    style={{ right: "-5%", top: "-5%", width: "70vw", height: "115vh" }}
                >
                    <Image
                        src="/mask.jpg"
                        alt=""
                        fill
                        priority
                        className="object-cover"
                        style={{
                            objectPosition: "center 30%",   /* Reveal the face more */
                            opacity: 0.50,
                            mixBlendMode: "luminosity",
                            filter: "brightness(0.85) contrast(1.15)"
                        }}
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #050505 0%, rgba(5,5,5,0.5) 30%, transparent 65%)" }} />
                    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 75% 30%, rgba(229,0,0,0.14) 0%, transparent 55%)" }} />
                </div>
            </motion.div>

            {/* ════════════ LAYER 2: cromo LETTERING ════════════ */}
            {/*
              MOBILE:  Centered, w-[82vw], vertically positioned at ~22% from top
              DESKTOP: Left-aligned at 6vw, top 14%
            */}
            <motion.div
                className="absolute top-[55%] left-1/2 md:left-[30%] -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[75vw] max-w-4xl z-[25] pointer-events-none"
                style={{ x: logoX, y: logoYm }}
                initial={{ opacity: 0, y: -20, filter: "blur(20px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
                <CromoLettering
                    src="/assets/cromo-lettering.png"
                    className="animate-metal-shimmer block"
                    style={{
                        width: "100%",
                        height: "auto",
                        filter: "drop-shadow(0 0 22px rgba(229,0,0,0.4)) drop-shadow(0 0 55px rgba(220,220,220,0.08))"
                    }}
                />
            </motion.div>

            {/* ════════════ LAYER 3: HUD — countdown + CTA ════════════ */}
            {/*
              MOBILE:  Centered, anchored to bottom with pb-safe-area
              DESKTOP: Bottom-left at 6vw
            */}
            <motion.div
                className="absolute z-[30]
                           bottom-6 left-1/2 -translate-x-1/2 w-[88vw] max-w-xs
                           md:bottom-10 md:left-[6vw] md:translate-x-0 md:w-auto md:max-w-none"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="relative pl-3 border-l border-brand-red/50">
                    {/* Top HUD bar */}
                    <div className="absolute -top-1 left-0 w-full h-px bg-gradient-to-r from-brand-red/60 via-brand-red/20 to-transparent" />
                    
                    {/* Vertical Scanline */}
                    <div className="animate-scanline overflow-hidden rounded-md" />

                    {/* Sys header — hidden on smallest screens to save space */}
                    <p className="font-body text-[8px] tracking-[0.35em] text-silver-dim/60 uppercase mb-1 hidden xs:block">
                        // OBFUSCATED ORIGIN // DOBLE KAOZ SYSTEM // システム異常
                    </p>

                    {/* Progress / signal bar — animated on mount */}
                    <HudSignalBar />

                    {/* Countdown */}
                    <Countdown />

                    {/* Secondary HUD line */}
                    <p className="font-body text-[7px] tracking-[0.3em] text-silver-dim/40 mt-1 uppercase hidden sm:block">
                        FASE_01 // LAT: 18.47N // CROMO COLLECTION 2026
                    </p>

                    {/* CTA BUTTON */}
                    <div className="mt-4 mb-2">
                        <Link href="#lookbook" className="group inline-flex items-center justify-start">
                            <button
                                className="relative bg-transparent border border-brand-red/50 hover:border-brand-red hover:bg-brand-red/10 transition-all duration-300 overflow-hidden"
                                style={{
                                    minWidth: "220px",
                                    height: "38px",
                                    padding: "0 18px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    gap: "8px",
                                }}
                            >
                                {/* Left accent bar */}
                                <span
                                    className="shrink-0 bg-brand-red"
                                    style={{ width: "3px", height: "14px", display: "block" }}
                                    aria-hidden="true"
                                />
                                {/* Scanline fill on hover */}
                                <span className="absolute inset-0 bg-brand-red/10 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                                {/* Text */}
                                <span
                                    className="relative z-10 font-body text-brand-red tracking-[0.22em] text-[11px] uppercase font-bold select-none"
                                    style={{ letterSpacing: "0.22em" }}
                                >
                                    <ScrambleText text="ADQUIRIR ACCESO //" />
                                </span>
                            </button>
                        </Link>
                    </div>

                    {/* Bottom HUD bar */}
                    <div className="absolute -bottom-1 left-0 w-2/3 h-px bg-gradient-to-r from-brand-red/40 to-transparent" />
                </div>
            </motion.div>

            {/* ════════════ SCANLINES ════════════ */}
            <div
                className="pointer-events-none absolute inset-0 z-[35] opacity-[0.18]"
                style={{
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)",
                    backgroundSize: "100% 3px"
                }}
            />
        </section>
    );
}
