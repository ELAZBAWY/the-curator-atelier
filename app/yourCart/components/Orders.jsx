"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  formatPrice,
  getCart,
  removeCartItem,
  subscribeToStorage,
  updateCartQuantity,
} from "@/lib/storage";

export default function Orders() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const refresh = () => setItems(getCart());
    refresh();
    return subscribeToStorage(refresh);
  }, []);

  if (!items.length) {
    return (
      <section className="animate-fade-up flex min-h-[340px] flex-col items-center justify-center rounded-lg border border-gold/10 bg-[#101010] px-6 py-14 text-center">
        <ShoppingBag className="h-12 w-12 text-gold" />
        <h2 className="mt-6 font-serif text-3xl text-content">
          Your cart is waiting for its first scent.
        </h2>
        <p className="mt-4 max-w-md text-sm uppercase tracking-[0.18em] text-content/45">
          Add a fragrance from the collection and it will stay here in local
          storage.
        </p>
        <Button
          asChild
          className="mt-8 h-12 rounded-md bg-gold px-8 text-xs font-bold uppercase tracking-[0.2em] text-dark hover:bg-[#b89236]"
        >
          <Link href="/shop" className="hover:text-white">
            Shop Collection
          </Link>
        </Button>
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {items.map((item) => (
        <section
          key={item.cartId}
          className="animate-fade-up grid w-full gap-6 rounded-lg border border-white/10 bg-[#101010] p-4 transition hover:border-gold/35 hover:bg-[#171717] sm:grid-cols-[minmax(0,1fr)_auto] sm:p-6"
        >
          <div className="flex gap-4 sm:gap-6">
            <Link
              href={`/product_detail?id=${item.productId}`}
              className="relative h-36 w-28 shrink-0 overflow-hidden rounded-md bg-[#181818] transition hover:bg-[#211f1a] sm:h-44 sm:w-32"
            >
              <Image
                src={item.image}
                fill
                sizes="132px"
                alt={item.name}
                className="object-contain p-4"
              />
            </Link>
            <div className="flex min-w-0 flex-col justify-center gap-3">
              <p className="text-xs uppercase tracking-[0.24em] text-gold/60">
                {item.brand}
              </p>
              <Link
                href={`/product_detail?id=${item.productId}`}
                className="-mx-2 rounded-md px-2 font-serif text-lg tracking-[0.08em] text-content transition hover:bg-gold/10 hover:text-gold sm:text-2xl"
              >
                {item.name}
              </Link>
              <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                {item.scentType} fragrance
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.18em]">
                <span className="text-white/35">Size</span>
                <span className="font-bold text-gold">{item.size}</span>
                <span className="text-white/35">Unit</span>
                <span className="font-bold text-gold">
                  {formatPrice(item.price)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-stretch justify-between gap-5 text-gold sm:min-w-56 sm:items-end">
            <Button
              type="button"
              aria-label={`Remove ${item.name}`}
              onClick={() => removeCartItem(item.cartId)}
              variant="ghost"
              className="ml-auto h-9 w-9 rounded-md text-gold/70 hover:bg-gold/15 hover:text-gold"
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="inline-grid h-11 grid-cols-3 overflow-hidden rounded-md border border-white/20">
              <Button
                type="button"
                variant="ghost"
                aria-label="Decrease quantity"
                onClick={() => updateCartQuantity(item.cartId, item.quantity - 1)}
                disabled={item.quantity === 1}
                className="h-full rounded-none text-gold/80 hover:bg-gold/15 hover:text-gold disabled:cursor-not-allowed"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="grid min-w-12 place-items-center border-x border-white/10 px-5 text-sm">
                {item.quantity}
              </span>
              <Button
                type="button"
                variant="ghost"
                aria-label="Increase quantity"
                onClick={() => updateCartQuantity(item.cartId, item.quantity + 1)}
                disabled={item.quantity === 10}
                className="h-full rounded-none text-gold/80 hover:bg-gold/15 hover:text-gold disabled:cursor-not-allowed"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between gap-4 text-white/40 sm:w-full">
              <p className="text-xs uppercase tracking-[0.18em]">Subtotal</p>
              <p className="font-serif text-xl text-gold">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
