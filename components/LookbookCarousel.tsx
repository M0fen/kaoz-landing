"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

const lookbookImages = [
    'https://picsum.photos/seed/kaoz1/800/400',
    'https://picsum.photos/seed/kaoz2/800/400',
    'https://picsum.photos/seed/kaoz3/800/400',
    'https://picsum.photos/seed/kaoz4/800/400',
    'https://picsum.photos/seed/kaoz5/800/400',
];

export default function LookbookCarousel() {
    return (
        <section id="lookbook" className="sticky top-0 h-screen z-20 bg-black pt-24 pb-12 overflow-hidden border-t border-brand-red/20 flex flex-col justify-center relative">
            {/* ── Vertical Japanese Marquee — far-left margin ── */}
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '28px',
                    zIndex: 10,
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <motion.div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.6em',
                        opacity: 0.38,
                        fontFamily: "'Noto Sans JP', 'Space Mono', monospace",
                        fontSize: '11px',
                        letterSpacing: '0.15em',
                        color: 'rgba(229,0,0,0.85)',
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        whiteSpace: 'nowrap',
                        userSelect: 'none',
                    }}
                    animate={{ y: ['0%', '-50%'] }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    {/* Repeated twice so the loop is seamless */}
                    {Array.from({ length: 16 }).map((_, i) => (
                        <span key={i} style={{ display: 'block' }}>混沌</span>
                    ))}
                </motion.div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
        .my-swiper .swiper-button-next,
        .my-swiper .swiper-button-prev {
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s ease;
        }
        .my-swiper .swiper-button-next:hover,
        .my-swiper .swiper-button-prev:hover {
          color: #E50000;
          transform: scale(1.1);
        }
        .my-swiper .swiper-button-next::after,
        .my-swiper .swiper-button-prev::after {
          font-size: 28px;
          font-weight: 300;
        }

        /* 3D Focus: Dimming Inactive Slides */
        .my-swiper .swiper-slide {
          transition: filter 0.5s ease, opacity 0.5s ease;
          filter: brightness(0.3) grayscale(0.8);
          opacity: 0.4;
        }
        
        /* Only active center slide gets 100% focus */
        .my-swiper .swiper-slide-active {
          filter: brightness(1) grayscale(0);
          opacity: 1;
        }
      `}} />

            <motion.div
                className="w-full mb-16 relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Tech UI Decorators */}
                <div className="absolute -top-10 left-10 font-mono text-[10px] text-brand-red opacity-50 hidden md:block">
                    {'//'} SYS.OP: CAROUSEL_VIEW <br />
                    LAT: 40.7128° N, LNG: 74.0060° W
                </div>
                <div className="absolute top-0 right-10 text-silver/20 font-mono text-xs hidden sm:block tracking-[0.2em]">
                    --- CORTE_OPERACIÓN ---
                </div>

                <h2 className="font-gothic gothic-glow-text text-5xl sm:text-6xl md:text-8xl font-black text-center mb-12 uppercase tracking-tighter drop-shadow-lg relative z-10">
                    LOOKBOOK <span className="text-brand-red font-display">01</span>
                </h2>

                <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        spaceBetween={30}
                        slidesPerView={'auto'}
                        loop={true}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 250,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        navigation={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        modules={[EffectCoverflow, Navigation, Autoplay]}
                        className="w-full py-10 my-swiper"
                    >
                        {lookbookImages.map((src, index) => (
                            <SwiperSlide key={`${src}-${index}`} className="!w-[80vw] md:!w-[600px] lg:!w-[800px] bg-transparent">
                                <div className="relative w-full aspect-[21/9] rounded-none border border-brand-red/30 overflow-hidden bg-black shadow-[0_0_30px_rgba(229,0,0,0.15)] transition-transform duration-300 z-10">
                                    <img
                                        src={src}
                                        alt={`Lookbook image ${index + 1}`}
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                    {/* Corner accents */}
                                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-red z-20"></div>
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-red z-20"></div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </motion.div>
        </section>
    );
}
