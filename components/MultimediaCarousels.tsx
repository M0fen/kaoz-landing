"use client";

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

const loUltimo = ['IYQQ-Gf5_Eo', 'cogzYjryjWw', '0J3w99dpqiM', 'SIXGwxiftjM', 'nMFxvh5UX_A'];
const loMasSonado = ['khclJcdUAQo', 'e5k5kUqSgVc', '_MLV_bL2Bio', '2UEpxF4YwoQ', 'bsQhpi_IjMM'];

export default function MultimediaCarousels() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const handleVideoClick = (id: string) => {
    setActiveVideo(id);
  };

  const closeModal = () => {
    setActiveVideo(null);
  };

  const renderCarousel = (title: string, videoIds: string[]) => (
    <motion.div
      className="w-full mb-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="metallic-title text-3xl sm:text-4xl md:text-5xl font-black text-center mb-8 uppercase tracking-tight">
        {title}
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
            rotate: 35,
            stretch: 40,
            depth: 150,
            modifier: 1.2,
            slideShadows: false,
          }}
          navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: {
              autoplay: false,
            },
            768: {
              autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              },
            },
          }}
          modules={[EffectCoverflow, Navigation, Autoplay]}
          className="w-full py-10 my-swiper"
        >
          {videoIds.map((id, index) => (
            <SwiperSlide key={`${id}-${index}`} className="!w-[65vw] md:!w-[350px] lg:!w-[450px] bg-transparent">
              <div
                className="relative w-full aspect-video rounded-xl overflow-hidden bg-transparent shadow-2xl transition-transform duration-300 cursor-pointer hover:scale-[1.03] z-10"
                onClick={() => handleVideoClick(id)}
              >
                <img
                  src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
                  }}
                  alt={`Video thumbnail ${index + 1}`}
                  className="w-full h-full object-cover bg-transparent"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.div>
  );

  return (
    <section id="multimedia" className="relative z-10 bg-transparent pt-24 pb-12 overflow-hidden border-t border-gold/10">
      <style dangerouslySetInnerHTML={{
        __html: `
        .my-swiper .swiper-button-next,
        .my-swiper .swiper-button-prev {
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s ease;
        }
        .my-swiper .swiper-button-next:hover,
        .my-swiper .swiper-button-prev:hover {
          color: #C5A059;
          transform: scale(1.1);
        }
        .my-swiper .swiper-button-next::after,
        .my-swiper .swiper-button-prev::after {
          font-size: 28px;
          font-weight: 300;
        }
        
        /* Metallic Title Effect */
        .metallic-title {
          background: linear-gradient(
            -45deg,
            #C5A059 20%,
            #fff 40%,
            #C5A059 60%,
            #fff 80%
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: metallicShine 4s linear infinite;
        }
        
        @keyframes metallicShine {
          to {
            background-position: 200% center;
          }
        }

        /* 3D Focus: Dimming Inactive Slides */
        .my-swiper .swiper-slide {
          transition: filter 0.5s ease, opacity 0.5s ease;
          filter: brightness(0.5) contrast(0.8);
          opacity: 0.6;
        }
        
        /* Only active center slide gets 100% focus */
        .my-swiper .swiper-slide-active {
          filter: brightness(1) contrast(1);
          opacity: 1;
        }
      `}} />

      {renderCarousel("LO ÚLTIMO", loUltimo)}
      {renderCarousel("LO MÁS SONADO", loMasSonado)}

      {/* Spotify Section */}
      <motion.div
        className="w-full mt-24 mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="metallic-title text-3xl sm:text-4xl md:text-5xl font-black text-center mb-12 uppercase tracking-tight">
          ESCUCHA EN SPOTIFY
        </h2>

        <div className="w-[90vw] md:w-[60%] lg:w-[50%] mx-auto rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(197,160,89,0.3)] hover:scale-[1.01] bg-black/80 backdrop-blur-sm p-1 border border-transparent hover:border-[#C5A059]/30">
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO1S0cU1?si=BqhvDOYYTtuOJr_0iVA0fw&theme=0"
            width="100%"
            height="400"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="w-full"
          ></iframe>
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={closeModal}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-[#C5A059] transition-colors text-5xl font-light leading-none z-50 w-12 h-12 flex items-center justify-center"
            onClick={closeModal}
          >
            &times;
          </button>

          <div
            className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden bg-black shadow-[0_0_40px_rgba(197,160,89,0.3)] transition-transform duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full absolute inset-0 border-0"
            />
          </div>
        </div>
      )}
    </section>
  );
}
