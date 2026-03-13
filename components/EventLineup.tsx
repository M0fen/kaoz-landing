"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const YOUTUBE_PLACEHOLDERS = [
    { id: "1", videoId: "jfKfPfyJRdk", title: "KAOZ_TRANSMISSION_01" }, // Lofi girl as placeholder
    { id: "2", videoId: "jfKfPfyJRdk", title: "KAOZ_TRANSMISSION_02" },
    { id: "3", videoId: "jfKfPfyJRdk", title: "KAOZ_TRANSMISSION_03" },
    { id: "4", videoId: "jfKfPfyJRdk", title: "KAOZ_TRANSMISSION_04" },
    { id: "5", videoId: "jfKfPfyJRdk", title: "KAOZ_TRANSMISSION_05" },
    { id: "6", videoId: "jfKfPfyJRdk", title: "KAOZ_TRANSMISSION_06" },
];

export default function EventLineup() {
    return (
        <section
            id="lineup"
            className="relative z-30 bg-[#050505] overflow-hidden flex flex-col items-center py-24 min-h-[100svh]"
        >
            {/* ── Background ── */}
            <div className="absolute inset-0 z-0 bg-[#050505]">
                <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                        backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.7\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black pointer-events-none" />
            </div>

            {/* ── Section header ── */}
            <div className="absolute top-6 left-0 w-full px-4 sm:px-8 z-20 flex items-center justify-between pointer-events-none">
                <div className="border-l border-brand-red/60 pl-3">
                    <p className="font-body text-[8px] tracking-[0.4em] sm:tracking-[0.5em] text-brand-red/70 uppercase">// SEC: ITINERARY</p>
                    <p className="font-body text-[7px] tracking-[0.3em] sm:tracking-[0.5em] text-silver-dim/40 uppercase hidden xs:block">// ACT: TRANSMISIONES</p>
                </div>
                <p className="font-body text-[7px] tracking-[0.3em] text-silver-dim/30 uppercase hidden sm:block">SYS.ID: KZ-LINEUP-2026</p>
            </div>

            {/* ── Dragon — Internal Neon Pulse (no external bleed) ── */}
            <div
                className="absolute z-[1] pointer-events-none"
                style={{
                    bottom: "5%",
                    right: "-8%",
                    width: "min(85vw, 860px)",
                    height: "min(80vh, 750px)",
                }}
            >
                {/* ── Asian Technical Indicator (Broken Neon) ── */}
                <div 
                    className="absolute right-[55%] bottom-[20%] text-brand-red font-mono animate-defective-strobe"
                    style={{
                        writingMode: "vertical-rl",
                        textOrientation: "upright",
                        textShadow: "0 0 10px rgba(229,0,0,0.8), 0 0 20px rgba(229,0,0,0.5)",
                        mixBlendMode: "lighten",
                        fontSize: "clamp(12px, 2vw, 24px)",
                        letterSpacing: "0.8em"
                    }}
                >
                    クランカオス <span className="text-[10px] tracking-widest mt-4">// システム異常</span>
                </div>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/assets/descarga.png"
                    alt="Japanese Neon Dragon"
                    className="animate-defective-strobe"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        objectPosition: "right bottom",
                        mixBlendMode: "screen",
                        filter: "brightness(0) saturate(100%) invert(18%) sepia(88%) saturate(7483%) hue-rotate(352deg) drop-shadow(0 0 10px #FF0000) brightness(1.8) contrast(1.1)"
                    }}
                />
            </div>

            {/* ── MAIN TITLE — Orbitron pure text ── */}
            <motion.div
                className="flex flex-col items-center justify-center mb-16 relative z-20 w-full px-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2
                    className="text-center select-none tracking-[0.18em] uppercase animate-cyber-glitch"
                    style={{
                        fontFamily: "var(--font-orbitron), 'Bebas Neue', sans-serif",
                        fontSize: "clamp(2.8rem, 8vw, 7rem)",
                        fontWeight: 900,
                        color: "#E50000",
                        textShadow: "0 0 30px rgba(229,0,0,0.5), 0 0 60px rgba(229,0,0,0.2)",
                        letterSpacing: "0.18em",
                    }}
                >
                    LINEUP
                </h2>
                <p className="text-[9px] font-mono text-silver-dim/30 tracking-[0.5em] uppercase mt-2">
                    // TRANSMISIONES ACTIVAS // KZ-2026
                </p>
            </motion.div>

            {/* ── 3x2 Grid for YouTube ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl mx-auto z-20 relative px-4 sm:px-12">
                {YOUTUBE_PLACEHOLDERS.map((item, index) => (
                    <FlipCard key={item.id} item={item} index={index} />
                ))}
            </div>

            {/* Corner decoration */}
            <div className="absolute bottom-5 right-5 z-10 pointer-events-none opacity-30 hidden sm:block">
                <div className="absolute bottom-0 right-0 w-5 h-px bg-brand-red" />
                <div className="absolute bottom-0 right-0 w-px h-5 bg-brand-red" />
                <span className="absolute bottom-2.5 right-2.5 font-body text-[7px] text-brand-red tracking-widest">--- CORTE ---</span>
            </div>
        </section>
    );
}

function FlipCard({ item, index }: { item: any, index: number }) {
    const [flipped, setFlipped] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative w-full aspect-video cursor-pointer"
            onClick={() => setFlipped(!flipped)}
            style={{ perspective: 1200 }}
        >
            <motion.div
                className="w-full h-full relative"
                initial={false}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.7, type: "spring", stiffness: 200, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* ── FRONT OF CARD ── */}
                <div
                    className="absolute inset-0 w-full h-full bg-black/60 border border-brand-red/30 flex flex-col justify-end"
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                    <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-80" />
                    
                    {/* Tech Overlays */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-brand-red z-30" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-brand-red z-30" />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                    <div className="relative z-10 p-4 border-t border-brand-red/20 bg-brand-red/5 backdrop-blur-sm flex justify-between items-center group-hover:bg-brand-red/20 transition-colors">
                        <span className="font-mono text-[10px] text-silver-dim tracking-widest uppercase">{item.title}</span>
                        <span className="font-mono text-[10px] text-brand-red tracking-widest font-bold">// 0{index + 1}</span>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-brand-red/80 px-4 py-2 text-black font-body font-bold text-xs uppercase tracking-[0.2em]">
                            ABRIR TRANSMISIÓN
                        </div>
                    </div>
                </div>

                {/* ── BACK OF CARD (YOUTUBE EMBED) ── */}
                <div
                    className="absolute inset-0 w-full h-full bg-[#050505] border border-brand-red/50 pointer-events-auto"
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    {/* Only render iframe when flipped to save initial network requests and avoid playing hidden videos */}
                    {flipped ? (
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
                    ) : (
                        <div className="w-full h-full flex items-center justify-center font-mono text-brand-red text-xs animate-pulse">
                            INICIALIZANDO...
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
