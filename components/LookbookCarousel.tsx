"use client";

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/* ─── Nomenclature: lb-01 through lb-06 ─── */
const lookbookImages = [
    '/carousel/lb-01.jpg',
    '/carousel/lb-02.jpg',
    '/carousel/lb-03.jpg',
    '/carousel/lb-04.jpg',
    '/carousel/lb-05.jpg',
    '/carousel/lb-06.jpg',
];

const ITEM_WIDTH = 220;   // px
const ITEM_GAP = 32;      // px (gap-8)

/* ──────────────────────────────────────────
   Industrial Hanger Item
────────────────────────────────────────── */
function HangerItem({ src, index, isActive, onActivate }: {
    src: string;
    index: number;
    isActive: boolean;
    onActivate: () => void;
}) {
    const label = `KZ-0${index + 1}`;

    return (
        <div
            className="group relative flex-shrink-0 flex flex-col items-center cursor-pointer"
            style={{
                width: `${ITEM_WIDTH}px`,
                scrollSnapAlign: "center",
            }}
            onClick={onActivate}
            onTouchStart={onActivate}
        >
            {/* ── Hanger hook wire ── */}
            <div className="relative flex flex-col items-center" style={{ height: "42px" }}>
                <div className="w-px bg-gradient-to-b from-[#888] to-[#555]" style={{ height: "28px" }} />
                <svg width="36" height="20" viewBox="0 0 36 20" fill="none" className="absolute bottom-0">
                    <polyline
                        points="18,2 1,18 35,18"
                        stroke="#777"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                        fill="none"
                    />
                    <path d="M18 2 C18 2 18 0 16 0 C14 0 13 1.5 14 2.5" stroke="#888" strokeWidth="1.2" fill="none" />
                </svg>
            </div>

            {/* ── Garment image card ── */}
            <div
                className="relative overflow-hidden border border-brand-red/20 group-hover:border-brand-red/60 transition-all duration-500"
                style={{ width: `${ITEM_WIDTH}px`, height: "300px" }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src}
                    alt={`Lookbook ${label}`}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    style={{
                        filter: "invert(1) brightness(0.85)",
                        mixBlendMode: "screen",
                    }}
                    onError={(e) => {
                        // Graceful fallback to picsum if local file missing
                        (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/kaoz${index + 1}/800/1200`;
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Corner indicators */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Index tag */}
                <div className="absolute bottom-2 left-2 font-mono text-[8px] text-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 px-1">
                    {label}
                </div>
            </div>

            {/* ── Hover/Tap label: [ VER DETALLES ] ── */}
            <div
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{
                    maxHeight: isActive ? "28px" : "0px",
                    opacity: isActive ? 1 : 0,
                }}
            >
                <div className="mt-1.5 font-mono text-[9px] text-brand-red tracking-[0.25em] uppercase border border-brand-red/40 px-2 py-0.5 bg-black/80 whitespace-nowrap">
                    [ VER DETALLES ]
                </div>
            </div>

            {/* Size/ID tag — always visible */}
            <div className="mt-1 font-mono text-[8px] text-silver-dim/30 tracking-widest uppercase">
                {label} // CROMO
            </div>
        </div>
    );
}

/* ──────────────────────────────────────────
   Tactical arrow button — solid, always visible
────────────────────────────────────────── */
function NavArrow({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            aria-label={dir === "left" ? "Anterior" : "Siguiente"}
            className={`
                flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12
                flex items-center justify-center
                border border-brand-red bg-black/90
                font-mono text-brand-red text-lg font-bold
                transition-all duration-200
                hover:bg-brand-red hover:text-black
                active:scale-95
                z-20
            `}
        >
            {dir === "left" ? "<" : ">"}
        </button>
    );
}

export default function LookbookCarousel() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollBy = useCallback((dir: "left" | "right") => {
        const el = scrollRef.current;
        if (!el) return;
        const delta = (ITEM_WIDTH + ITEM_GAP) * (dir === "right" ? 1 : -1);
        el.scrollBy({ left: delta, behavior: "smooth" });
    }, []);

    const handleActivate = (index: number) => {
        setActiveIndex(prev => prev === index ? null : index);
    };

    return (
        <section
            id="lookbook"
            className="relative w-full z-20 bg-[#050505] pt-24 pb-24 overflow-hidden flex flex-col justify-center min-h-[100svh] section-fade-mask"
        >
            {/* ── Vertical Japanese Marquee — far-left margin ── */}
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '32px',
                    zIndex: 0,
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRight: '1px solid rgba(229,0,0,0.1)'
                }}
            >
                <motion.div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.6em',
                        opacity: 0.25,
                        fontFamily: "'Noto Sans JP', 'Space Mono', monospace",
                        fontSize: '11px',
                        letterSpacing: '0.15em',
                        color: 'rgba(229,0,0,0.85)',
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        whiteSpace: 'nowrap',
                        userSelect: 'none',
                    }}
                    animate={{ y: ['0%', '-50%'] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                >
                    {Array.from({ length: 16 }).map((_, i) => (
                        <span key={i} style={{ display: 'block' }}>混沌</span>
                    ))}
                </motion.div>
            </div>

            {/* Tech UI Decorators */}
            <div className="absolute top-8 left-12 font-mono text-[10px] text-brand-red opacity-50 hidden md:block">
                {'// SYS.OP: RACK_DISPLAY'}<br />
                {'LAT: 40.7128° N, LNG: 74.0060° W'}
            </div>
            <div className="absolute top-8 right-8 text-silver-dim/20 font-mono text-xs tracking-[0.2em] hidden sm:block">
                --- COLECCION_CROMO ---
            </div>

            {/* ── SECTION HEADING ── */}
            <motion.div
                className="w-full relative z-10 mx-auto px-4 sm:px-12 flex flex-col items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.75, ease: "easeOut" }}
            >
                <h2
                    className="text-center mb-4 select-none tracking-[0.18em] uppercase animate-cyber-glitch"
                    style={{
                        fontFamily: "var(--font-orbitron), 'Bebas Neue', sans-serif",
                        fontSize: "clamp(2.8rem, 8vw, 7rem)",
                        fontWeight: 900,
                        color: "#E50000",
                        textShadow: "0 0 30px rgba(229,0,0,0.5), 0 0 60px rgba(229,0,0,0.2)",
                        letterSpacing: "0.18em",
                    }}
                >
                    LOOKBOOK
                </h2>
                <p className="text-[9px] font-mono text-silver-dim/30 tracking-[0.5em] uppercase mb-8">
                    // CROMO COLLECTION 2026 // 6 PIECES
                </p>

                {/* ═══════════════════════════════════════════
                    INDUSTRIAL HANGER RACK CAROUSEL
                ═══════════════════════════════════════════ */}
                <div className="relative w-full max-w-7xl mx-auto">

                    {/* Top pipe — continuous horizontal metal bar */}
                    <div className="w-full relative" style={{ height: "6px", marginBottom: "0" }}>
                        <div
                            className="absolute inset-0"
                            style={{
                                background: "linear-gradient(to bottom, #aaa 0%, #555 40%, #888 70%, #333 100%)",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.8), 0 -1px 2px rgba(255,255,255,0.08)",
                            }}
                        />
                        <div className="absolute left-0 top-0 w-3 h-full rounded-l-full" style={{ background: "#666" }} />
                        <div className="absolute right-0 top-0 w-3 h-full rounded-r-full" style={{ background: "#444" }} />
                        <div className="absolute top-px left-2 right-2 h-px opacity-30" style={{ background: "rgba(255,255,255,0.5)" }} />
                        <div
                            className="absolute inset-0"
                            style={{ boxShadow: "0 0 12px rgba(229,0,0,0.25)", borderTop: "1px solid rgba(229,0,0,0.2)" }}
                        />
                    </div>

                    {/* ── Row: arrow + scroll track + arrow ── */}
                    <div className="flex items-center gap-2 sm:gap-3 mt-0">

                        {/* LEFT arrow — solid, always visible */}
                        <NavArrow dir="left" onClick={() => scrollBy("left")} />

                        {/* ── Scrollable item track with snap ── */}
                        <div
                            ref={scrollRef}
                            className="flex gap-8 overflow-x-auto pb-6 pt-0 flex-1"
                            style={{
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                                WebkitOverflowScrolling: "touch",
                                scrollSnapType: "x mandatory",
                                paddingLeft: "4px",
                                paddingRight: "4px",
                                cursor: "grab",
                            }}
                        >
                            {lookbookImages.map((src, index) => (
                                <HangerItem
                                    key={src}
                                    src={src}
                                    index={index}
                                    isActive={activeIndex === index}
                                    onActivate={() => handleActivate(index)}
                                />
                            ))}
                        </div>

                        {/* RIGHT arrow — solid, always visible */}
                        <NavArrow dir="right" onClick={() => scrollBy("right")} />
                    </div>

                    {/* Scroll hint */}
                    <p className="text-center font-mono text-[8px] text-silver-dim/20 tracking-[0.4em] uppercase mt-2">
                        ← DESLIZAR →
                    </p>
                </div>
            </motion.div>

            {/* LIGHTBOX MODAL */}
            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-pointer touch-none"
                        onClick={() => setSelectedImg(null)}
                    >
                        <div className="absolute top-6 right-6 font-mono text-brand-red text-sm flex items-center gap-2 border border-brand-red/30 px-3 py-1 hover:bg-brand-red/10 transition-colors">
                            <span>[CERRAR]</span>
                        </div>
                        <motion.div
                            className="relative w-full h-full max-w-3xl max-h-[88vh] border border-brand-red/20 shadow-[0_0_50px_rgba(229,0,0,0.15)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={selectedImg}
                                alt="Lookbook Expanded"
                                className="w-full h-full object-contain"
                                style={{ filter: "invert(1)", mixBlendMode: "screen" }}
                            />
                            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-brand-red" />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-brand-red" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
