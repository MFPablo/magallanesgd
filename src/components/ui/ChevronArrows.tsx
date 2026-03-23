"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ChevronArrows() {
  const reduced = useReducedMotion();

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={i}
          className="font-[var(--font-heading)] text-xl text-[var(--color-dark)]"
          initial={reduced ? {} : { opacity: 0.3 }}
          animate={reduced ? {} : { opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        >
          &#9654;
        </motion.span>
      ))}
    </div>
  );
}
