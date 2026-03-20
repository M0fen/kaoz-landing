"use client";

import { useState, useRef, useCallback } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#[]_*/░%?▓▒∆≠§±";

const WA_LINK = "https://wa.me/573223737487?text=Hola,%20quiero%20adquirir%20entradas%20para%20CROMO";

/* ────────────────────────────────────────
   Generic scramble hook
────────────────────────────────────────── */
function useScramble(text: string, frames = 14) {
    const [display, setDisplay] = useState(text);
    const rafRef = useRef<number | undefined>(undefined);

    const scramble = useCallback(() => {
        cancelAnimationFrame(rafRef.current!);
        let frame = 0;
        const step = () => {
            frame++;
            setDisplay(
                text.split("").map((char) => {
                    // preserve special chars & accented letters in their positions
                    if (" []áéíóúüñ".includes(char)) return char;
                    if (frame > frames - 2) return char;
                    return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                }).join("")
            );
            if (frame < frames) {
                rafRef.current = requestAnimationFrame(step);
            } else {
                setDisplay(text);
            }
        };
        step();
    }, [text, frames]);

    return { display, scramble };
}

/* ────────────────────────────────────────
   Main CTA Section
────────────────────────────────────────── */
export default function TerminalCTA() {
    const lead = useScramble("// Aquí puedes adquirir tus entradas //", 12);
    const btn  = useScramble("ADQUIRIR ENTRADAS", 18);

    return (
        <section
            className="relative w-full z-30 flex flex-col items-center justify-center py-10 sm:py-14"
            style={{ background: "rgba(5,5,5,0.97)" }}
        >
            {/* ── Top hairline ── */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(to right, transparent, rgba(229,0,0,0.4) 30%, rgba(180,180,180,0.1) 50%, rgba(229,0,0,0.4) 70%, transparent)" }}
            />

            {/* ── HUD container ── */}
            <div
                className="relative flex flex-col items-center gap-5 w-full max-w-lg mx-auto px-4"
                style={{
                    border: "1px solid rgba(229,0,0,0.25)",
                    background: "rgba(10,4,4,0.85)",
                    padding: "clamp(18px, 4vw, 32px) clamp(16px, 5vw, 40px)",
                }}
            >
                {/* Top-left corner accent */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-red" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-red" />

                {/* ── HUD pulse dot + sys label ── */}
                <div className="flex items-center gap-2 self-start">
                    <span
                        className="inline-block w-[6px] h-[6px] rounded-full flex-shrink-0"
                        style={{
                            background: "#E50000",
                            boxShadow: "0 0 6px #E50000, 0 0 14px rgba(229,0,0,0.5)",
                            animation: "hud-bloom 1.8s ease-in-out infinite",
                        }}
                    />
                    <span
                        className="font-mono uppercase tracking-[0.35em]"
                        style={{ fontSize: "clamp(6px, 1.6vw, 8px)", color: "rgba(229,0,0,0.45)" }}
                    >
                        // SYS_CTA_ACTIVE // CROMO 2026 //
                    </span>
                </div>

                {/* ── Lead scramble text ── */}
                <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full text-center cursor-pointer"
                    onMouseEnter={lead.scramble}
                    onTouchStart={lead.scramble}
                    aria-label="Adquirir tus entradas"
                >
                    <span
                        className="font-mono tracking-[0.18em] uppercase transition-colors duration-200 group-hover:text-brand-red"
                        style={{
                            fontSize: "clamp(0.6rem, 2vw, 0.78rem)",
                            color: "rgba(229,0,0,0.5)",
                        }}
                    >
                        {lead.display}
                    </span>
                </a>

                {/* ── Thin red separator ── */}
                <div
                    className="w-full h-px"
                    style={{ background: "linear-gradient(to right, transparent, rgba(229,0,0,0.3), transparent)" }}
                />

                {/* ── ADQUIRIR ENTRADAS button ── */}
                <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center cursor-pointer select-none overflow-hidden"
                    style={{
                        minWidth: "clamp(200px, 50vw, 280px)",
                        height: "clamp(40px, 6vw, 48px)",
                        border: "1px solid #E50000",
                        background: "transparent",
                        transition: "background 0.25s ease, box-shadow 0.25s ease",
                    }}
                    onMouseEnter={btn.scramble}
                    onTouchStart={btn.scramble}
                    onMouseOver={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(229,0,0,0.12)";
                        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 18px rgba(229,0,0,0.35), inset 0 0 12px rgba(229,0,0,0.08)";
                    }}
                    onMouseOut={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                    }}
                >
                    {/* Scanline fill on hover */}
                    <span className="absolute inset-0 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" style={{ background: "rgba(229,0,0,0.07)" }} />

                    {/* Left accent bar */}
                    <span className="shrink-0 bg-brand-red mr-3" style={{ width: "3px", height: "16px", display: "block" }} />

                    {/* Button text */}
                    <span
                        className="relative z-10 font-mono tracking-[0.28em] uppercase font-bold"
                        style={{
                            fontSize: "clamp(0.65rem, 1.8vw, 0.78rem)",
                            color: "#E50000",
                        }}
                    >
                        {btn.display}
                    </span>

                    {/* Right accent bar */}
                    <span className="shrink-0 bg-brand-red ml-3" style={{ width: "3px", height: "16px", display: "block" }} />

                    {/* Corner cuts */}
                    <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-red" />
                    <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-red" />
                </a>

                {/* ── Sub-label ── */}
                <p
                    className="font-mono text-center"
                    style={{
                        fontSize: "clamp(5px, 1.4vw, 7px)",
                        color: "rgba(229,0,0,0.25)",
                        letterSpacing: "0.35em",
                        textTransform: "uppercase",
                    }}
                >
                    // VIA WHATSAPP // ACCESO DIRECTO //
                </p>
            </div>

            {/* ── Bottom hairline ── */}
            <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(to right, transparent, rgba(229,0,0,0.2) 50%, transparent)" }}
            />
        </section>
    );
}
