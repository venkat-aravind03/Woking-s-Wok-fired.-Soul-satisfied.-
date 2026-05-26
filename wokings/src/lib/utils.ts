import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const siteConfig = {
  name: "Woking's",
  tagline: "Wok-fired. Soul-satisfied.",
  description:
    "Woking's is Kondapur's most loved wok-fired food stall at Destination Food Court, beside HDFC Bank, Gachibowli, Hyderabad. Fresh Indo-Chinese street food — order on Zomato or Swiggy.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  location: {
    full: "Destination Food Court, beside HDFC Bank, Kondapur, Camelot Layout, Gachibowli, Hyderabad, Telangana 500084",
    short: "Kondapur, Gachibowli, Hyderabad",
    street:
      "Destination Food Court, beside HDFC Bank, Kondapur, Gachibowli, Hyderabad",
    mapsUrl: "https://maps.app.goo.gl/ZhZYr7Ao1WLX8Mdh9?g_st=aw",
    coordinates: { lat: 17.4401, lng: 78.3489 },
  },
  hours: "Mon–Sun: 11:00 AM – 11:00 PM",
  rating: "4.8",
  reviewCount: "500+",
  orderLinks: {
    zomato: "https://www.zomato.com/hyderabad/search?q=Wokings",
    swiggy: "https://www.swiggy.com/search?query=Wokings",
  },
} as const;
