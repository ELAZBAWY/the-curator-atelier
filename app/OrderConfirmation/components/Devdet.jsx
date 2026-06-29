"use client";

import Link from "next/link";
import { MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLatestOrder } from "@/lib/storage";
import { useEffect, useState } from "react";

export default function Devdet() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setOrder(getLatestOrder()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const shipping = order?.shipping;
  const address = shipping
    ? `${shipping.firstName} ${shipping.lastName}, ${shipping.address}, ${shipping.city}, ${shipping.postalCode}, ${shipping.country}`
    : "No saved shipping address yet.";

  return (
    <>
      <div className="animate-fade-up flex flex-col items-start justify-center rounded-lg border border-gold/10 bg-dark p-8">
        <div className="flex w-full items-center justify-center">
          <h1 className="font-serif tracking-[0.18em] text-gold">
            DELIVERY DETAILS
          </h1>
        </div>
        <div className="mt-7 flex items-center gap-5">
          <Truck className="h-10 w-10 shrink-0 text-gold" />
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gold/40">
              Estimated Delivery
            </p>
            <h2 className="mt-2 font-black text-content">
              {order?.deliveryWindow || "Available after checkout"}
            </h2>
          </div>
        </div>
        <div className="mt-7 flex items-start gap-5">
          <MapPin className="h-10 w-10 shrink-0 text-gold" />
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gold/40">
              Shipping Address
            </p>
            <h2 className="mt-2 leading-7 text-content">{address}</h2>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-5">
        <Button
          asChild
          className="h-16 w-full rounded-md bg-gold text-xs font-bold uppercase tracking-[0.18em] text-dark hover:bg-[#b89236]"
        >
          <Link href="/yourCart" className="hover:text-white">
            View Cart
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-16 w-full rounded-md border-2 border-gold/40 bg-black/15 text-xs font-black uppercase tracking-[0.18em] text-gold hover:border-gold hover:bg-[#211d12]"
        >
          <Link href="/shop">Shop More</Link>
        </Button>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center">
        <h1 className="text-xs uppercase tracking-[0.18em] text-content/45">
          Questions regarding your order?
        </h1>
        <h1 className="text-xs uppercase tracking-[0.18em] text-gold/60">
          Contact Concierge
        </h1>
      </div>
    </>
  );
}
