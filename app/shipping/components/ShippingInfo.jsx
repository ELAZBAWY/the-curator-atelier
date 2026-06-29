"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createOrder,
  emptyShipping,
  getCart,
  getShipping,
  saveShipping,
} from "@/lib/storage";

const fieldClass =
  "h-12 rounded-md border border-gold/20 bg-black/15 px-4 text-content placeholder:text-content/25 transition focus-visible:border-gold focus-visible:bg-black/25 focus-visible:ring-0";

const paymentMethods = [
  { label: "PayPal", value: "PayPal", icon: Wallet },
  { label: "Credit Card", value: "Credit Card", icon: CreditCard },
];

export default function ShippingInfo() {
  const router = useRouter();
  const [shipping, setShipping] = useState(emptyShipping);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setShipping(getShipping()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const updateField = (field, value) => {
    setShipping((current) => {
      const next = { ...current, [field]: value };
      saveShipping(next);
      return next;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const required = ["firstName", "lastName", "address", "city", "postalCode"];
    const missing = required.some((field) => !String(shipping[field]).trim());

    if (missing) {
      setMessage("Complete the shipping fields before confirmation.");
      return;
    }

    if (!getCart().length) {
      setMessage("Your cart is empty. Add a scent before checkout.");
      return;
    }

    try {
      saveShipping(shipping);
      createOrder(shipping);
      router.push("/OrderConfirmation");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-up flex flex-col gap-12 text-content">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-3">
          <Label className="text-xs uppercase tracking-[0.22em] text-content/55">
            First Name
          </Label>
          <Input
            type="text"
            value={shipping.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
            placeholder="Julian"
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label className="text-xs uppercase tracking-[0.22em] text-content/55">
            Last Name
          </Label>
          <Input
            type="text"
            value={shipping.lastName}
            onChange={(event) => updateField("lastName", event.target.value)}
            placeholder="Thorne"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Label className="text-xs uppercase tracking-[0.22em] text-content/55">
          Address Line
        </Label>
        <Input
          type="text"
          value={shipping.address}
          onChange={(event) => updateField("address", event.target.value)}
          placeholder="1282 Mayfair Crescent"
          className={fieldClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="flex flex-col gap-3">
          <Label className="text-xs uppercase tracking-[0.22em] text-content/55">
            City
          </Label>
          <Input
            type="text"
            value={shipping.city}
            onChange={(event) => updateField("city", event.target.value)}
            placeholder="New York"
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label className="text-xs uppercase tracking-[0.22em] text-content/55">
            Postal Code
          </Label>
          <Input
            type="text"
            value={shipping.postalCode}
            onChange={(event) => updateField("postalCode", event.target.value)}
            placeholder="10001"
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label className="text-xs uppercase tracking-[0.22em] text-content/55">
            Country
          </Label>
          <Input
            type="text"
            value={shipping.country}
            onChange={(event) => updateField("country", event.target.value)}
            placeholder="United States"
            className={fieldClass}
          />
        </div>
      </div>

      <hr className="border-gold/10" />

      <div>
        <h2 className="font-serif text-4xl text-content">Payment Method</h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const active = shipping.paymentMethod === method.value;

            return (
              <Button
                key={method.value}
                type="button"
                aria-pressed={active}
                onClick={() => updateField("paymentMethod", method.value)}
                variant="outline"
                className={`h-28 rounded-lg border-2 transition ${
                  active
                    ? "border-gold bg-[#211d12] text-gold"
                    : "border-gold/25 bg-black/15 text-content/45 hover:border-gold/60 hover:bg-[#1f1a10] hover:text-content"
                }`}
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  <Icon className="h-6 w-6" />
                  <p className="text-xs uppercase tracking-[0.22em]">
                    {method.label}
                  </p>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {message ? (
        <p className="animate-fade-up rounded-md border border-gold/20 bg-gold/10 px-4 py-3 text-sm uppercase tracking-[0.16em] text-gold">
          {message}
        </p>
      ) : null}

      <div className="flex w-full items-center justify-center">
        <Button className="h-14 w-full max-w-sm rounded-md bg-gold text-xs font-bold uppercase tracking-widest text-dark transition-colors hover:bg-[#b89236]">
          Confirm Local Order
        </Button>
      </div>
    </form>
  );
}
