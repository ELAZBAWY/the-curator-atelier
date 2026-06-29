"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  addToCart,
  formatPrice,
  isProductInWishlist,
  subscribeToStorage,
  toggleWishlist,
} from "@/lib/storage";

export default function Card({ product, selectedSize = "50ML" }) {
  const [added, setAdded] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const refresh = () => setFavorite(isProductInWishlist(product.id));
    refresh();
    return subscribeToStorage(refresh);
  }, [product.id]);

  const handleAdd = () => {
    addToCart(product, { size: selectedSize, quantity: 1 });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  const handleFavorite = () => {
    toggleWishlist(product);
    setFavorite((current) => !current);
  };

  return (
    <article className="group flex h-full w-full min-w-0 flex-col rounded-lg border border-white/5 bg-[#0f0f0f] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.28)] transition-all duration-500 hover:-translate-y-1 hover:border-gold/35 hover:bg-[#171717] hover:shadow-[0_28px_90px_rgba(201,168,76,0.14)] sm:p-5">
      <div className="relative mb-4 flex aspect-square w-full justify-center overflow-hidden rounded-md bg-[#151515] transition-colors group-hover:bg-[#1d1a13]">
        <button
          type="button"
          aria-label={favorite ? "Remove from wishlist" : "Add to wishlist"}
          onClick={handleFavorite}
          className="absolute left-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-gold/20 bg-black/40 text-gold backdrop-blur transition hover:border-gold hover:bg-[#c9a84c] hover:text-dark"
        >
          <Heart
            className="h-4 w-4"
            fill={favorite ? "currentColor" : "none"}
          />
        </button>

        <Link
          href={`/product_detail?id=${product.id}`}
          aria-label={`View ${product.name}`}
          className="relative h-full w-full"
        >
          <Image
            src={product.image}
            fill
            sizes="(min-width: 1280px) 28vw, (min-width: 640px) 45vw, 100vw"
            alt={product.name}
            className="object-contain p-6 transition duration-700 group-hover:scale-110"
          />
        </Link>
      </div>

      <Link href={`/product_detail?id=${product.id}`} className="block">
        <p className="mb-1 text-xs uppercase tracking-[0.22em] text-gray-400">
          {product.brand}
        </p>
        <h2 className="mb-2 font-serif text-xl text-white transition group-hover:text-gold">
          {product.name}
        </h2>
      </Link>

      <p className="mb-3 flex-1 text-sm leading-relaxed text-gray-500">
        {product.description}
      </p>

      <div className="mb-4 flex items-center gap-2 text-yellow-400">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={15}
            fill={index < product.rating ? "currentColor" : "none"}
          />
        ))}
        <span className="ml-1 text-xs uppercase tracking-[0.16em] text-content/35">
          {product.reviews}k
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
        <span className="font-serif text-xl font-bold text-yellow-500">
          {formatPrice(product.price)}
        </span>

        <Button
          type="button"
          onClick={handleAdd}
          className="h-10 rounded-md bg-yellow-500 px-4 text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:bg-[#b89236]"
        >
          <ShoppingBag className="h-4 w-4" />
          {added ? "Added" : "Add"}
        </Button>
      </div>
    </article>
  );
}
