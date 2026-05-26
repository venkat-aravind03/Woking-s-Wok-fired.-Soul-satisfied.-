import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingOrderButton } from "@/components/FloatingOrderButton";
import { siteConfig } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Woking's | Wok-fired Food, Kondapur Hyderabad",
    template: "%s | Woking's Kondapur",
  },
  description: siteConfig.description,
  keywords: [
    "Woking's",
    "Kondapur food",
    "Gachibowli restaurant",
    "Indo-Chinese Hyderabad",
    "food stall Hyderabad",
    "wok fired noodles Hyderabad",
    "Destination Food Court",
    "Kondapur wok",
    "Chinese food Gachibowli",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    title: "Woking's | Wok-fired Food, Kondapur Hyderabad",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Woking's | Wok-fired Food, Kondapur Hyderabad",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: siteConfig.name,
  description: "Wok-fired Indo-Chinese street food stall",
  servesCuisine: ["Indo-Chinese", "Street Food", "Asian"],
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Destination Food Court, beside HDFC Bank, Kondapur",
    addressLocality: "Gachibowli",
    addressRegion: "Telangana",
    postalCode: "500084",
    addressCountry: "IN",
  },
  openingHours: "Mo-Su 11:00-23:00",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: siteConfig.rating,
    reviewCount: "500",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingOrderButton />
      </body>
    </html>
  );
}
