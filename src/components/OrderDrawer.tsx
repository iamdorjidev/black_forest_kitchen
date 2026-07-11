import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle, Mail } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { SITE } from "../config";

type FulfilmentType = "pickup" | "delivery";

export default function OrderDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const total = useCartStore((s) => s.total());
  const clear = useCartStore((s) => s.clear);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [fulfilment, setFulfilment] = useState<FulfilmentType>("pickup");
  const [address, setAddress] = useState("");
  const [instructions, setInstructions] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isValid = items.length > 0 && name.trim() && phone.trim() && date.trim();

  const buildMessage = () => {
    const lines = [
      `Hi ${SITE.owner}! I'd like to place an order from ${SITE.name}:`,
      "",
      ...items.map((i) => `• ${i.quantity}x ${i.cake.name} — $${i.cake.price * i.quantity}`),
      "",
      `Total: $${total}`,
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Needed for: ${date}`,
      `${fulfilment === "pickup" ? "Pickup" : "Delivery"}${fulfilment === "delivery" && address ? ` to: ${address}` : ""}`,
      instructions ? `Notes: ${instructions}` : "",
    ].filter(Boolean);
    return lines.join("\n");
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${SITE.whatsappNumber}?text=${message}`, "_blank");
    setSubmitted(true);
    clear();
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`New order from ${name || "website"}`);
    const body = encodeURIComponent(buildMessage());
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    clear();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-espresso/60 backdrop-blur-sm z-[60]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[440px] bg-cream z-[70] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-cocoa/10">
              <h3 className="font-display text-xl text-espresso font-semibold flex items-center gap-2">
                <ShoppingBag size={20} /> Your Order
              </h3>
              <button onClick={close} className="text-espresso/60 hover:text-cherry transition-colors">
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center h-full gap-4 py-10">
                  <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center text-forest">
                    <MessageCircle size={28} />
                  </div>
                  <h4 className="font-display text-2xl text-espresso font-semibold">Order sent!</h4>
                  <p className="text-espresso/60 text-sm max-w-xs">
                    Thank you! {SITE.owner} will confirm your order shortly. If a
                    new window didn't open, please message us directly on WhatsApp.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      close();
                    }}
                    className="mt-2 px-6 py-2.5 rounded-full bg-espresso text-cream text-sm font-medium hover:bg-cherry transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center h-full gap-3 py-10 text-espresso/50">
                  <ShoppingBag size={40} strokeWidth={1} />
                  <p>Your order is empty.</p>
                  <a
                    href="#menu"
                    onClick={close}
                    className="text-cherry text-sm font-medium hover:underline"
                  >
                    Browse our cakes →
                  </a>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-4 mb-8">
                    {items.map((item) => (
                      <div key={item.cake.id} className="flex gap-3">
                        <img
                          src={item.cake.image}
                          alt={item.cake.name}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-medium text-espresso text-sm leading-snug pr-2">
                              {item.cake.name}
                            </p>
                            <button
                              onClick={() => removeItem(item.cake.id)}
                              className="text-espresso/30 hover:text-cherry transition-colors flex-shrink-0"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                          <p className="text-gold-dark text-sm font-medium mb-2">${item.cake.price}</p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setQuantity(item.cake.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full border border-cocoa/20 flex items-center justify-center text-espresso/70 hover:border-cherry hover:text-cherry transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm w-5 text-center">{item.quantity}</span>
                            <button
                              onClick={() => setQuantity(item.cake.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full border border-cocoa/20 flex items-center justify-center text-espresso/70 hover:border-cherry hover:text-cherry transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-cocoa/10">
                    <span className="font-display text-lg text-espresso font-semibold">Total</span>
                    <span className="font-display text-2xl text-cherry font-semibold">${total}</span>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="text-xs font-medium text-espresso/60 mb-1.5 block">Your name *</label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Smith"
                        className="w-full rounded-xl border border-cocoa/15 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-espresso/60 mb-1.5 block">Phone number *</label>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="021 234 5678"
                        className="w-full rounded-xl border border-cocoa/15 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-espresso/60 mb-1.5 block">Date needed *</label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-xl border border-cocoa/15 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    </div>

                    <div className="flex gap-2">
                      {(["pickup", "delivery"] as FulfilmentType[]).map((type) => (
                        <button
                          key={type}
                          onClick={() => setFulfilment(type)}
                          className={`flex-1 py-2.5 rounded-xl text-sm font-medium capitalize transition-colors ${
                            fulfilment === type
                              ? "bg-espresso text-cream"
                              : "bg-white text-espresso/60 border border-cocoa/15"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>

                    {fulfilment === "delivery" && (
                      <div>
                        <label className="text-xs font-medium text-espresso/60 mb-1.5 block">Delivery address</label>
                        <input
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="123 Queen St, Auckland"
                          className="w-full rounded-xl border border-cocoa/15 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                        />
                      </div>
                    )}

                    <div>
                      <label className="text-xs font-medium text-espresso/60 mb-1.5 block">
                        Special instructions
                      </label>
                      <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="Flavour preferences, allergies, message on cake..."
                        rows={3}
                        className="w-full rounded-xl border border-cocoa/15 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {items.length > 0 && !submitted && (
              <div className="p-6 border-t border-cocoa/10 flex flex-col gap-3">
                <button
                  disabled={!isValid}
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-center gap-2 rounded-full py-3.5 bg-forest text-cream font-medium tracking-wide hover:bg-forest-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <MessageCircle size={18} /> Send Order via WhatsApp
                </button>
                <button
                  disabled={!isValid}
                  onClick={handleEmail}
                  className="w-full flex items-center justify-center gap-2 rounded-full py-3 border border-cocoa/20 text-espresso font-medium tracking-wide hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Mail size={18} /> Send via Email
                </button>
                {!isValid && (
                  <p className="text-xs text-espresso/40 text-center">
                    Please fill in your name, phone and date needed.
                  </p>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
