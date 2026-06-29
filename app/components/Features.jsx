import { Truck } from "lucide-react";
import { BadgeCheck } from "lucide-react";
import { Gift } from "lucide-react";
import Craft from "./Craft";

export default function Features() {
  const features = [
    {
      icon: <Truck />,
      title: "Free Shipping",
      desc: "Complimentary global delivery on all curated orders exceeding $200.",
    },
    {
      icon: <BadgeCheck />,
      title: "Authentic Products",
      desc: "Every essence is direct from the atelier, certified for its pure provenance.",
    },
    {
      icon: <Gift />,
      title: "Gift Wrapping",
      desc: " Presented in our signature obsidian box with hand-pressed wax seals. ",
    },
  ];
  return (
    <>
      <section className="flex items-center justify-center overflow-hidden bg-black px-4 pt-18 text-center">
        <div className="relative grid w-full max-w-7xl grid-cols-1 gap-1 sm:grid-cols-3">
          {features.map((feat, index) => (
            <div
              key={index}
              className="animate-fade-up flex flex-col items-center justify-center gap-1.5 bg-[#1b1b1b] px-6 py-12 transition duration-500 hover:-translate-y-1 hover:bg-[#202020]"
            >
              <div className="pb-5 text-icon"> {feat.icon}</div>
              <h1 className="pb-3 font-serif text-2xl font-bold text-icon">
                {feat.title}
              </h1>
              <p className="text-content/70"> {feat.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <Craft />
    </>
  );
}
