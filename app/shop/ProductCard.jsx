import Card from "./card";

export default function ProductCard({ product, selectedSize }) {
  return (
    <section className="animate-fade-up h-full">
      <Card product={product} selectedSize={selectedSize} />
    </section>
  );
}
