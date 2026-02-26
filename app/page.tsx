import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BioCarousel from "@/components/BioCarousel";
import ConnectSection from "@/components/ConnectSection";
import MultimediaCarousels from "@/components/MultimediaCarousels";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen text-white overflow-x-hidden selection:bg-gold selection:text-black">
      {/* Background is Fixed, z-index -10 */}
      <Background />

      {/* Fixed Navbar */}
      <Navbar />

      {/* Scrollable Content */}
      <div className="relative z-10 flex flex-col w-full">
        <Hero />
        <BioCarousel />
        <MultimediaCarousels />
        <ConnectSection />
        <Footer />
      </div>
    </main>
  );
}
