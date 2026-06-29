export default function craft() {
  return (
    <section
      id="craft"
      className="relative flex w-full flex-col justify-center gap-14 overflow-hidden px-6 pb-32 pt-24 text-white sm:flex-row sm:gap-24 sm:pt-44"
    >
      <div className="animate-fade-up relative">
        <img
          src="/feat1.png"
          alt="Perfume craft ingredients"
          className="w-full max-w-xl object-cover"
        />
        <div className="absolute -bottom-12 -right-12 hidden h-80 w-64 bg-dark p-2 sm:block">
          <img
            src="/feat2.png"
            alt="Curated fragrance detail"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="animate-fade-up flex max-w-lg flex-col items-center justify-center">
        <p className="uppercase tracking-widest text-gold">The craft</p>
        <h1 className="mt-5 w-full text-center font-serif text-4xl italic leading-tight">
          Mastering the Art of Notes
        </h1>
        <h3
          className="mt-10 w-full text-center leading-loose tracking-wide text-content/75 sm:max-w-md sm:text-left
"
        >
          We believe fragrance is a silent biography. From the deep, resonant
          base notes of aged sandalwood to the fleeting top notes of rare
          bergamot, every curator&apos;s choice is an intentional expression of
          identity.
        </h3>
        <div className="mt-10 flex items-center">
          <h2 className="mr-4 uppercase tracking-widest text-gold">
            Our Philosophy
          </h2>
          <div className="h-0.5 w-15 bg-gold" />
        </div>
      </div>
    </section>
  );
}
