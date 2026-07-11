import { Heart, Sparkles, Truck } from "lucide-react";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import { SITE } from "../config";

const POINTS = [
  {
    icon: Heart,
    title: "Made with heart",
    text: "Every cake is baked from scratch and decorated by hand — no shortcuts, just real ingredients and real care.",
  },
  {
    icon: Sparkles,
    title: "Fully customised",
    text: "Tell us your vision — flavour, theme, colours — and we'll bring it to life exactly the way you imagined it.",
  },
  {
    icon: Truck,
    title: "Fresh & on time",
    text: "Pickup or delivery across Auckland, always fresh and always ready when your celebration begins.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-cream py-24 md:py-32 overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 border border-gold/40 rounded-[2rem] -z-10" />
            <TiltCard maxTilt={6} scaleOnHover={1.015}>
              <img
                src="/images/cakes/ruby-velvet-heart.webp"
                alt="Handcrafted cake by Black Forest Kitchen"
                className="rounded-[1.75rem] w-full aspect-[4/5] object-cover shadow-soft"
              />
            </TiltCard>
            <div className="absolute -bottom-8 -right-6 bg-espresso text-cream rounded-2xl px-6 py-5 shadow-xl max-w-[220px]">
              <p className="font-script text-gold-light text-2xl leading-none mb-1">5.0 stars</p>
              <p className="text-cream/70 text-xs">from {SITE.reviewCount} happy customers on Google</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="font-script text-cherry text-2xl mb-3">Our Story</p>
            <h2 className="font-display text-4xl md:text-5xl text-espresso font-semibold mb-6 leading-tight">
              From {SITE.owner}'s kitchen,
              <br /> straight to your table
            </h2>
            <p className="text-espresso/70 leading-relaxed mb-6 max-w-lg">
              {SITE.name} began as a home kitchen filled with the smell of honey
              sponge and melted chocolate — and grew into Auckland's most loved
              custom cake studio. {SITE.owner} personally bakes and decorates every
              order, pouring the same warmth and attention into a birthday cake as
              she would for her own family.
            </p>
            <p className="text-espresso/70 leading-relaxed mb-10 max-w-lg">
              From delicate honey cakes and silky Bird's Milk soufflé to
              show-stopping birthday creations, every dessert is made to order —
              fresh, beautiful, and unmistakably homemade.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-6">
            {POINTS.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.1}>
                <div className="flex flex-col gap-3">
                  <div className="w-11 h-11 rounded-full bg-forest/10 flex items-center justify-center text-forest">
                    <point.icon size={20} />
                  </div>
                  <h3 className="font-display text-lg text-espresso font-semibold">{point.title}</h3>
                  <p className="text-espresso/60 text-sm leading-relaxed">{point.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
