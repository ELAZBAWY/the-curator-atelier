"use client";

import { useEffect, useState } from "react";
import { DollarSign, Lock, PackageCheck } from "lucide-react";
import {
  formatPrice,
  getCart,
  getCartSummary,
  getPromo,
  subscribeToStorage,
} from "@/lib/storage";

export default function ShippingSumm() {
  const [summary, setSummary] = useState(getCartSummary([]));

  useEffect(() => {
    const refresh = () => setSummary(getCartSummary(getCart(), getPromo()));
    refresh();
    return subscribeToStorage(refresh);
  }, []);

  return (
    <section className="animate-fade-up flex h-full w-full flex-col justify-center gap-7 rounded-lg border border-gold/10 bg-[#1f1f1f] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
      <div className="flex items-center justify-center gap-3">
        <PackageCheck className="h-5 w-5 text-gold" />
        <h1 className="font-serif text-xl tracking-widest text-white">
          ORDER SUMMARY
        </h1>
      </div>
      <hr className="border-gold/10" />

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-widest text-gold/45">
          Subtotal ({summary.count} items)
        </p>
        <p>{formatPrice(summary.subtotal)}</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-widest text-gold/45">
          Shipping
        </p>
        <p>{summary.shipping ? formatPrice(summary.shipping) : "Free"}</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-widest text-gold/45">Tax</p>
        <p className="text-xs tracking-widest text-white">
          {formatPrice(summary.tax)}
        </p>
      </div>
      {summary.discount ? (
        <div className="flex items-center justify-between gap-4 text-gold">
          <p className="text-xs uppercase tracking-widest">Discount</p>
          <p>-{formatPrice(summary.discount)}</p>
        </div>
      ) : null}

      <hr className="border-gold/10" />
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.22em]">Total</p>
        <div className="flex items-center text-2xl font-bold text-gold">
          <DollarSign className="h-5 w-5" />
          <p>{summary.total.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-white/20">
        <Lock className="h-4 w-4" />
        <p>SECURE LOCAL CHECKOUT</p>
      </div>
    </section>
  );
}
