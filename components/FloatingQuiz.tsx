"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingQuiz() {
    const [isVisible, setIsVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Form State

 

    const [phase, setPhase] = useState<"input" | "quiz" | "finished">("input");
    const [formData, setFormData] = useState({ name: "", whatsapp: "", ig: "" });
    const [error, setError] = useState("");
    const [questionIndex, setQuestionIndex] = useState(0);

    const questions = [
        "¿Qué significa el neón rojo para ti?",
        "¿Cuál es la regla principal del clan?",
        "Describe tu estilo en 3 palabras.",
        "¿Cuál es tu track favorito de JBD?",
        "¿Estás preparado para el Kaoz?"
    ];

    useEffect(() => {
        const handleScroll = () => {
            // Show notification after scrolling down 100vh (past Hero)
            if (window.scrollY > window.innerHeight * 0.8) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                if (!isOpen) {
                    // Only hide if modal is not open
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isOpen]);

    const handleInputSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.whatsapp || !formData.ig) {
            setError("TODOS LOS CAMPOS SON OBLIGATORIOS.");
            return;
        }
        setError("");
        setPhase("quiz");
    };

    const handleAnswer = () => {
        if (questionIndex < questions.length - 1) {
            setQuestionIndex(prev => prev + 1);
        } else {
            setPhase("finished");
        }
    };

    return (
        <>
            {/* Floating Notification */}
            <AnimatePresence>
                {isVisible && !isOpen && (
                    <motion.div
                        className="fixed bottom-6 right-6 z-50 cursor-pointer group"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        onClick={() => setIsOpen(true)}
                    >
                        <div className="bg-black/90 border border-brand-red/50 p-4 font-mono text-xs md:text-sm text-brand-red shadow-[0_0_15px_rgba(229,0,0,0.3)] backdrop-blur-md transition-all group-hover:border-brand-red group-hover:bg-brand-red/10 group-hover:shadow-[0_0_20px_rgba(229,0,0,0.6)] animate-flicker">
                            <span className="animate-pulse mr-2 inline-block w-2 h-2 bg-brand-red"></span>
                            {'>'} NUEVO MENSAJE: ¿Eres digno del clan?
                            <span className="ml-2 text-white group-hover:text-brand-red transition-colors">[CLICK]</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-[#050505] border-2 border-brand-red w-full max-w-lg p-6 md:p-10 relative font-mono shadow-[0_0_30px_rgba(229,0,0,0.2)]"
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-silver hover:text-brand-red text-xl leading-none transition-colors"
                            >
                                x
                            </button>

                            {/* Header */}
                            <div className="border-b border-brand-red/30 pb-4 mb-6">
                                <h3 className="text-brand-red text-xl md:text-2xl font-bold uppercase tracking-widest animate-flicker">
                                    {'>'} TERMINAL_ACCESO
                                </h3>
                            </div>

                            {/* Phase: Input */}
                            {phase === "input" && (
                                <form onSubmit={handleInputSubmit} className="space-y-4">
                                    <p className="text-silver text-sm mb-6 uppercase tracking-wider animate-flicker">INGRESA CREDENCIALES PARA CONTINUAR.</p>

                                    <div>
                                        <label className="block text-brand-red text-xs mb-1 uppercase tracking-widest">Nombre Completo</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-black border border-silver/20 text-white p-3 focus:outline-none focus:border-brand-red focus:bg-brand-red/5 transition-colors uppercase text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-brand-red text-xs mb-1 uppercase tracking-widest">WhatsApp</label>
                                        <input
                                            type="tel"
                                            value={formData.whatsapp}
                                            onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                                            className="w-full bg-black border border-silver/20 text-white p-3 focus:outline-none focus:border-brand-red focus:bg-brand-red/5 transition-colors uppercase text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-brand-red text-xs mb-1 uppercase tracking-widest">Usuario IG</label>
                                        <input
                                            type="text"
                                            value={formData.ig}
                                            onChange={e => setFormData({ ...formData, ig: e.target.value })}
                                            className="w-full bg-black border border-silver/20 text-white p-3 focus:outline-none focus:border-brand-red focus:bg-brand-red/5 transition-colors uppercase text-sm"
                                        />
                                    </div>

                                    {error && <p className="text-brand-red text-xs mt-2 animate-pulse">{error}</p>}

                                    <button
                                        type="submit"
                                        className="w-full bg-brand-red hover:bg-white text-black font-bold uppercase py-4 mt-6 tracking-widest transition-colors"
                                    >
                                        INICIAR PROTOCOLO
                                    </button>
                                </form>
                            )}

                            {/* Phase: Quiz */}
                            {phase === "quiz" && (
                                <motion.div
                                    className="space-y-6"
                                    key={questionIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <div className="flex justify-between items-center text-xs text-silver/50 tracking-widest mb-4">
                                        <span>PREGUNTA {questionIndex + 1}/{questions.length}</span>
                                        <span className="text-brand-red animate-pulse">REC...</span>
                                    </div>

                                    <h4 className="text-white text-xl md:text-2xl uppercase break-words leading-tight animate-flicker">
                                        {questions[questionIndex]}
                                    </h4>

                                    <div className="pt-6">
                                        <input
                                            type="text"
                                            autoFocus
                                            placeholder="TU RESPUESTA..."
                                            onKeyDown={(e) => { if (e.key === 'Enter' && e.currentTarget.value) handleAnswer() }}
                                            className="w-full bg-black border-b border-brand-red text-brand-red p-3 focus:outline-none focus:bg-brand-red/5 transition-colors uppercase text-sm mb-6"
                                        />
                                        <button
                                            onClick={handleAnswer}
                                            className="w-full border border-brand-red text-brand-red hover:bg-brand-red hover:text-black font-bold uppercase py-3 tracking-widest transition-colors"
                                        >
                                            ENVIAR [ENTER]
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Phase: Finished */}
                            {phase === "finished" && (
                                <div className="text-center py-8">
                                    <h4 className="text-brand-red text-2xl uppercase mb-4 font-bold animate-flicker">TRANSMISIÓN ENVIADA</h4>
                                    <p className="text-silver text-sm tracking-wider uppercase animate-flicker">Analizando datos. Espera contacto.</p>
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            setTimeout(() => {
                                                setPhase("input");
                                                setQuestionIndex(0);
                                                setFormData({ name: "", whatsapp: "", ig: "" });
                                            }, 500);
                                        }}
                                        className="mt-8 border border-silver text-silver hover:text-black hover:bg-white font-bold uppercase py-2 px-6 tracking-widest transition-colors text-xs"
                                    >
                                        [ ESC ] CERRAR TERMINAL
                                    </button>
                                </div>
                            )}

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
