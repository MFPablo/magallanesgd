import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/portfolio": "/portfolio",
    "/portfolio/[slug]": "/portfolio/[slug]",
    "/about": {
      es: "/sobre-mi",
      en: "/about",
    },
    "/contact": {
      es: "/contacto",
      en: "/contact",
    },
  },
});
