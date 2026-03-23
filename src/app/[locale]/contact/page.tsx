import { GlitchText } from "@/components/animations/GlitchText";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { useTranslations } from "next-intl";
import { contactInfo } from "@/data/about";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div className="relative z-10 min-h-screen px-6 pt-32 pb-20">
      <ScrollReveal>
        <GlitchText
          text={t("title")}
          as="h1"
          className="mb-16 text-center font-[family-name:var(--font-heading)] text-6xl text-[var(--color-dark)] md:text-8xl"
        />
      </ScrollReveal>

      <div className="mx-auto max-w-xl space-y-6">
        <ScrollReveal>
          <a
            href={`https://wa.me/${contactInfo.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 border border-[var(--color-dark)]/10 bg-white px-6 py-5 transition-colors hover:border-[var(--color-dark)]/30"
          >
            <svg className="h-6 w-6 shrink-0 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.637l4.669-1.418A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.39-1.584l-.39-.234-3.307 1.005 1.05-3.203-.267-.417A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            <div>
              <p className="font-[family-name:var(--font-heading)] text-sm uppercase tracking-widest text-[var(--color-dark)]/40">WhatsApp</p>
              <p className="mt-0.5">{contactInfo.phone}</p>
            </div>
          </a>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-center gap-4 border border-[var(--color-dark)]/10 bg-white px-6 py-5 transition-colors hover:border-[var(--color-dark)]/30"
          >
            <svg className="h-6 w-6 shrink-0 text-[var(--color-sky)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <div>
              <p className="font-[family-name:var(--font-heading)] text-sm uppercase tracking-widest text-[var(--color-dark)]/40">Email</p>
              <p className="mt-0.5">{contactInfo.email}</p>
            </div>
          </a>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <a
            href={contactInfo.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 border border-[var(--color-dark)]/10 bg-white px-6 py-5 transition-colors hover:border-[var(--color-dark)]/30"
          >
            <svg className="h-6 w-6 shrink-0 text-[#1769FF]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
            </svg>
            <div>
              <p className="font-[family-name:var(--font-heading)] text-sm uppercase tracking-widest text-[var(--color-dark)]/40">Behance</p>
              <p className="mt-0.5">pedromagallanes95</p>
            </div>
          </a>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 border border-[var(--color-dark)]/10 bg-white px-6 py-5 transition-colors hover:border-[var(--color-dark)]/30"
          >
            <svg className="h-6 w-6 shrink-0 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <div>
              <p className="font-[family-name:var(--font-heading)] text-sm uppercase tracking-widest text-[var(--color-dark)]/40">LinkedIn</p>
              <p className="mt-0.5">pedro-magallanes</p>
            </div>
          </a>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <a
            href="/Pedro-Magallanes-Portfolio.pdf"
            download
            className="flex items-center gap-4 border-2 border-[var(--color-dark)] bg-[var(--color-dark)] px-6 py-5 text-white transition-colors hover:bg-transparent hover:text-[var(--color-dark)]"
          >
            <svg className="h-6 w-6 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            <div>
              <p className="font-[family-name:var(--font-heading)] text-sm uppercase tracking-widest opacity-60">{t("downloadLabel")}</p>
              <p className="mt-0.5 font-[family-name:var(--font-heading)] uppercase">{t("downloadCta")}</p>
            </div>
          </a>
        </ScrollReveal>
      </div>
    </div>
  );
}
