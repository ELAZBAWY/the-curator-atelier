export default function Footer() {
  return (
    <footer className="bg-[#0e0e0e]/30  relative text-white w-full border-t border-white/10 bg-surface py-16 px-12  overflow-hidden">
      <div className="max-w-7xl mx-auto sm:flex  justify-between items-center">
        <div>
          <h3 className="font-serif text-lg tracking-widest text-on-surface">
            THE CURATOR ATELIER
          </h3>
          <p className="font-body w-full  mb-4 sm:mb-0 text-[10px] tracking-widest text-on-surface-variant mt-2 opacity-60">
            © 2026 THE CURATOR ATELIER. ALL RIGHTS RESERVED.
          </p>
        </div>

        <div className="flex gap-4 sm:gap-12">
          <a
            href="#"
            className="font-body text-xs tracking-widest uppercase text-on-surface hover:text-gold border-b-2 border-transparent hover:border-gold cursor-pointer duration-300 transition-all "
          >
            Instagram
          </a>
          <a
            href="#"
            className="font-body text-xs tracking-widest uppercase text-on-surface hover:text-gold border-b-2 border-transparent hover:border-gold cursor-pointer duration-300 transition-all"
          >
            Pinterest
          </a>
          <a
            href="#"
            className="font-body text-xs tracking-widest uppercase text-on-surface hover:text-gold border-b-2 border-transparent hover:border-gold cursor-pointer duration-300 transition-all"
          >
            Privacy
          </a>
          <a
            href="#"
            className="font-body text-xs tracking-widest uppercase text-on-surface hover:text-gold border-b-2 border-transparent hover:border-gold cursor-pointer duration-300 transition-all"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
