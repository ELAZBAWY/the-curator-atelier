import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const notoserif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata = {
  title: "THE CURATOR",
  description: "A local-first fragrance boutique experience.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${notoserif.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#121212]">{children}</body>
    </html>
  );
}
