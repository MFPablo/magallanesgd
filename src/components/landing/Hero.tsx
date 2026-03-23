"use client";

import { GlitchText } from "@/components/animations/GlitchText";
import { TypewriterText } from "@/components/animations/TypewriterText";
import { FloatingShapes } from "@/components/ui/FloatingShapes";
import { ChevronArrows } from "@/components/ui/ChevronArrows";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <FloatingShapes />

      <div className="relative z-10 text-center">
        <p className="mb-4 font-[family-name:var(--font-heading)] text-sm tracking-[0.3em] text-[var(--color-dark)]/60">
          2020 &bull; 2025
        </p>

        <GlitchText
          text={t("title")}
          as="h1"
          className="font-[family-name:var(--font-heading)] text-6xl leading-none tracking-tight text-[var(--color-gold)] md:text-8xl lg:text-[10rem]"
        />

        <div className="mt-4">
          <TypewriterText
            text={t("subtitle")}
            className="font-[family-name:var(--font-heading)] text-3xl tracking-wider text-[var(--color-dark)] md:text-5xl lg:text-6xl"
          />
        </div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <ChevronArrows />
        </motion.div>
      </div>
    </section>
  );
}
