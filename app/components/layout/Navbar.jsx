"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, ShoppingCart, User, X } from "lucide-react";
import {
  getCart,
  getCartCount,
  getSession,
  logoutUser,
  subscribeToStorage,
} from "@/lib/storage";

export default function Navbar({ active = "" }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [session, setSession] = useState(null);

  const links = [
    { label: "HOME", href: "/" },
    { label: "SHOP", href: "/shop" },
    { label: "ABOUT", href: "/#craft" },
  ];

  useEffect(() => {
    const refresh = () => {
      setCartCount(getCartCount(getCart()));
      setSession(getSession());
    };

    refresh();
    return subscribeToStorage(refresh);
  }, []);

  const isActive = (link) => {
    if (active === link.label) return true;
    if (link.href === "/") return pathname === "/";
    return pathname?.startsWith(link.href);
  };

  const handleLogout = () => {
    logoutUser();
    setSession(null);
    setOpen(false);
    router.push("/");
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 w-full border-b border-white/10 bg-neutral-950/80 px-4 py-4 text-gold shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-md sm:px-8 lg:px-12">
      <div className="mx-auto flex h-12 w-full max-w-7xl items-center justify-between gap-6">
        <Link href="/" aria-label="The Curator home" onClick={() => setOpen(false)}>
          <h1 className="font-serif text-lg font-black tracking-[0.24em] text-gold transition hover:text-[#f4cf67] sm:text-2xl">
            THE CURATOR
          </h1>
        </Link>

        <ul className="hidden items-center justify-between gap-10 md:flex">
          {links.map((link) => {
            const current = isActive(link);

            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`font-serif text-xs font-semibold tracking-[0.24em] transition-colors duration-300 hover:text-gold ${
                    current
                      ? "border-b border-gold pb-1 text-gold"
                      : "border-b border-transparent pb-1 text-content/75 hover:text-content"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/yourCart"
            aria-label="Shopping cart"
            className="relative grid h-10 w-10 place-items-center rounded-md text-gold transition-colors duration-300 hover:bg-gold/15 hover:text-[#f4cf67]"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount ? (
              <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-dark">
                {cartCount}
              </span>
            ) : null}
          </Link>

          <Link
            href="/login"
            aria-label="Account"
            className="hidden h-10 items-center gap-2 rounded-md px-2 text-gold transition-colors duration-300 hover:bg-gold/15 hover:text-[#f4cf67] sm:flex"
          >
            <User className="h-5 w-5" />
            {session?.name ? (
              <span className="max-w-28 truncate text-xs uppercase tracking-[0.18em] text-content/70">
                {session.name.split(" ")[0]}
              </span>
            ) : null}
          </Link>

          {session ? (
            <button
              type="button"
              aria-label="Sign out"
              onClick={handleLogout}
              className="hidden h-10 w-10 place-items-center rounded-md text-gold/70 transition hover:bg-gold/15 hover:text-gold sm:grid"
            >
              <LogOut className="h-4 w-4" />
            </button>
          ) : null}

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen((current) => !current)}
            className="grid h-10 w-10 place-items-center rounded-md text-gold transition hover:bg-gold/15 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="animate-fade-up mx-auto mt-4 flex w-full max-w-7xl flex-col gap-3 rounded-lg border border-white/10 bg-black/35 p-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded-md px-3 py-3 text-xs uppercase tracking-[0.24em] transition hover:bg-gold/10 ${
                isActive(link) ? "text-gold" : "text-content/70 hover:text-content"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-md px-3 py-3 text-xs uppercase tracking-[0.24em] text-content/70 transition hover:bg-gold/10 hover:text-content"
          >
            <User className="h-4 w-4 text-gold" />
            {session?.name ? session.name : "Account"}
          </Link>
          {session ? (
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-md px-3 py-3 text-left text-xs uppercase tracking-[0.24em] text-content/70 transition hover:bg-gold/10 hover:text-content"
            >
              <LogOut className="h-4 w-4 text-gold" />
              Sign Out
            </button>
          ) : null}
        </div>
      ) : null}
    </nav>
  );
}
