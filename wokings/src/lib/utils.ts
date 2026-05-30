import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Branch {
  id: string;
  label: string;
  shortLabel: string;
  address: string;
  mapsUrl: string;
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
    branches: [
      {
        id: "branch-1",
        label: "Kondapur — Destination Food Court",
        shortLabel: "Destination Food Court",
        address:
          "Destination Food Court, beside HDFC Bank, Kondapur, Camelot Layout, Gachibowli, Hyderabad, Telangana — 500084",
        mapsUrl: "https://maps.app.goo.gl/ZhZYr7Ao1WLX8Mdh9?g_st=aw",
      },
      {
        id: "branch-2",
        label: "Kondapur — Eat O Clock Drive In",
        shortLabel: "Eat O Clock Drive In",
        address:
          "Plot No. 466C, Eat O Clock Drive In, Kondapur, Raghavendra Colony, Gachibowli, Hyderabad, Telangana — 500084",
        mapsUrl:
          "https://www.google.com/maps/search/Eat+O+Clock+Drive+In+Kondapur+Hyderabad",
      },
    ] as Branch[],
  },
  hours: "Mon–Sun: 11:00 AM – 11:00 PM",
  rating: "4.8",
  reviewCount: "500+",
  orderLinks: {
    zomato: "https://www.zomato.com/hyderabad/search?q=Wokings",
    swiggy: "https://www.swiggy.com/search?query=Wokings",
  },
} as const;

/**
 * Returns a human-readable relative time string.
 * e.g. "Today", "1 day ago", "3 days ago", "2 months ago"
 */
export function getRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 30) return `${diffDays} days ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths === 1) return "1 month ago";
  if (diffMonths < 12) return `${diffMonths} months ago`;
  return "Over a year ago";
}
