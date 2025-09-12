import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Interior Design Cost Calculator (India) – Free Estimate",
  description:
    "Calculate interior design costs for your home in India. Get instant estimates for premium and luxury interior packages with detailed breakdowns.",
  generator: "v0.app",
  keywords:
    "interior design cost calculator, home interior cost India, interior design estimate, modular kitchen cost, bedroom interior cost",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
