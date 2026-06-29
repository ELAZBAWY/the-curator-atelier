"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  const openCraftFilm = () => {
    window.dispatchEvent(new CustomEvent("the-curator:open-craft-film"));
  };

  return (
    <section className="relative flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden">
      <div id="Image" className="absolute inset-0 h-full w-full">
        <img
          src="/hero.png"
          alt="The Curator fragrance hero"
          className="animate-slow-drift h-full w-full object-cover object-[center_40%]"
        />
      </div>
      <div className="absolute inset-0 bg-black/45" />
      <div
        data-section="Containet"
        className="absolute mt-30 flex max-w-5xl flex-col items-center justify-center gap-6 px-4 text-center"
      >
        <h1 className="animate-fade-up font-serif text-4xl text-white sm:text-7xl">
          Discover Your
        </h1>
        <h1 className="animate-fade-up font-serif text-5xl italic text-gold sm:text-8xl">
          Signature Scent
        </h1>

        <div className="animate-fade-up flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="h-13 rounded-md bg-gold px-8 text-xs font-bold uppercase tracking-[0.22em] text-dark hover:bg-gold"
          >
            <Link href="/shop" className= "hover:text-white">
            SHOP NOW
            </Link>
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={openCraftFilm}
            className="h-13 rounded-md border-yellow-500 bg-black/25 px-8 text-xs font-bold uppercase tracking-[0.22em] text-gold backdrop-blur hover:border-gold hover:bg-[#211d12]"
          >
            Explore Craft
          </Button>
        </div>
        <p className="animate-fade-up max-w-2xl text-center text-sm uppercase tracking-[0.24em] text-content opacity-90">
          An olfactory gallery of rare essences and artisanal craftsmanship.
        </p>
      </div>
    </section>
  );
}
