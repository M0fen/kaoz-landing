"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollFadeSection({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        // The animation plays from when the section's top hits the viewport's top ('start start')
        // to when the section's bottom hits the viewport's top ('end start')
        offset: ["start start", "end start"]
    });

    // Content fades out and scales down slightly as it scrolls up
    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.3, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
    
    // Black void overlay fades in to cover the content
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0, 0.8, 1]);

    return (
        <motion.div ref={ref} className="relative w-full bg-black overflow-hidden">
            <motion.div style={{ opacity, scale }} className="w-full relative z-10 h-full">
                {children}
            </motion.div>
            
            {/* Pure black void overlay */}
            <motion.div 
                className="absolute inset-0 bg-black pointer-events-none z-50"
                style={{ opacity: overlayOpacity }}
            />
        </motion.div>
    );
}
