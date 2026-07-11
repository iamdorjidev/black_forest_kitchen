import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Plus, Pencil, Trash2, X, ArrowLeft, ImagePlus, Star } from "lucide-react";
import { useCakeStore } from "../store/useCakeStore";
import { CATEGORIES } from "../data/cakes";
import { ADMIN_PASSWORD, SITE } from "../config";
import type { Cake } from "../types";

const AUTH_KEY = "bfk-admin-auth";

const emptyDraft = (): Omit<Cake, "id"> => ({
  name: "",
  category: CATEGORIES[0],
  description: "",
  price: 0,
  image: "",
  featured: false,
});

function slugify(name: string) {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `cake-${Date.now()}`
  );
}

function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "1");
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-espresso flex items-center justify-center px-6">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-cream rounded-3xl p-8 w-full max-w-sm shadow-2xl"
      >
        <div className="w-12 h-12 rounded-full bg-cherry/10 text-cherry flex items-center justify-center mb-5">
          <Lock size={20} />
        </div>
        <h1 className="font-display text-2xl text-espresso font-semibold mb-1">Admin Access</h1>
        <p className="text-espresso/50 text-sm mb-6">Manage the {SITE.name} cake catalogue.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          placeholder="Enter password"
          autoFocus
          className={`w-full rounded-xl border px-4 py-3 text-sm mb-2 focus:outline-none focus:ring-2 ${
            error ? "border-cherry ring-cherry/30" : "border-cocoa/15 ring-gold/40"
          }`}
        />
        {error && <p className="text-cherry text-xs mb-3">Incorrect password, please try again.</p>}
        <button
          type="submit"
          className="w-full mt-3 rounded-full bg-espresso text-cream py-3 font-medium hover:bg-cherry transition-colors"
        >
          Enter
        </button>
        <Link to="/" className="flex items-center justify-center gap-1.5 text-espresso/40 text-xs mt-5 hover:text-espresso transition-colors">
          <ArrowLeft size={13} /> Back to site
        </Link>
      </motion.form>
    </div>
  );
}

function CakeForm({
  initial,
  onCancel,
  onSave,
}: {
  initial: Cake | null;
  onCancel: () => void;
  onSave: (cake: Cake) => void;
}) {
  const [draft, setDraft] = useState<Omit<Cake, "id">>(initial ?? emptyDraft());

  const handleImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setDraft((d) => ({ ...d, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.name.trim() || !draft.image) return;
    onSave({ ...draft, id: initial?.id ?? slugify(draft.name) });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-espresso/60 backdrop-blur-sm z-[80] flex items-center justify-center px-4 py-8"
      onClick={onCancel}
    >
      <motion.form
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-cream rounded-3xl p-7 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl text-espresso font-semibold">
            {initial ? "Edit Cake" : "Add New Cake"}
          </h2>
          <button type="button" onClick={onCancel} className="text-espresso/50 hover:text-cherry">
            <X size={20} />
          </button>
        </div>

        <label className="relative flex flex-col items-center justify-center gap-2 border-2 border-dashed border-cocoa/20 rounded-2xl h-40 mb-5 cursor-pointer overflow-hidden hover:border-gold transition-colors">
          {draft.image ? (
            <img src={draft.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <>
              <ImagePlus className="text-espresso/30" size={28} />
              <span className="text-espresso/40 text-xs">Click to upload a photo</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleImage(e.target.files[0])}
          />
        </label>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-espresso/60 mb-1.5 block">Cake name *</label>
            <input
              value={draft.name}
              onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
              className="w-full rounded-xl border border-cocoa/15 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              required
            />
          </div>
          <div>
            <label className="text-xs font-medium text-espresso/60 mb-1.5 block">Category</label>
            <select
              value={draft.category}
              onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))}
              className="w-full rounded-xl border border-cocoa/15 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-espresso/60 mb-1.5 block">Price (NZD)</label>
            <input
              type="number"
              min={0}
              value={draft.price}
              onChange={(e) => setDraft((d) => ({ ...d, price: Number(e.target.value) }))}
              className="w-full rounded-xl border border-cocoa/15 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-espresso/60 mb-1.5 block">Description</label>
            <textarea
              value={draft.description}
              onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
              rows={3}
              className="w-full rounded-xl border border-cocoa/15 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-espresso/70">
            <input
              type="checkbox"
              checked={!!draft.featured}
              onChange={(e) => setDraft((d) => ({ ...d, featured: e.target.checked }))}
              className="accent-cherry w-4 h-4"
            />
            Feature this cake
          </label>
        </div>

        <button
          type="submit"
          className="w-full mt-6 rounded-full bg-espresso text-cream py-3 font-medium hover:bg-cherry transition-colors"
        >
          {initial ? "Save Changes" : "Add Cake"}
        </button>
      </motion.form>
    </motion.div>
  );
}

function Dashboard() {
  const cakes = useCakeStore((s) => s.cakes);
  const addCake = useCakeStore((s) => s.addCake);
  const updateCake = useCakeStore((s) => s.updateCake);
  const removeCake = useCakeStore((s) => s.removeCake);

  const [editing, setEditing] = useState<Cake | "new" | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleSave = (cake: Cake) => {
    if (editing !== "new" && cakes.some((c) => c.id === cake.id)) {
      updateCake(cake.id, cake);
    } else {
      addCake(cake);
    }
    setEditing(null);
  };

  return (
    <div className="min-h-screen bg-parchment">
      <header className="bg-cream border-b border-cocoa/10 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/logo.jpg" alt="" className="w-9 h-9 rounded-full object-cover" />
            <div>
              <p className="font-display text-espresso font-semibold leading-tight">Cake Manager</p>
              <p className="text-espresso/40 text-xs">{SITE.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-espresso/60 text-sm hover:text-cherry flex items-center gap-1.5">
              <ArrowLeft size={15} /> View site
            </Link>
            <button
              onClick={() => {
                sessionStorage.removeItem(AUTH_KEY);
                window.location.reload();
              }}
              className="text-espresso/60 text-sm hover:text-cherry"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl text-espresso font-semibold">Your Cakes</h1>
            <p className="text-espresso/50 text-sm mt-1">{cakes.length} cakes in your catalogue</p>
          </div>
          <button
            onClick={() => setEditing("new")}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-cherry text-cream font-medium text-sm hover:bg-cherry-dark transition-colors"
          >
            <Plus size={17} /> Add New Cake
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cakes.map((cake) => (
            <div key={cake.id} className="bg-white rounded-2xl overflow-hidden shadow-sm group">
              <div className="relative aspect-video">
                <img src={cake.image} alt={cake.name} className="w-full h-full object-cover" />
                {cake.featured && (
                  <span className="absolute top-3 left-3 bg-gold text-espresso text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Star size={11} fill="currentColor" /> Featured
                  </span>
                )}
                <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => setEditing(cake)}
                    className="w-9 h-9 rounded-full bg-cream flex items-center justify-center text-espresso hover:bg-gold transition-colors"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(cake.id)}
                    className="w-9 h-9 rounded-full bg-cream flex items-center justify-center text-espresso hover:bg-cherry hover:text-cream transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-espresso/40 mb-1">{cake.category}</p>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display font-semibold text-espresso leading-snug">{cake.name}</h3>
                  <span className="text-gold-dark font-medium text-sm whitespace-nowrap">${cake.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {editing && (
          <CakeForm
            initial={editing === "new" ? null : editing}
            onCancel={() => setEditing(null)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-espresso/60 backdrop-blur-sm z-[80] flex items-center justify-center px-4"
            onClick={() => setConfirmDelete(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-cream rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <h3 className="font-display text-lg text-espresso font-semibold mb-2">Remove this cake?</h3>
              <p className="text-espresso/50 text-sm mb-6">This will remove it from your public menu. This can't be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 py-2.5 rounded-full border border-cocoa/20 text-espresso text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    removeCake(confirmDelete);
                    setConfirmDelete(null);
                  }}
                  className="flex-1 py-2.5 rounded-full bg-cherry text-cream text-sm font-medium hover:bg-cherry-dark transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === "1");

  if (!authed) return <LoginGate onSuccess={() => setAuthed(true)} />;
  return <Dashboard />;
}
