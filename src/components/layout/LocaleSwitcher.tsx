"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useTransition } from "react";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function toggleLocale() {
    const next = locale === "es" ? "en" : "es";
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- pathname includes dynamic segments at runtime
        { pathname, params },
        { locale: next }
      );
    });
  }

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className="relative flex h-8 w-16 items-center justify-between rounded-full border border-white/20 bg-white/10 px-1 text-xs font-[family-name:var(--font-heading)] uppercase tracking-wider transition-colors hover:border-white/40"
      aria-label="Switch language"
    >
      <span
        className={`absolute left-1 top-1 z-10 flex h-6 w-7 items-center justify-center rounded-full bg-white text-[var(--color-dark)] transition-transform duration-300 ${
          locale === "en" ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {locale === "es" ? "ES" : "EN"}
      </span>
      <span className={`z-0 flex h-6 w-7 items-center justify-center text-white/40 ${locale === "es" ? "opacity-0" : "opacity-100"}`}>ES</span>
      <span className={`z-0 flex h-6 w-7 items-center justify-center text-white/40 ${locale === "en" ? "opacity-0" : "opacity-100"}`}>EN</span>
    </button>
  );
}
