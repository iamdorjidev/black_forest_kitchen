import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
  scaleOnHover?: number;
}

export default function TiltCard({
  children,
  className,
  maxTilt = 10,
  glare = true,
  scaleOnHover = 1,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const hovering = useMotionValue(0);

  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [0, 1], [maxTilt, -maxTilt]), spring);
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxTilt, maxTilt]), spring);
  const scale = useSpring(useTransform(hovering, [0, 1], [1, scaleOnHover]), spring);
  const glareBg = useTransform([x, y], (latest) => {
    const [gx, gy] = latest as number[];
    return `radial-gradient(circle at ${gx * 100}% ${gy * 100}%, rgba(255,255,255,0.35), transparent 60%)`;
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleEnter = () => hovering.set(1);
  const handleLeave = () => {
    hovering.set(0);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ perspective: 1000 }}
      className={className}
    >
      <motion.div style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }} className="relative w-full h-full">
        {children}
        {glare && (
          <motion.div
            style={{ background: glareBg }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
          />
        )}
      </motion.div>
    </div>
  );
}
