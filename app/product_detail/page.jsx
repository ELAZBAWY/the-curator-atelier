"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  addToCart,
  formatPrice,
  getProducts,
  isProductInWishlist,
  subscribeToStorage,
  toggleWishlist,
} from "@/lib/storage";

const sizes = ["30ML", "50ML", "100ML"];

const tabItems = ["Description", "Ingredients", "Application", "Reviews"];

const noteMap = {
  FLORAL: [
    { label: "Top", value: "Pink Pepper" },
    { label: "Heart", value: "Rose Petals" },
    { label: "Base", value: "Soft Musk" },
  ],
  FRESH: [
    { label: "Top", value: "Bergamot" },
    { label: "Heart", value: "Green Fig" },
    { label: "Base", value: "Cedar" },
  ],
  ORIENTAL: [
    { label: "Top", value: "Saffron" },
    { label: "Heart", value: "Amber Resin" },
    { label: "Base", value: "Smoked Vanilla" },
  ],
  WOODY: [
    { label: "Top", value: "Cardamom" },
    { label: "Heart", value: "Vetiver" },
    { label: "Base", value: "Sandalwood" },
  ],
};

function buildGallery(product, products) {
  const nearby = products
    .filter((item) => item.id !== product.id)
    .slice(0, 2)
    .map((item) => ({
      src: item.image,
      alt: `${item.name} perfume bottle`,
    }));

  return [
    { src: product.image, alt: `${product.name} perfume bottle` },
    ...nearby,
  ];
}

export default function ProductDetail() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("50ML");
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const catalog = getProducts();
      const params = new URLSearchParams(window.location.search);
      const productId = Number(params.get("id"));
      const current =
        catalog.find((item) => Number(item.id) === productId) || catalog[0];

      setProducts(catalog);
      setProduct(current);
      setActiveImage({
        src: current.image,
        alt: `${current.name} perfume bottle`,
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!product) return undefined;

    const refresh = () => setFavorite(isProductInWishlist(product.id));
    refresh();
    return subscribeToStorage(refresh);
  }, [product]);

  const gallery = useMemo(() => {
    if (!product) return [];
    return buildGallery(product, products);
  }, [product, products]);

  const notes = product ? noteMap[product.scentType] || noteMap.FRESH : [];

  const updateQuantity = (direction) => {
    setQuantity((current) => {
      if (direction === "decrease") return Math.max(1, current - 1);
      return Math.min(10, current + 1);
    });
  };

  const handleAddToCart = () => {
    addToCart(product, { size: selectedSize, quantity });
    setNotice(`${quantity} x ${product.name} added to cart.`);
    window.setTimeout(() => setNotice(""), 1800);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    setFavorite((current) => !current);
  };

  if (!product || !activeImage) {
    return (
      <div className="min-h-screen bg-[#131313] text-[#e2e2e2]">
        <Navbar active="SHOP" />
        <main className="grid min-h-screen place-items-center px-4">
          <p className="animate-pulse text-xs uppercase tracking-[0.3em] text-gold">
            Loading fragrance
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#131313] text-[#e2e2e2]">
      <Navbar active="SHOP" />

      <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-8 lg:px-12">
        <section className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="animate-fade-up flex flex-col-reverse gap-5 lg:col-span-7 lg:flex-row lg:gap-6">
            <div className="flex gap-4 overflow-x-auto lg:w-24 lg:flex-col lg:overflow-visible">
              {gallery.map((image) => {
                const isActive = activeImage.src === image.src;

                return (
                  <button
                    key={image.src}
                    type="button"
                    aria-label={`View ${image.alt}`}
                    onClick={() => setActiveImage(image)}
                    className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-md border bg-[#101010] transition-colors duration-300 lg:w-full ${
                      isActive
                        ? "border-gold bg-[#211d12]"
                        : "border-transparent hover:border-gold/60 hover:bg-[#171717]"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="96px"
                      className="object-contain p-3 transition duration-300"
                    />
                  </button>
                );
              })}
            </div>

            <div className="relative min-h-[430px] flex-1 overflow-hidden rounded-lg border border-white/5 bg-[#101010] sm:min-h-[560px] lg:min-h-[720px]">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                priority
                loading="eager"
                sizes="(min-width: 1024px) 660px, 100vw"
                className="object-contain p-10 transition duration-700 hover:scale-105"
              />
            </div>
          </div>

          <div className="animate-fade-up flex flex-col lg:col-span-5">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.48em] text-gold">
              {product.brand}
            </p>
            <h1 className="font-serif text-5xl leading-none text-[#f5f0e8] sm:text-6xl">
              {product.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div
                className="flex text-[#fcbd00]"
                aria-label={`${product.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4"
                    fill={index < product.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-xs uppercase tracking-[0.18em] text-[#99907e]">
                {product.reviews}k Reviews
              </span>
            </div>

            <p className="mt-8 font-serif text-3xl tracking-[0.08em] text-gold">
              {formatPrice(product.price)}
            </p>

            <p className="mt-9 max-w-lg text-sm italic leading-7 text-[#d0c5b2]">
              {product.description}
            </p>

            <div className="mt-9 grid grid-cols-3 rounded-lg bg-[#1b1b1b] px-4 py-6 sm:px-6">
              {notes.map((note, index) => (
                <div
                  key={note.label}
                  className={`text-center ${
                    index === 1 ? "border-x border-[#4d4637]/40" : ""
                  }`}
                >
                  <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-[#99907e]">
                    {note.label}
                  </p>
                  <p className="font-serif text-xs text-[#f5f0e8]">
                    {note.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 space-y-8">
              <div>
                <p className="mb-4 text-[10px] uppercase tracking-[0.24em] text-[#d0c5b2]">
                  Select Size
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      type="button"
                      variant="outline"
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 rounded-md border text-xs tracking-[0.16em] text-[#f5f0e8] hover:border-gold hover:bg-[#211d12] hover:text-gold ${
                        selectedSize === size
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-[#4d4637] bg-black/15"
                      }`}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-4 text-[10px] uppercase tracking-[0.24em] text-[#d0c5b2]">
                  Quantity
                </p>
                <div className="inline-grid h-11 grid-cols-3 overflow-hidden rounded-md border border-[#4d4637]">
                  <Button
                    type="button"
                    variant="ghost"
                    aria-label="Decrease quantity"
                    onClick={() => updateQuantity("decrease")}
                    className="h-full rounded-none px-4 text-[#f5f0e8] hover:bg-gold/15 hover:text-gold"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="grid min-w-12 place-items-center border-x border-[#4d4637]/50 px-5 text-sm">
                    {quantity}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    aria-label="Increase quantity"
                    onClick={() => updateQuantity("increase")}
                    className="h-full rounded-none px-4 text-[#f5f0e8] hover:bg-gold/15 hover:text-gold"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-9 space-y-4">
              <Button
                type="button"
                onClick={handleAddToCart}
                className="h-14 w-full rounded-md border border-gold bg-gold text-xs font-bold uppercase tracking-[0.24em] text-[#241a00] hover:bg-[#b89236]"
              >
                <ShoppingBag className="h-4 w-4" />
                Add To Cart
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleWishlist}
                className="h-14 w-full rounded-md border-[#4d4637] bg-black/15 text-xs uppercase tracking-[0.24em] text-[#f5f0e8] hover:border-gold hover:bg-[#211d12] hover:text-gold"
              >
                <Heart
                  className="h-4 w-4"
                  fill={favorite ? "currentColor" : "none"}
                />
                {favorite ? "Saved To Wishlist" : "Add To Wishlist"}
              </Button>
              {notice ? (
                <p className="animate-fade-up text-center text-xs uppercase tracking-[0.2em] text-gold">
                  {notice}
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <Tabs defaultValue="Description" className="mt-32">
          <TabsList
            variant="line"
            className="w-full justify-start gap-9 overflow-x-auto rounded-none border-b border-white/10 p-0"
          >
            {tabItems.map((item) => (
              <TabsTrigger
                key={item}
                value={item}
                className="h-14 flex-none rounded-none px-0 pb-5 text-[10px] uppercase tracking-[0.3em] text-[#d0c5b2] after:bg-gold data-active:text-gold"
              >
                {item}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="Description" className="mt-12">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-24">
              <div>
                <h2 className="font-serif text-3xl text-[#f5f0e8]">
                  The Story Behind the Scent
                </h2>
                <p className="mt-8 max-w-xl text-sm leading-8 text-[#d0c5b2]">
                  {product.name} is curated for slow discovery. Its profile
                  opens with clarity, settles into a textured heart, and leaves a
                  polished dry-down that feels personal without becoming loud.
                </p>

                <ul className="mt-8 space-y-4">
                  {[
                    "Sustainably sourced ingredients",
                    "Hand-selected by the atelier",
                    "Long-wearing composition",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-4 text-xs uppercase tracking-[0.16em] text-[#f5f0e8]"
                    >
                      <span className="h-1.5 w-1.5 bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Card className="rounded-lg border-0 bg-[#1b1b1b] py-0 text-[#e2e2e2] ring-0">
                <CardHeader className="px-8 pt-8 sm:px-12 sm:pt-12">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-gold">
                    Client Experience
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center bg-[#353535] font-serif text-xs">
                      C.A.
                    </div>
                    <div>
                      <CardTitle className="text-xs font-bold uppercase tracking-[0.18em] text-[#f5f0e8]">
                        Curator Atelier
                      </CardTitle>
                      <div className="mt-2 flex text-[#fcbd00]">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className="h-4 w-4"
                            fill={index < product.rating ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-8 pb-8 sm:px-12 sm:pb-12">
                  <p className="text-sm italic leading-7 text-[#d0c5b2]">
                    A refined choice for evenings, travel, and the small rituals
                    that make a fragrance feel like part of your day.
                  </p>
                  <Button
                    asChild
                    variant="link"
                    className="mt-8 h-auto rounded-none px-0 pb-1 text-[10px] uppercase tracking-[0.24em] text-[#f5f0e8] underline decoration-gold underline-offset-8 hover:text-gold"
                  >
                    <Link href="/shop">Explore More Scents</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent
            value="Ingredients"
            className="mt-12 text-sm leading-8 text-[#d0c5b2]"
          >
            Bergamot, saffron, textured florals, aromatic woods, amber resin,
            soft musk, and a balanced fixative accord.
          </TabsContent>

          <TabsContent
            value="Application"
            className="mt-12 text-sm leading-8 text-[#d0c5b2]"
          >
            Apply to pulse points and allow the fragrance to settle naturally on
            the skin. One to two sprays are enough for a refined all-day trail.
          </TabsContent>

          <TabsContent
            value="Reviews"
            className="mt-12 text-sm leading-8 text-[#d0c5b2]"
          >
            {product.reviews}k curated reviews praise {product.name} for its
            balance, projection, and polished dry-down.
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
