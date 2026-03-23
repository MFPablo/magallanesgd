"use client";

import { useTranslations } from "next-intl";
import { clientLogos, testimonials } from "@/data/testimonials";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Marquee } from "@/components/animations/Marquee";
import { GlitchText } from "@/components/animations/GlitchText";
import { motion } from "framer-motion";

export function Clients() {
  const t = useTranslations("clients");

  return (
    <section className="relative z-10 py-32">
      <ScrollReveal className="px-6">
        <div className="mx-auto max-w-7xl">
          <GlitchText
            text={t("title")}
            as="h2"
            className="mb-16 font-[family-name:var(--font-heading)] text-5xl text-[var(--color-dark)] md:text-7xl"
          />
        </div>
      </ScrollReveal>

      <Marquee className="py-8" speed={25}>
        {clientLogos.map((client) => (
          <div
            key={client.name}
            className="flex h-16 w-32 items-center justify-center px-4 grayscale transition-all hover:grayscale-0"
          >
            <span className="font-[family-name:var(--font-heading)] text-lg uppercase text-[var(--color-dark)]/40 transition-colors hover:text-[var(--color-dark)]">
              {client.name}
            </span>
          </div>
        ))}
      </Marquee>

      <div className="mx-auto mt-16 grid max-w-7xl gap-6 px-6 md:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <motion.div
              className="border border-[var(--color-dark)]/10 bg-white p-8"
              whileHover={{
                rotateY: 5,
                rotateX: -2,
                transition: { duration: 0.3 },
              }}
              style={{ transformPerspective: 800 }}
            >
              <p className="text-sm italic text-[var(--color-dark)]/70">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="mt-4 border-t border-[var(--color-dark)]/10 pt-4">
                <p className="font-[family-name:var(--font-heading)] text-sm uppercase">{testimonial.name}</p>
                <p className="text-xs text-[var(--color-dark)]/50">{testimonial.company}</p>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
