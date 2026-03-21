"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Text Scramble Hook tailored for terminal interactions.
 */
function useTerminalScramble(text: string, trigger: any) {
    const [display, setDisplay] = useState(text);
    useEffect(() => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#&*<>{}[]";
        let step = 0;
        const TOTAL = 8;
        const iv = setInterval(() => {
            step++;
            setDisplay(
                text
                    .split("")
                    .map((char) => {
                        if (char === " ") return " ";
                        return Math.random() > step / TOTAL
                            ? chars[Math.floor(Math.random() * chars.length)]
                            : char;
                    })
                    .join("")
            );
            if (step >= TOTAL) clearInterval(iv);
        }, 40);
        return () => clearInterval(iv);
    }, [text, trigger]);
    return display;
}

// Fixed external image paths
const MAIN_FALLBACK = "/portadagaleria.jpg";
const GALLERY_MODULES = [
    "/galeria1.jpeg",
    "/galeria2.jpeg",
    "/galeria3.jpg",
    "/galeria4.jpg",
    "/galeria5.jpg",
    "/galeria6.jpg",
    "/galeria7.jpg",
    "/galeria9.jpg",
    "/galeria10.jpg",
];

// Fallback image generator to ensure aspect ratios aren't broken if assets are missing
const extractFilename = (path: string) => path.split("/").pop() || "asset";
const getFallback = (index: number) => `https://picsum.photos/seed/kzgal${index}/800/1200`;
const getMainFallback = () => `https://picsum.photos/seed/kz_portada/1200/800`;

export default function LookbookCarousel() {
    const [activeImg, setActiveImg] = useState<string>(MAIN_FALLBACK);
    const [scrambleTrigger, setScrambleTrigger] = useState(0);

    const handleModuleSelect = (src: string) => {
        if (activeImg === src) return;
        setActiveImg(src);
        setScrambleTrigger((t) => t + 1);
    };

    const sysStatus = useTerminalScramble("// SYS.STATUS: ONLINE", scrambleTrigger);
    const activeDataTag = useTerminalScramble(`[ ACTIVE_DATA_BLOCK: ${extractFilename(activeImg)} ]`, scrambleTrigger);

    return (
        <section
            id="galeria"
            className="relative w-full z-20 bg-[#050505] pt-24 pb-24 overflow-hidden flex flex-col items-center min-h-[100svh] section-fade-mask"
        >
            {/* Tech UI Decorators */}
            <div className="absolute top-8 left-12 font-mono text-[10px] text-brand-red opacity-50 hidden md:block select-none pointer-events-none">
                {sysStatus}
                <br />
                {"LAT: 40.7128 N, LNG: 74.0060 W"}
            </div>
            <div className="absolute top-8 right-8 text-silver-dim/20 font-mono text-xs tracking-[0.2em] hidden sm:block select-none pointer-events-none">
                --- ARCHIVO_CONFIDENCIAL ---
            </div>

            {/* SECTION HEADING (CRITICAL OVERRIDE) */}
            <motion.div
                className="w-full relative z-10 px-4 sm:px-8 xl:px-12 flex flex-col items-center mb-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.75, ease: "easeOut" }}
            >
                <h2
                    className="text-center mb-2 select-none tracking-[0.18em] uppercase animate-cyber-glitch"
                    style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "clamp(2rem, 5vw, 4rem)",
                        fontWeight: 900,
                        color: "#E50000",
                        textShadow: "0 0 20px rgba(229,0,0,0.6), 0 0 40px rgba(229,0,0,0.3)",
                        letterSpacing: "0.15em",
                    }}
                >
                    GALERÍA DEL KAOZ
                </h2>
                <p className="text-[10px] font-mono text-brand-red/60 tracking-[0.3em] uppercase max-w-2xl text-center">
                    // ACCESO A TERMINAL VISUAL // {GALLERY_MODULES.length} MODULOS DE DATA //
                </p>
            </motion.div>

            {/* VISUAL DATA STREAM TERMINAL INTERFACE */}
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 z-10 flex flex-col lg:flex-row gap-6">
                
                {/* ── 1. MAIN VIEWPORT (LEFT) ── */}
                <div className="w-full lg:w-[65%] flex flex-col gap-2">
                    {/* Viewport Header */}
                    <div className="flex justify-between items-end border-b border-brand-red/30 pb-2 px-1">
                        <span className="font-mono text-[10px] text-brand-red tracking-widest uppercase">
                            {activeDataTag}
                        </span>
                        <span className="font-mono text-[10px] text-brand-red/50 tracking-widest animate-pulse">
                            [ REC ]
                        </span>
                    </div>

                    {/* Image Container */}
                    <div className="relative w-full aspect-[4/3] lg:aspect-video bg-[#0a0a0a] border border-brand-red/40 flex items-center justify-center overflow-hidden group">
                        
                        {/* Abstract Terminal Scramble Edge Glow */}
                        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(229,0,0,0.15)] z-10" />
                        
                        {/* CRT Scanlines Overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none z-20"
                            style={{
                                backgroundImage: "repeating-linear-gradient(transparent, transparent 1px, rgba(0,0,0,0.2) 1px, rgba(0,0,0,0.2) 2px)",
                                backgroundSize: "100% 3px",
                            }}
                        />

                        {/* Image Implementation — object-contain ensures dynamic aspect ratio without clipping */}
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeImg}
                                src={activeImg}
                                alt={`Main Data Block ${extractFilename(activeImg)}`}
                                initial={{ opacity: 0, scale: 1.05, filter: "brightness(2) contrast(1.5) hue-rotate(90deg)" }}
                                animate={{ opacity: 1, scale: 1, filter: "brightness(1) contrast(1.1) hue-rotate(0deg)" }}
                                exit={{ opacity: 0, scale: 0.95, filter: "brightness(0) contrast(2)" }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="absolute inset-0 w-full h-full object-contain"
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src = activeImg === MAIN_FALLBACK ? getMainFallback() : getFallback(Math.floor(Math.random() * 9));
                                }}
                            />
                        </AnimatePresence>

                        {/* UI Borders Flickering overlay */}
                        <div className="absolute inset-0 border-[3px] border-brand-red/20 pointer-events-none mix-blend-screen opacity-50" />
                        
                        {/* Corner Brackets */}
                        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-brand-red z-30 pointer-events-none" />
                        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-brand-red z-30 pointer-events-none" />
                    </div>
                    
                    {/* Viewport Footer */}
                    <div className="flex px-1 pt-1 justify-between">
                        <div className="font-mono text-[9px] text-silver-dim/40 tracking-[0.2em]">
                            VDS_STREAM_{scrambleTrigger.toString().padStart(4, "0")}
                        </div>
                        <div className="font-mono text-[9px] text-brand-red/40 tracking-[0.2em]">
                            _ROOT/ASSETS/
                        </div>
                    </div>
                </div>

                {/* ── 2. DATA MODULES GRID (RIGHT) ── */}
                <div className="w-full lg:w-[35%] flex flex-col gap-2 mt-6 lg:mt-0">
                    
                    {/* Grid Header */}
                    <div className="flex justify-between items-end border-b border-brand-red/30 pb-2 px-1">
                        <span className="font-mono text-[10px] text-brand-red tracking-widest uppercase">
                            // 09.MODULOS_DE_EXTRACCION
                        </span>
                    </div>

                    {/* The 3x3 Grid (Responsive) */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
                        {GALLERY_MODULES.map((src, idx) => {
                            const isSelected = activeImg === src;
                            const filename = extractFilename(src);

                            return (
                                <div
                                    key={src}
                                    onClick={() => handleModuleSelect(src)}
                                    className={`relative aspect-square cursor-pointer overflow-hidden transition-all duration-300 ${
                                        isSelected
                                            ? "border-2 border-brand-red bg-brand-red/10 scale-95"
                                            : "border border-brand-red/20 hover:border-brand-red/80 bg-[#080808] hover:bg-brand-red/5"
                                    }`}
                                >
                                    {/* Image Preview - object-cover to fit grid cells perfectly */}
                                    <img
                                        src={src}
                                        alt={`Module ${filename}`}
                                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${
                                            isSelected ? "opacity-100 mix-blend-normal" : "opacity-60 mix-blend-luminosity hover:opacity-100 hover:mix-blend-normal hover:scale-110"
                                        }`}
                                        onError={(e) => {
                                            (e.currentTarget as HTMLImageElement).src = getFallback(idx + 1);
                                        }}
                                    />

                                    {/* Encoded Metadata Superposition Overlay */}
                                    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-1">
                                        <div className="font-mono text-[6px] sm:text-[8px] text-brand-red leading-tight bg-black/60 px-1 inline-block w-fit opacity-80 mix-blend-screen">
                                            {`// MOD_${String(idx + 1).padStart(2, "0")}`}
                                            <br />
                                            {filename}
                                        </div>
                                        <div className="self-end font-mono text-[6px] sm:text-[7px] text-brand-red bg-black/80 px-1 opacity-60">
                                            [ DATA_LINK ]
                                        </div>
                                    </div>

                                    {/* Active State Overlay Indicator */}
                                    {isSelected && (
                                        <div className="absolute inset-0 border-2 border-brand-red pointer-events-none mix-blend-screen shadow-[inset_0_0_10px_rgba(229,0,0,0.8)]" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    
                    {/* Additional terminal filler lines at the bottom of the grid */}
                    <div className="flex-1 mt-4 border border-brand-red/20 bg-black/40 p-3 flex flex-col gap-1 justify-end">
                        <div className="font-mono text-[9px] text-brand-red/40 tracking-[0.1em] font-bold">
                            &gt; AWAITING INPUT...
                        </div>
                        <div className="font-mono text-[8px] text-brand-red/20 tracking-[0.1em] break-all">
                            01001011 01000001 01001111 01011010 00100000 01100011 01101111 01101100 01101100 01100101 01100011 01110100 01101001 01101111 01101110 
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
