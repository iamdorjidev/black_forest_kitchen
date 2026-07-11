import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import { useCakeStore } from "../store/useCakeStore";
import { useCartStore } from "../store/useCartStore";
import { CATEGORIES } from "../data/cakes";
import type { Cake } from "../types";

function CakeCard({ cake, index }: { cake: Cake; index: number }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(cake);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <TiltCard maxTilt={7} scaleOnHover={1.02} className="h-full">
        <div className="group relative bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(36,17,8,0.08)] hover:shadow-[0_25px_70px_rgba(36,17,8,0.22)] transition-shadow duration-500 h-full flex flex-col">
          <div className="relative aspect-square overflow-hidden" style={{ transform: "translateZ(20px)" }}>
            <img
              src={cake.image}
              alt={cake.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute top-4 left-4 bg-cream/90 backdrop-blur-sm text-espresso text-xs font-medium px-3 py-1 rounded-full">
              {cake.category}
            </span>
          </div>

          <div className="p-6 flex flex-col flex-1" style={{ transform: "translateZ(10px)" }}>
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-display text-xl text-espresso font-semibold leading-snug">
                {cake.name}
              </h3>
              <span className="font-display text-gold-dark font-semibold whitespace-nowrap">
                ${cake.price}
              </span>
            </div>
            <p className="text-espresso/60 text-sm leading-relaxed mb-5 line-clamp-3">
              {cake.description}
            </p>
            <button
              onClick={handleAdd}
              className={`mt-auto w-full flex items-center justify-center gap-2 rounded-full py-3 font-medium text-sm tracking-wide transition-all duration-300 ${
                added
                  ? "bg-forest text-cream"
                  : "bg-espresso text-cream hover:bg-cherry"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="flex items-center gap-2"
                  >
                    <Check size={16} /> Added to Order
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="flex items-center gap-2"
                  >
                    <Plus size={16} /> Add to Order
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Menu() {
  const cakes = useCakeStore((s) => s.cakes);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(
    () => (activeCategory === "All" ? cakes : cakes.filter((c) => c.category === activeCategory)),
    [cakes, activeCategory]
  );

  return (
    <section id="menu" className="relative bg-parchment py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-script text-cherry text-2xl mb-2">Our Menu</p>
          <h2 className="font-display text-4xl md:text-5xl text-espresso font-semibold mb-4">
            Cakes Made to Order
          </h2>
          <p className="text-espresso/60 leading-relaxed">
            Browse our signature creations, or use them as inspiration for
            something entirely your own. Add your favourites below and we'll
            take it from there.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-wrap justify-center gap-3 mb-12">
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-cherry text-cream shadow-md"
                  : "bg-white text-espresso/70 hover:bg-cherry/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((cake, i) => (
              <CakeCard key={cake.id} cake={cake} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-espresso/50 py-16">No cakes in this category yet.</p>
        )}
      </div>
    </section>
  );
}
