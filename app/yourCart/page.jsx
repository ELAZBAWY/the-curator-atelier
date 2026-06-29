import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import Orders from "./components/Orders";
import Summary from "./components/Summary";
export default function YorCart() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />
      <section className="w-full overflow-hidden px-4 py-24 sm:px-6 lg:px-24">
        <div data-section="intro" className="animate-fade-up mx-auto w-full max-w-7xl">
          <p className="text-xs uppercase tracking-[0.34em] text-gold/65">
            Local atelier basket
          </p>
          <h1 className="mt-4 font-serif text-4xl font-medium leading-tight sm:text-5xl lg:text-7xl">
            Your Cart
          </h1>
          <div className="mt-5 h-0.5 w-30 bg-gold" />
        </div>
        <hr className="mt-12 border-gold/10" />
        <div className="mt-16 grid grid-cols-1 items-start gap-10 lg:grid-cols-6 lg:gap-14">
          <div className="col-span-4 flex flex-col gap-8">
            <Orders />
          </div>
          <div className="col-span-4 md:col-span-2 lg:sticky lg:top-24">
            <Summary />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
