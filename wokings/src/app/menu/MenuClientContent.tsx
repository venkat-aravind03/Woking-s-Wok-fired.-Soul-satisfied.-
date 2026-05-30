"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/utils";
import { Search } from "lucide-react";

/* ================================================================
   STATIC MENU DATA — matches Stitch exactly
   ================================================================ */

interface StaticMenuItem {
  name: string;
  price: number;
  image?: string;
}

interface StaticComboItem {
  name: string;
  description: string;
  price: number;
}

const STARTERS_VEG: StaticMenuItem[] = [
  { name: "Veg Manchurian (Dry)", price: 150, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6QmYq95Z0TLIPlsC3ZkLfgKq6iOrwM9223sRwfH6B9FxXvt1akeQl207wG42csQmRrZ13rR1y6XVCLZ0idcA1CiE5T-f6Sqi_q7EgXACOzbr5yP4RUvfqzg8srzvq5BIrVuJZqmXxghAxqtp8sj0sLGZufo7e2gh3YPx2O7sCCksitPR_AwlyvFkPbYYl-woMJGegXBDJwrM-KH9nhH5kyy5e8JCOojsEUCk-bg604va0aq_kbh2Y2TAAqK2TVZ1QODLQMdHqGKM" },
  { name: "Veg Manchurian (Wet)", price: 160 },
  { name: "Gobi Manchurian", price: 160, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDw9DH23lPYfTKnUBH-zduDXYtdXLxqemvRTdJXp3po94uVzhKV1TspVNT43GOGyEeF93PXEgJ3S2WvWKkaa2VJDfuWyKrhFvselDy7czqzvmVwJMv4lsdyh67GDlaqWqox--Mo42It0HgArxpmmlIap6P_w3YBCV4HZqDVB6vVXyUiavVcAPXSHHH4IslKaIUlP3LO6IfR-rQfiuJS2jLKk_wrxOUe3gFCAtj86F7pAznZxVdAWIVPDzLLeu_rPWXO_IPXvEaFRGI" },
  { name: "Chili Babycorn", price: 170, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhRaxrRnW-STXl2F4iWlk3jj6xso2b3H7IH2GjRQehjlpb_mymBbjlN2UN4BVkvpVk-uR02UOEeBjhkEk8O75TsVkF2TkOcSJ69yo0zm5hNK-YOoQyOzWJpV5LY8dEf8m0i7ctj6n39pzy4xDMkg8cWKA2K4MgrVjYbSSb5nyDVdYQZv7PHUIRszxsz0BWRl-3LUKmfNZjIVZjB6GRqelSB2-0jq_TU4oQPXw8TeCtugb5txayjLJrcrygu44Nr8gKggQrRrqIvy4" },
  { name: "Gobi 65", price: 170 },
  { name: "Mushroom Manchurian", price: 180 },
  { name: "Baby Corn 65", price: 180 },
  { name: "Chilli Babycorn", price: 180 },
  { name: "Chilli Garlic Potato", price: 180 },
  { name: "Paneer Manchurian", price: 190 },
  { name: "Honey Chilli Potato", price: 190 },
  { name: "Baby Corn Majestic", price: 190 },
  { name: "Paneer 65", price: 200 },
  { name: "Chilli Paneer", price: 200 },
  { name: "Paneer Majestic", price: 210 },
  { name: "Dragon Paneer", price: 240 },
  { name: "Sweet Chilli Paneer", price: 240 },
];

const STARTERS_NONVEG: StaticMenuItem[] = [
  { name: "Chicken Manchurian (Dry)", price: 190 },
  { name: "Chicken Manchurian (Wet)", price: 200 },
  { name: "Ginger Chicken", price: 190 },
  { name: "Chicken 65", price: 200, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAETEVRYNpLwT468y1kdfiYdXzuhWA5_eDwkFRnsLWwdfVPRPCJ2qrpOFe7b2ygu7KQfNx4db8EeTpJgz0ms1u3xMeGUz8vH0qFrggizxQeZJkMA6k3_wbqHWtDf2SstR3B9w75s7tnwJorvfNuWm_CrwrRnfyhq9f0YyDzYHDIGO6Rb64ABWro9zpGLTVuYJGaqZkyqFbyPfCB2-MdW2KsJzbcp1qL-SDLrnXlKFRvGv6O0SP5K3ZFvTxQ7KuQ5QQt4LhJAkjvMVM" },
  { name: "Schezwan Chicken", price: 200, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAr9RIuJSKayyL0cE9Lwi5D0yIzTaafPsyqcSz7xzFfXD8-GfUVP5wLKksangcI1wNEEQGyO6Cqz-z2fe36Jz2UplchodbSOgk0ZRoTA6Moh1dIcUHjtse1XOkgfw_rM09peL9uD5vP5gVtOVyMfRPsebu3XVLVl4kQIY2mPL5TPsPWaDdOXW_Q0ptZcyFSqhDPVza6umySsbI_88Z2xeH6Vhjun35DxRzVlvEpMHI2QT3aMfiGmkn206vFJHp5QPP-hmr5AJFcFfU" },
  { name: "Garlic Chicken", price: 200 },
  { name: "Chilli Chicken", price: 200 },
  { name: "Chicken Majestic", price: 210 },
  { name: "Pepper Chicken", price: 210 },
  { name: "Honey Chilli Chicken", price: 210 },
  { name: "Woking Spl Chicken", price: 210 },
  { name: "Dragon Chicken", price: 240 },
  { name: "Sweet Chilli Chicken", price: 240 },
];

const STARTERS_EGG: StaticMenuItem[] = [
  { name: "Egg Manchurian (Dry)", price: 180 },
  { name: "Chilli Egg", price: 180 },
  { name: "Egg 65", price: 180 },
  { name: "Schezwan Egg", price: 180 },
];

const MAIN_VEG_FRIED_RICE: StaticMenuItem[] = [
  { name: "Veg Fried Rice", price: 150, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKqCWO1pJarqOsEX3-K7xz9Fag3nSARv73FIFYwUB05CPNW0onT6-YlRcRszwtYXlv4_TRt4lgLRFFivxvt3eg-vk7EOw64HwUSPtLKoBe-7lECCEq3lsrUbXp2Zx8QiJvMjsTJcq5B_iA_B9Mqmx9pocgn9ItF-TDeND_9sFS-r6GS05Fr10eDdFl4K4AS4xLoQ9RGCZ7BSrJl-MLlL-GYqS8-qcMxtvW0Dxy1OGqC_YOLwR9royL9AsSjTJ3N91zkU4pIbih0qw" },
  { name: "Schezwan Veg Fried Rice", price: 160 },
  { name: "Veg Manchurian Fried Rice", price: 170 },
  { name: "Street Style Veg Fried Rice", price: 170 },
  { name: "Chilli Garlic Veg Fried Rice", price: 180 },
  { name: "Singapore Veg Fried Rice", price: 190 },
  { name: "Woking Spl Veg Fried Rice", price: 200 },
];

const MAIN_VEG_NOODLES: StaticMenuItem[] = [
  { name: "Veg Noodles", price: 150 },
  { name: "Schezwan Veg Noodles", price: 160 },
  { name: "Veg Manchurian Noodles", price: 170 },
  { name: "Street Style Veg Noodles", price: 170 },
  { name: "Chilli Garlic Veg Noodles", price: 180 },
  { name: "Singapore Veg Noodles", price: 190 },
  { name: "Woking Spl Veg Noodles", price: 200 },
];

const MAIN_EGG_FRIED_RICE: StaticMenuItem[] = [
  { name: "Egg Fried Rice", price: 160 },
  { name: "Schezwan Egg Fried Rice", price: 170 },
  { name: "Street Style Egg Fried Rice", price: 170 },
  { name: "Egg Manchurian Fried Rice", price: 180 },
  { name: "Chilli Garlic Egg Fried Rice", price: 190 },
  { name: "Singapore Egg Fried Rice", price: 200 },
  { name: "Woking Spl Egg Fried Rice", price: 210 },
];

const MAIN_EGG_NOODLES: StaticMenuItem[] = [
  { name: "Egg Noodles", price: 160 },
  { name: "Schezwan Egg Noodles", price: 170 },
  { name: "Street Style Egg Noodles", price: 170 },
  { name: "Egg Manchurian Noodles", price: 180 },
  { name: "Chilli Garlic Egg Noodles", price: 190 },
  { name: "Singapore Egg Noodles", price: 200 },
  { name: "Woking Spl Egg Noodles", price: 210 },
];

const MAIN_NONVEG_FRIED_RICE: StaticMenuItem[] = [
  { name: "Chicken Fried Rice", price: 180 },
  { name: "Schezwan Chicken Fried Rice", price: 190 },
  { name: "Street Style Chicken Fried Rice", price: 190 },
  { name: "Chicken Manchurian Fried Rice", price: 200 },
  { name: "Chilli Garlic Chicken Fried Rice", price: 200 },
  { name: "Singapore Chicken Fried Rice", price: 210 },
  { name: "Woking Spl Chicken Fried Rice", price: 220 },
];

const MAIN_NONVEG_NOODLES: StaticMenuItem[] = [
  { name: "Chicken Noodles", price: 180, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8St-2UtLLq6YHzBVoX6AOal4C3nL6fq3rJIS6S16bhRuaQ6f6A7luKTQfZsmIHXdkR_r9CXsh6z1WCBdZy1KquljXW0hWfkggprmfxBDoe4cnxZFwh1xHxcNSpw-tXwjY4Fjemj7-BRJi55P2FyYgkBTp0pOcodAB7wlNdkSRZ0uagV4BOUPTvc-tX4ESLo85TPrkfYlgGljajYrg3FEdtBezr6_EzBwvQcMMZuNvaeUu6inWNigSSJyLLkL15yJjeM2RBNLN8r8" },
  { name: "Schezwan Chicken Noodles", price: 190 },
  { name: "Street Style Chicken Noodles", price: 190 },
  { name: "Chicken Manchurian Noodles", price: 200 },
  { name: "Chilli Garlic Chicken Noodles", price: 200 },
  { name: "Singapore Chicken Noodles", price: 210 },
  { name: "Woking Spl Chicken Noodles", price: 220 },
];

const ADD_ONS: StaticMenuItem[] = [
  { name: "Extra Veggies", price: 30 },
  { name: "Extra Schezwan Sauce", price: 30 },
  { name: "Extra Egg", price: 25 },
  { name: "Extra Chicken", price: 50 },
];

const COMBOS: StaticComboItem[] = [
  { name: "Veg Manchurian", description: "+ Veg Fried Rice (or) Veg Noodles", price: 180 },
  { name: "Chicken Manchurian", description: "+ Egg Fried Rice (or) Egg Noodles", price: 200 },
];

// Flatten all items for search
const ALL_ITEMS = [
  ...STARTERS_VEG, ...STARTERS_NONVEG, ...STARTERS_EGG,
  ...MAIN_VEG_FRIED_RICE, ...MAIN_VEG_NOODLES,
  ...MAIN_EGG_FRIED_RICE, ...MAIN_EGG_NOODLES,
  ...MAIN_NONVEG_FRIED_RICE, ...MAIN_NONVEG_NOODLES,
  ...ADD_ONS,
];

const CATEGORIES = ["All", "Starters", "Main Course", "Add On's", "One & Done Meal"];
const CATEGORY_ICONS = ["🍽️", "🥗", "🍜", "➕", "🍱"];

/* ================================================================
   COMPONENTS
   ================================================================ */

function DietDot({ type }: { type: "veg" | "nonveg" | "egg" }) {
  const colors = {
    veg: { border: "border-green-600", fill: "bg-green-600" },
    nonveg: { border: "border-red-600", fill: "bg-red-600" },
    egg: { border: "border-yellow-500", fill: "bg-yellow-500" },
  };
  const c = colors[type];
  return (
    <div className={`w-4 h-4 border ${c.border} flex items-center justify-center rounded-sm`}>
      <div className={`w-2 h-2 rounded-full ${c.fill}`} />
    </div>
  );
}

function ItemRow({ item }: { item: StaticMenuItem }) {
  if (item.image) {
    return (
      <li className="flex flex-col gap-1 py-3">
        <div className="relative w-full h-40 rounded-lg overflow-hidden shadow-sm">
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
        </div>
        <div className="flex justify-between items-center pt-1">
          <span className="font-semibold">{item.name}</span>
          <span className="font-bold text-[#E8490F]">₹{item.price}</span>
        </div>
      </li>
    );
  }
  return (
    <li className="flex justify-between">
      <span>{item.name}</span>
      <span className="font-semibold text-[#E8490F]">₹{item.price}</span>
    </li>
  );
}

function ItemList({ items }: { items: StaticMenuItem[] }) {
  return (
    <ul className="flex flex-col gap-3 font-[family-name:var(--font-body)] text-base text-charcoal">
      {items.map((item, i) => (
        <ItemRow key={`${item.name}-${i}`} item={item} />
      ))}
    </ul>
  );
}

/* ================================================================
   MAIN COMPONENT
   ================================================================ */
export default function MenuClientContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Search filtering
  const matchesSearch = (name: string) => {
    if (!searchQuery.trim()) return true;
    return name.toLowerCase().includes(searchQuery.toLowerCase().trim());
  };

  const filterItems = (items: StaticMenuItem[]) =>
    items.filter((item) => matchesSearch(item.name));

  // Count matching items
  const totalCount = useMemo(() => {
    if (!searchQuery.trim()) return ALL_ITEMS.length + COMBOS.length;
    return ALL_ITEMS.filter((i) => matchesSearch(i.name)).length +
      COMBOS.filter((c) => matchesSearch(c.name)).length;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Determine which sections to show
  const showStarters = activeCategory === "All" || activeCategory === "Starters";
  const showMainCourse = activeCategory === "All" || activeCategory === "Main Course";
  const showAddOns = activeCategory === "All" || activeCategory === "Add On's";
  const showCombos = activeCategory === "All" || activeCategory === "One & Done Meal";

  return (
    <>
      {/* Section 2: Search + Filter Bar — exact Stitch layout */}
      <section className="sticky top-[72px] z-40 bg-white border-b border-[#e5e2e1] px-4 md:px-16 py-6">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
          {/* Search Input */}
          <div className="relative w-full max-w-[480px] mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-5 h-5" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-6 rounded-md bg-[#f6f3f2] border border-[#e5e2e1] focus:border-primary focus:ring-1 focus:ring-primary outline-none font-[family-name:var(--font-body)] text-base transition-colors placeholder:text-muted/50"
            />
          </div>
          {/* Category Pills + Count */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex overflow-x-auto w-full md:w-auto pb-1 md:pb-0 gap-3 hide-scrollbar">
              {CATEGORIES.map((cat, i) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setSearchQuery(""); }}
                  className={`whitespace-nowrap px-6 py-3 rounded-full font-[family-name:var(--font-body)] text-xs font-bold uppercase tracking-wide transition-colors ${
                    activeCategory === cat
                      ? "bg-[#E8490F] text-white"
                      : "bg-[#f0eded] border border-[#e5e2e1] text-charcoal hover:border-primary"
                  }`}
                >
                  {CATEGORY_ICONS[i]} {cat}
                </button>
              ))}
            </div>
            <div className="text-muted font-[family-name:var(--font-body)] text-sm whitespace-nowrap">
              {searchQuery.trim()
                ? `Showing ${totalCount} item${totalCount !== 1 ? "s" : ""}`
                : "Showing all items"}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Menu List — exact Stitch structure */}
      <section className="bg-[#fcf9f8] px-4 md:px-16 py-20">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-12">

          {/* ──── STARTERS ──── */}
          {showStarters && (
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-[32px] font-bold text-[#E8490F] text-center mb-12 bg-[#f6f3f2] py-3 rounded-lg">
                STARTERS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Veg Starters */}
                {filterItems(STARTERS_VEG).length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#e5e2e1]">
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-charcoal mb-3 flex items-center gap-3">
                      <DietDot type="veg" /> VEG
                    </h3>
                    <ItemList items={filterItems(STARTERS_VEG)} />
                  </div>
                )}
                {/* Non-Veg Starters */}
                {filterItems(STARTERS_NONVEG).length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-[#e5e2e1]">
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-charcoal mb-3 flex items-center gap-3">
                      <DietDot type="nonveg" /> NON-VEG
                    </h3>
                    <ItemList items={filterItems(STARTERS_NONVEG)} />
                  </div>
                )}
                {/* Egg Starters + Info Box */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-[#e5e2e1] h-fit">
                  {filterItems(STARTERS_EGG).length > 0 && (
                    <>
                      <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-charcoal mb-3 flex items-center gap-3">
                        <DietDot type="egg" /> EGG
                      </h3>
                      <ul className="flex flex-col gap-3 font-[family-name:var(--font-body)] text-base text-charcoal mb-12">
                        {filterItems(STARTERS_EGG).map((item, i) => (
                          <ItemRow key={`egg-starter-${i}`} item={item} />
                        ))}
                      </ul>
                    </>
                  )}
                  <div className="bg-yellow-100 p-3 rounded-lg border border-yellow-300 text-sm font-[family-name:var(--font-body)] text-muted">
                    <p className="mb-1">💧 We use RO water for Cooking!</p>
                    <p className="mb-1">🚫 No artificial Colours Added!</p>
                    <p className="mb-1">⏳ Serving Time 10-15 Min</p>
                    <p className="mb-1">⭐ Woking Recommended*</p>
                    <p>🌶️ Spicy Food*</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ──── MAIN COURSE ──── */}
          {showMainCourse && (
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-[32px] font-bold text-[#E8490F] text-center mb-12 bg-[#f6f3f2] py-3 rounded-lg mt-20">
                MAIN COURSE
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Veg Main Course */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-[#e5e2e1]">
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-charcoal mb-3 flex items-center gap-3">
                    <DietDot type="veg" /> VEG
                  </h3>
                  {filterItems(MAIN_VEG_FRIED_RICE).length > 0 && (
                    <>
                      <h4 className="font-[family-name:var(--font-body)] font-semibold text-muted mb-1 mt-2">Fried Rice</h4>
                      <ul className="flex flex-col gap-3 font-[family-name:var(--font-body)] text-base text-charcoal mb-6">
                        {filterItems(MAIN_VEG_FRIED_RICE).map((item, i) => (
                          <ItemRow key={`veg-rice-${i}`} item={item} />
                        ))}
                      </ul>
                    </>
                  )}
                  {filterItems(MAIN_VEG_NOODLES).length > 0 && (
                    <>
                      <h4 className="font-[family-name:var(--font-body)] font-semibold text-muted mb-1">Noodles</h4>
                      <ItemList items={filterItems(MAIN_VEG_NOODLES)} />
                    </>
                  )}
                </div>
                {/* Egg Main Course */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-[#e5e2e1]">
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-charcoal mb-3 flex items-center gap-3">
                    <DietDot type="egg" /> EGG
                  </h3>
                  {filterItems(MAIN_EGG_FRIED_RICE).length > 0 && (
                    <>
                      <h4 className="font-[family-name:var(--font-body)] font-semibold text-muted mb-1 mt-2">Fried Rice</h4>
                      <ul className="flex flex-col gap-3 font-[family-name:var(--font-body)] text-base text-charcoal mb-6">
                        {filterItems(MAIN_EGG_FRIED_RICE).map((item, i) => (
                          <ItemRow key={`egg-rice-${i}`} item={item} />
                        ))}
                      </ul>
                    </>
                  )}
                  {filterItems(MAIN_EGG_NOODLES).length > 0 && (
                    <>
                      <h4 className="font-[family-name:var(--font-body)] font-semibold text-muted mb-1">Noodles</h4>
                      <ItemList items={filterItems(MAIN_EGG_NOODLES)} />
                    </>
                  )}
                </div>
                {/* Non-Veg Main Course */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-[#e5e2e1]">
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-charcoal mb-3 flex items-center gap-3">
                    <DietDot type="nonveg" /> NON-VEG
                  </h3>
                  {filterItems(MAIN_NONVEG_FRIED_RICE).length > 0 && (
                    <>
                      <h4 className="font-[family-name:var(--font-body)] font-semibold text-muted mb-1 mt-2">Fried Rice</h4>
                      <ul className="flex flex-col gap-3 font-[family-name:var(--font-body)] text-base text-charcoal mb-6">
                        {filterItems(MAIN_NONVEG_FRIED_RICE).map((item, i) => (
                          <ItemRow key={`nv-rice-${i}`} item={item} />
                        ))}
                      </ul>
                    </>
                  )}
                  {filterItems(MAIN_NONVEG_NOODLES).length > 0 && (
                    <>
                      <h4 className="font-[family-name:var(--font-body)] font-semibold text-muted mb-1">Noodles</h4>
                      <ItemList items={filterItems(MAIN_NONVEG_NOODLES)} />
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ──── ADD ON'S + ONE & DONE MEAL — 2 column grid ──── */}
          {(showAddOns || showCombos) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
              {/* Add On's */}
              {showAddOns && filterItems(ADD_ONS).length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6 border border-[#e5e2e1]">
                  <h3 className="font-[family-name:var(--font-heading)] text-[32px] font-bold text-[#E8490F] text-center mb-6 bg-[#f6f3f2] py-3 rounded-lg">
                    ADD ON&apos;S
                  </h3>
                  <ItemList items={filterItems(ADD_ONS)} />
                </div>
              )}
              {/* One & Done Meal */}
              {showCombos && (
                <div className="bg-white rounded-xl shadow-sm p-6 border border-[#e5e2e1]">
                  <h3 className="font-[family-name:var(--font-heading)] text-[32px] font-bold text-[#E8490F] text-center mb-6 bg-[#f6f3f2] py-3 rounded-lg">
                    ONE &amp; DONE MEAL
                  </h3>
                  <ul className="flex flex-col gap-6 font-[family-name:var(--font-body)] text-base text-charcoal">
                    {COMBOS.filter((c) => matchesSearch(c.name)).map((combo, i) => (
                      <li key={`combo-${i}`} className="flex justify-between items-center bg-[#f0eded] p-3 rounded-lg">
                        <div className="flex flex-col">
                          <span className="font-semibold">{combo.name}</span>
                          <span className="text-sm text-muted">{combo.description}</span>
                        </div>
                        <span className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#E8490F] whitespace-nowrap ml-4">
                          ₹{combo.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Section 4: Order CTA Strip — exact Stitch */}
      <section className="bg-gradient-to-r from-[#E8490F] to-[#C73D0A] px-4 md:px-16 py-20">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <h2 className="font-[family-name:var(--font-heading)] text-[32px] md:text-[48px] font-bold text-white text-center md:text-left max-w-lg leading-tight">
            Ready to order?<br />Get it delivered!
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
            <a
              href={siteConfig.orderLinks.zomato}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-12 py-6 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm text-white font-[family-name:var(--font-body)] text-base font-bold uppercase tracking-wide"
            >
              <span className="w-3 h-3 rounded-full bg-red-500" />
              Order on Zomato
            </a>
            <a
              href={siteConfig.orderLinks.swiggy}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-12 py-6 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm text-white font-[family-name:var(--font-body)] text-base font-bold uppercase tracking-wide"
            >
              <span className="w-3 h-3 rounded-full bg-orange-500" />
              Order on Swiggy
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
