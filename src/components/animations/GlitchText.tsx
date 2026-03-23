"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span";
}

export function GlitchText({ text, className = "", as: Tag = "h1" }: GlitchTextProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 z-20 text-[var(--color-gold)]"
        style={{ clipPath: "inset(10% 0 60% 0)" }}
        animate={{
          x: [0, -3, 3, -1, 0],
          opacity: [0, 1, 1, 1, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 4,
          ease: "linear",
        }}
      >
        {text}
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 z-20 text-[var(--color-sky)]"
        style={{ clipPath: "inset(50% 0 20% 0)" }}
        animate={{
          x: [0, 2, -2, 1, 0],
          opacity: [0, 1, 1, 1, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 5,
          delay: 2,
          ease: "linear",
        }}
      >
        {text}
      </motion.span>
    </Tag>
  );
}
