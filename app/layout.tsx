import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "DOGIFY | Everything Your Pet Needs. One Trusted Platform.",
  description:
    "DOGIFY is India's premium pet-care ecosystem for food, accessories, grooming, medicines, and expert health support.",
  keywords: [
    "DOGIFY",
    "pet care India",
    "dog grooming",
    "pet food",
    "pet medicines",
    "vet consultation"
  ],
  openGraph: {
    title: "DOGIFY | Premium Pet-Care Ecosystem",
    description:
      "Food, accessories, grooming, medicines, and 24/7 health support for modern pet parents.",
    type: "website",
    locale: "en_IN"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
