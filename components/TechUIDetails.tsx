/**
 * TechUIDetails component
 * Three ambient Tech-UI microdetails scattered in page margins:
 *  1. SVG crosshair — right-margin accent between sections
 *  2. Barcode fragment — bottom-left corner accent
 *  3. Japanese coordinate string — left-margin vertical label
 *
 * All are pointer-events-none, visually subtle (low opacity),
 * and use brand-red / silver palette.
 */
"use client";

/* ─── 1. SVG Crosshair ──────────────────────────────────────────── */
export function CrosshairDetail({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
    return (
        <div
            className={`pointer-events-none select-none ${className}`}
            aria-hidden
        >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer ring */}
                <circle cx="24" cy="24" r="20" stroke="#E50000" strokeWidth="0.6" strokeOpacity="0.5" />
                {/* Inner ring */}
                <circle cx="24" cy="24" r="8" stroke="#E50000" strokeWidth="0.6" strokeOpacity="0.7" />
                {/* Center dot */}
                <circle cx="24" cy="24" r="1.5" fill="#E50000" opacity="0.8" />
                {/* Crosshair lines */}
                <line x1="24" y1="4" x2="24" y2="16" stroke="#E50000" strokeWidth="0.6" strokeOpacity="0.6" />
                <line x1="24" y1="32" x2="24" y2="44" stroke="#E50000" strokeWidth="0.6" strokeOpacity="0.6" />
                <line x1="4" y1="24" x2="16" y2="24" stroke="#E50000" strokeWidth="0.6" strokeOpacity="0.6" />
                <line x1="32" y1="24" x2="44" y2="24" stroke="#E50000" strokeWidth="0.6" strokeOpacity="0.6" />
                {/* Tick marks */}
                <line x1="4" y1="4" x2="10" y2="4" stroke="#E50000" strokeWidth="0.6" strokeOpacity="0.35" />
                <line x1="4" y1="4" x2="4" y2="10" stroke="#E50000" strokeWidth="0.6" strokeOpacity="0.35" />
                <line x1="44" y1="4" x2="38" y2="4" stroke="#E50000" strokeWidth="0.6" strokeOpacity="0.35" />
                <line x1="44" y1="4" x2="44" y2="10" stroke="#E50000" strokeWidth="0.6" strokeOpacity="0.35" />
                <line x1="4" y1="44" x2="10" y2="44" stroke="#E50000" strokeWidth="0.6" strokeOpacity="0.35" />
                <line x1="4" y1="44" x2="4" y2="38" stroke="#E50000" strokeWidth="0.6" strokeOpacity="0.35" />
                <line x1="44" y1="44" x2="38" y2="44" stroke="#E50000" strokeWidth="0.6" strokeOpacity="0.35" />
                <line x1="44" y1="44" x2="44" y2="38" stroke="#E50000" strokeWidth="0.6" strokeOpacity="0.35" />
            </svg>
            {/* Label below crosshair */}
            <p className="font-body text-[6px] tracking-[0.5em] text-brand-red/40 uppercase text-center mt-1">TGT_ACQ</p>
        </div>
    );
}

/* ─── 2. Barcode Fragment ───────────────────────────────────────── */
export function BarcodeDetail({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
    // Pseudo-random bar widths for visual variety
    const bars = [1, 2, 1, 1, 3, 1, 2, 1, 1, 2, 1, 3, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 3, 1, 2, 1];
    let x = 0;
    return (
        <div className={`pointer-events-none select-none ${className}`} aria-hidden style={style}>
            <svg width="72" height="28" viewBox="0 0 72 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                {bars.map((w, i) => {
                    const rx = x;
                    x += w + 1;
                    return (
                        <rect
                            key={i}
                            x={rx}
                            y={i % 3 === 0 ? 0 : 2}
                            width={w}
                            height={i % 3 === 0 ? 22 : 18}
                            fill="#B0B0B0"
                            opacity={(i % 7 === 0) ? 0.6 : 0.3}
                        />
                    );
                })}
            </svg>
            <p className="font-body text-[5px] tracking-[0.6em] text-silver-dim/30 uppercase mt-0.5">KZ-2026-▒▒▒▒</p>
        </div>
    );
}

/* ─── 3. Japanese Coordinate String ────────────────────────────── */
export function JpCoordDetail({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
    return (
        <div
            className={`pointer-events-none select-none ${className}`}
            aria-hidden
            style={{ writingMode: "vertical-rl", textOrientation: "mixed", ...style }}
        >
            <span className="font-body text-[8px] tracking-[0.35em] text-silver-dim/25 uppercase leading-none block">
                [N-36/13] 異常
            </span>
            <span className="font-body text-[7px] tracking-[0.3em] text-brand-red/30 uppercase leading-none block mt-2">
                座標：不明
            </span>
            <span className="font-body text-[6px] tracking-[0.4em] text-silver-dim/15 uppercase leading-none block mt-1">
                SYS-∅∅4
            </span>
        </div>
    );
}
