import CraftFilmOverlay from "./components/CraftFilmOverlay";
import Features from "./components/Features";
import Hero from "./components/hero";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <div id="home-content" className="craft-page-shell relative min-h-screen">
        <div className="absolute inset-0 bg-background" />
        <Navbar />
        <Hero />
        <Features />
        <Footer />
      </div>
      <CraftFilmOverlay />
    </main>
  );
}
