import Link from "next/link";
import { siteConfig } from "@/lib/utils";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About Us", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
  { label: "Order Now", href: "/menu" },
];

function WokIconFooter() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C11.5 4 10 5 9 6C8 7 7.5 8 8 9.5C8.5 11 10 12 12 12C14 12 15.5 11 16 9.5C16.5 8 16 7 15 6C14 5 12.5 4 12 2Z"
        fill="#E8490F"
        opacity="0.9"
      />
      <path
        d="M7 6C6.5 7.5 6.5 8 7 9C7.5 10 8 10.5 8 10.5"
        stroke="#E8490F"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M17 6C17.5 7.5 17.5 8 17 9C16.5 10 16 10.5 16 10.5"
        stroke="#E8490F"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M4 14C4 14 5 18 8 20C10 21.3 14 21.3 16 20C19 18 20 14 20 14"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M3 14H21" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M20 14L22 13"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t-[3px] border-t-primary bg-charcoal">
      <div className="mx-auto max-w-[1280px] px-20 pt-16 max-lg:px-6 max-lg:pt-12">
        {/* 3-column grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr_1.5fr] lg:gap-8">
          {/* Column 1 — Brand */}
          <div>
            <div className="flex items-center gap-2">
              <WokIconFooter />
              <span className="font-[family-name:var(--font-heading)] text-[26px] font-bold text-white">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-2 font-[family-name:var(--font-heading)] text-[17px] italic text-white/55">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 max-w-[280px] font-[family-name:var(--font-body)] text-sm leading-[1.7] text-white/45">
              Kondapur&apos;s favourite wok-fired food stall, serving fresh
              Indo-Chinese flavours at Destination Food Court, Gachibowli,
              Hyderabad — daily from 11AM to 11PM.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="mb-5 font-[family-name:var(--font-body)] text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group flex items-center font-[family-name:var(--font-body)] text-[15px] text-white/65 transition-all duration-150 hover:translate-x-1 hover:text-white"
                >
                  {link.label}
                  <span className="ml-2 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                    →
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 — Find Us + Order */}
          <div>
            {/* Find Us */}
            <h3 className="mb-5 font-[family-name:var(--font-body)] text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
              Find Us
            </h3>
            <p className="font-[family-name:var(--font-body)] text-sm leading-[1.7] text-white/65">
              📍 Destination Food Court, beside HDFC Bank,
              <br />
              Kondapur, Camelot Layout, Gachibowli,
              <br />
              Hyderabad, Telangana — 500084
            </p>
            <a
              href={siteConfig.location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-[family-name:var(--font-body)] text-sm font-medium text-primary transition-colors duration-150 hover:text-primary-dark hover:underline"
            >
              Get Directions →
            </a>

            {/* Divider */}
            <div className="my-6 h-px bg-white/[0.08]" />

            {/* Order Online */}
            <h3 className="mb-4 font-[family-name:var(--font-body)] text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
              Order Online
            </h3>
            <div className="flex flex-col gap-2">
              <a
                href={siteConfig.orderLinks.zomato}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 items-center justify-center rounded-full border border-[rgba(239,68,68,0.40)] bg-[rgba(239,68,68,0.15)] font-[family-name:var(--font-body)] text-[13px] font-semibold text-[#FC8B8B] transition-all duration-200 hover:border-[rgba(239,68,68,0.60)] hover:bg-[rgba(239,68,68,0.25)]"
              >
                Order on Zomato ↗
              </a>
              <a
                href={siteConfig.orderLinks.swiggy}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 items-center justify-center rounded-full border border-[rgba(252,128,25,0.40)] bg-[rgba(252,128,25,0.15)] font-[family-name:var(--font-body)] text-[13px] font-semibold text-[#FDB980] transition-all duration-200 hover:border-[rgba(252,128,25,0.60)] hover:bg-[rgba(252,128,25,0.25)]"
              >
                Order on Swiggy ↗
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-12 flex items-center justify-between border-t border-white/[0.08] py-5 max-md:flex-col max-md:gap-2 max-md:text-center">
          <p className="font-[family-name:var(--font-body)] text-[13px] text-white/35">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-[family-name:var(--font-body)] text-[13px] text-white/35">
            Made with{" "}
            <span className="text-primary">❤️</span> in Hyderabad
          </p>
        </div>
      </div>
    </footer>
  );
}
