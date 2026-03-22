"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";

/* ══════════════════════════════════════════════════════
   CROMO RUNNER — Dino-run Easter Egg  v4 FINAL
   Pure React + rAF infinite runner · Tone.js audio
   ══════════════════════════════════════════════════════ */

// ── Constants ──────────────────────────────────────
const GAME_W = 800;
const GAME_H = 400;
const FLOOR_Y = 340;
const PLAYER_W = 44;
const PLAYER_H = 52;
const PLAYER_X = 50;
const GRAVITY = 0.8;
const JUMP_VEL = -14.0;
const BASE_SPEED = 4.5;
const SPEED_BUMP = 0.6;
const OBS_W = 34;
const OBS_H = 42;
const SPAWN_MIN = 55;
const SPAWN_MAX = 110;
const WIN_SCORE = 666;
const GROUND_LEVEL = FLOOR_Y - PLAYER_H; // exact floor-level Y

type Obstacle = { x: number; y: number; char: string; id: number };

/* ──────────────────────────────────────────
   TEXT SCRAMBLE — 10-iteration reveal
   Only runs once per trigger change.
────────────────────────────────────────── */
const GLYPHS = "@#&*01!?%$>_";

function useScrambleOnce(finalText: string, trigger: string | number): string {
    const [display, setDisplay] = useState(finalText);
    const prevTrigger = useRef<string | number>("");

    useEffect(() => {
        if (trigger === prevTrigger.current) return;
        prevTrigger.current = trigger;

        const chars = finalText.split("");
        let step = 0;
        const TOTAL = 10;

        const iv = setInterval(() => {
            step++;
            const progress = step / TOTAL;
            setDisplay(
                chars
                    .map((ch, i) => {
                        if (ch === " ") return " ";
                        return i / chars.length < progress
                            ? ch
                            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                    })
                    .join("")
            );
            if (step >= TOTAL) clearInterval(iv);
        }, 50);

        return () => clearInterval(iv);
    }, [trigger, finalText]);

    return display;
}

/* ──────────────────────────────────────────
   CHROME SKULL SVG — aggressive metallic skull
   Pure inline SVG, no external images.
────────────────────────────────────────── */
function ChromeSkull() {
    return (
        <svg viewBox="0 0 44 52" width={PLAYER_W} height={PLAYER_H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
            <defs>
                {/* Chrome / liquid-metal gradient */}
                <linearGradient id="crSkullMetal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FAFAFA" />
                    <stop offset="12%" stopColor="#E0E0E0" />
                    <stop offset="28%" stopColor="#8A8A8A" />
                    <stop offset="42%" stopColor="#4A4A4A" />
                    <stop offset="55%" stopColor="#9E9E9E" />
                    <stop offset="68%" stopColor="#E8E8E8" />
                    <stop offset="82%" stopColor="#B0B0B0" />
                    <stop offset="100%" stopColor="#787878" />
                </linearGradient>
            </defs>

            {/* Cranium */}
            <ellipse cx="22" cy="17" rx="19" ry="17" fill="url(#crSkullMetal)" stroke="#555" strokeWidth="0.6" />
            
            {/* Simple highlight instead of radialGradient */}
            <ellipse cx="17" cy="11" rx="9" ry="6" fill="#FFFFFF" opacity="0.4" />

            {/* Cheekbones / face plate */}
            <path d="M5 20 L10 34 H34 L39 20 Q38 16 22 15 Q6 16 5 20Z" fill="url(#crSkullMetal)" stroke="#555" strokeWidth="0.5" />

            {/* Jaw */}
            <path d="M12 34 Q12 44 22 45 Q32 44 32 34Z" fill="url(#crSkullMetal)" stroke="#555" strokeWidth="0.5" />

            {/* Eye sockets — deep void */}
            <ellipse cx="14" cy="21" rx="5.5" ry="5" fill="#050505" />
            <ellipse cx="30" cy="21" rx="5.5" ry="5" fill="#050505" />

            {/* Glowing red eyes — simple drop-shadow instead of SVG filter */}
            <circle cx="14" cy="21" r="3" fill="#FF0000" style={{ filter: "drop-shadow(0 0 3px #FF0000)" }}>
                <animate attributeName="r" values="3;2.2;3" dur="1.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.5;1" dur="1.6s" repeatCount="indefinite" />
            </circle>
            <circle cx="30" cy="21" r="3" fill="#FF0000" style={{ filter: "drop-shadow(0 0 3px #FF0000)" }}>
                <animate attributeName="r" values="3;2.2;3" dur="1.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.5;1" dur="1.6s" repeatCount="indefinite" />
            </circle>
            {/* Eye hot-center */}
            <circle cx="14" cy="21" r="1.2" fill="#FF6666" />
            <circle cx="30" cy="21" r="1.2" fill="#FF6666" />

            {/* Nose — angular void */}
            <path d="M19 28 L22 24 L25 28 L23 30 H21Z" fill="#0A0A0A" />

            {/* Teeth — aggressive serrated row */}
            {[10, 14, 18, 22, 26, 30].map((tx) => (
                <polygon
                    key={tx}
                    points={`${tx},35 ${tx + 2},35 ${tx + 2.5},40 ${tx - 0.5},40`}
                    fill="#D0D0D0"
                    stroke="#777"
                    strokeWidth="0.3"
                />
            ))}

            {/* KZ brand */}
            <text x="22" y="49" textAnchor="middle" fontSize="5" fontFamily="monospace" fill="rgba(229,0,0,0.7)" letterSpacing="0.12em">KZ</text>
        </svg>
    );
}

const MemoizedBackground = React.memo(() => (
    <>
        {/* ── PARALLAX MATRIX LAYER (Deep background) ── */}
        <div
            className="absolute inset-0 pointer-events-none opacity-[0.25]"
            style={{ zIndex: 0, overflow: "hidden" }}
        >
            <div
                style={{
                    width: "100%", height: "200%",
                    display: "flex", flexWrap: "wrap",
                    fontFamily: "monospace", fontSize: "16px",
                    lineHeight: "16px", color: "rgba(229,0,0,0.8)",
                    wordBreak: "break-all", whiteSpace: "pre-wrap",
                    animation: "matrix-fall 24s linear infinite",
                }}
            >
                {"0 1 1 0 0 1 ".repeat(600)}
            </div>
        </div>

        {/* ── PERMANENT Tron Grid Floor ── */}
        <div
            className="cr-floor absolute left-0 right-0 pointer-events-none"
            style={{
                top: FLOOR_Y, height: GAME_H - FLOOR_Y, zIndex: 1,
                backgroundImage: `
                    linear-gradient(to bottom, rgba(229,0,0,0.18) 0%, rgba(229,0,0,0.04) 100%),
                    repeating-linear-gradient(90deg, rgba(229,0,0,0.14) 0px, rgba(229,0,0,0.14) 1px, transparent 1px, transparent 40px),
                    repeating-linear-gradient(0deg, rgba(229,0,0,0.10) 0px, rgba(229,0,0,0.10) 1px, transparent 1px, transparent 20px)
                `,
            }}
        />
        {/* Perspective vanishing lines */}
        <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
                top: FLOOR_Y, height: GAME_H - FLOOR_Y, zIndex: 1,
                background: `
                    linear-gradient(75deg, transparent 48%, rgba(229,0,0,0.06) 49%, rgba(229,0,0,0.06) 51%, transparent 52%),
                    linear-gradient(105deg, transparent 48%, rgba(229,0,0,0.06) 49%, rgba(229,0,0,0.06) 51%, transparent 52%)
                `,
            }}
        />
        {/* Floor line — always visible, above overlays */}
        <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{ top: FLOOR_Y, height: "1px", zIndex: 250, background: "linear-gradient(to right, transparent, rgba(229,0,0,0.6) 15%, rgba(229,0,0,0.6) 85%, transparent)" }}
        />
    </>
));

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════ */
export default function CromoRunner({ onClose }: { onClose: () => void }) {
    // ── Game refs (mutated in rAF) ──
    const playerY = useRef(GROUND_LEVEL);
    const velY = useRef(0);
    const onGround = useRef(true);
    const obstacles = useRef<Obstacle[]>([]);
    const frameCount = useRef(0);
    const nextSpawn = useRef(60);
    const obsIdCounter = useRef(0);
    const scoreRef = useRef(0);
    const speedRef = useRef(BASE_SPEED);
    const gameRunning = useRef(false);
    const rafId = useRef<number>(0);
    const displayY = useRef(GROUND_LEVEL);
    const lastTime = useRef<number>(0);

    // ── React state ──
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState<"playing" | "won" | "lost" | "idle">("idle");
    const [muted, setMuted] = useState(true);
    const [renderTick, setRenderTick] = useState(0);
    const [glitchActive, setGlitchActive] = useState(false);

    // ── DOM refs ──
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<HTMLDivElement>(null);
    const mutedRef = useRef(true);
    const toneStarted = useRef(false);

    // ── Tone.js synths (created once) ──
    const jumpSynth = useRef<Tone.PolySynth | null>(null);
    const noiseSynth = useRef<Tone.NoiseSynth | null>(null);
    const noiseFilter = useRef<Tone.Filter | null>(null);

    useEffect(() => { mutedRef.current = muted; }, [muted]);

    // ── Text scramble (ONLY on gameState change, score stays static) ──
    const loseText = useScrambleOnce("SIGUE INTENTANDO", gameState === "lost" ? "lost" : "x");
    const retryText = useScrambleOnce("REINTENTAR", gameState === "lost" ? "lost" : "x");
    const winLine1 = useScrambleOnce("ACCESO CONCEDIDO: HAS GANADO UNA ENTRADA.", gameState === "won" ? "won" : "x");
    const winLine2 = useScrambleOnce("TOMA UN PANTALLAZO Y ESCRÍBENOS.", gameState === "won" ? "won" : "x");

    // ── Ensure Tone.js is started (needs user gesture) ──
    const ensureTone = useCallback(async () => {
        if (!jumpSynth.current) {
            jumpSynth.current = new Tone.PolySynth(Tone.Synth, {
                oscillator: { type: "square" },
                envelope: { attack: 0.001, decay: 0.1, sustain: 0.0, release: 0.1 },
                volume: -12,
            }).toDestination();
        }
        if (!noiseSynth.current) {
            noiseSynth.current = new Tone.NoiseSynth({
                noise: { type: "white" },
                envelope: { attack: 0.005, decay: 0.5, sustain: 0, release: 0.1 },
                volume: -8,
            });
            noiseFilter.current = new Tone.Filter({ frequency: 4000, type: "lowpass", rolloff: -24 }).toDestination();
            noiseSynth.current.connect(noiseFilter.current);
        }
        if (!toneStarted.current) {
            try {
                await Tone.start();
                toneStarted.current = true;
            } catch (e) {
                console.warn("Tone.start failed", e);
            }
        }
    }, []);

    // ── Global initial Tone.start on first interaction ──
    useEffect(() => {
        const initAudio = () => {
             ensureTone();
             // Remove listeners once executed
             window.removeEventListener("pointerdown", initAudio);
             window.removeEventListener("keydown", initAudio);
        };
        window.addEventListener("pointerdown", initAudio);
        window.addEventListener("keydown", initAudio);
        return () => {
            window.removeEventListener("pointerdown", initAudio);
            window.removeEventListener("keydown", initAudio);
        };
    }, [ensureTone]);

    // ── Chromatic aberration trigger ──
    const triggerGlitch = useCallback(() => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
    }, []);

    // ── Play jump sound ──
    const playJump = useCallback(() => {
        if (mutedRef.current) return;
        if (toneStarted.current) {
            jumpSynth.current?.triggerAttackRelease("C6", "0.1");
        } else {
            ensureTone().then(() => {
                jumpSynth.current?.triggerAttackRelease("C6", "0.1");
            });
        }
    }, [ensureTone]);

    // ── Play lose sound ──
    const playLose = useCallback(() => {
        if (mutedRef.current) return;
        const play = () => {
            noiseSynth.current?.triggerAttackRelease("2n");
            if (noiseFilter.current) {
                // reset filter then rapid sweep down
                noiseFilter.current.frequency.setValueAtTime(4000, Tone.now());
                noiseFilter.current.frequency.exponentialRampToValueAtTime(100, Tone.now() + 0.5);
            }
        };
        if (toneStarted.current) play();
        else ensureTone().then(play);
    }, [ensureTone]);

    // ── Jump ──
    const jump = useCallback(() => {
        if (!gameRunning.current || !onGround.current) return;
        velY.current = JUMP_VEL;
        onGround.current = false;
        playJump();
        triggerGlitch();
    }, [playJump, triggerGlitch]);

    // ── Start / restart ──
    const startGame = useCallback(() => {
        playerY.current = GROUND_LEVEL;
        displayY.current = GROUND_LEVEL;
        velY.current = 0;
        onGround.current = true;
        obstacles.current = [];
        frameCount.current = 0;
        nextSpawn.current = 60;
        obsIdCounter.current = 0;
        scoreRef.current = 0;
        speedRef.current = BASE_SPEED;
        gameRunning.current = true;
        lastTime.current = performance.now();
        setScore(0);
        setGlitchActive(false);
        setGameState("playing");
        // Ensure Tone is ready on first interaction
        ensureTone();
    }, [ensureTone]);

    // ── Game loop ──
    useEffect(() => {
        if (gameState !== "playing") return;

        const loop = (time: number) => {
            if (!gameRunning.current) return;
            
            // Delta time calculation
            const dt = lastTime.current ? (time - lastTime.current) / (1000 / 60) : 1;
            lastTime.current = time;
            const safeDt = Math.min(dt, 2.0); // Clamp clamp!

            frameCount.current += safeDt;

            // Physics — gravity always returns to GROUND_LEVEL
            velY.current += GRAVITY * safeDt;
            playerY.current += velY.current * safeDt;

            // Clamp to floor
            if (playerY.current >= GROUND_LEVEL) {
                if (!onGround.current) {
                    // Landing pulse trigger
                    const floorEl = containerRef.current?.querySelector(".cr-floor");
                    if (floorEl) {
                        floorEl.classList.add("floor-pulse");
                        setTimeout(() => floorEl.classList.remove("floor-pulse"), 150);
                    }
                }
                playerY.current = GROUND_LEVEL;
                velY.current = 0;
                onGround.current = true;
            }
            // Clamp to ceiling (cannot exceed top edge)
            if (playerY.current < 0) {
                playerY.current = 0;
                velY.current = 0;
            }

            speedRef.current = BASE_SPEED * Math.pow(1.1, Math.floor(scoreRef.current / 150));

            // Spawn
            if (frameCount.current >= nextSpawn.current) {
                obstacles.current.push({
                    x: GAME_W + 10,
                    y: FLOOR_Y - OBS_H,
                    char: Math.random() > 0.5 ? "0" : "1",
                    id: obsIdCounter.current++,
                });
                nextSpawn.current = frameCount.current + SPAWN_MIN + Math.floor(Math.random() * (SPAWN_MAX - SPAWN_MIN));
            }

            // Move + score
            let scored = false;
            obstacles.current = obstacles.current.filter((o) => {
                o.x -= speedRef.current * safeDt;
                if (!scored && o.x + OBS_W < PLAYER_X && o.x + OBS_W > PLAYER_X - (speedRef.current * safeDt) - 1) {
                    scoreRef.current++;
                    scored = true;
                }
                return o.x > -OBS_W;
            });

            // Collision (10% smaller hitbox)
            const py = playerY.current;
            const HW = PLAYER_W * 0.9;
            const HH = PLAYER_H * 0.9;
            const hx = PLAYER_X + (PLAYER_W - HW) / 2;
            const hy = py + (PLAYER_H - HH) / 2;

            for (const o of obstacles.current) {
                if (hx < o.x + OBS_W && hx + HW > o.x && hy < o.y + OBS_H && hy + HH > o.y) {
                    gameRunning.current = false;
                    playLose();
                    triggerGlitch();
                    setGameState("lost");
                    return;
                }
            }

            // Win
            if (scoreRef.current >= WIN_SCORE) {
                gameRunning.current = false;
                setScore(WIN_SCORE);
                setGameState("won");
                return;
            }

            setScore(scoreRef.current);

            // Visual Lerp
            displayY.current += (playerY.current - displayY.current) * (1 - Math.pow(0.5, safeDt));

            // Direct DOM updates for 60fps
            if (playerRef.current) playerRef.current.style.top = `${displayY.current}px`;
            const ct = containerRef.current;
            if (ct) {
                ct.querySelectorAll<HTMLElement>("[data-obs]").forEach((el) => {
                    const id = Number(el.dataset.obs);
                    const obs = obstacles.current.find((o) => o.id === id);
                    if (obs) el.style.transform = `translateX(${obs.x}px)`;
                    else el.style.display = "none";
                });
            }

            rafId.current = requestAnimationFrame(loop);
        };

        rafId.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafId.current);
    }, [gameState, playLose, triggerGlitch]);

    // Force re-render for obstacle DOM nodes
    useEffect(() => {
        if (gameState !== "playing") return;
        const iv = setInterval(() => { setScore(scoreRef.current); setRenderTick((t) => t + 1); }, 80);
        return () => clearInterval(iv);
    }, [gameState]);

    // ── Keyboard ──
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.code === "Space" || e.key === " ") { e.preventDefault(); gameState === "idle" ? startGame() : jump(); }
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [gameState, jump, startGame, onClose]);

    // ── Touch ──
    useEffect(() => {
        const handler = (e: TouchEvent) => {
            if ((e.target as HTMLElement).closest("button")) return;
            e.preventDefault();
            gameState === "idle" ? startGame() : jump();
        };
        const el = containerRef.current;
        if (el) el.addEventListener("touchstart", handler, { passive: false });
        return () => { if (el) el.removeEventListener("touchstart", handler); };
    }, [gameState, jump, startGame]);

    // Cleanup Tone synths on unmount
    useEffect(() => {
        return () => {
            jumpSynth.current?.dispose();
            noiseSynth.current?.dispose();
            noiseFilter.current?.dispose();
        };
    }, []);

    const toggleMute = useCallback(() => {
        setMuted((m) => { if (m) ensureTone(); return !m; });
    }, [ensureTone]);

    void renderTick;

    const glitchStyle = glitchActive ? { animation: "cromo-chromatic 200ms linear forwards" } : {};

    // ── Score display (STATIC — no scramble on live score) ──
    const scoreDisplay = `[ PUNTAJE: ${String(score).padStart(3, "0")} ]`;

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center cursor-pointer" 
            style={{ zIndex: 999, background: "rgba(0,0,0,0.95)" }}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            {/* ── Full-screen CRT Scanlines ── */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: 1002,
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)",
                    backgroundSize: "100% 4px",
                    opacity: 0.55,
                    mixBlendMode: "multiply",
                }}
            />

            {/* ── Close ── */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 font-mono text-brand-red border border-brand-red/60 bg-black/80 hover:bg-brand-red/10 transition-colors duration-200 cursor-pointer"
                style={{ zIndex: 1003, padding: "4px 10px", fontSize: "11px", letterSpacing: "0.2em", lineHeight: 1.6 }}
            >
                [ X ]
            </button>

            {/* ── Mute toggle ── */}
            <button
                onClick={toggleMute}
                className="absolute top-4 left-4 font-mono border bg-black/80 hover:bg-brand-red/10 transition-colors duration-200 cursor-pointer"
                style={{
                    zIndex: 1003, padding: "4px 12px", fontSize: "10px", letterSpacing: "0.2em", lineHeight: 1.6,
                    color: muted ? "rgba(229,0,0,0.4)" : "rgba(229,0,0,0.8)",
                    borderColor: muted ? "rgba(229,0,0,0.2)" : "rgba(229,0,0,0.6)",
                }}
                aria-label={muted ? "Unmute" : "Mute"}
            >
                {muted ? "[ MUTE ]" : "[ UNMUTE ]"}
            </button>

            {/* ── Game Container (overflow: hidden) ── */}
            <style>{`
                @keyframes matrix-fall {
                    from { transform: translateY(-50%); }
                    to { transform: translateY(0); }
                }
                .cr-floor.floor-pulse {
                    filter: brightness(2) drop-shadow(0 -5px 15px rgba(255,0,0,0.9));
                    transition: filter 0.05s ease-out;
                }
                .cr-floor { transition: filter 0.4s ease-in; }
            `}</style>
            <div
                ref={containerRef}
                className="relative select-none cursor-default"
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: GAME_W, height: GAME_H, maxWidth: "95vw", maxHeight: "70vh",
                    background: "#000", border: "1px solid rgba(229,0,0,0.35)",
                    aspectRatio: `${GAME_W} / ${GAME_H}`, overflow: "hidden",
                    filter: "contrast(1.2) brightness(0.8)",
                    touchAction: "none",
                    ...glitchStyle,
                }}
            >
                <MemoizedBackground />

                {/* ── Score HUD (STATIC — never scrambles) ── */}
                <div className="absolute top-3 left-4 pointer-events-none" style={{ zIndex: 1001 }}>
                    <span className="font-mono tracking-[0.3em] uppercase font-bold" style={{ fontSize: "12px", color: "rgba(229,0,0,0.85)", textShadow: "0 0 10px rgba(229,0,0,0.6)" }}>
                        {scoreDisplay}
                    </span>
                </div>

                {/* ── Scanlines (in-container) ── */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 1px, rgba(0,0,0,0.12) 1px, rgba(0,0,0,0.12) 2px)", backgroundSize: "100% 3px", zIndex: 2, opacity: 0.3 }}
                />

                {/* ── Player: Chrome Skull ── */}
                <div
                    ref={playerRef}
                    className="absolute"
                    style={{
                        left: PLAYER_X, top: GROUND_LEVEL, width: PLAYER_W, height: PLAYER_H,
                        zIndex: 1000,
                        filter: "drop-shadow(0 0 8px rgba(229,0,0,0.6)) drop-shadow(0 0 18px rgba(229,0,0,0.3)) drop-shadow(0 0 30px rgba(229,0,0,0.1))",
                        animation: "cromo-pulse 1.8s ease-in-out infinite",
                    }}
                >
                    <ChromeSkull />
                </div>

                {/* ── Obstacles (z-999, forced visible) ── */}
                {obstacles.current.map((o) => (
                    <div
                        key={o.id}
                        data-obs={o.id}
                        className="absolute select-none pointer-events-none"
                        style={{
                            top: o.y, left: 0, width: OBS_W, height: OBS_H,
                            transform: `translateX(${o.x}px)`,
                            fontSize: "34px", fontFamily: "'Courier New', 'Lucida Console', 'Consolas', monospace",
                            fontWeight: 900, lineHeight: `${OBS_H}px`, textAlign: "center",
                            color: "#FF0000",
                            textShadow: "0 0 6px #FF0000, 0 0 14px rgba(255,0,0,0.8), 0 0 28px rgba(255,0,0,0.4), 0 0 40px rgba(255,0,0,0.15)",
                            zIndex: 999, opacity: 1, visibility: "visible" as const,
                        }}
                    >
                        {o.char}
                    </div>
                ))}

                {/* ── IDLE overlay ── */}
                {gameState === "idle" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4" style={{ zIndex: 200, background: "rgba(0,0,0,0.82)" }}>
                        <h2 className="font-mono tracking-[0.3em] uppercase text-center" style={{ fontSize: "clamp(18px,4vw,28px)", color: "#E50000", textShadow: "0 0 20px rgba(229,0,0,0.5)" }}>
                            CROMO RUNNER
                        </h2>
                        <div style={{ filter: "drop-shadow(0 0 12px rgba(229,0,0,0.6))", animation: "cromo-pulse 1.8s ease-in-out infinite" }}>
                            <ChromeSkull />
                        </div>
                        <p className="font-mono text-[10px] tracking-[0.25em] text-silver-dim/50 uppercase text-center px-4">
                            // SPACE o TAP para saltar // Esquiva los data bits //
                        </p>
                        <button
                            onClick={startGame}
                            className="font-mono tracking-[0.25em] uppercase text-brand-red border border-brand-red hover:bg-brand-red/10 transition-colors duration-200 cursor-pointer"
                            style={{ padding: "8px 24px", fontSize: "11px", letterSpacing: "0.25em" }}
                        >
                            [ INICIAR ]
                        </button>
                    </div>
                )}

                {/* ── LOST overlay ── */}
                {gameState === "lost" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ zIndex: 200, background: "rgba(0,0,0,0.82)" }}>
                        <p className="font-mono tracking-[0.25em] uppercase text-center" style={{ fontSize: "clamp(14px,3vw,20px)", color: "#E50000", textShadow: "0 0 15px rgba(229,0,0,0.5)" }}>
                            {loseText}
                        </p>
                        <p className="font-mono text-[10px] tracking-[0.3em] text-silver-dim/40 uppercase">
                            {scoreDisplay}
                        </p>
                        {/* REINTENTAR — centered with clean red border */}
                        <button
                            onClick={startGame}
                            className="font-mono tracking-[0.25em] uppercase text-brand-red border border-brand-red hover:bg-brand-red/10 transition-colors duration-200 cursor-pointer mt-2 mx-auto block"
                            style={{ padding: "8px 28px", fontSize: "11px", letterSpacing: "0.25em" }}
                        >
                            {retryText}
                        </button>
                    </div>
                )}

                {/* ── WON overlay ── */}
                {gameState === "won" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6" style={{ zIndex: 200, background: "rgba(0,0,0,0.88)" }}>
                        <p className="font-mono tracking-[0.2em] uppercase text-center leading-relaxed" style={{ fontSize: "clamp(11px,2.5vw,16px)", color: "#E50000", textShadow: "0 0 18px rgba(229,0,0,0.6), 0 0 40px rgba(229,0,0,0.2)" }}>
                            {winLine1}<br />{winLine2}
                        </p>
                        <p className="font-mono text-[9px] tracking-[0.3em] text-silver-dim/40 uppercase mt-1">
                            // PUNTAJE FINAL: {WIN_SCORE} //
                        </p>
                        <button
                            onClick={onClose}
                            className="font-mono tracking-[0.25em] uppercase text-brand-red border border-brand-red hover:bg-brand-red/10 transition-colors duration-200 cursor-pointer mt-3"
                            style={{ padding: "8px 24px", fontSize: "11px", letterSpacing: "0.25em" }}
                        >
                            [ CERRAR ]
                        </button>
                    </div>
                )}
            </div>

            {/* ── Bottom ambient text ── */}
            <p className="absolute bottom-4 font-mono text-[7px] tracking-[0.4em] text-brand-red/20 uppercase pointer-events-none">
                // SYS_EASTER_EGG // CROMO RUNNER v4.0 // KZ-2026 //
            </p>
        </div>
    );
}
