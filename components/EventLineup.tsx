"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   MAIN ARTIST CARDS — 3-state machine
   step 0 → front image
   step 1 → stats image
   step 2 → YouTube iframe
───────────────────────────────────────────────────────── */
const MAIN_ARTISTS = [
    {
        id: "1",
        title: "KAOZ_TRANSMISSION_01",
        front: "/lineup_front_01.png",
        stats: "/lineup1stats.png",
        videoId: "rHidPbqdpJs",
    },
    {
        id: "2",
        title: "KAOZ_TRANSMISSION_02",
        front: "/lineup_front_02.png",
        stats: "/lineup2stats.jpeg",
        videoId: "e5k5kUqSgVc",
    },
    {
        id: "3",
        title: "KAOZ_TRANSMISSION_03",
        front: "/lineup_front_03.png",
        stats: "/lineup3stats.png",
        videoId: "h3Eu2Xb63VY",
    },
    {
        id: "4",
        title: "KAOZ_TRANSMISSION_04",
        front: "/lineup_front_04.png",
        stats: "/lineup4stats.png",
        videoId: "lu4s7VT4FmY",
    },
];

/* ─────────────────────────────────────────────────────────
   DJ CARDS — static, no state progression
───────────────────────────────────────────────────────── */
const DJ_DATA = [
    { id: "dj1", src: "/djinfo1.png",  alt: "DJ / Support 01" },
    { id: "dj2", src: "/djinfo2.png",  alt: "DJ / Support 02" },
    { id: "dj3", src: "/djinfo3.jpeg", alt: "DJ / Support 03" },
];

const STEP_LABELS = ["VER STATS →", "VER VIDEO →", "← VOLVER"];

export default function EventLineup() {
    return (
        <section
            id="lineup"
            className="relative bg-[#0A0A0A] overflow-hidden flex flex-col items-center py-24 min-h-[100svh]"
            style={{ zIndex: 30 }}
        >
            {/* ── Background noise grain ── */}
            <div className="absolute inset-0 z-0 bg-[#0A0A0A]">
                <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                        backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.7\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')",
                    }}
                />
            </div>

            {/* ── Feudal Neon Dragon — tamed ── */}
            <div
                className="absolute pointer-events-none"
                style={{
                    bottom: "5%",
                    right: "-8%",
                    width: "min(85vw, 860px)",
                    height: "min(80vh, 750px)",
                    zIndex: 1,
                }}
            >
                {/* Asian typography */}
                <div
                    className="absolute right-[55%] bottom-[20%] text-brand-red animate-feudal-flicker"
                    style={{
                        writingMode: "vertical-rl",
                        textOrientation: "upright",
                        textShadow: "0 0 10px #800000, 0 0 20px rgba(128,0,0,0.6)",
                        mixBlendMode: "lighten",
                        fontSize: "clamp(12px, 2vw, 24px)",
                        letterSpacing: "0.8em",
                        fontFamily: "var(--font-noto-jp), 'Space Mono', monospace",
                    }}
                >
                    クランカオス <span className="text-[10px] tracking-widest mt-4">// システム異常</span>
                </div>

                {/* Dragon image — opacity tamed, softer filter, red glow only */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/dragonchino.png"
                    alt="Feudal Neon Dragon"
                    className="animate-neon-flicker"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        objectPosition: "right bottom",
                        mixBlendMode: "screen",
                        opacity: 0.35,
                        filter:
                            "brightness(0) saturate(100%) invert(18%) sepia(88%) saturate(7483%) hue-rotate(352deg) drop-shadow(0 0 12px #800000) drop-shadow(0 0 28px rgba(128,0,0,0.55))",
                    }}
                />
            </div>

            {/* ── Section header ── */}
            <div className="absolute top-6 left-0 w-full px-4 sm:px-8 flex items-center justify-between pointer-events-none" style={{ zIndex: 20 }}>
                <div className="border-l border-brand-red/60 pl-3">
                    <p className="font-body text-[8px] tracking-[0.4em] sm:tracking-[0.5em] text-brand-red/70 uppercase">// SEC: ITINERARY</p>
                    <p className="font-body text-[7px] tracking-[0.3em] sm:tracking-[0.5em] text-silver-dim/40 uppercase hidden xs:block">// ACT: TRANSMISIONES</p>
                </div>
                <p className="font-body text-[7px] tracking-[0.3em] text-silver-dim/30 uppercase hidden sm:block">SYS.ID: KZ-LINEUP-2026</p>
            </div>

            {/* ── MAIN TITLE ── */}
            <motion.div
                className="flex flex-col items-center justify-center mb-16 w-full px-4"
                style={{ position: "relative", zIndex: 20 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2
                    className="text-center select-none tracking-[0.22em] uppercase"
                    style={{
                        fontFamily: "var(--font-orbitron), 'Bebas Neue', sans-serif",
                        fontSize: "clamp(3rem, 9vw, 8rem)",
                        fontWeight: 900,
                        color: "#E50000",
                        textShadow: "0 0 40px rgba(128,0,0,0.7), 0 0 80px rgba(128,0,0,0.3), 0 0 2px rgba(229,0,0,0.9)",
                        letterSpacing: "0.22em",
                    }}
                >
                    LINEUP
                </h2>
                <p className="text-[9px] font-mono text-silver-dim/30 tracking-[0.5em] uppercase mt-2">
                    // TRANSMISIONES ACTIVAS // KZ-2026
                </p>
            </motion.div>

            {/* ════════════════════════════════════════════════
                UNIFIED GRID — Main Artists (4) + DJs (3) = 7 cards
                On small screens: 1 col; md: 2 cols; lg: 3 cols
            ════════════════════════════════════════════════ */}
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full max-w-7xl mx-auto px-6 sm:px-12"
                style={{ position: "relative", zIndex: 20 }}
            >
                {/* ── Main Artist Cards (3-state) ── */}
                {MAIN_ARTISTS.map((item, index) => (
                    <ArtistCard key={item.id} item={item} index={index} />
                ))}

                {/* ── DJ Heading spanning full width ── */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex items-center gap-4 mt-6">
                    <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(229,0,0,0.3), transparent)" }} />
                    <p className="font-mono text-[9px] tracking-[0.45em] uppercase text-brand-red/70 whitespace-nowrap">
                        // DJS &amp; SUPPORT //
                    </p>
                    <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, rgba(229,0,0,0.3), transparent)" }} />
                </div>

                {/* ── DJ Cards (static, 1 state) ─ safely protected from section fade mask ── */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 relative z-30 opacity-100">
                    {DJ_DATA.map((dj, i) => (
                        <DJCard key={dj.id} dj={dj} index={i} />
                    ))}
                </div>
            </div>

            {/* ── Safari Disco Location HUD ── */}
            <LocationHUD />

            {/* Corner decoration */}
            <div className="absolute bottom-5 right-5 pointer-events-none opacity-30 hidden sm:block" style={{ zIndex: 10 }}>
                <div className="absolute bottom-0 right-0 w-5 h-px bg-brand-red" />
                <div className="absolute bottom-0 right-0 w-px h-5 bg-brand-red" />
                <span className="absolute bottom-2.5 right-2.5 font-body text-[7px] text-brand-red tracking-widest">--- CORTE ---</span>
            </div>
        </section>
    );
}

/* ──────────────────────────────────────────
   MAIN ARTIST CARD — 3-state with dynamic aspect ratio
   step 0 / 1 → portrait (aspect 3/4), object-contain
   step 2      → widescreen (aspect 16/9), iframe
────────────────────────────────────────── */
function ArtistCard({ item, index }: { item: typeof MAIN_ARTISTS[0]; index: number }) {
    const [step, setStep] = useState(0);

    const advance = () => setStep(s => (s + 1) % 3);

    // Dynamic aspect ratio based on step
    const isVideo  = step === 2;
    const aspectStyle: React.CSSProperties = {
        aspectRatio: isVideo ? "16 / 9" : "3 / 4",
        transition: "aspect-ratio 0s",   // aspect-ratio can't animate in CSS — we morph width instead
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            /* overflow-hidden so the border is clipped cleanly */
            className="relative w-full overflow-hidden cursor-pointer select-none transition-all duration-500"
            style={{
                ...aspectStyle,
                background: "rgba(5,5,5,0.80)",
                // Wider when video is active — expand to fill two columns on lg when video
                ...(isVideo ? { gridColumn: "span 2" } : {}),
            }}
            onClick={advance}
        >
            {/* Outer border frame */}
            <div className="absolute inset-0 border border-brand-red/30 z-10 pointer-events-none">
                <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-brand-red" />
                <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-brand-red" />
            </div>

            <AnimatePresence mode="wait">
                {/* ── STEP 0: Front image ── */}
                {step === 0 && (
                    <motion.div
                        key="front"
                        className="absolute inset-0 w-full h-full bg-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={item.front}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-contain opacity-80 hover:opacity-95 transition-all duration-500"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/kzev${index}/480/640`;
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        {/* Footer bar */}
                        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 py-2 border-t border-brand-red/20 bg-brand-red/5 backdrop-blur-sm flex justify-between items-center">
                            <span className="font-mono text-[9px] text-silver-dim tracking-widest uppercase">{item.title}</span>
                            <span className="font-mono text-[9px] text-brand-red tracking-widest">// 0{index + 1}</span>
                        </div>
                        {/* Hover hint */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <span className="font-mono text-[10px] text-brand-red tracking-[0.25em] uppercase bg-black/70 px-3 py-1 border border-brand-red/40">
                                {STEP_LABELS[0]}
                            </span>
                        </div>
                    </motion.div>
                )}

                {/* ── STEP 1: Stats image ── */}
                {step === 1 && (
                    <motion.div
                        key="stats"
                        className="absolute inset-0 w-full h-full bg-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={item.stats}
                            alt={`${item.title} stats`}
                            className="absolute inset-0 w-full h-full object-contain"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/kzst${index}/480/640`;
                            }}
                        />
                        {/* Scanline veil */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-10"
                            style={{
                                backgroundImage: "repeating-linear-gradient(transparent, transparent 1px, rgba(0,0,0,0.4) 1px, rgba(0,0,0,0.4) 2px)",
                                backgroundSize: "100% 3px",
                            }}
                        />
                        {/* Hover hint */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <span className="font-mono text-[10px] text-brand-red tracking-[0.25em] uppercase bg-black/70 px-3 py-1 border border-brand-red/40">
                                {STEP_LABELS[1]}
                            </span>
                        </div>
                        {/* Footer bar */}
                        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 py-2 border-t border-brand-red/40 bg-black/70 backdrop-blur-sm flex justify-between items-center">
                            <span className="font-mono text-[9px] text-brand-red tracking-widest uppercase">STATS // 0{index + 1}</span>
                            <span className="font-mono text-[9px] text-silver-dim/50 tracking-widest">CROMO 2026</span>
                        </div>
                    </motion.div>
                )}

                {/* ── STEP 2: YouTube iframe (widescreen) ── */}
                {step === 2 && (
                    <motion.div
                        key="video"
                        className="absolute inset-0 w-full h-full bg-[#050505] border border-brand-red/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                    >
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${item.videoId}?controls=1&rel=0&showinfo=0&modestbranding=1&autoplay=1`}
                            title={item.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                        />
                        {/* Thin top bar to close video */}
                        <div
                            className="absolute top-0 left-0 right-0 h-6 z-20 cursor-pointer flex items-center px-2 gap-1"
                            style={{ background: "rgba(5,5,5,0.7)" }}
                            onClick={(e) => { e.stopPropagation(); setStep(0); }}
                        >
                            <span className="font-mono text-[8px] text-brand-red tracking-[0.25em] uppercase">← CERRAR</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ──────────────────────────────────────────
   DJ CARD — static (1 state, no interaction)
────────────────────────────────────────── */
function DJCard({ dj, index }: { dj: typeof DJ_DATA[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="relative w-full overflow-hidden"
            style={{
                border: "1px solid rgba(229,0,0,0.2)",
                background: "rgba(5,5,5,0.80)",
            }}
        >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-red/60 z-10" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-red/60 z-10" />

            {/* DJ Info image — natural height, no cropping */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={dj.src}
                alt={dj.alt}
                className="w-full h-auto block"
                style={{ display: "block" }}
                onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = "none";
                    (el.parentElement as HTMLElement).style.minHeight = "120px";
                    (el.parentElement as HTMLElement).style.background = "rgba(229,0,0,0.04)";
                }}
            />

            {/* Bottom technical label */}
            <div
                className="absolute bottom-0 left-0 right-0 px-3 py-1.5 flex justify-between items-center"
                style={{ background: "linear-gradient(to top, rgba(5,5,5,0.95), transparent)" }}
            >
                <span className="font-mono text-[8px] text-brand-red/70 tracking-[0.3em] uppercase">
                    DJ_0{index + 1}
                </span>
                <span className="font-mono text-[7px] text-silver-dim/30 tracking-widest">
                    // KZ-2026
                </span>
            </div>
        </motion.div>
    );
}

/* ──────────────────────────────────────────
   Safari Disco Location HUD
────────────────────────────────────────── */
function LocationHUD() {
    return (
        <div
            className="absolute bottom-6 left-4 sm:bottom-8 sm:left-6 pointer-events-none"
            style={{
                zIndex: 30,
                background: "rgba(5, 5, 5, 0.78)",
                border: "1px solid #800000",
                padding: "6px 10px",
                backdropFilter: "blur(4px)",
                maxWidth: "calc(100vw - 32px)",
            }}
        >
            <div
                className="absolute top-0 left-0 w-full h-px"
                style={{ background: "linear-gradient(to right, #800000, transparent)" }}
            />
            <div className="flex items-center gap-1.5">
                <span
                    className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{
                        background: "#E50000",
                        boxShadow: "0 0 4px #E50000",
                        animation: "hud-bloom 1.8s ease-in-out infinite",
                    }}
                />
                <p
                    className="font-mono text-[8px] sm:text-[9px] tracking-[0.22em] uppercase whitespace-nowrap"
                    style={{ color: "rgba(229, 0, 0, 0.85)" }}
                >
                    LOC_DATA: SAFARI DISCO //
                </p>
            </div>
            <p
                className="font-mono text-[7px] tracking-[0.2em] uppercase mt-0.5"
                style={{ color: "rgba(229, 0, 0, 0.4)" }}
            >
                // SYS: GEOTRACK ACTIVO
            </p>
        </div>
    );
}
