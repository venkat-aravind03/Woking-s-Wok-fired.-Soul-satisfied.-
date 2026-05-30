import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/utils";

const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Careers", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t-4 border-t-primary bg-charcoal w-full">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 py-12 max-w-[1200px] mx-auto text-white/60 gap-6">
        {/* Left — Brand + description */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <Link href="/">
            <span className="font-[family-name:var(--font-heading)] text-2xl font-bold text-primary">
              Woking
            </span>
          </Link>
          <p className="font-[family-name:var(--font-body)] text-base mt-2 max-w-sm text-white/50">
            Wok-fired street food delivering premium flavors and satisfying portions straight to your door.
          </p>
          <div className="mt-4 font-[family-name:var(--font-body)] text-base text-white/40">
            © {new Date().getFullYear()} Woking Street Food. All rights reserved.
          </div>
        </div>

        {/* Right — Links */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-[family-name:var(--font-body)] text-sm font-bold uppercase tracking-wide text-white/50 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
