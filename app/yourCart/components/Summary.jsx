"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DollarSign, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  formatPrice,
  getCart,
  getCartSummary,
  getPromo,
  setPromo,
  subscribeToStorage,
} from "@/lib/storage";

export default function Summary() {
  const [summary, setSummary] = useState(getCartSummary([]));
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const refresh = () => {
      const promo = getPromo();
      setCode(promo);
      setSummary(getCartSummary(getCart(), promo));
    };

    refresh();
    return subscribeToStorage(refresh);
  }, []);

  const applyCode = () => {
    const nextCode = setPromo(code);
    setSummary(getCartSummary(getCart(), nextCode));
    setMessage(
      nextCode === "CURATOR10"
        ? "Curator code applied."
        : "Try CURATOR10 for this local demo."
    );
  };

  const hasItems = summary.count > 0;

  return (
    <section className="animate-fade-up flex h-full w-full flex-col md-w-fulljustify-center gap-7 rounded-lg border border-gold/10 bg-[#1f1f1f] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
      <div className="flex items-center justify-center gap-4">
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

      <div>
        <p className="text-xs uppercase tracking-widest text-gold/45">
          Promotional Code
        </p>
        <div className="relative mt-3">
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Enter Code"
            className="h-12 w-full min-w-0 rounded-md border border-gold/25 bg-black/15 px-4 pr-20 text-base uppercase text-content outline-none transition-colors placeholder:text-muted-foreground focus:border-gold focus:bg-black/25 md:text-sm"
          />
          <Button
            type="button"
            onClick={applyCode}
            className="absolute right-1 top-1/2 h-9 -translate-y-1/2 rounded-md bg-transparent text-gold hover:bg-gold/15"
          >
            APPLY
          </Button>
        </div>
        {message ? (
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-content/45">
            {message}
          </p>
        ) : null}
      </div>

      <hr className="border-gold/10" />
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.22em]">Total</p>
        <div className="flex items-center text-2xl font-bold text-gold">
          <DollarSign className="h-5 w-5" />
          <p>{summary.total.toFixed(2)}</p>
        </div>
      </div>

      {hasItems ? (
        <Button
          asChild
          className="h-14 w-full rounded-md bg-gold text-xs font-bold uppercase tracking-widest text-dark transition-colors hover:bg-[#b89236]"
        >
          <Link href="/shipping" className="hover:text-white">
            Proceed To Checkout
          </Link>
        </Button>
      ) : (
        <Button
          disabled
          className="h-14 w-full rounded-md bg-gold text-xs font-bold uppercase tracking-widest text-dark"
        >
          Cart Is Empty
        </Button>
      )}

      <div className="flex items-center justify-center gap-2 text-sm text-white/20">
        <Lock className="h-4 w-4" />
        <p>SECURE LOCAL CHECKOUT</p>
      </div>
    </section>
  );
}
