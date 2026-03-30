import Navbar from "./components/nav/Navbar";
import StatsBar from "./components/stats/StatsBar";
import HeroSection from "./components/hero/HeroSection";
import SoundSection from "./components/sections/SoundSection";
import TechSection from "./components/sections/TechSection";
import StudioSection from "./components/sections/StudioSection";
import LifestyleSection from "./components/sections/LifestyleSection";
import ReserveSection from "./components/sections/ReserveSection";
import ScrollSnap from "./components/ScrollSnap";

export default function Home() {
  return (
    <main style={{ background: "var(--bg)", overflow: "hidden" }}>
      {/* Fixed nav */}
      <Navbar />

      {/* Fixed footer — always visible */}
      <div style={{
        position: "fixed",
        bottom: "16px",
        left: "5%",
        width: "90%",
        zIndex: 50,
      }}>
        <StatsBar />
      </div>

      <ScrollSnap>
        <HeroSection />
        <SoundSection />
        <TechSection />
        <StudioSection />
        <LifestyleSection />
        <ReserveSection />
      </ScrollSnap>
    </main>
  );
}
