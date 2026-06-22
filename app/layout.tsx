import type { Metadata } from "next";
import { WhatsAppAssistant } from "@/components/whatsapp-assistant";
import { dogifyContact } from "@/lib/contact";
import "./globals.css";

export const metadata: Metadata = {
  title: "DOGIFY | Everything Your Pet Needs. One Trusted Platform.",
  description:
    "DOGIFY is India's premium pet-care ecosystem for food, accessories, medicines, and expert health support.",
  keywords: [
    "DOGIFY",
    "pet care India",
    "pet food",
    "pet medicines",
    "vet consultation"
  ],
  openGraph: {
    title: "DOGIFY | Premium Pet-Care Ecosystem",
    description:
      "Food, accessories, medicines, and 24/7 health support for modern pet parents.",
    type: "website",
    locale: "en_IN"
  },
  twitter: {
    card: "summary_large_image",
    title: "DOGIFY | Everything Your Pet Needs",
    description:
      "India's premium pet-care ecosystem for food, accessories, medicines, and health support."
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "/"
  }
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DOGIFY",
    slogan: "Everything Your Pet Needs. One Trusted Platform.",
    email: dogifyContact.email,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: dogifyContact.whatsappNumber,
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    additionalType: "https://schema.org/PetStore",
    name: "DOGIFY",
    description: "Food, accessories, medicines, and pet health support in India.",
    email: dogifyContact.email,
    telephone: dogifyContact.whatsappNumber,
    areaServed: "India"
  },
  {
    "@context": "https://schema.org",
    "@type": "PetStore",
    name: "DOGIFY Pet Care Business",
    description: "Premium pet-care commerce and service platform for Indian pet parents.",
    email: dogifyContact.email,
    telephone: dogifyContact.whatsappNumber
  }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <WhatsAppAssistant />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </body>
    </html>
  );
}
