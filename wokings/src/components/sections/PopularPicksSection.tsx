import Link from "next/link";
import { getBestsellerItems } from "@/lib/menu";
import { MenuItemCard } from "@/components/menu/MenuItemCard";

export default async function PopularPicksSection() {
  const bestsellers = await getBestsellerItems(6);

  if (bestsellers.length === 0) return null;

  return (
    <section className="bg-cream py-20 px-6 md:px-16" id="menu">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-[family-name:var(--font-body)] text-sm font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-primary" />
            Straight From The Wok
            <span className="w-8 h-px bg-primary" />
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-charcoal">
            Popular Picks
          </h2>
          <p className="font-[family-name:var(--font-body)] text-lg text-muted mt-4 max-w-2xl mx-auto">
            Our most loved dishes, prepared fresh to order with intense wok hei.
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestsellers.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* View Full Menu CTA — text link style per Stitch */}
        <div className="text-center mt-12">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-primary font-[family-name:var(--font-body)] text-sm font-bold uppercase tracking-wide hover:text-primary-dark transition-colors pb-1 border-b-2 border-primary/30 hover:border-primary"
          >
            View Full Menu →
          </Link>
        </div>
      </div>
    </section>
  );
}
