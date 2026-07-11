import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Reveal from "./Reveal";
import { SITE } from "../config";
import { useCartStore } from "../store/useCartStore";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";

export default function Footer() {
  const openCart = useCartStore((s) => s.open);

  return (
    <>
      <section id="contact" className="relative bg-cherry overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-6 py-24">
          <Reveal>
            <p className="font-script text-cream/90 text-3xl mb-3">Ready when you are</p>
            <h2 className="font-display text-4xl md:text-5xl text-cream font-semibold mb-6">
              Let's Bake Something Beautiful Together
            </h2>
            <p className="text-cream/80 max-w-lg mx-auto mb-10">
              Tell us about your celebration and we'll craft the perfect cake for it —
              custom flavours, themes and designs always welcome.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={openCart}
                className="px-8 py-4 rounded-full bg-cream text-cherry font-medium tracking-wide hover:scale-105 transition-transform shadow-lg"
              >
                Start Your Order
              </button>
              <a
                href={`https://wa.me/${SITE.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-full border border-cream/40 text-cream font-medium tracking-wide hover:bg-cream/10 transition-colors"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="bg-espresso text-cream/60 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/logo.jpg" alt={SITE.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-gold/50" />
              <span className="font-display text-cream text-xl">{SITE.name}</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">{SITE.tagline}</p>
          </div>

          <div>
            <h4 className="text-cream font-medium mb-4 text-sm tracking-wide uppercase">Explore</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><a href="#home" className="hover:text-gold-light transition-colors">Home</a></li>
              <li><a href="#menu" className="hover:text-gold-light transition-colors">Our Cakes</a></li>
              <li><a href="#about" className="hover:text-gold-light transition-colors">Our Story</a></li>
              <li><a href="#reviews" className="hover:text-gold-light transition-colors">Reviews</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream font-medium mb-4 text-sm tracking-wide uppercase">Contact</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-gold flex-shrink-0" /> {SITE.phoneDisplay}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-gold flex-shrink-0" /> {SITE.email}
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={15} className="text-gold flex-shrink-0" /> {SITE.city}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream font-medium mb-4 text-sm tracking-wide uppercase">Follow Along</h4>
            <div className="flex gap-3">
              <a
                href={SITE.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-gold hover:text-espresso transition-colors"
              >
                <FacebookIcon size={17} />
              </a>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-gold hover:text-espresso transition-colors"
              >
                <InstagramIcon size={17} />
              </a>
              <a
                href={`https://wa.me/${SITE.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-gold hover:text-espresso transition-colors"
              >
                <MessageCircle size={17} />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-6 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/40">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Handcrafted with care in {SITE.city}</p>
        </div>
      </footer>
    </>
  );
}
