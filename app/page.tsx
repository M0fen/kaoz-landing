import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LookbookCarousel from "@/components/LookbookCarousel";
import EventLineup from "@/components/EventLineup";
import TerminalCTA from "@/components/TerminalCTA";
import FloatingQuiz from "@/components/FloatingQuiz";
import Footer from "@/components/Footer";
import Marquees from "@/components/Marquees";
import GlitchTransition from "@/components/GlitchTransition";
import ScrollFadeSection from "@/components/ScrollFadeSection";
import { CrosshairDetail, BarcodeDetail, JpCoordDetail } from "@/components/TechUIDetails";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen text-white overflow-x-hidden selection:bg-brand-red selection:text-white bg-[#050505]">

      {/* Global Tech Noise Texture */}
      <div className="fixed inset-0 z-0 opacity-15 pointer-events-none mix-blend-screen" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"globalNoise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23globalNoise)\"/%3E%3C/svg%3E')" }}></div>

      {/* Fixed Navbar */}
      <Navbar />

      {/* Vertical Edge Marquees */}
      <Marquees />

      {/* Scrollable Content */}
      <div className="relative z-10 flex flex-col w-full bg-black">
        <ScrollFadeSection>
          <Hero />
        </ScrollFadeSection>

        <ScrollFadeSection>
          <LookbookCarousel />
        </ScrollFadeSection>

        <ScrollFadeSection>
          <EventLineup />
        </ScrollFadeSection>
        
        <TerminalCTA />
        <Footer />
      </div>

      {/* Persistent Overlay Elements */}
      <FloatingQuiz />
      <GlitchTransition />

      {/* ─── Tech-UI Microdetails ───────────────────────────────────
          3 ambient accent elements placed in negative/margin space.
          All pointer-events-none, z-[5] so they sit above bg but
          below interactive elements.
      ─────────────────────────────────────────────────────────── */}

      {/* 1. Crosshair — fixed bottom-right corner, always visible */}
      <CrosshairDetail
        className="fixed bottom-16 right-4 z-[5] opacity-50 hidden lg:block"
      />

      {/* 2. Barcode — fixed left edge, mid-height */}
      <BarcodeDetail
        className="fixed left-2 top-1/2 -translate-y-1/2 z-[5] opacity-40 hidden md:block"
        style={{ transform: "translateY(-50%) rotate(-90deg)", transformOrigin: "center center" }}
      />

      {/* 3. Japanese coordinate string — fixed right edge at 30% */}
      <JpCoordDetail
        className="fixed right-1 top-[30%] z-[5] opacity-50 hidden lg:block"
      />
    </main>
  );
}
