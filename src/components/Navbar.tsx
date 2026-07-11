import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Our Cakes", href: "#menu" },
  { label: "Our Story", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useCartStore((s) => s.count());
  const openCart = useCartStore((s) => s.open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || mobileOpen;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        solid ? "bg-cream/95 backdrop-blur-md shadow-[0_4px_30px_rgba(36,17,8,0.08)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-10 py-3">
        <a href="#home" className="relative flex items-center group py-1" style={{ perspective: 500 }}>
          <span className="absolute -inset-3 rounded-full bg-espresso/25 blur-md -z-10" />
          <motion.img
            src="/images/logo.jpg"
            alt="Black Forest Kitchen"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover ring-[3px] ring-gold shadow-[0_6px_24px_rgba(0,0,0,0.45)]"
            whileHover={{ rotateY: 25, rotateX: -8, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 250, damping: 15 }}
            style={{ transformStyle: "preserve-3d" }}
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative font-body text-sm tracking-wide transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full ${
                solid ? "text-espresso/90 hover:text-cherry" : "text-cream/90 hover:text-gold-light"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              solid
                ? "bg-espresso text-cream hover:bg-cherry"
                : "bg-cream/15 text-cream border border-cream/40 hover:bg-cream hover:text-espresso"
            }`}
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">Order</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-cherry text-cream text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {cartCount}
              </span>
            )}
          </button>

          <button
            className={`md:hidden ${solid ? "text-espresso" : "text-cream"}`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-cream border-t border-cocoa/10"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-body text-espresso text-base py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
