"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  getCart,
  getCartCount,
  getLatestOrder,
  getSession,
  getUserOrders,
  loginUser,
  registerUser,
  setSession,
} from "@/lib/storage";

const inputClass =
  "h-12 rounded-md border border-white/15 bg-black/20 px-4 text-white placeholder:text-white/25 transition focus-visible:border-gold focus-visible:bg-black/35 focus-visible:ring-0";

const emptyLogin = {
  email: "",
  password: "",
  remember: true,
};

const emptyRegister = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function AuthForm() {
  const router = useRouter();
  const [login, setLogin] = useState(emptyLogin);
  const [register, setRegister] = useState(emptyRegister);
  const [message, setMessage] = useState("");
  const [session, setSessionState] = useState(null);
  const [accountSummary, setAccountSummary] = useState({
    cartCount: 0,
    orderCount: 0,
    latestOrderId: "",
  });

  const refreshAccount = useCallback(() => {
    const session = getSession();
    const latestOrder = getLatestOrder();

    setSessionState(session);
    setAccountSummary({
      cartCount: getCartCount(getCart()),
      orderCount: getUserOrders().length,
      latestOrderId: latestOrder?.id || "",
    });
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(refreshAccount, 0);
    return () => window.clearTimeout(timer);
  }, [refreshAccount]);

  const updateLogin = (field, value) => {
    setLogin((current) => ({ ...current, [field]: value }));
  };

  const updateRegister = (field, value) => {
    setRegister((current) => ({ ...current, [field]: value }));
  };

  const redirectAfterAuth = () => {
    window.setTimeout(() => router.push("/shop"), 500);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setMessage("");

    if (!login.email || !login.password) {
      setMessage("Enter email and password to sign in.");
      return;
    }

    try {
      const session = loginUser(login);
      setSessionState(session);
      refreshAccount();
      setMessage("Welcome back. Opening the atelier.");
      redirectAfterAuth();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    setMessage("");

    if (!register.name || !register.email || !register.password) {
      setMessage("Complete your name, email, and password.");
      return;
    }

    if (register.password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    if (register.password !== register.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const session = registerUser(register);
      setSessionState(session);
      refreshAccount();
      setMessage("Account created locally. Opening the atelier.");
      redirectAfterAuth();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const continueAsGuest = () => {
    const session = setSession(
      {
        id: "guest",
        name: "Guest Curator",
        email: "guest@curator.local",
      },
      false
    );
    setSessionState(session);
    refreshAccount();
    setMessage("Guest session saved locally.");
    redirectAfterAuth();
  };

  return (
    <div className="flex min-h-screen w-full flex-col justify-center px-6 py-24 sm:px-12 lg:px-16">
      <div className="mx-auto w-full max-w-md">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold/70 transition hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back Home
        </Link>

        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.34em] text-gold/65">
            Private Atelier
          </p>
          <h1 className="mt-4 font-serif text-4xl text-content sm:text-5xl">
            {session ? `Welcome, ${session.name.split(" ")[0]}` : "Enter The Curator"}
          </h1>
          <p className="mt-4 text-sm leading-7 text-content/45">
            Your account, cart, shipping details, and latest order are stored in
            this browser for the local demo.
          </p>
          {session ? (
            <div className="mt-6 grid grid-cols-1 gap-3 rounded-lg border border-gold/15 bg-[#1a1711] p-4 text-xs uppercase tracking-[0.16em] text-content/55">
              <div className="flex items-center justify-between gap-4">
                <span>Account</span>
                <span className="truncate text-gold">{session.email}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Saved Cart</span>
                <span className="text-gold">{accountSummary.cartCount} items</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Orders</span>
                <span className="text-gold">{accountSummary.orderCount}</span>
              </div>
              {accountSummary.latestOrderId ? (
                <div className="flex items-center justify-between gap-4">
                  <span>Latest</span>
                  <span className="text-gold">{accountSummary.latestOrderId}</span>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <Tabs defaultValue="login" className="w-full text-white">
          <TabsList className="mb-10 gap-8 bg-transparent p-0">
            <TabsTrigger
              value="login"
              className="cursor-pointer rounded-md border-0 bg-transparent px-3 text-xs uppercase tracking-widest text-gold/55 hover:bg-gold/10 hover:text-gold data-active:bg-gold/15 data-active:text-gold"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="cursor-pointer rounded-md border-0 bg-transparent px-3 text-xs uppercase tracking-widest text-gold/55 hover:bg-gold/10 hover:text-gold data-active:bg-gold/15 data-active:text-gold"
            >
              Create Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="flex flex-col gap-7">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="login-email"
                  className="text-xs uppercase tracking-widest text-white/60"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/50" />
                  <Input
                    id="login-email"
                    type="email"
                    value={login.email}
                    onChange={(event) => updateLogin("email", event.target.value)}
                    placeholder="atelier@curator.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="login-password"
                  className="text-xs uppercase tracking-widest text-white/60"
                >
                  Password
                </Label>
                <Input
                  id="login-password"
                  type="password"
                  value={login.password}
                  onChange={(event) => updateLogin("password", event.target.value)}
                  placeholder="......"
                  className={inputClass}
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="remember"
                    checked={login.remember}
                    onCheckedChange={(checked) =>
                      updateLogin("remember", Boolean(checked))
                    }
                    className="rounded-sm border-white/30 data-checked:border-gold data-checked:bg-gold"
                  />
                  <Label
                    htmlFor="remember"
                    className="cursor-pointer text-xs uppercase tracking-widest text-white/60"
                  >
                    Remember Me
                  </Label>
                </div>
                <button
                  type="button"
                  onClick={() => setMessage("Create a new local account if you forgot the demo password.")}
                  className="rounded-md px-2 py-1 text-xs uppercase tracking-widest text-gold transition hover:bg-gold/10 hover:text-[#f4cf67]"
                >
                  Forgot?
                </button>
              </div>

              <Button className="h-13 w-full rounded-md bg-gold py-4 text-xs font-bold uppercase tracking-widest text-dark transition-colors hover:bg-[#b89236]">
                <ShieldCheck className="h-4 w-4" />
                Enter Atelier
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="flex flex-col gap-7">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="register-name"
                  className="text-xs uppercase tracking-widest text-white/60"
                >
                  User Name
                </Label>
                <div className="relative">
                  <User className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/50" />
                  <Input
                    id="register-name"
                    type="text"
                    value={register.name}
                    onChange={(event) => updateRegister("name", event.target.value)}
                    placeholder="Ahmed Alaa"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="register-email"
                  className="text-xs uppercase tracking-widest text-white/60"
                >
                  Email Address
                </Label>
                <Input
                  id="register-email"
                  type="email"
                  value={register.email}
                  onChange={(event) => updateRegister("email", event.target.value)}
                  placeholder="atelier@curator.com"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="register-password"
                    className="text-xs uppercase tracking-widest text-white/60"
                  >
                    Password
                  </Label>
                  <Input
                    id="register-password"
                    type="password"
                    value={register.password}
                    onChange={(event) =>
                      updateRegister("password", event.target.value)
                    }
                    placeholder="......"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="register-confirm"
                    className="text-xs uppercase tracking-widest text-white/60"
                  >
                    Confirm
                  </Label>
                  <Input
                    id="register-confirm"
                    type="password"
                    value={register.confirmPassword}
                    onChange={(event) =>
                      updateRegister("confirmPassword", event.target.value)
                    }
                    placeholder="......"
                    className={inputClass}
                  />
                </div>
              </div>

              <Button className="h-13 w-full rounded-md bg-gold py-4 text-xs font-bold uppercase tracking-widest text-dark transition-colors hover:bg-[#b89236]">
                <CheckCircle2 className="h-4 w-4" />
                Create Local Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs uppercase tracking-widest text-white/30">
            Or
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <Button
          type="button"
          onClick={continueAsGuest}
          variant="outline"
          className="h-12 w-full rounded-md border-white/10 bg-black/15 text-xs uppercase tracking-widest text-white/65 transition-all hover:border-gold/40 hover:bg-[#221d12] hover:text-white"
        >
          <Sparkles className="h-4 w-4" />
          Continue As Guest
        </Button>

        {message ? (
          <p className="animate-fade-up mt-6 rounded-md border border-gold/20 bg-gold/10 px-4 py-3 text-sm uppercase tracking-[0.16em] text-gold">
            {message}
          </p>
        ) : null}
      </div>
    </div>
  );
}
