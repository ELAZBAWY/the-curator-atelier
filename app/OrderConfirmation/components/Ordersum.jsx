"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatPrice, getLatestOrder } from "@/lib/storage";

export default function Ordersum() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setOrder(getLatestOrder()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (!order) {
    return (
      <section className="animate-fade-up rounded-lg border border-gold/10 bg-[#1f1f1f] p-8 text-center">
        <h2 className="font-serif text-3xl text-content">No local order yet.</h2>
        <p className="mt-4 text-sm uppercase tracking-[0.18em] text-content/45">
          Build a cart and confirm checkout to see the order details here.
        </p>
        <Button
          asChild
          className="mt-8 h-12 rounded-md bg-gold px-8 text-xs font-bold uppercase tracking-[0.2em] text-dark hover:bg-[#b89236]"
        >
          <Link href="/shop">Shop Collection</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="animate-fade-up rounded-lg border border-gold/10 bg-[#1f1f1f] p-5 sm:p-8">
      <div className="flex flex-col gap-4 border-b border-gold/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-gold/45">
            Order Number
          </p>
          <h2 className="mt-2 font-serif text-3xl text-content">{order.id}</h2>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-content/40">
            Linked to {order.userName} - {order.userEmail}
          </p>
        </div>
        <p className="w-fit rounded-full bg-gold/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-gold">
          {order.status}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        {order.items.map((item) => (
          <div
            key={item.cartId}
            className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 rounded-md border-b border-white/5 pb-5 transition hover:bg-gold/5 last:border-b-0 last:pb-0"
          >
            <div className="relative h-28 w-[88px] overflow-hidden rounded-md bg-[#151515]">
              <Image
                src={item.image}
                fill
                sizes="88px"
                alt={item.name}
                className="object-contain p-3"
              />
            </div>
            <div className="flex min-w-0 flex-col justify-center gap-2">
              <p className="text-xs uppercase tracking-[0.22em] text-gold/50">
                {item.brand}
              </p>
              <h3 className="font-serif text-xl text-content">{item.name}</h3>
              <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.16em] text-content/40">
                <span>{item.size}</span>
                <span>Qty {item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-4 border-t border-gold/10 pt-6 text-sm">
        <div className="flex items-center justify-between">
          <span className="uppercase tracking-[0.18em] text-gold/45">
            Subtotal
          </span>
          <span>{formatPrice(order.summary.subtotal)}</span>
        </div>
        {order.summary.discount ? (
          <div className="flex items-center justify-between text-gold">
            <span className="uppercase tracking-[0.18em]">Discount</span>
            <span>-{formatPrice(order.summary.discount)}</span>
          </div>
        ) : null}
        <div className="flex items-center justify-between">
          <span className="uppercase tracking-[0.18em] text-gold/45">Tax</span>
          <span>{formatPrice(order.summary.tax)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="uppercase tracking-[0.18em] text-gold/45">
            Shipping
          </span>
          <span>
            {order.summary.shipping
              ? formatPrice(order.summary.shipping)
              : "Free"}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-gold/10 pt-5 font-serif text-2xl text-gold">
          <span>Total</span>
          <span>{formatPrice(order.summary.total)}</span>
        </div>
      </div>
    </section>
  );
}
