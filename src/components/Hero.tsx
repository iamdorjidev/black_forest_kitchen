import { motion } from "framer-motion";
import { Star, ArrowDown } from "lucide-react";
import { SITE } from "../config";
import LogoMedallion from "./LogoMedallion";

const FLOATERS = [
  { src: "/images/cakes/golden-honey-heart.webp", className: "top-[8%] left-[3%] w-28 md:w-40", delay: 0, tiltDir: 1 },
  { src: "/images/cakes/ruby-velvet-heart.webp", className: "top-[58%] left-[8%] w-24 md:w-36", delay: 1.4, tiltDir: -1 },
  { src: "/images/cakes/chocolate-drip-egor.webp", className: "top-[12%] right-[4%] w-28 md:w-44", delay: 0.7, tiltDir: -1 },
  { src: "/images/cakes/little-lamb.webp", className: "top-[62%] right-[6%] w-24 md:w-36", delay: 2.1, tiltDir: 1 },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-espresso via-espresso-light to-cocoa"
    >
      {/* ambient glow */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cherry/20 rounded-full blur-[100px]" />
      </div>

      {/* floating cake photos, in 3D */}
      {FLOATERS.map((f, i) => (
        <div key={i} className={`hidden sm:block absolute ${f.className}`} style={{ perspective: 900 }}>
          <motion.img
            src={f.src}
            alt=""
            className="w-full aspect-square object-cover rounded-3xl shadow-2xl ring-4 ring-cream/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -18, 0],
              rotateY: [0, f.tiltDir * 22, 0, -f.tiltDir * 22, 0],
              rotateX: [0, -6, 0, 6, 0],
              rotate: [0, i % 2 === 0 ? 3 : -3, 0],
            }}
            transition={{
              opacity: { duration: 1, delay: f.delay },
              scale: { duration: 1, delay: f.delay },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: f.delay },
              rotateY: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: f.delay },
              rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: f.delay },
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: f.delay },
            }}
            style={{ transformStyle: "preserve-3d" }}
          />
        </div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 scale-[0.8] sm:scale-90 md:scale-100"
        >
          <LogoMedallion size={150} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="inline-flex items-center gap-2 bg-cream/10 border border-gold/30 backdrop-blur-sm rounded-full px-5 py-2 mb-8"
        >
          <div className="flex text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <span className="text-cream/90 text-sm font-body">
            {SITE.rating.toFixed(1)} · {SITE.reviewCount} Google Reviews
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-script text-gold-light text-3xl md:text-4xl mb-2"
        >
          {SITE.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-cream text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] mb-6"
        >
          Handcrafted Cakes for
          <br />
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-light">
            Life's Sweetest Moments
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-cream/70 text-base md:text-lg max-w-xl mx-auto mb-10 font-body"
        >
          Every cake from {SITE.name} is baked fresh, decorated by hand and made
          just for you — by {SITE.owner}, in {SITE.city}.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#menu"
            className="group relative px-8 py-4 rounded-full bg-cherry text-cream font-medium tracking-wide overflow-hidden transition-transform hover:scale-105 shadow-[0_10px_40px_rgba(179,18,44,0.4)]"
          >
            <span className="relative z-10">Order Your Cake</span>
          </a>
          <a
            href="#about"
            className="px-8 py-4 rounded-full border border-cream/30 text-cream font-medium tracking-wide hover:bg-cream/10 transition-colors"
          >
            Our Story
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#menu"
        aria-label="Scroll to menu"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/50 hover:text-gold transition-colors"
      >
        <ArrowDown size={26} />
      </motion.a>
    </section>
  );
}
