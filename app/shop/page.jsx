"use client";

import { useEffect, useMemo, useState } from "react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import Filter from "./filter";
import ProductCard from "./ProductCard";
import { getProducts, subscribeToStorage } from "@/lib/storage";

const defaultFilters = {
  categories: [],
  scents: [],
  maxPrice: 500,
  size: "50ML",
};

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    const refresh = () => setProducts(getProducts());
    refresh();
    return subscribeToStorage(refresh);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);
      const scentMatch =
        filters.scents.length === 0 || filters.scents.includes(product.scentType);
      const priceMatch = product.price <= filters.maxPrice;

      return categoryMatch && scentMatch && priceMatch;
    });
  }, [filters, products]);

  const toggleCategory = (category) => {
    setFilters((current) => ({
      ...current,
      categories: current.categories.includes(category)
        ? current.categories.filter((item) => item !== category)
        : [...current.categories, category],
    }));
  };

  const toggleScent = (scent) => {
    setFilters((current) => ({
      ...current,
      scents: current.scents.includes(scent)
        ? current.scents.filter((item) => item !== scent)
        : [...current.scents, scent],
    }));
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar active="SHOP" />
      <section className="w-full overflow-hidden px-4 py-24 sm:px-6 lg:px-10">
        <div className="animate-fade-up mx-auto w-full max-w-7xl">
          <p className="text-xs uppercase tracking-[0.36em] text-gold/70">
            Atelier shelves
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
            Our Collection
          </h1>
          <p className="mt-4 max-w-2xl text-sm uppercase tracking-[0.22em] text-content/55 sm:mt-6 sm:text-base">
            A curated selection of olfactory masterpieces designed for the
            discerning individual.
          </p>
        </div>

        <div className="mx-auto mt-8 grid w-full max-w-7xl grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-12 lg:gap-8">
          <aside className="w-full lg:col-span-3">
            <Filter
              filters={filters}
              onToggleCategory={toggleCategory}
              onToggleScent={toggleScent}
              onPriceChange={(maxPrice) =>
                setFilters((current) => ({ ...current, maxPrice }))
              }
              onSizeChange={(size) =>
                setFilters((current) => ({ ...current, size }))
              }
              onClear={() => setFilters(defaultFilters)}
            />
          </aside>

          <main className="min-w-0 lg:col-span-9">
            <div className="animate-fade-up flex flex-col gap-3 border-b border-gold/10 px-0 py-4 uppercase sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-sm text-gold/55 sm:text-base">
                {filteredProducts.length} result
                {filteredProducts.length === 1 ? "" : "s"} found
              </h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:text-base">
                <p className="text-gold/35">Cart size</p>
                <h2 className="text-content/80">{filters.size}</h2>
              </div>
            </div>

            {filteredProducts.length ? (
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    selectedSize={filters.size}
                  />
                ))}
              </div>
            ) : (
              <div className="animate-fade-up mt-6 rounded-lg border border-gold/10 bg-[#0f0f0f] px-6 py-14 text-center">
                <p className="font-serif text-3xl text-content">
                  No scents match these filters.
                </p>
                <p className="mt-4 text-sm uppercase tracking-[0.2em] text-content/45">
                  Clear filters or widen your price range.
                </p>
              </div>
            )}
          </main>
        </div>
      </section>
      <Footer />
    </div>
  );
}
