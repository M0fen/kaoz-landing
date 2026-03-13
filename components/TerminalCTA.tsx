"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#[]_*/░%?▓▒∆≠§±";
const ORIGIN_TEXT = "[ ADQUIRIR ENTRADAS ]";

function useScrambleHover(text: string) {
    const [display, setDisplay] = useState(text);
    const rafRef = useRef<number | undefined>(undefined);

    const scramble = useCallback(() => {
        cancelAnimationFrame(rafRef.current!);
        let frame = 0;
        const totalFrames = 12; // Fraction of a second (~200ms at 60fps)
        const step = () => {
            frame++;
            setDisplay(
                text.split("").map((char) => {
                    if (char === " " || char === "[" || char === "]") return char;
                    if (frame > totalFrames - 2) return char; // Resolve to correct char at end
                    return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                }).join("")
            );
            if (frame < totalFrames) {
                rafRef.current = requestAnimationFrame(step);
            } else {
                setDisplay(text);
            }
        };
        step();
    }, [text]);

    useEffect(() => {
        return () => cancelAnimationFrame(rafRef.current!);
    }, []);

    return { display, scramble };
}

export default function TerminalCTA() {
    const { display, scramble } = useScrambleHover(ORIGIN_TEXT);

    return (
        <section
            className="relative w-full bg-[#050505] flex items-center justify-center py-16 sm:py-20 z-30"
        >
            {/* Top gradient fade from Lineup to pure black happens in page.tsx dividers,
                so we just keep this section background minimal (#050505). */}

            <Link
                href="#iniciacion"
                className="group relative flex items-center justify-center cursor-pointer overflow-hidden p-[2px]"
                onMouseEnter={scramble}
                onTouchStart={scramble}
                aria-label="Adquirir entradas"
            >
                {/* ── High-Tech Button Container ── */}
                <div className="relative bg-black/50 border border-brand-red px-8 py-4 sm:px-12 sm:py-5 backdrop-blur-sm transition-colors duration-300 group-hover:bg-brand-red/10">

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-brand-red" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-brand-red" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-brand-red" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-brand-red" />

                    {/* Scrambling Monospace Text */}
                    <p className="font-mono text-brand-red text-sm sm:text-base tracking-[0.3em] font-bold uppercase whitespace-nowrap">
                        {display}
                    </p>

                </div>

                {/* Sub-hint below the button */}
                <div className="absolute -bottom-6 w-full text-center">
                    <span className="font-mono text-[8px] text-brand-red/40 tracking-[0.4em] uppercase group-hover:text-brand-red transition-colors duration-300">
                        // SECURE_LINK //
                    </span>
                </div>
            </Link>
        </section>
    );
}
