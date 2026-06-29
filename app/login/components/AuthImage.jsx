import Image from "next/image";

export default function AuthImage() {
  return (
    <section className="relative hidden h-screen w-full overflow-hidden border-r border-white/10 sm:block">
      <Image
        src="/images/login.png"
        fill
        priority
        sizes="50vw"
        alt="Perfume bottle for The Curator login"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

      <div className="animate-fade-up absolute inset-x-12 bottom-16 max-w-xl">
        <p className="text-xs uppercase tracking-[0.38em] text-gold/70">
          The Curator
        </p>
        <h1 className="mt-5 font-serif text-5xl text-gold">THE CURATOR</h1>
        <p className="mt-6 max-w-md font-serif text-2xl italic leading-10 text-content/75">
          &quot;Fragrance is the invisible garment that speaks when words are
          silent.&quot;
        </p>
      </div>
    </section>
  );
}
