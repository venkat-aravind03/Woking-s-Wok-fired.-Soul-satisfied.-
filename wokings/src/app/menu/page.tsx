import Image from "next/image";
import Link from "next/link";
import MenuClientContent from "./MenuClientContent";

export const metadata = {
  title: "Our Menu",
  description:
    "Explore Woking's full menu of fresh wok-fired Indo-Chinese dishes. Available on Zomato and Swiggy, Kondapur, Gachibowli, Hyderabad.",
};

export default function MenuPage() {
  return (
    <>
      {/* Section 1: Page Hero Strip — exact Stitch */}
      <section className="h-[280px] max-md:h-[220px] relative flex flex-col items-center justify-center text-center px-4 md:px-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgf32A-BniKp4BKj7pRXWO_4AXEyfATGiWiuMMOK-7x7sli5BUrTctm0kkChIf7KfYwLyzSNQ_gZwqYdCq56Vl6gownmfyQDmiGtldttSqMwTUU627jMOp3UnZIF1ZtQkWlHoXxKOjU1sH69ErsohZlUBki6Rl7oHDh87Rpj832Ho3yducLybWqHDsDlymqRzuq7m13a5cgH_JoYYRwqr6xzCcYQcU0SjMKhpk3igfxNdMTOdYOfg2KqMV9Gza76PazXlrHR-nPOg"
            alt="Overhead view of steaming wok with fresh vegetables and noodles"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/85 to-[#1a1a1a]/70 z-10" />
        <div className="relative z-20 flex flex-col items-center">
          <div className="text-white/50 font-[family-name:var(--font-body)] text-sm mb-1">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-1.5 text-white/30">→</span>
            <span className="text-white/80">Menu</span>
          </div>
          <h1 className="font-[family-name:var(--font-heading)] text-5xl max-md:text-4xl font-bold text-white mb-3">
            Our Menu
          </h1>
          <p className="font-[family-name:var(--font-body)] text-lg max-md:text-[15px] text-white/80 mb-6 max-w-lg">
            Exciting, Appetizing &amp; Lip-smacking!!!
          </p>
          <div className="bg-[#E8490F] text-white font-[family-name:var(--font-body)] text-[12px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            Available on Zomato &amp; Swiggy
          </div>
        </div>
      </section>

      <MenuClientContent />
    </>
  );
}
