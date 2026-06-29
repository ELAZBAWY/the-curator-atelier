import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

const categories = [
  { id: 1, label: "Men", value: "MEN" },
  { id: 2, label: "Women", value: "WOMEN" },
  { id: 3, label: "Unisex", value: "UNISEX" },
];

const scentTypes = [
  { id: 4, label: "Floral", value: "FLORAL" },
  { id: 5, label: "Woody", value: "WOODY" },
  { id: 6, label: "Oriental", value: "ORIENTAL" },
  { id: 7, label: "Fresh", value: "FRESH" },
];

const sizes = [
  { id: 12, label: "30ML" },
  { id: 13, label: "50ML" },
  { id: 14, label: "100ML" },
];

export default function Filter({
  filters,
  onToggleCategory,
  onToggleScent,
  onPriceChange,
  onSizeChange,
  onClear,
}) {
  const selectedCategories = filters?.categories || [];
  const selectedScents = filters?.scents || [];
  const selectedSize = filters?.size || "50ML";
  const maxPrice = filters?.maxPrice || 500;

  return (
    <div className="animate-fade-up grid w-full grid-cols-1 gap-6 rounded-lg border border-gold/10 bg-[#111111]/80 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur sm:grid-cols-2 sm:p-5 lg:sticky lg:top-24 lg:flex lg:flex-col">
      <section className="w-full space-y-4 uppercase lg:mt-1">
        <h1 className="w-full border-b border-gold/25 pb-2 font-serif text-gold">
          Category
        </h1>
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center gap-3">
            <Checkbox
              id={`cat-${cat.id}`}
              checked={selectedCategories.includes(cat.value)}
              onCheckedChange={() => onToggleCategory(cat.value)}
              className="h-5 w-5 rounded-sm border-[0.1px] border-amber-400 opacity-80 transition data-checked:border-dark data-checked:bg-gold"
            />
            <label
              htmlFor={`cat-${cat.id}`}
              className="cursor-pointer text-sm text-content/75 transition hover:text-gold"
            >
              {cat.label}
            </label>
          </div>
        ))}
      </section>

      <section className="w-full space-y-4 uppercase lg:mt-10">
        <h1 className="w-full border-b border-gold/25 pb-2 font-serif text-gold">
          Scent Type
        </h1>
        {scentTypes.map((cat) => (
          <div key={cat.id} className="flex items-center gap-3">
            <Checkbox
              id={`scent-${cat.id}`}
              checked={selectedScents.includes(cat.value)}
              onCheckedChange={() => onToggleScent(cat.value)}
              className="h-5 w-5 rounded-sm border-[0.1px] border-amber-400 opacity-80 transition data-checked:border-dark data-checked:bg-gold"
            />
            <label
              htmlFor={`scent-${cat.id}`}
              className="cursor-pointer text-sm text-content/75 transition hover:text-gold"
            >
              {cat.label}
            </label>
          </div>
        ))}
      </section>

      <section className="w-full space-y-4 uppercase lg:mt-10">
        <div className="flex items-center justify-between border-b border-gold/25 pb-2">
          <h1 className="font-serif text-gold">Price Range</h1>
          <span className="text-xs text-content/50">${maxPrice}</span>
        </div>
        <Slider
          value={[maxPrice]}
          min={50}
          max={500}
          step={10}
          onValueChange={(value) => onPriceChange(value[0])}
          className="mt-12 w-full text-dark [&_.bg-primary]:bg-transparent [&_.relative]:h-[1px] [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-none [&_[role=slider]]:bg-gold"
        />
        <div className="mt-2 flex justify-between text-gold">
          <span className="text-xs text-on-surface-variant">$50</span>
          <span className="text-xs text-on-surface-variant">$500+</span>
        </div>
      </section>

      <section className="w-full space-y-4 uppercase lg:mt-10">
        <h1 className="w-full border-b border-gold/25 pb-2 font-serif text-gold">
          Size
        </h1>
        <div className="grid grid-cols-3 gap-2 text-base sm:gap-3">
          {sizes.map((cat) => {
            const active = selectedSize === cat.label;

            return (
              <Button
                key={cat.id}
                type="button"
                onClick={() => onSizeChange(cat.label)}
                variant="outline"
                className={`h-9 w-full min-w-0 rounded-md border px-2 text-xs transition ${
                  active
                    ? "border-gold bg-gold text-dark"
                    : "border-gold/20 bg-black/15 text-content hover:border-gold hover:bg-[#211d12] hover:text-gold"
                }`}
              >
                {cat.label}
              </Button>
            );
          })}
        </div>
      </section>

      <Button
        type="button"
        variant="outline"
        onClick={onClear}
        className="h-11 rounded-md border-gold/30 bg-black/15 text-xs uppercase tracking-[0.2em] text-gold hover:border-gold hover:bg-[#211d12]"
      >
        Clear Filters
      </Button>
    </div>
  );
}
