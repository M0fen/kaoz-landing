"use client";

import { motion } from "framer-motion";

const LEFT_TEXT = "クランカオス ／ 混沌 ／ DOBLE KAOZ ／ CAOS・CLAN・CUERPO ／ 系統 ／ cromo COLLECTION ／ ";
const RIGHT_TEXT = "CAOS, CLAN, CUERPO ／ クロモ ／ OBFUSCATED ORIGIN ／ 地下戦線 ／ DOBLE KAOZ SYSTEM ／ ";
const BOTTOM_TEXT = "クランカオス ／ CAOS ／ CLAN ／ CUERPO ／ DOBLE KAOZ ／ cromo COLLECTION ／ 混沌 ／ UNDERGROUND TECHWEAR ／ 系統 ／ CORTE_OPERACIÓN ／ ";

export default function Marquees() {
    return (
        <>
            {/* ── LEFT VERTICAL MARQUEE ── */}
            <div className="fixed left-0 top-0 h-screen w-6 sm:w-8 md:w-10 z-50 overflow-hidden flex flex-col justify-start items-center border-r border-silver/10 pointer-events-none opacity-25">
                <motion.div
                    className="flex flex-col gap-12 whitespace-nowrap text-brand-red font-mono text-[9px] tracking-[0.3em] uppercase"
                    style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                    animate={{ y: [0, -1200] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 22 }}
                >
                    {Array(6).fill(LEFT_TEXT).map((t, i) => (
                        <span key={i} className="py-6">{t}</span>
                    ))}
                </motion.div>
            </div>

            {/* ── RIGHT VERTICAL MARQUEE ── */}
            <div className="fixed right-0 top-0 h-screen w-6 sm:w-8 md:w-10 z-50 overflow-hidden flex flex-col justify-start items-center border-l border-silver/10 pointer-events-none opacity-25">
                <motion.div
                    className="flex flex-col gap-12 whitespace-nowrap text-silver font-mono text-[9px] tracking-[0.3em] uppercase"
                    style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                    animate={{ y: [-1200, 0] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 28 }}
                >
                    {Array(6).fill(RIGHT_TEXT).map((t, i) => (
                        <span key={i} className="py-6">{t}</span>
                    ))}
                </motion.div>
            </div>
 {/* ── BOTTOM HORIZONTAL MARQUEE ── */}
            {/* ── BOTTOM HORIZONTAL MARQUEE ── */}
            <div className="fixed bottom-0 left-0 right-0 z-50 overflow-hidden pointer-events-none border-t border-silver/10 opacity-20 bg-black/30 h-5">
                <motion.div
                    className="flex flex-row gap-0 whitespace-nowrap text-silver-dim font-mono text-[8px] tracking-[0.35em] uppercase h-full items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
                    style={{ width: "200%" }}
                >
                    {/* Duplicate to create seamless loop */}


                    <span className="pr-0">{BOTTOM_TEXT.repeat(8)}</span>
                    <span className="pr-0">{BOTTOM_TEXT.repeat(8)}</span>
                </motion.div>
            </div>
        </>
    );
}
