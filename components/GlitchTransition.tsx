"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

// --- Glitch phases driven by sequential timeouts ---
type GlitchPhase = "idle" | "flash" | "rgb" | "bars" | "noise" | "fade";

const BAR_POSITIONS = [15, 38, 55, 71, 88]; // % from top

export default function GlitchTransition() {
    const [phase, setPhase] = useState<GlitchPhase>("idle");
    const { scrollY } = useScroll();
    const [lastThreshold, setLastThreshold] = useState(0);

    const triggerGlitch = useCallback(() => {
        if (phase !== "idle") return; // prevent overlapping sequences

        // Phase 1: white flash
        setPhase("flash");
        setTimeout(() => setPhase("rgb"), 80);
        setTimeout(() => setPhase("bars"), 200);
        setTimeout(() => setPhase("noise"), 380);
        setTimeout(() => setPhase("fade"), 560);
        setTimeout(() => setPhase("idle"), 780);
    }, [phase]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (typeof window === "undefined") return;
        const vh = window.innerHeight;
        const currentSection = Math.floor((latest + vh * 0.1) / vh);
        if (currentSection !== lastThreshold) {
            setLastThreshold(currentSection);
            triggerGlitch();
        }
    });

    const isActive = phase !== "idle";

    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    key="glitch-overlay"
                    className="fixed inset-0 z-[999] pointer-events-none overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                >
                    {/* ── Phase 1: FLASH ── */}
                    {phase === "flash" && (
                        <div className="absolute inset-0 bg-white opacity-[0.07]" />
                    )}

                    {/* ── Phase 2: RGB SPLIT ── */}
                    {phase === "rgb" && (
                        <>
                            {/* Red channel — shifted left */}
                            <div
                                className="absolute inset-0 mix-blend-screen"
                                style={{
                                    backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')",
                                    transform: "translateX(-10px) scaleY(1.01)",
                                    opacity: 0.55,
                                    filter: "hue-rotate(0deg) saturate(10) brightness(0.8)",
                                    backgroundColor: "rgba(229,0,0,0.08)"
                                }}
                            />
                            {/* Cyan channel — shifted right */}
                            <div
                                className="absolute inset-0 mix-blend-screen"
                                style={{
                                    backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')",
                                    transform: "translateX(10px) scaleY(0.99)",
                                    opacity: 0.45,
                                    filter: "hue-rotate(180deg) saturate(10) brightness(0.8)",
                                    backgroundColor: "rgba(0,200,255,0.06)"
                                }}
                            />
                            {/* Vertical scan strip */}
                            <div
                                className="absolute top-0 bottom-0 mix-blend-overlay opacity-40"
                                style={{ left: "30%", width: "2px", backgroundColor: "#E50000" }}
                            />
                            <div
                                className="absolute top-0 bottom-0 mix-blend-overlay opacity-25"
                                style={{ left: "70%", width: "1px", backgroundColor: "#00CCFF" }}
                            />
                        </>
                    )}

                    {/* ── Phase 3: CORRUPTION BARS ── */}
                    {phase === "bars" && (
                        <>
                            {BAR_POSITIONS.map((pos, i) => (
                                <div
                                    key={i}
                                    className="absolute left-0 right-0 mix-blend-overlay"
                                    style={{
                                        top: `${pos}%`,
                                        height: `${[10, 4, 7, 3, 5][i]}px`,
                                        backgroundColor: i % 2 === 0 ? "#E50000" : "#FFFFFF",
                                        opacity: [0.8, 0.6, 0.9, 0.5, 0.7][i],
                                        transform: `translateX(${[-15, 22, -8, 18, -5][i]}px)`,
                                    }}
                                />
                            ))}
                            {/* Diagonal skew effect */}
                            <div
                                className="absolute inset-0 mix-blend-difference opacity-[0.04]"
                                style={{ backgroundColor: "#FFFFFF", transform: "skewY(-0.5deg)" }}
                            />
                        </>
                    )}

                    {/* ── Phase 4: TV STATIC NOISE ── */}
                    {phase === "noise" && (
                        <>
                            <div
                                className="absolute inset-0 mix-blend-screen opacity-30"
                                style={{
                                    backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"static\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23static)\"/%3E%3C/svg%3E')",
                                    backgroundSize: "200px 200px"
                                }}
                            />
                            {/* Red horizontal bleeding line */}
                            <div
                                className="absolute left-0 right-0 mix-blend-screen opacity-70"
                                style={{ top: "50%", height: "2px", backgroundColor: "#E50000" }}
                            />
                        </>
                    )}

                    {/* ── Phase 5: FADE VIGNETTE ── */}
                    {phase === "fade" && (
                        <div
                            className="absolute inset-0 opacity-60"
                            style={{
                                background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.9) 100%)"
                            }}
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
