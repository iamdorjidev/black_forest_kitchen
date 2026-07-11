import { useMemo, useState } from "react";
import { motion } from "framer-motion";

interface LogoMedallionProps {
  size?: number;
  className?: string;
}

const RIM_SEGMENTS = 40;
const TILT_DEG = 24;

const SPARKLES = [
  { angle: 20, radius: 1.4, delay: 0, size: 5 },
  { angle: 110, radius: 1.55, delay: 0.6, size: 4 },
  { angle: 200, radius: 1.45, delay: 1.2, size: 6 },
  { angle: 290, radius: 1.6, delay: 1.8, size: 4 },
];

export default function LogoMedallion({ size = 140, className = "" }: LogoMedallionProps) {
  const [hovering, setHovering] = useState(false);
  const depth = Math.round(size * 0.16);
  const radius = size / 2;

  const rim = useMemo(
    () =>
      Array.from({ length: RIM_SEGMENTS }, (_, i) => {
        const deg = (360 / RIM_SEGMENTS) * i;
        return { deg, width: Math.ceil((2 * Math.PI * radius) / RIM_SEGMENTS) + 1 };
      }),
    [radius]
  );

  return (
    <div
      className={`relative mx-auto select-none ${className}`}
      style={{ width: size, height: size, perspective: size * 9 }}
    >
      {/* ambient glow */}
      <motion.div
        animate={{
          opacity: hovering ? [0.6, 1, 0.6] : [0.35, 0.6, 0.35],
          scale: hovering ? [1, 1.15, 1] : [1, 1.05, 1],
        }}
        transition={{ duration: hovering ? 1.6 : 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-8 rounded-full bg-gold/35 blur-3xl pointer-events-none"
      />

      {/* orbiting sparkles */}
      {SPARKLES.map((s, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 rounded-full bg-gold-light shadow-[0_0_8px_2px_rgba(230,199,119,0.8)] pointer-events-none"
          style={{ width: s.size, height: s.size, marginLeft: -s.size / 2, marginTop: -s.size / 2 }}
          animate={{
            x: Array.from({ length: 25 }, (_, f) =>
              Math.cos(((s.angle + f * 15) * Math.PI) / 180) * radius * s.radius
            ),
            y: Array.from({ length: 25 }, (_, f) =>
              Math.sin(((s.angle + f * 15) * Math.PI) / 180) * radius * s.radius * 0.5
            ),
            opacity: [0.2, 1, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: s.delay }}
        />
      ))}

      {/* floating bob + hover response */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        onHoverStart={() => setHovering(true)}
        onHoverEnd={() => setHovering(false)}
        className="relative w-full h-full cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* slight static turn for a 3/4 perspective on the tumbling coin */}
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", transform: `rotateY(${TILT_DEG}deg)` }}>
          {/* the coin tumbles end-over-end (rotate on X, perpendicular to the caps) so it truly flips between faces */}
          <motion.div
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateX: 360 }}
            transition={{ duration: hovering ? 2.4 : 10, repeat: Infinity, ease: "linear" }}
          >
            {/* rim / coin edge — cylinder wall around the Y axis */}
            {rim.map((seg, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 bg-gradient-to-b from-gold-light via-gold to-gold-dark"
                style={{
                  width: seg.width,
                  height: depth,
                  marginLeft: -seg.width / 2,
                  marginTop: -depth / 2,
                  transform: `rotateY(${seg.deg}deg) translateZ(${radius}px)`,
                }}
              />
            ))}

            {/* top cap: real logo, facing "up" before tilt brings it to face the viewer */}
            <div
              className="absolute inset-0 rounded-full ring-4 ring-gold overflow-hidden shadow-[0_25px_60px_rgba(36,17,8,0.55)]"
              style={{
                transform: `rotateX(90deg) translateZ(${depth / 2}px)`,
                backfaceVisibility: "hidden",
              }}
            >
              <img src="/images/logo.jpg" alt="Black Forest Kitchen" className="w-full h-full object-cover" />
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ backgroundPosition: ["0% 0%", "200% 200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{
                  background:
                    "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.45) 45%, transparent 60%)",
                  backgroundSize: "250% 250%",
                }}
              />
            </div>

            {/* bottom cap: gold monogram seal */}
            <div
              className="absolute inset-0 rounded-full ring-4 ring-gold overflow-hidden shadow-[0_25px_60px_rgba(36,17,8,0.55)] bg-espresso flex flex-col items-center justify-center gap-1"
              style={{
                transform: `rotateX(-90deg) translateZ(${depth / 2}px)`,
                backfaceVisibility: "hidden",
              }}
            >
              <div className="absolute inset-2 rounded-full border border-gold/40" />
              <span className="text-gold-light text-lg">🍒</span>
              <span className="font-display text-gold-light font-bold tracking-wider text-lg leading-none">
                BFK
              </span>
              <span className="font-script text-gold/70 text-xs">Auckland</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
