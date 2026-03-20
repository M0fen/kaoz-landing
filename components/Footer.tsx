export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            className="relative z-30 w-full"
            style={{
                background: "rgba(5,5,5,0.98)",
                borderTop: "1px solid rgba(229,0,0,0.35)",
            }}
        >
            {/* Top accent gradient line */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(to right, transparent, rgba(229,0,0,0.6) 30%, rgba(180,180,180,0.15) 50%, rgba(229,0,0,0.6) 70%, transparent)" }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 sm:py-6">
                {/* ── 3-column HUD grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 items-center">

                    {/* ── LEFT: Copyright ── */}
                    <div className="flex flex-col gap-1 sm:items-start items-center">
                        <div className="flex items-center gap-2">
                            <span
                                className="inline-block w-[5px] h-[5px] rounded-full flex-shrink-0"
                                style={{
                                    background: "#E50000",
                                    boxShadow: "0 0 4px #E50000, 0 0 10px rgba(229,0,0,0.4)",
                                    animation: "hud-bloom 2.4s ease-in-out infinite",
                                }}
                            />
                            <span
                                className="font-mono uppercase tracking-[0.3em]"
                                style={{ fontSize: "clamp(6px, 1.4vw, 8px)", color: "rgba(229,0,0,0.7)" }}
                            >
                                DOBLE KAOZ
                            </span>
                        </div>
                        <p
                            className="font-mono"
                            style={{ fontSize: "clamp(5px, 1.2vw, 7px)", color: "rgba(229,0,0,0.3)", letterSpacing: "0.25em", textTransform: "uppercase" }}
                        >
                            © {year} — CROMO COLLECTION — ALL RIGHTS RESERVED
                        </p>
                    </div>

                    {/* ── CENTER: System data ── */}
                    <div className="flex flex-col items-center gap-1">
                        <p
                            className="font-mono text-center"
                            style={{ fontSize: "clamp(6px, 1.4vw, 8px)", color: "rgba(229,0,0,0.5)", letterSpacing: "0.4em", textTransform: "uppercase" }}
                        >
                            // SYS_FT_ACTIVE_02 //
                        </p>
                        <p
                            className="font-mono text-center"
                            style={{ fontSize: "clamp(5px, 1.1vw, 7px)", color: "rgba(160,160,160,0.25)", letterSpacing: "0.3em", textTransform: "uppercase" }}
                        >
                            // DATA_LINK // KZ-2026 //
                        </p>
                        {/* Kanji micro-decoration */}
                        <p
                            style={{
                                fontFamily: "var(--font-noto-jp, 'Space Mono', monospace)",
                                fontSize: "clamp(7px, 1.3vw, 9px)",
                                color: "rgba(229,0,0,0.18)",
                                letterSpacing: "0.5em",
                                marginTop: "2px",
                            }}
                        >
                            混沌 // カオス
                        </p>
                    </div>

                    {/* ── RIGHT: Social links ── */}
                    <div className="flex sm:justify-end justify-center items-center gap-4">
                        {/* WhatsApp */}
                        <a
                            href="https://wa.me/573223737487"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-0.5"
                            aria-label="WhatsApp"
                        >
                            <span
                                className="font-mono tracking-[0.3em] group-hover:text-brand-red transition-colors duration-200"
                                style={{ fontSize: "clamp(7px, 1.5vw, 9px)", color: "rgba(229,0,0,0.55)", textTransform: "uppercase" }}
                            >
                                WA
                            </span>
                            <span
                                className="block h-px w-full group-hover:bg-brand-red transition-colors duration-200"
                                style={{ background: "rgba(229,0,0,0.3)" }}
                            />
                        </a>

                        {/* Divider */}
                        <span style={{ color: "rgba(229,0,0,0.2)", fontSize: "8px" }}>·</span>

                        {/* Instagram */}
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-0.5"
                            aria-label="Instagram"
                        >
                            <span
                                className="font-mono tracking-[0.3em] group-hover:text-brand-red transition-colors duration-200"
                                style={{ fontSize: "clamp(7px, 1.5vw, 9px)", color: "rgba(229,0,0,0.55)", textTransform: "uppercase" }}
                            >
                                IG
                            </span>
                            <span
                                className="block h-px w-full group-hover:bg-brand-red transition-colors duration-200"
                                style={{ background: "rgba(229,0,0,0.3)" }}
                            />
                        </a>

                        {/* Asian accent */}
                        <span
                            style={{
                                fontFamily: "var(--font-noto-jp, monospace)",
                                fontSize: "clamp(8px, 1.6vw, 11px)",
                                color: "rgba(229,0,0,0.2)",
                                letterSpacing: "0.1em",
                            }}
                        >
                            龍
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
