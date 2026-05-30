import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Our Story",
  description:
    "Learn about Woking's — Kondapur's most loved wok-fired food stall. Three passionate chefs, one wok, and countless happy customers at Destination Food Court, Gachibowli, Hyderabad.",
};

export default function AboutPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative h-[320px] max-md:h-[240px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-charcoal z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFWhjojSrzuLJA2bqC5jL4u44yB5t7vrQ44U2pwQl2rEjT6nI74PMP0a0jLBUbRogQ-zVoumuFkT0cwLwT0NDcvJVGs2BjeNL8NY7HycjRQdzuGX1DNmq0oSPkgFGcJ4t8DoK0VENbKOuBPniSaBkCLx6m6t2CxYEjygGxgwNucV7T-yYE4kFLkJLw5ldNcPvH9vsDoGuwN77uVaHTCQOgGe-GOQLOv905lgeS306tnfphb2Q9NRkAizFhJoaj1vT0vthrY3MJy3k"
            alt="Chef tossing food in a large wok with flames"
            fill
            priority
            className="object-cover object-center opacity-40"
          />
        </div>
        <div className="relative z-10 text-center px-6 md:px-16 text-white">
          <p className="font-[family-name:var(--font-body)] text-[13px] font-bold uppercase tracking-[0.12em] text-primary mb-3">
            WHO WE ARE
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-5xl max-md:text-4xl font-bold mb-2">
            Our Story
          </h1>
          <p className="font-[family-name:var(--font-heading)] text-[22px] max-md:text-[17px] italic text-white/85 mb-5 max-w-2xl mx-auto">
            Three chefs. One wok. Countless happy stomachs.
          </p>
          <div className="flex items-center justify-center gap-2 font-[family-name:var(--font-body)] text-[12px] font-medium text-white/70">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>→</span>
            <span>About</span>
          </div>
        </div>
      </section>

      {/* ═══ OUR STORY — Split Layout ═══ */}
      <section className="bg-cream py-20 md:py-24 px-6 md:px-16">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-16 items-center">
          {/* Text Column */}
          <div className="w-full md:w-[55%]">
            <div className="w-12 h-[3px] bg-primary rounded-sm mb-6" />
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-[44px] font-bold text-charcoal leading-[1.2] mb-6">
              From a Small Wok<br />to a <span className="text-primary">Big Heart</span>
            </h2>
            <div className="font-[family-name:var(--font-body)] text-lg text-soft-dark leading-[1.75] space-y-5 mb-8">
              <p>
                It started as a humble idea at the Destination Food Court beside HDFC Bank in Kondapur. Three friends, a shared passion for bold flavors, and a single wok. We didn&apos;t have much, but we had a commitment to doing things right.
              </p>
              <p>
                Every morning, we hand-select our ingredients, ensuring only the freshest produce and highest-quality proteins make it into our dishes. We believe that street food doesn&apos;t have to mean compromising on quality; it should be a visceral, authentic experience that warms the soul.
              </p>
            </div>

            {/* Fact Chips */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: "🗓️", text: "Est. 2023" },
                { icon: "📍", text: "Kondapur, Hyderabad" },
                { icon: "👨‍🍳", text: "3 Passionate Chefs" },
              ].map((chip) => (
                <div
                  key={chip.text}
                  className="bg-white px-4 py-2.5 rounded-lg border-l-4 border-l-primary font-[family-name:var(--font-body)] text-sm font-medium text-soft-dark flex items-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                >
                  <span>{chip.icon}</span>{chip.text}
                </div>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div className="w-full md:w-[45%] relative">
            {/* Offset border */}
            <div className="absolute -bottom-2 -right-2 w-full h-full border-b-4 border-r-4 border-primary rounded-3xl z-0" />
            <div className="relative h-[480px] max-md:h-[360px] w-full rounded-3xl overflow-hidden z-10 shadow-sm hover:shadow-[0_8px_30px_rgba(232,73,15,0.1)] transition-shadow duration-300">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdLy9iOE4snRrZJ9fZwpsK3OT6DDgdvEupycLF41J4ThvQxUgjmb5E9FTLvh93Bocv3JedZ0pE0anwR_-Ixgw3gj3gjp7L9kbt3JuagFLBN3em3W9NK7ZJBbYR5O71vfOzq6oMl1AhFsZqG-rjEF8UW-t3MXFANQW_N_wE95qPw57i7Z0p23UqWZenkwSMUynBwBtxJrykhitCLIT4wpuiaWGC2cIoJJ3q_BmUMtulyBas9wJ11NbuZK5XBBao49T6pd-UaslkBLY"
                alt="Woking's chefs working together in the kitchen"
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4 bg-primary text-white px-4 py-1.5 rounded-full font-[family-name:var(--font-body)] text-[13px] font-bold shadow-md">
                ⭐ 4.8 Rated
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ OUR VALUES — Dark Section ═══ */}
      <section className="bg-charcoal py-20 md:py-24 px-6 md:px-16 text-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="font-[family-name:var(--font-body)] text-[13px] font-bold uppercase tracking-[0.12em] text-primary mb-2">
              WHAT WE STAND FOR
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔥",
                title: "Wok-Fresh Always",
                desc: "We don't do pre-cooked. Every meal is tossed on high heat the moment you order, ensuring maximum flavor and that signature wok hei.",
              },
              {
                icon: "❤️",
                title: "Made With Love",
                desc: "Cooking is our love language. We pour our hearts into every recipe, treating every customer like family dining at our table.",
              },
              {
                icon: "💰",
                title: "Pocket Friendly",
                desc: "Premium quality shouldn't be a luxury. We strive to offer soul-satisfying meals that are accessible to everyone without breaking the bank.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-white/[0.06] backdrop-blur-[10px] border border-white/10 p-6 rounded-2xl border-l-4 border-l-primary hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold mb-2">
                  {value.title}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-base text-white/80 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OUR LOCATION ═══ */}
      <section className="bg-cream py-20 md:py-24 px-6 md:px-16">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="font-[family-name:var(--font-body)] text-[13px] font-bold uppercase tracking-[0.12em] text-primary mb-2">
            FIND US
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-charcoal mb-4">
            Our Location
          </h2>
          <p className="font-[family-name:var(--font-body)] text-lg text-muted max-w-xl mx-auto mb-10">
            We&apos;re at Destination Food Court, beside HDFC Bank, Kondapur, Gachibowli — right in the heart of Hyderabad&apos;s tech corridor.
          </p>

          {/* Map Embed */}
          <div className="relative w-full h-[400px] max-md:h-[280px] rounded-2xl overflow-hidden shadow-md mb-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2!2d78.3489!3d17.4401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI2JzI0LjQiTiA3OMKwMjAnNTYuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Woking's Location on Google Maps"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://maps.app.goo.gl/ZhZYr7Ao1WLX8Mdh9?g_st=aw"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white font-[family-name:var(--font-body)] text-sm font-bold px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
            >
              Get Directions →
            </a>
            <div className="font-[family-name:var(--font-body)] text-sm text-muted">
              🕒 Open Daily: 11:00 AM – 11:00 PM
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
