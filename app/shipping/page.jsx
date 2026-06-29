import Link from "next/link";
import ShippingInfo from "./components/ShippingInfo";
import ShippingSumm from "./components/ShippingSumm";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
export default function Shipping() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar active="SHOP" />
      <section className="w-full overflow-hidden px-4 py-24 sm:px-6 lg:px-10">
        <div className="animate-fade-up mx-auto flex w-full max-w-5xl items-center justify-center gap-3 sm:gap-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <Link href="/yourCart">
              <div className="flex h-10 w-10 items-center justify-center bg-gold font-bold text-dark">
                1
              </div>
            </Link>
            <p className="text-xs tracking-widest uppercase text-gold">
              Shipping
            </p>
          </div>
          <div className="h-px flex-1 bg-white/10" />
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-gold/40 font-bold text-white/40">
                2
            </div>
            <p className="text-xs tracking-widest uppercase text-gold/40">
              PAYMENT
            </p>
          </div>
          <div className="h-px flex-1 bg-white/10" />
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-gold/40 font-bold text-white/40">
                3
            </div>
            <p className="text-xs tracking-widest uppercase text-gold/40">
              CONFIRMATION
            </p>
          </div>
        </div>
        <div data-section="intro" className="mx-auto w-full max-w-7xl">
          <h1 className="animate-fade-up mb-16 mt-12 font-serif text-4xl font-bold leading-tight text-content sm:text-5xl lg:text-7xl">
            Shipping Details
          </h1>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-8">
            <div className="col-span-5 flex flex-col gap-8">
              <ShippingInfo />
            </div>

            <div className="col-span-5 md:col-span-3 flex flex-col gap-8 lg:sticky lg:top-24">
              <ShippingSumm />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
