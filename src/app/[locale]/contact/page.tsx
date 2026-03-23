import { GlitchText } from "@/components/animations/GlitchText";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { useTranslations } from "next-intl";

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
      <ContactForm />
    </div>
  );
}
