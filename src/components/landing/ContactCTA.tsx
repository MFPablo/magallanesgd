"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { motion } from "framer-motion";

export function ContactCTA() {
  const t = useTranslations("contact");

  return (
    <section className="relative z-10 overflow-hidden px-6 py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -bottom-24 -right-24 h-64 w-96 rounded-full bg-[var(--color-sky)]/20 blur-3xl" />
        <div className="absolute -left-16 top-0 h-48 w-72 rounded-full bg-[var(--color-sky)]/10 blur-2xl" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-heading)] text-5xl text-[var(--color-dark)] md:text-7xl">
            {t("title")}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <motion.a
            href="https://wa.me/5491134600597"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex items-center gap-3 bg-[#25D366] px-10 py-5 font-[family-name:var(--font-heading)] text-lg uppercase tracking-wider text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(37, 211, 102, 0.4)",
                "0 0 0 20px rgba(37, 211, 102, 0)",
              ],
            }}
            transition={{
              boxShadow: { duration: 1.5, repeat: Infinity },
            }}
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.637l4.669-1.418A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.39-1.584l-.39-.234-3.307 1.005 1.05-3.203-.267-.417A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            {t("cta")}
          </motion.a>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 flex items-center justify-center gap-6">
            <a href="mailto:pedromagallanes.dg@gmail.com" className="text-sm text-[var(--color-dark)]/60 transition-colors hover:text-[var(--color-sky)]">
              pedromagallanes.dg@gmail.com
            </a>
            <a href="https://behance.net/pedromagallanes95" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-dark)]/60 transition-colors hover:text-[var(--color-sky)]">
              Behance
            </a>
            <a href="https://linkedin.com/in/pedro-magallanes" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-dark)]/60 transition-colors hover:text-[var(--color-sky)]">
              LinkedIn
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <Link
            href="/contact"
            className="mt-4 inline-block text-sm text-[var(--color-dark)]/40 underline transition-colors hover:text-[var(--color-dark)]"
          >
            {t("more")}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
