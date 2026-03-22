"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const TARGET_DATE = new Date("March 28, 2026 16:00:00 GMT-0500").getTime();

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState(() => Math.max(0, TARGET_DATE - Date.now()));
    const [ms, setMs] = useState(0);
    const controls = useAnimation();
    const prevSecondsRef = useRef<number | null>(null);

    useEffect(() => {
        let rafId: number;
        const tick = () => {
            const now = Date.now();
            const diff = TARGET_DATE - now;
            if (diff <= 0) { setTimeLeft(0); setMs(0); return; }

            setTimeLeft(Math.floor(diff / 1000) * 1000);
            setMs(now % 1000);

            const secs = Math.floor(diff / 1000);
            if (prevSecondsRef.current !== null && prevSecondsRef.current !== secs) {
                controls.start({
                    x: [0, -3, 3, -3, 3, 0],
                    filter: [
                        "brightness(1) drop-shadow(0 0 0 #E50000)",
                        "brightness(1.8) drop-shadow(3px 0 0 #E50000)",
                        "brightness(1.8) drop-shadow(-3px 0 0 #00FFFF)",
                        "brightness(1) drop-shadow(0 0 0 #E50000)"
                    ],
                    transition: { duration: 0.12, ease: "linear" }
                });
            }
            prevSecondsRef.current = secs;
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [controls]);

    const fmt = (t: number) => {
        const d = Math.floor(t / (1000 * 60 * 60 * 24));
        const h = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((t % (1000 * 60)) / 1000);
        return `${d}D ${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
        >
            {/* Label row */}
            <p className="font-body text-[8px] tracking-[0.5em] text-silver-dim/50 uppercase mb-[2px]">
                T-MINUS LANZAMIENTO
            </p>
            {/* Raw countdown numbers — no border, no box */}
            <motion.span
                animate={controls}
                className="inline-block font-body font-bold tracking-widest leading-none"
                style={{
                    fontSize: "clamp(2rem, 8vw, 5rem)",
                    color: "#E50000",
                    textShadow: "0 0 18px rgba(229,0,0,0.6), 0 0 40px rgba(229,0,0,0.2)"
                }}
            >
                {fmt(timeLeft)}
                <span style={{ fontSize: "0.45em", opacity: 0.65, marginLeft: "0.15em" }}>
                    .{ms.toString().padStart(3, "0")}
                </span>
            </motion.span>
        </motion.div>
    );
}
