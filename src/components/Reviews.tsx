import { useRef, useState } from "react";
import { Star, Quote } from "lucide-react";
import Reveal from "./Reveal";
import { REVIEWS } from "../data/reviews";
import { SITE } from "../config";

const BARS = [
  { star: 5, pct: 92 },
  { star: 4, pct: 6 },
  { star: 3, pct: 1 },
  { star: 2, pct: 0.5 },
  { star: 1, pct: 0.5 },
];

function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  return (
    <div className="w-[320px] sm:w-[380px] flex-shrink-0 bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(36,17,8,0.06)] mx-3">
      <Quote className="text-gold/40 mb-3" size={26} />
      <div className="flex text-gold mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <p className="text-espresso/75 text-sm leading-relaxed mb-5 line-clamp-5">{review.text}</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-espresso text-sm">{review.name}</p>
          <p className="text-espresso/40 text-xs">{review.meta}</p>
        </div>
        <span className="text-espresso/40 text-xs">{review.timeAgo}</span>
      </div>
    </div>
  );
}

export default function Reviews() {
  const loopReviews = [...REVIEWS, ...REVIEWS];
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pauseForAWhile = () => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 2500);
  };

  return (
    <section id="reviews" className="relative bg-espresso py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-14">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <p className="font-script text-gold-light text-2xl mb-2">Reviews</p>
            <h2 className="font-display text-4xl md:text-5xl text-cream font-semibold mb-4">
              Loved by Auckland Families
            </h2>
            <p className="text-cream/60 leading-relaxed max-w-md">
              Real words from real customers who trusted {SITE.name} with their
              most special celebrations.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="bg-cream/5 border border-cream/10 rounded-2xl p-6 flex flex-col sm:flex-row gap-8">
              <div className="text-center sm:text-left">
                <p className="font-display text-5xl text-gold-light font-semibold">
                  {SITE.rating.toFixed(1)}
                </p>
                <div className="flex text-gold justify-center sm:justify-start my-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-cream/50 text-xs">{SITE.reviewCount} Google reviews</p>
              </div>
              <div className="flex-1 flex flex-col gap-1.5 justify-center">
                {BARS.map((bar) => (
                  <div key={bar.star} className="flex items-center gap-2">
                    <span className="text-cream/50 text-xs w-3">{bar.star}</span>
                    <div className="flex-1 h-1.5 bg-cream/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold rounded-full"
                        style={{ width: `${bar.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-espresso to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-espresso to-transparent z-10" />
        <div
          className="flex w-max animate-marquee hover:[animation-play-state:paused]"
          style={paused ? { animationPlayState: "paused" } : undefined}
          onTouchStart={pauseForAWhile}
          onTouchMove={pauseForAWhile}
        >
          {loopReviews.map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
