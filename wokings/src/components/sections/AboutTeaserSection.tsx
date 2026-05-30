import Image from "next/image";
import Link from "next/link";

export default function AboutTeaserSection() {
  return (
    <section className="bg-white py-20 px-6 md:px-16">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Image */}
        <div className="w-full md:w-[45%] relative">
          <div className="relative h-[380px] max-md:h-[280px] w-full rounded-2xl overflow-hidden shadow-md">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdLy9iOE4snRrZJ9fZwpsK3OT6DDgdvEupycLF41J4ThvQxUgjmb5E9FTLvh93Bocv3JedZ0pE0anwR_-Ixgw3gj3gjp7L9kbt3JuagFLBN3em3W9NK7ZJBbYR5O71vfOzq6oMl1AhFsZqG-rjEF8UW-t3MXFANQW_N_wE95qPw57i7Z0p23UqWZenkwSMUynBwBtxJrykhitCLIT4wpuiaWGC2cIoJJ3q_BmUMtulyBas9wJ11NbuZK5XBBao49T6pd-UaslkBLY"
              alt="Woking's chefs working in the kitchen"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <div className="w-full md:w-[55%]">
          <p className="text-primary font-[family-name:var(--font-body)] text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-8 h-px bg-primary" />
            Our Story
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-[42px] font-bold text-charcoal leading-[1.2] mb-5">
            Three Chefs. One Wok.<br />
            <span className="text-primary">Countless Happy Stomachs.</span>
          </h2>
          <p className="font-[family-name:var(--font-body)] text-lg text-muted leading-relaxed mb-8">
            Tucked inside Destination Food Court in Kondapur, Woking&apos;s began with a simple dream — to bring bold, wok-fired flavours to every plate. No shortcuts, no frozen food, just live fire and real honest cooking.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-charcoal text-white font-[family-name:var(--font-body)] text-sm font-bold uppercase tracking-wide px-7 py-3.5 rounded-full hover:bg-primary transition-colors"
          >
            Read Our Story →
          </Link>
        </div>
      </div>
    </section>
  );
}
