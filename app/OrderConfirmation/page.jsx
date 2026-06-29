import { BadgeCheck } from "lucide-react";
import Ordersum from "./components/Ordersum";
import Devdet from "./components/Devdet";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
export default function OrderConfirmation() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />
      <section className="flex h-full w-full flex-col items-center justify-center overflow-hidden px-4 py-24 sm:px-6 lg:px-24">
        <div
          data-section="intro"
          className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center"
        >
          <BadgeCheck className="size-16 animate-soft-pop text-gold" />
          <h1 className="animate-fade-up mt-6 text-center font-serif text-4xl font-medium leading-tight sm:text-5xl lg:text-7xl">
            Thank You For Your Order
          </h1>
          <p className="animate-fade-up mt-4 max-w-2xl text-center text-sm uppercase tracking-[0.22em] text-content/45">
            Your local order details are saved in this browser.
          </p>
          <div className="mt-8 h-0.5 w-full bg-gold" />
          <div className="mt-10 grid w-full grid-cols-1 gap-7 lg:grid-cols-6">
            <div className="lg:col-span-4">
              <Ordersum />
            </div>
            <div className="lg:col-span-2">
              <Devdet />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
