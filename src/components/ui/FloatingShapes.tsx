"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function FloatingShapes() {
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  const x1 = useTransform(springX, [0, 1], [0, 30]);
  const y1 = useTransform(springY, [0, 1], [0, 20]);
  const x2 = useTransform(springX, [0, 1], [0, -20]);
  const y2 = useTransform(springY, [0, 1], [0, -15]);

  useEffect(() => {
    if (reduced) return;
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY, reduced]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Yellow triangle top-right */}
      <motion.div
        style={reduced ? {} : { x: x1, y: y1 }}
        className="absolute -top-4 right-12 md:right-24"
      >
        <div className="h-0 w-0 border-b-[80px] border-l-[40px] border-r-[40px] border-b-[var(--color-gold)] border-l-transparent border-r-transparent md:border-b-[120px] md:border-l-[60px] md:border-r-[60px]" />
      </motion.div>

      {/* Blue semicircle bottom-left */}
      <motion.div
        style={reduced ? {} : { x: x2, y: y2 }}
        className="absolute -bottom-16 -left-16 md:-bottom-24 md:-left-24"
      >
        <div className="h-32 w-64 rounded-t-full bg-[var(--color-sky)] md:h-48 md:w-96" />
      </motion.div>

      {/* Blue triangle top-right corner */}
      <motion.div
        style={reduced ? {} : { x: x1, y: y2 }}
        className="absolute -right-4 -top-4"
      >
        <div className="h-0 w-0 border-l-[60px] border-t-[60px] border-l-transparent border-t-[var(--color-sky)] md:border-l-[100px] md:border-t-[100px]" />
      </motion.div>

      {/* Small blue circle */}
      <motion.div
        style={reduced ? {} : { x: x2, y: y1 }}
        className="absolute bottom-32 right-1/4"
      >
        <div className="h-16 w-16 rounded-full bg-[var(--color-sky)]/30 md:h-24 md:w-24" />
      </motion.div>

      {/* Sun/star element */}
      <motion.div
        style={reduced ? {} : { x: x1, y: y1 }}
        className="absolute right-8 bottom-24 text-[var(--color-gold)] md:right-16"
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="8" fill="currentColor" />
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="20"
              y1="4"
              x2="20"
              y2="10"
              stroke="currentColor"
              strokeWidth="2"
              transform={`rotate(${i * 30} 20 20)`}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
