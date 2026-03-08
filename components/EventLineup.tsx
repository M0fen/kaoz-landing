"use client";

import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";

/* ── Card data ─────────────────────────────────────────────────────── */
const CARDS = [
    { id: 1, index: "01", title: "AKIRA", tagline: "LANZAMIENTO EXCLUSIVO", img: "/assets/akira.jpg", classification: "FASE_01" },
    { id: 2, index: "02", title: "JBD / DOGGIE / JIMMY", tagline: "LIVE SETS", img: "/assets/jbd-doggie-jimmy.jpg", classification: "FASE_02" },
    { id: 3, index: "03", title: "DJS + COCTELERÍA PREMIUM", tagline: "ATMÓSFERA & MIXOLOGÍA", img: "/assets/cocteleria.jpg", classification: "FASE_03" },
    { id: 4, index: "04", title: "[ CLASSIFIED ]", tagline: "TBA", img: "/assets/placeholder.jpg", classification: "FASE_??" },
];

export default function EventLineup() {
    const [cards, setCards] = useState(CARDS);

    const handleDragEnd = (
        _: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo,
        cardId: number
    ) => {
        // Lower threshold on touch for snappier feel
        const threshold = info.velocity.x !== 0 ? 60 : 100;
        if (Math.abs(info.offset.x) > threshold || Math.abs(info.velocity.x) > 500) {
            setCards((prev) => prev.filter((c) => c.id !== cardId));
        }
    };

    return (
        <section
            id="lineup"
            className="sticky top-0 z-30 bg-[#050505] overflow-hidden flex flex-col justify-center items-center relative"
            style={{ height: "100svh", minHeight: "100dvh" }}
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
                    <p className="font-body text-[7px] tracking-[0.3em] sm:tracking-[0.5em] text-silver-dim/40 uppercase hidden xs:block">// ACT: DESLIZA LA TARJETA</p>
                </div>
                <p className="font-body text-[7px] tracking-[0.3em] text-silver-dim/30 uppercase hidden sm:block">SYS.ID: KZ-LINEUP-2026</p>
            </div>

            {/* ── Neon Dragon — background atmosphere ── */}
            <div
                className="absolute z-[1] pointer-events-none overflow-hidden"
                style={{
                    /* Spans the lower-right quadrant, slightly bleeds off edges */
                    bottom: "-5%",
                    right: "-8%",
                    width: "min(65vw, 680px)",
                    height: "min(55vh, 480px)",
                    opacity: 0.22,
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/assets/neon-dragon.png"
                    alt=""
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        objectPosition: "right bottom",
                        mixBlendMode: "screen",          /* Black bg becomes invisible */
                        filter: "drop-shadow(0 0 18px rgba(229,0,0,0.6)) drop-shadow(0 0 40px rgba(229,0,0,0.3)) saturate(1.4) brightness(1.2)",
                        animation: "dragon-glow 3s ease-in-out infinite alternate",
                    }}
                />
                {/* Subtle bottom fade so dragon dissolves into floor */}
                <div
                    className="absolute inset-x-0 bottom-0 h-1/3"
                    style={{ background: "linear-gradient(to top, #050505, transparent)" }}
                />
            </div>

            {/* ── Background watermark ── */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.04]">
                <span className="font-gothic text-[22vw] font-black uppercase tracking-tighter leading-none text-white">KAOZ</span>
            </div>

            {/* ── Deck of Cards ──
               Mobile:  w-[90vw] max-w-sm, height 55% of svh
               Desktop: max-w-md, h-[420px]
            */}
            <div className="relative w-[90vw] max-w-sm sm:max-w-md z-30 mt-8 sm:mt-12"
                style={{ height: "min(55svh, 420px)" }}
            >
                <AnimatePresence>
                    {cards.map((card, index) => {
                        const isTop = index === 0;
                        const isClassified = card.title === "[ CLASSIFIED ]";
                        return (
                            <motion.div
                                key={card.id}
                                className="absolute w-full h-full origin-bottom overflow-hidden"
                                style={{
                                    zIndex: CARDS.length - index,
                                    border: "1px solid rgba(229,0,0,0.5)",
                                    boxShadow: isTop
                                        ? "0 16px 50px rgba(229,0,0,0.22), inset 0 0 0 1px rgba(229,0,0,0.06)"
                                        : "0 8px 24px rgba(0,0,0,0.5)",
                                    background: "#080808",
                                    /* Prevent text selection while dragging on mobile */
                                    userSelect: "none",
                                    WebkitUserSelect: "none",
                                    touchAction: isTop ? "none" : "auto",
                                }}
                                animate={{
                                    top: index * 12,
                                    scale: 1 - index * 0.04,
                                    opacity: index < 4 ? 1 - index * 0.15 : 0,
                                }}
                                initial={{ opacity: 0, y: 50, scale: 0.88 }}
                                exit={{
                                    x: isTop ? (Math.random() > 0.5 ? 520 : -520) : 0,
                                    opacity: 0,
                                    rotate: isTop ? (Math.random() > 0.5 ? 18 : -18) : 0,
                                    transition: { duration: 0.3, ease: "easeOut" }
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                /* Touch-optimized drag settings */
                                drag={isTop ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.15}            /* snappy resistance */
                                dragMomentum={true}            /* important for touch flick */
                                onDragEnd={(e, info) =>
                                    handleDragEnd(e as MouseEvent | TouchEvent | PointerEvent, info, card.id)
                                }
                                /* Visual drag feedback */
                                whileDrag={{ cursor: "grabbing", scale: 1.02 }}
                            >
                                {/* Card image — top 55% */}
                                <div className="relative w-full h-[55%] overflow-hidden">
                                    <Image
                                        src={card.img}
                                        alt={card.title}
                                        fill
                                        className="object-cover"
                                        style={{
                                            filter: isClassified
                                                ? "grayscale(1) brightness(0.35)"
                                                : "brightness(0.65) contrast(1.1)",
                                        }}
                                        sizes="(max-width: 640px) 90vw, 448px"
                                        draggable={false}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080808]" />

                                    {/* Classification badge */}
                                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                                        <span className="font-body text-[8px] tracking-[0.35em] text-brand-red uppercase">
                                            {card.classification}
                                        </span>
                                    </div>

                                    {/* Index top-right */}
                                    <div className="absolute top-2.5 right-2.5 font-body text-[8px] text-silver-dim/50 tracking-widest">
                                        [{card.index}/04]
                                    </div>
                                </div>

                                {/* Card text — bottom 45% */}
                                <div className="relative flex flex-col justify-center px-4 sm:px-6 py-3 h-[45%]">
                                    <div className="w-full h-px bg-gradient-to-r from-brand-red/70 via-brand-red/30 to-transparent mb-2" />

                                    <p className="font-body text-[8px] tracking-[0.4em] text-brand-red/80 uppercase mb-1">
                                        {card.tagline}
                                    </p>
                                    <h3 className={`font-body font-bold uppercase leading-tight ${isClassified
                                        ? "text-silver-dim/40 text-lg tracking-[0.3em]"
                                        : "text-white text-lg sm:text-xl tracking-wide"
                                        }`}>
                                        {card.title}
                                    </h3>

                                    {/* Swipe hint on top card */}
                                    {isTop && (
                                        <div className="absolute bottom-3 right-4 font-body text-[8px] text-silver-dim/35 tracking-widest animate-pulse">
                                            DESLIZA &rarr;
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}

                    {cards.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="absolute inset-0 flex flex-col items-center justify-center font-body text-brand-red text-xl uppercase tracking-widest font-bold text-center border border-brand-red/50 p-6 bg-black/50"
                        >
                            LINEUP REVELADO.<br />
                            <span className="text-white text-sm mt-2 block tracking-widest">PREPÁRATE.</span>
                        </motion.div>
                    )}
                </AnimatePresence>
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
