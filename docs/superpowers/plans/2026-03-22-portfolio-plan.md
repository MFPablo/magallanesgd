# Pedro Magallanes Portfolio - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive, experimental portfolio website for graphic designer Pedro Magallanes using Next.js with bilingual support (ES/EN).

**Architecture:** Hybrid approach — immersive landing page + individual case study pages per project. Static site generation with Framer Motion animations. Data stored in TypeScript files, no CMS.

**Tech Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Framer Motion, next-intl

**Spec:** `docs/superpowers/specs/2026-03-22-portfolio-design.md`

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`, `postcss.config.mjs`
- Create: `.gitignore`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`

- [ ] **Step 1: Scaffold Next.js project**

```bash
cd /Users/pablo/Documents/projects/pedrito
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Accept defaults. This will scaffold into the current directory.

- [ ] **Step 2: Install dependencies**

```bash
npm install framer-motion next-intl
npm install -D @types/node
```

- [ ] **Step 3: Configure Tailwind with project design tokens**

Update `tailwind.config.ts` to add the color palette and fonts from the spec:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#F5C518",
        sky: "#2D9BF0",
        dark: "#1A1A1A",
        cream: "#FAF8F5",
      },
      fontFamily: {
        heading: ["var(--font-bebas)", "Anton", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: Add .gitignore entries**

Ensure `.gitignore` includes:
```
node_modules/
.next/
out/
*.env*
.DS_Store
```

- [ ] **Step 5: Verify dev server runs**

```bash
npm run dev
```

Visit `http://localhost:3000` — should see default Next.js page.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "chore: scaffold Next.js project with Tailwind and dependencies"
```

---

### Task 2: Internationalization Setup (next-intl)

**Files:**
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`
- Create: `src/i18n/navigation.ts`
- Create: `src/messages/es.json`
- Create: `src/messages/en.json`
- Create: `src/middleware.ts`
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/page.tsx`
- Modify: `next.config.ts`
- Delete: `src/app/layout.tsx`, `src/app/page.tsx` (replaced by `[locale]` versions)

- [ ] **Step 1: Create routing config**

```typescript
// src/i18n/routing.ts
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
```

- [ ] **Step 2: Create request config**

```typescript
// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 3: Create navigation helpers**

```typescript
// src/i18n/navigation.ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

- [ ] **Step 4: Create middleware**

```typescript
// src/middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

- [ ] **Step 5: Create translation files**

Create `src/messages/es.json` and `src/messages/en.json` with initial nav keys:

```json
// es.json
{
  "nav": {
    "home": "Inicio",
    "portfolio": "Portfolio",
    "about": "Sobre Mí",
    "contact": "Contacto"
  },
  "hero": {
    "title": "PEDRO MAGALLANES.",
    "subtitle": "DISEÑADOR GRÁFICO",
    "cta": "Ver Portfolio"
  },
  "portfolio": {
    "title": "Portfolio",
    "viewAll": "Ver todo el portfolio",
    "filter": "Filtrar",
    "all": "Todos",
    "prev": "Anterior",
    "next": "Siguiente"
  },
  "services": {
    "title": "Servicios",
    "items": {
      "identity": { "name": "Identidad Visual", "desc": "Diseño de logos, paletas de color y sistemas visuales completos para tu marca." },
      "branding": { "name": "Branding", "desc": "Construcción integral de identidad de marca con coherencia en todos los puntos de contacto." },
      "packaging": { "name": "Packaging", "desc": "Diseño de envases y empaques que destacan en el punto de venta." },
      "editorial": { "name": "Diseño Editorial", "desc": "Maquetación de revistas, catálogos, infografías y piezas impresas." },
      "social": { "name": "Social Media", "desc": "Contenido visual para redes sociales que conecta con tu audiencia." },
      "web": { "name": "Diseño Web", "desc": "Sitios web modernos, responsivos y optimizados para conversión." }
    }
  },
  "about": {
    "title": "Sobre Mí",
    "bio": "Hola! Soy Pedro. Diseñador Gráfico Artístico Digital. Creatividad, versatilidad y pasión por el diseño. Actualmente, soy recibido en la carrera de Diseñador Gráfico Artístico Digital en el Colegio Da Vinci, complementando mi formación con cursos de Diseño Web y Diseño UX en Coderhouse. Mi experiencia en diversos rubros me ha permitido desarrollar una mirada integral y adaptativa, combinando estética, funcionalidad y comunicación efectiva en cada proyecto.",
    "skills": "Habilidades",
    "software": "Software",
    "education": "Formación",
    "languages": "Idiomas"
  },
  "contact": {
    "title": "Contacto",
    "cta": "Escribime por WhatsApp",
    "more": "Ver más formas de contacto",
    "form": {
      "name": "Nombre",
      "email": "Email",
      "message": "Mensaje",
      "send": "Enviar"
    }
  },
  "clients": {
    "title": "Clientes"
  },
  "footer": {
    "rights": "Todos los derechos reservados"
  }
}
```

```json
// en.json
{
  "nav": {
    "home": "Home",
    "portfolio": "Portfolio",
    "about": "About",
    "contact": "Contact"
  },
  "hero": {
    "title": "PEDRO MAGALLANES.",
    "subtitle": "GRAPHIC DESIGNER",
    "cta": "View Portfolio"
  },
  "portfolio": {
    "title": "Portfolio",
    "viewAll": "View full portfolio",
    "filter": "Filter",
    "all": "All",
    "prev": "Previous",
    "next": "Next"
  },
  "services": {
    "title": "Services",
    "items": {
      "identity": { "name": "Visual Identity", "desc": "Logo design, color palettes, and complete visual systems for your brand." },
      "branding": { "name": "Branding", "desc": "Comprehensive brand identity building with consistency across all touchpoints." },
      "packaging": { "name": "Packaging", "desc": "Package and container design that stands out at the point of sale." },
      "editorial": { "name": "Editorial Design", "desc": "Layout of magazines, catalogs, infographics, and printed pieces." },
      "social": { "name": "Social Media", "desc": "Visual content for social media that connects with your audience." },
      "web": { "name": "Web Design", "desc": "Modern, responsive websites optimized for conversion." }
    }
  },
  "about": {
    "title": "About Me",
    "bio": "Hi! I'm Pedro. Digital Artistic Graphic Designer. Creativity, versatility, and passion for design. I graduated in Digital Artistic Graphic Design from Colegio Da Vinci, complementing my education with Web Design and UX Design courses at Coderhouse. My experience across various industries has allowed me to develop a comprehensive and adaptive perspective, combining aesthetics, functionality, and effective communication in every project.",
    "skills": "Skills",
    "software": "Software",
    "education": "Education",
    "languages": "Languages"
  },
  "contact": {
    "title": "Contact",
    "cta": "Message me on WhatsApp",
    "more": "See more contact options",
    "form": {
      "name": "Name",
      "email": "Email",
      "message": "Message",
      "send": "Send"
    }
  },
  "clients": {
    "title": "Clients"
  },
  "footer": {
    "rights": "All rights reserved"
  }
}
```

- [ ] **Step 6: Update next.config.ts**

```typescript
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);
```

- [ ] **Step 7: Create root locale layout and page**

Delete `src/app/layout.tsx` and `src/app/page.tsx`. Create:

```typescript
// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const bebas = localFont({
  src: "../fonts/BebasNeue-Regular.ttf",
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "Pedro Magallanes | Diseñador Gráfico",
  description: "Portfolio de Pedro Magallanes - Diseñador Gráfico Artístico Digital",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${bebas.variable}`}>
      <body className="bg-cream text-dark font-body antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

```typescript
// src/app/[locale]/page.tsx
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("hero");
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="font-heading text-6xl">{t("title")}</h1>
    </main>
  );
}
```

- [ ] **Step 8: Download Bebas Neue font**

```bash
mkdir -p src/app/fonts
curl -L -o /tmp/bebas.zip "https://fonts.google.com/download?family=Bebas+Neue"
unzip -o /tmp/bebas.zip -d /tmp/bebas
cp /tmp/bebas/BebasNeue-Regular.ttf src/app/fonts/
```

- [ ] **Step 9: Verify i18n works**

```bash
npm run dev
```

Visit `http://localhost:3000` (ES) and `http://localhost:3000/en` (EN). Both should render with the title.

- [ ] **Step 10: Commit**

```bash
git add .
git commit -m "feat: add next-intl i18n with ES/EN support and routing"
```

---

### Task 3: Data Layer

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/data/services.ts`
- Create: `src/data/about.ts`
- Create: `src/data/testimonials.ts`

- [ ] **Step 1: Create project data with types**

```typescript
// src/data/projects.ts
export type Category = "logofolio" | "branding" | "packaging" | "editorial" | "social-media" | "web-design";

export interface Project {
  slug: string;
  title: string;
  category: Category;
  year: number;
  client: string;
  coverImage: string;
  images: string[];
  tools: string[];
  featured: boolean;
  description: {
    problem: string;
    process: string;
    solution: string;
  };
  palette?: string[];
  typography?: string[];
}

export const projects: Project[] = [
  {
    slug: "etreum",
    title: "Etreum",
    category: "logofolio",
    year: 2024,
    client: "Etreum Horror Film Festival",
    coverImage: "/projects/etreum/cover.jpg",
    images: ["/projects/etreum/01.jpg", "/projects/etreum/02.jpg", "/projects/etreum/03.jpg"],
    tools: ["Illustrator", "Photoshop"],
    featured: true,
    description: {
      problem: "Un festival de cine independiente de terror necesitaba un logotipo que capturara la esencia del horror con un toque caricaturesco.",
      process: "Tomando las morfologías de criaturas creadas para el evento, el logo juega con formas rectas y curvas en un tono caricaturesco pero estructurado.",
      solution: "Logotipo que combina elementos de terror con un estilo accesible, usado en toda la identidad visual del festival.",
    },
    palette: ["#1A1A1A", "#FF0000", "#FFFFFF"],
    typography: ["Custom display"],
  },
  {
    slug: "inspectre",
    title: "Inspectre",
    category: "branding",
    year: 2024,
    client: "Inspectre",
    coverImage: "/projects/inspectre/cover.jpg",
    images: ["/projects/inspectre/01.jpg", "/projects/inspectre/02.jpg", "/projects/inspectre/03.jpg"],
    tools: ["Illustrator", "Photoshop", "InDesign"],
    featured: true,
    description: {
      problem: "Marca de abanicos personalizados necesitaba una identidad que reflejara su estilo urbano y juvenil.",
      process: "Constituido con una tipografía ondulada que machea con el estilo de la marca, incorporando el isotipo del abanico.",
      solution: "Branding completo incluyendo logo, packaging y material para redes sociales con estética neón y vibrante.",
    },
    palette: ["#0D0033", "#FF00FF", "#CCFF00", "#FFFFFF"],
    typography: ["Custom graffiti"],
  },
  {
    slug: "segurola-y-habana",
    title: "Segurola y Habana",
    category: "branding",
    year: 2024,
    client: "Segurola y Habana Futbol",
    coverImage: "/projects/segurola-y-habana/cover.jpg",
    images: ["/projects/segurola-y-habana/01.jpg", "/projects/segurola-y-habana/02.jpg"],
    tools: ["Illustrator", "Photoshop"],
    featured: true,
    description: {
      problem: "Equipo de futbol amateur necesitaba un escudo que honrara la tradición pero con un diseño moderno.",
      process: "Tomando el escudo nacional como emblema, sumando el clásico 10 de Maradona, el logo tanto como el nombre referencia al ídolo de todos.",
      solution: "Escudo completo con diseño de indumentaria deportiva incluyendo camiseta oficial.",
    },
    palette: ["#2D9BF0", "#FFFFFF", "#1A1A1A", "#F5C518"],
    typography: ["Serif display"],
  },
  {
    slug: "kaffeehaus",
    title: "Kaffeehaus",
    category: "logofolio",
    year: 2020,
    client: "Kaffeehaus",
    coverImage: "/projects/kaffeehaus/cover.jpg",
    images: ["/projects/kaffeehaus/01.jpg"],
    tools: ["Illustrator"],
    featured: false,
    description: {
      problem: "Cafetería necesitaba un isotipo que transmitiera calidez y tradición.",
      process: "El logo tiene un estilo Bauhaus, tomando como referencia la tetera de Marianne Brandt de 1924.",
      solution: "Isotipo minimalista con líneas limpias que evoca la cultura del café.",
    },
    palette: ["#1A1A1A", "#FFFFFF"],
    typography: ["Geometric sans"],
  },
  {
    slug: "gm-muebles",
    title: "GM Muebles",
    category: "logofolio",
    year: 2023,
    client: "GM Muebles",
    coverImage: "/projects/gm-muebles/cover.jpg",
    images: ["/projects/gm-muebles/01.jpg"],
    tools: ["Illustrator"],
    featured: false,
    description: {
      problem: "Emprendimiento de fabricación y restauración de muebles necesitaba un logo profesional.",
      process: "El logo toma las geometrías y cortes rectos propios de la industria para formar las iniciales GM.",
      solution: "Logotipo geométrico que comunica solidez y artesanía.",
    },
    palette: ["#4A7C59", "#1A1A1A", "#FFFFFF"],
    typography: ["Geometric sans"],
  },
  {
    slug: "nacional-futbol",
    title: "Nacional Futbol",
    category: "logofolio",
    year: 2022,
    client: "Nacional Futbol",
    coverImage: "/projects/nacional-futbol/cover.jpg",
    images: ["/projects/nacional-futbol/01.jpg"],
    tools: ["Illustrator"],
    featured: false,
    description: {
      problem: "Equipo de futbol amateur necesitaba un rediseño de escudo que mantuviera la esencia original.",
      process: "Inspirado en viejos escudos tradicionales de futbol, este rediseño mantiene la esencia original pero moderniza la insignia.",
      solution: "Escudo modernizado con tipografía N central sobre fondo azul marino y dorado.",
    },
    palette: ["#1B2A4A", "#F5C518", "#FFFFFF"],
    typography: ["Serif display"],
  },
  {
    slug: "mega-viajeros",
    title: "Mega Viajeros Adventure",
    category: "logofolio",
    year: 2024,
    client: "Mega Viajeros",
    coverImage: "/projects/mega-viajeros/cover.jpg",
    images: ["/projects/mega-viajeros/01.jpg"],
    tools: ["Illustrator"],
    featured: false,
    description: {
      problem: "Emprendimiento de turismo aventura necesitaba una identidad visual dinámica.",
      process: "El logo toma las geometrías y formas que evocan movimiento y aventura, formando las iniciales MV.",
      solution: "Logotipo dinámico con colores vibrantes que transmite energía y aventura.",
    },
    palette: ["#F5C518", "#2D9BF0", "#1A1A1A"],
    typography: ["Bold sans"],
  },
  {
    slug: "la-2-rusa",
    title: "La 2 Rusa",
    category: "logofolio",
    year: 2023,
    client: "La 2 Rusa",
    coverImage: "/projects/la-2-rusa/cover.jpg",
    images: ["/projects/la-2-rusa/01.jpg", "/projects/la-2-rusa/02.jpg"],
    tools: ["Illustrator", "Photoshop"],
    featured: false,
    description: {
      problem: "Importador de indumentaria para motociclistas necesitaba un logotipo con identidad americana.",
      process: "Si bien el logo usa las iniciales con una tipo dinámica y moderna, se le sumó la bandera de EEUU ya que el cliente se estableció en dicho país.",
      solution: "Logotipo L2R integrado con la bandera americana, comunicando el origen y la actitud de la marca.",
    },
    palette: ["#B22234", "#3C3B6E", "#FFFFFF", "#1A1A1A"],
    typography: ["Industrial sans"],
  },
  {
    slug: "etreum-festival",
    title: "Etreum Horror Film Festival",
    category: "editorial",
    year: 2024,
    client: "Etreum",
    coverImage: "/projects/etreum-festival/cover.jpg",
    images: ["/projects/etreum-festival/01.jpg", "/projects/etreum-festival/02.jpg", "/projects/etreum-festival/03.jpg"],
    tools: ["Photoshop", "Illustrator", "InDesign"],
    featured: true,
    description: {
      problem: "Festival de cine fantástico, horror y animación necesitaba piezas gráficas para su IV edición internacional.",
      process: "Se crearon personajes que son seres salidos de pesadillas como partido gráfico. La idea fue darle una personalidad distinta al evento con estética de terror pero con tintes caricaturescos.",
      solution: "Sistema gráfico completo con personajes, afiches, stickers y material promocional para sedes en Buenos Aires, Toronto, Madrid, Bogotá, Veracruz y Ciudad de México.",
    },
    palette: ["#FF0000", "#1A1A1A", "#FFFFFF", "#FF6B00"],
    typography: ["Custom horror display"],
  },
  {
    slug: "bauhaus-infografia",
    title: "Bauhaus Infografía",
    category: "editorial",
    year: 2023,
    client: "Proyecto académico",
    coverImage: "/projects/bauhaus/cover.jpg",
    images: ["/projects/bauhaus/01.jpg"],
    tools: ["InDesign", "Illustrator", "Photoshop"],
    featured: false,
    description: {
      problem: "Crear una infografía educativa sobre la historia de la Bauhaus.",
      process: "Investigación de la escuela Bauhaus (1919-1933) y diseño con estética inspirada en el movimiento.",
      solution: "Infografía de línea temporal con tipografía y geometría Bauhaus, combinando fotografía de época con elementos gráficos.",
    },
    palette: ["#F5C518", "#FF0000", "#2D9BF0", "#1A1A1A"],
    typography: ["Futura", "Universal"],
  },
  {
    slug: "social-media-inspectre",
    title: "Social Media Inspectre",
    category: "social-media",
    year: 2024,
    client: "Inspectre",
    coverImage: "/projects/social-inspectre/cover.jpg",
    images: ["/projects/social-inspectre/01.jpg", "/projects/social-inspectre/02.jpg"],
    tools: ["Photoshop", "Illustrator"],
    featured: true,
    description: {
      problem: "La marca necesitaba contenido visual para redes sociales que mantuviera coherencia con su identidad urbana.",
      process: "Diseño de piezas para Instagram incluyendo posts, stories y material promocional del showroom.",
      solution: "Suite de contenido para redes con estética neón y street style, incluyendo fotos de producto y piezas informativas.",
    },
    palette: ["#0D0033", "#FF00FF", "#CCFF00"],
    typography: ["Custom graffiti", "Sans-serif"],
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: Category): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getAdjacentProjects(slug: string): { prev: Project | null; next: Project | null } {
  const idx = projects.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  };
}
```

- [ ] **Step 2: Create services data**

```typescript
// src/data/services.ts
export interface Service {
  id: string;
  icon: string;
  priceRange: string;
}

export const services: Service[] = [
  { id: "identity", icon: "eye", priceRange: "$200 - $800" },
  { id: "branding", icon: "palette", priceRange: "$500 - $2000" },
  { id: "packaging", icon: "box", priceRange: "$300 - $1200" },
  { id: "editorial", icon: "book", priceRange: "$200 - $1000" },
  { id: "social", icon: "share", priceRange: "$150 - $600" },
  { id: "web", icon: "globe", priceRange: "$400 - $1500" },
];
```

- [ ] **Step 3: Create about data**

```typescript
// src/data/about.ts
export interface Skill {
  name: string;
  level: number; // 1-5
}

export interface Software {
  name: string;
  shortName: string;
  level: number; // 1-5
  color: string;
}

export interface Education {
  institution: string;
  degree: string;
  details?: string[];
  years: string;
}

export const skills: Skill[] = [
  { name: "Diseño de identidad visual", level: 5 },
  { name: "Fotografía", level: 4 },
  { name: "Edición editorial", level: 4 },
  { name: "Diseño de packaging", level: 4 },
  { name: "Branding", level: 5 },
  { name: "Modelado 3D", level: 3 },
  { name: "Marketing digital", level: 3 },
  { name: "Motion Graphics", level: 3 },
  { name: "Diseño Web", level: 4 },
  { name: "UX Design", level: 3 },
  { name: "Diseño para impresión", level: 4 },
  { name: "Diseño para e-commerce", level: 3 },
];

export const software: Software[] = [
  { name: "Adobe Photoshop", shortName: "PS", level: 5, color: "#31A8FF" },
  { name: "Adobe Illustrator", shortName: "AI", level: 5, color: "#FF9A00" },
  { name: "Adobe InDesign", shortName: "ID", level: 4, color: "#FF3366" },
  { name: "Adobe After Effects", shortName: "AE", level: 3, color: "#9999FF" },
  { name: "Adobe Lightroom", shortName: "LR", level: 4, color: "#31A8FF" },
  { name: "Cinema 4D", shortName: "3D", level: 3, color: "#011A6A" },
  { name: "Adobe XD", shortName: "XD", level: 4, color: "#FF61F6" },
  { name: "WordPress", shortName: "W", level: 4, color: "#21759B" },
  { name: "Elementor", shortName: "E", level: 3, color: "#92003B" },
  { name: "HTML/CSS/Bootstrap", shortName: "WEB", level: 4, color: "#E34F26" },
];

export const education: Education[] = [
  {
    institution: "Escuela Da Vinci",
    degree: "Diseñador Gráfico Artístico Digital",
    years: "2020 - 2024",
  },
  {
    institution: "Coderhouse",
    degree: "Diseñador Web",
    details: ["Curso Diseño UX", "Curso Diseño Web"],
    years: "2018 - 2019",
  },
];

export const languages = [
  { name: "Español", level: "Nativo" },
  { name: "Inglés", level: "Intermedio" },
];

export const contactInfo = {
  phone: "11-3460-0597",
  whatsapp: "5491134600597",
  email: "pedromagallanes.dg@gmail.com",
  behance: "https://behance.net/pedromagallanes95",
  linkedin: "https://linkedin.com/in/pedro-magallanes",
};
```

- [ ] **Step 4: Create testimonials data**

```typescript
// src/data/testimonials.ts
export interface Testimonial {
  name: string;
  company: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Cliente Inspectre",
    company: "Inspectre",
    text: "Pedro capturó perfectamente la esencia de nuestra marca. El branding y packaging superaron nuestras expectativas.",
  },
  {
    name: "Etreum Festival",
    company: "Etreum Horror Film Festival",
    text: "El trabajo gráfico para nuestro festival fue excepcional. Los personajes y la identidad visual le dieron una personalidad única al evento.",
  },
  {
    name: "GM Muebles",
    company: "GM Muebles",
    text: "Un logo que representa exactamente lo que hacemos. Profesional y con gran atención al detalle.",
  },
];

export const clientLogos = [
  { name: "Etreum", logo: "/clients/etreum.svg" },
  { name: "Nacional Futbol", logo: "/clients/nacional.svg" },
  { name: "Segurola y Habana", logo: "/clients/segurola.svg" },
  { name: "Kaffeehaus", logo: "/clients/kaffeehaus.svg" },
  { name: "GM Muebles", logo: "/clients/gm-muebles.svg" },
  { name: "Inspectre", logo: "/clients/inspectre.svg" },
  { name: "Mega Viajeros", logo: "/clients/mega-viajeros.svg" },
  { name: "La 2 Rusa", logo: "/clients/la2rusa.svg" },
];
```

- [ ] **Step 5: Create placeholder images directory**

```bash
mkdir -p public/projects/{etreum,inspectre,segurola-y-habana,kaffeehaus,gm-muebles,nacional-futbol,mega-viajeros,la-2-rusa,etreum-festival,bauhaus,social-inspectre}
mkdir -p public/clients
```

Create a simple placeholder SVG for projects that don't have images yet:

```bash
# Create a placeholder image
cat > public/placeholder.svg << 'SVG'
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="600" fill="#FAF8F5"/>
  <rect x="1" y="1" width="798" height="598" fill="none" stroke="#E5E5E5" stroke-width="1"/>
  <text x="400" y="300" text-anchor="middle" fill="#CCCCCC" font-family="sans-serif" font-size="24">Imagen del proyecto</text>
</svg>
SVG
```

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add data layer with projects, services, about, and testimonials"
```

---

### Task 4: Layout, Navbar & Shared Components

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/LocaleSwitcher.tsx`
- Create: `src/components/ui/GridBackground.tsx`
- Create: `src/components/ui/GrainOverlay.tsx`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Create GridBackground component**

This is the grid/graph paper pattern from the PDF used as background throughout the site.

```typescript
// src/components/ui/GridBackground.tsx
"use client";

export function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E0DED8" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Create GrainOverlay component**

```typescript
// src/components/ui/GrainOverlay.tsx
"use client";

export function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
    />
  );
}
```

- [ ] **Step 3: Create LocaleSwitcher**

```typescript
// src/components/layout/LocaleSwitcher.tsx
"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function toggleLocale() {
    const next = locale === "es" ? "en" : "es";
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className="relative flex h-8 w-16 items-center rounded-full border border-dark/20 bg-white/50 px-1 text-xs font-heading uppercase tracking-wider transition-colors hover:border-dark/40"
      aria-label="Switch language"
    >
      <span
        className={`absolute left-1 top-1 flex h-6 w-7 items-center justify-center rounded-full bg-dark text-white transition-transform duration-300 ${
          locale === "en" ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {locale === "es" ? "ES" : "EN"}
      </span>
      <span className="ml-9 text-dark/40">{locale === "es" ? "EN" : "ES"}</span>
    </button>
  );
}
```

- [ ] **Step 4: Create Navbar**

```typescript
// src/components/layout/Navbar.tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/" as const, label: t("home") },
    { href: "/portfolio" as const, label: t("portfolio") },
    { href: "/about" as const, label: t("about") },
    { href: "/contact" as const, label: t("contact") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 mix-blend-difference">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-heading text-2xl text-white">
          PM.
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-heading text-sm uppercase tracking-widest text-white transition-opacity hover:opacity-60"
            >
              {link.label}
            </Link>
          ))}
          <LocaleSwitcher />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-6 bg-white"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block h-0.5 w-6 bg-white"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-6 bg-white"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-dark"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-heading text-4xl uppercase text-white"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <LocaleSwitcher />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
```

- [ ] **Step 5: Create Footer**

```typescript
// src/components/layout/Footer.tsx
import { useTranslations } from "next-intl";
import { contactInfo } from "@/data/about";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-dark/10 bg-cream">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <div className="flex items-center gap-4 font-heading text-sm uppercase tracking-widest">
          <span>Pedro Magallanes</span>
          <span className="text-gold">&#9679;</span>
          <span>Diseñador Gráfico</span>
          <span className="text-gold">&#9679;</span>
          <span>Argentina</span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <a href={contactInfo.behance} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-sky">
            Behance
          </a>
          <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-sky">
            LinkedIn
          </a>
          <a href={`mailto:${contactInfo.email}`} className="transition-colors hover:text-sky">
            Email
          </a>
        </div>
        <p className="text-xs text-dark/50">
          &copy; {year} Pedro Magallanes. {t("rights")}.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: Update layout to include Navbar, Footer, GridBackground, GrainOverlay**

Modify `src/app/[locale]/layout.tsx` to wrap children with these components:

```typescript
// Add imports at top
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GridBackground } from "@/components/ui/GridBackground";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

// Replace {children} in the body with:
<body className="bg-cream text-dark font-body antialiased">
  <NextIntlClientProvider messages={messages}>
    <GridBackground />
    <GrainOverlay />
    <Navbar />
    <main className="relative z-10">{children}</main>
    <Footer />
  </NextIntlClientProvider>
</body>
```

- [ ] **Step 7: Verify layout renders**

```bash
npm run dev
```

Check navbar, grid background, grain overlay, and footer are visible.

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "feat: add layout with navbar, footer, grid background, and grain overlay"
```

---

### Task 5: Animation Utilities

**Files:**
- Create: `src/components/animations/GlitchText.tsx`
- Create: `src/components/animations/ScrollReveal.tsx`
- Create: `src/components/animations/CustomCursor.tsx`
- Create: `src/components/animations/Marquee.tsx`
- Create: `src/components/animations/TypewriterText.tsx`
- Create: `src/components/animations/PageTransition.tsx`
- Create: `src/hooks/useReducedMotion.ts`

- [ ] **Step 1: Create useReducedMotion hook**

```typescript
// src/hooks/useReducedMotion.ts
"use client";

import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
```

- [ ] **Step 2: Create GlitchText component**

```typescript
// src/components/animations/GlitchText.tsx
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
        className="absolute left-0 top-0 z-20 text-gold"
        style={{ clipPath: "inset(10% 0 60% 0)" }}
        animate={{
          x: [0, -3, 3, -1, 0],
          opacity: [0, 1, 1, 1, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 4,
          ease: "steps(4)",
        }}
      >
        {text}
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 z-20 text-sky"
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
          ease: "steps(4)",
        }}
      >
        {text}
      </motion.span>
    </Tag>
  );
}
```

- [ ] **Step 3: Create ScrollReveal component**

```typescript
// src/components/animations/ScrollReveal.tsx
"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Create CustomCursor component**

```typescript
// src/components/animations/CustomCursor.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [x, y, visible]);

  if (reduced || isTouch) return null;

  return (
    <>
      <style jsx global>{`
        * { cursor: none !important; }
      `}</style>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dark mix-blend-difference"
        style={{ x, y, opacity: visible ? 1 : 0 }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold mix-blend-difference"
        style={{ x, y, opacity: visible ? 1 : 0 }}
      />
    </>
  );
}
```

- [ ] **Step 5: Create Marquee component**

```typescript
// src/components/animations/Marquee.tsx
"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function Marquee({ children, speed = 30, className = "" }: MarqueeProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-8 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max items-center gap-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 6: Create TypewriterText component**

```typescript
// src/components/animations/TypewriterText.tsx
"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TypewriterTextProps {
  text: string;
  className?: string;
}

export function TypewriterText({ text, className = "" }: TypewriterTextProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={`inline-flex ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.8 + i * 0.05, duration: 0.15 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
```

- [ ] **Step 7: Create PageTransition component**

```typescript
// src/components/animations/PageTransition.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
        {/* Grid curtain overlay */}
        <motion.div
          className="pointer-events-none fixed inset-0 z-[60] bg-cream"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 8: Add CustomCursor to layout**

Add `import { CustomCursor } from "@/components/animations/CustomCursor";` and place `<CustomCursor />` inside the body after `<GrainOverlay />`.

- [ ] **Step 9: Verify animations work**

```bash
npm run dev
```

Check custom cursor, grain overlay, and grid background.

- [ ] **Step 10: Commit**

```bash
git add .
git commit -m "feat: add animation components (glitch, scroll reveal, cursor, marquee, typewriter)"
```

---

### Task 6: Landing Page - Hero Section

**Files:**
- Create: `src/components/landing/Hero.tsx`
- Create: `src/components/ui/FloatingShapes.tsx`
- Create: `src/components/ui/ChevronArrows.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create FloatingShapes component**

```typescript
// src/components/ui/FloatingShapes.tsx
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
        <div className="h-0 w-0 border-b-[80px] border-l-[40px] border-r-[40px] border-b-gold border-l-transparent border-r-transparent md:border-b-[120px] md:border-l-[60px] md:border-r-[60px]" />
      </motion.div>

      {/* Blue semicircle bottom-left */}
      <motion.div
        style={reduced ? {} : { x: x2, y: y2 }}
        className="absolute -bottom-16 -left-16 md:-bottom-24 md:-left-24"
      >
        <div className="h-32 w-64 rounded-t-full bg-sky md:h-48 md:w-96" />
      </motion.div>

      {/* Blue triangle top-right corner */}
      <motion.div
        style={reduced ? {} : { x: x1, y: y2 }}
        className="absolute -right-4 -top-4"
      >
        <div className="h-0 w-0 border-l-[60px] border-t-[60px] border-l-transparent border-t-sky md:border-l-[100px] md:border-t-[100px]" />
      </motion.div>

      {/* Small blue circle */}
      <motion.div
        style={reduced ? {} : { x: x2, y: y1 }}
        className="absolute bottom-32 right-1/4"
      >
        <div className="h-16 w-16 rounded-full bg-sky/30 md:h-24 md:w-24" />
      </motion.div>

      {/* Sun/star element */}
      <motion.div
        style={reduced ? {} : { x: x1, y: y1 }}
        className="absolute right-8 bottom-24 text-gold md:right-16"
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
```

- [ ] **Step 2: Create ChevronArrows component**

```typescript
// src/components/ui/ChevronArrows.tsx
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
          className="font-heading text-xl text-dark"
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
```

- [ ] **Step 3: Create Hero component**

```typescript
// src/components/landing/Hero.tsx
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
        <p className="mb-4 font-heading text-sm tracking-[0.3em] text-dark/60">
          2020 &bull; 2025
        </p>

        <GlitchText
          text={t("title")}
          as="h1"
          className="font-heading text-6xl leading-none tracking-tight text-gold md:text-8xl lg:text-[10rem]"
        />

        <div className="mt-4">
          <TypewriterText
            text={t("subtitle")}
            className="font-heading text-3xl tracking-wider text-dark md:text-5xl lg:text-6xl"
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
```

- [ ] **Step 4: Update landing page**

```typescript
// src/app/[locale]/page.tsx
import { Hero } from "@/components/landing/Hero";

export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
```

- [ ] **Step 5: Verify hero renders**

```bash
npm run dev
```

Check glitch, typewriter, floating shapes, and chevron arrows.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add hero section with glitch text, typewriter, and floating shapes"
```

---

### Task 7: Landing Page - Portfolio Preview, Services, Testimonials, Contact CTA

**Files:**
- Create: `src/components/landing/PortfolioPreview.tsx`
- Create: `src/components/landing/Services.tsx`
- Create: `src/components/landing/Clients.tsx`
- Create: `src/components/landing/ContactCTA.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create PortfolioPreview**

```typescript
// src/components/landing/PortfolioPreview.tsx
"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getFeaturedProjects } from "@/data/projects";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlitchText } from "@/components/animations/GlitchText";
import { motion } from "framer-motion";
import Image from "next/image";

export function PortfolioPreview() {
  const t = useTranslations("portfolio");
  const featured = getFeaturedProjects();

  return (
    <section className="relative z-10 px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <GlitchText
            text={t("title")}
            as="h2"
            className="mb-16 font-heading text-5xl text-dark md:text-7xl"
          />
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.1}>
              <Link href={`/portfolio/${project.slug}`}>
                <motion.div
                  className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-dark/10 bg-white"
                  whileHover={{ scale: 0.98 }}
                >
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:blur-[2px]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark/0 transition-colors duration-300 group-hover:bg-dark/60">
                    <motion.span
                      className="font-heading text-2xl text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:text-3xl"
                      whileHover={{ x: [0, -2, 2, 0] }}
                      transition={{ duration: 0.2 }}
                    >
                      {project.title}
                    </motion.span>
                    <span className="mt-2 text-sm uppercase tracking-widest text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {project.category} &bull; {project.year}
                    </span>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 border-2 border-dark px-8 py-4 font-heading text-sm uppercase tracking-widest transition-colors hover:bg-dark hover:text-white"
          >
            {t("viewAll")} <span className="text-gold">&rarr;</span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create Services**

```typescript
// src/components/landing/Services.tsx
"use client";

import { useTranslations } from "next-intl";
import { services } from "@/data/services";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlitchText } from "@/components/animations/GlitchText";
import { motion } from "framer-motion";

const icons: Record<string, string> = {
  eye: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  palette: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-1 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9z",
  box: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  book: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  share: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z",
  globe: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
};

export function Services() {
  const t = useTranslations("services");

  return (
    <section className="relative z-10 px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <GlitchText
            text={t("title")}
            as="h2"
            className="mb-16 font-heading text-5xl text-dark md:text-7xl"
          />
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 0.08}>
              <motion.div
                className="group relative border border-dark/10 bg-white p-8 transition-colors hover:border-dark/30"
                whileHover={{
                  x: [0, -1, 1, -1, 0],
                  transition: { duration: 0.2 },
                }}
                style={{
                  backgroundImage:
                    "linear-gradient(#E0DED8 1px, transparent 1px), linear-gradient(90deg, #E0DED8 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                  backgroundPosition: "-1px -1px",
                }}
              >
                <svg
                  className="mb-4 h-8 w-8 text-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={icons[service.icon]} />
                </svg>
                <h3 className="font-heading text-xl uppercase">
                  {t(`items.${service.id}.name`)}
                </h3>
                <p className="mt-2 text-sm text-dark/60">
                  {t(`items.${service.id}.desc`)}
                </p>
                <p className="mt-4 font-heading text-lg text-gold">
                  {service.priceRange}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create Clients (Marquee + Testimonials)**

```typescript
// src/components/landing/Clients.tsx
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
            className="mb-16 font-heading text-5xl text-dark md:text-7xl"
          />
        </div>
      </ScrollReveal>

      {/* Client logos marquee */}
      <Marquee className="py-8" speed={25}>
        {clientLogos.map((client) => (
          <div
            key={client.name}
            className="flex h-16 w-32 items-center justify-center px-4 grayscale transition-all hover:grayscale-0"
          >
            <span className="font-heading text-lg uppercase text-dark/40 transition-colors hover:text-dark">
              {client.name}
            </span>
          </div>
        ))}
      </Marquee>

      {/* Testimonials */}
      <div className="mx-auto mt-16 grid max-w-7xl gap-6 px-6 md:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <motion.div
              className="border border-dark/10 bg-white p-8"
              whileHover={{
                rotateY: 5,
                rotateX: -2,
                transition: { duration: 0.3 },
              }}
              style={{ transformPerspective: 800 }}
            >
              <p className="text-sm italic text-dark/70">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="mt-4 border-t border-dark/10 pt-4">
                <p className="font-heading text-sm uppercase">{testimonial.name}</p>
                <p className="text-xs text-dark/50">{testimonial.company}</p>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create ContactCTA**

```typescript
// src/components/landing/ContactCTA.tsx
"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { contactInfo } from "@/data/about";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { motion } from "framer-motion";

export function ContactCTA() {
  const t = useTranslations("contact");

  return (
    <section className="relative z-10 overflow-hidden px-6 py-32">
      {/* Blue organic shapes background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -bottom-24 -right-24 h-64 w-96 rounded-full bg-sky/20 blur-3xl" />
        <div className="absolute -left-16 top-0 h-48 w-72 rounded-full bg-sky/10 blur-2xl" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <h2 className="font-heading text-5xl text-dark md:text-7xl">
            {t("title")}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <motion.a
            href={`https://wa.me/${contactInfo.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex items-center gap-3 bg-[#25D366] px-10 py-5 font-heading text-lg uppercase tracking-wider text-white"
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
            <a href={`mailto:${contactInfo.email}`} className="text-sm text-dark/60 transition-colors hover:text-sky">
              {contactInfo.email}
            </a>
            <a href={contactInfo.behance} target="_blank" rel="noopener noreferrer" className="text-sm text-dark/60 transition-colors hover:text-sky">
              Behance
            </a>
            <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-dark/60 transition-colors hover:text-sky">
              LinkedIn
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <Link
            href="/contact"
            className="mt-4 inline-block text-sm text-dark/40 underline transition-colors hover:text-dark"
          >
            {t("more")}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Assemble landing page**

```typescript
// src/app/[locale]/page.tsx
import { Hero } from "@/components/landing/Hero";
import { PortfolioPreview } from "@/components/landing/PortfolioPreview";
import { Services } from "@/components/landing/Services";
import { Clients } from "@/components/landing/Clients";
import { ContactCTA } from "@/components/landing/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <PortfolioPreview />
      <Services />
      <Clients />
      <ContactCTA />
    </>
  );
}
```

- [ ] **Step 6: Verify full landing page**

```bash
npm run dev
```

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: add landing page sections (portfolio preview, services, clients, contact CTA)"
```

---

### Task 8: Portfolio Grid Page

**Files:**
- Create: `src/app/[locale]/portfolio/page.tsx`
- Create: `src/components/portfolio/PortfolioGrid.tsx`

- [ ] **Step 1: Create PortfolioGrid component**

```typescript
// src/components/portfolio/PortfolioGrid.tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { projects, type Category } from "@/data/projects";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const categories: (Category | "all")[] = [
  "all",
  "logofolio",
  "branding",
  "packaging",
  "editorial",
  "social-media",
  "web-design",
];

export function PortfolioGrid() {
  const t = useTranslations("portfolio");
  const [active, setActive] = useState<Category | "all">("all");

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      {/* Filter buttons */}
      <div className="mb-12 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`border px-4 py-2 font-heading text-xs uppercase tracking-widest transition-colors ${
              active === cat
                ? "border-dark bg-dark text-white"
                : "border-dark/20 bg-white text-dark hover:border-dark/40"
            }`}
          >
            {cat === "all" ? t("all") : cat.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/portfolio/${project.slug}`}>
                <div className="group relative aspect-[4/3] overflow-hidden border border-dark/10 bg-white">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-[2px]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-end justify-end bg-gradient-to-t from-dark/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <h3 className="font-heading text-xl text-white">{project.title}</h3>
                    <p className="text-xs uppercase tracking-widest text-gold">
                      {project.category} &bull; {project.year}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Create portfolio page**

```typescript
// src/app/[locale]/portfolio/page.tsx
import { GlitchText } from "@/components/animations/GlitchText";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { useTranslations } from "next-intl";

export default function PortfolioPage() {
  const t = useTranslations("portfolio");

  return (
    <div className="relative z-10 min-h-screen px-6 pt-32 pb-20">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <GlitchText
            text={t("title")}
            as="h1"
            className="mb-16 font-heading text-6xl text-dark md:text-8xl"
          />
        </ScrollReveal>
        <PortfolioGrid />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify portfolio page**

```bash
npm run dev
```

Visit `/portfolio` and test category filtering.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add portfolio grid page with category filtering"
```

---

### Task 9: Case Study Page

**Files:**
- Create: `src/app/[locale]/portfolio/[slug]/page.tsx`
- Create: `src/components/portfolio/CaseStudy.tsx`
- Create: `src/components/portfolio/ProjectNav.tsx`

- [ ] **Step 1: Create ProjectNav component**

```typescript
// src/components/portfolio/ProjectNav.tsx
"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { Project } from "@/data/projects";
import { motion } from "framer-motion";

interface ProjectNavProps {
  prev: Project | null;
  next: Project | null;
}

export function ProjectNav({ prev, next }: ProjectNavProps) {
  const t = useTranslations("portfolio");

  return (
    <div className="mt-24 flex items-stretch border-t border-dark/10">
      {prev ? (
        <Link
          href={`/portfolio/${prev.slug}`}
          className="group flex flex-1 flex-col items-start border-r border-dark/10 p-8 transition-colors hover:bg-dark/5"
        >
          <span className="text-xs uppercase tracking-widest text-dark/40">
            {t("prev")}
          </span>
          <motion.span
            className="mt-2 font-heading text-xl"
            whileHover={{ x: [0, -2, 2, 0] }}
            transition={{ duration: 0.2 }}
          >
            {prev.title}
          </motion.span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={`/portfolio/${next.slug}`}
          className="group flex flex-1 flex-col items-end p-8 transition-colors hover:bg-dark/5"
        >
          <span className="text-xs uppercase tracking-widest text-dark/40">
            {t("next")}
          </span>
          <motion.span
            className="mt-2 font-heading text-xl"
            whileHover={{ x: [0, 2, -2, 0] }}
            transition={{ duration: 0.2 }}
          >
            {next.title}
          </motion.span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create CaseStudy component**

```typescript
// src/components/portfolio/CaseStudy.tsx
"use client";

import type { Project } from "@/data/projects";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlitchText } from "@/components/animations/GlitchText";
import { motion } from "framer-motion";
import Image from "next/image";

interface CaseStudyProps {
  project: Project;
}

export function CaseStudy({ project }: CaseStudyProps) {
  return (
    <article>
      {/* Hero */}
      <div className="relative h-[60vh] w-full overflow-hidden md:h-[70vh]">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, filter: "blur(8px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-16">
          <GlitchText
            text={project.title}
            as="h1"
            className="font-heading text-5xl text-white md:text-7xl"
          />
          <p className="mt-2 font-heading text-lg uppercase tracking-widest text-gold">
            {project.category} &bull; {project.year}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="grid gap-16 md:grid-cols-[1fr_250px]">
          {/* Main content */}
          <div className="space-y-16">
            <ScrollReveal>
              <h2 className="mb-4 font-heading text-2xl uppercase">El Problema</h2>
              <p className="text-dark/70 leading-relaxed">{project.description.problem}</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="mb-4 font-heading text-2xl uppercase">El Proceso</h2>
              <p className="text-dark/70 leading-relaxed">{project.description.process}</p>
            </ScrollReveal>

            {/* Project images */}
            <ScrollReveal>
              <div className="grid gap-4">
                {project.images.map((img, i) => (
                  <motion.div
                    key={i}
                    className="relative aspect-video overflow-hidden border border-dark/10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Image
                      src={img}
                      alt={`${project.title} - ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 700px"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="mb-4 font-heading text-2xl uppercase">La Solución</h2>
              <p className="text-dark/70 leading-relaxed">{project.description.solution}</p>
            </ScrollReveal>
          </div>

          {/* Sidebar - sticky */}
          <aside className="hidden md:block">
            <div className="sticky top-32 space-y-8 border-l border-dark/10 pl-8">
              <div>
                <h3 className="font-heading text-xs uppercase tracking-widest text-dark/40">
                  Cliente
                </h3>
                <p className="mt-1">{project.client}</p>
              </div>
              <div>
                <h3 className="font-heading text-xs uppercase tracking-widest text-dark/40">
                  Año
                </h3>
                <p className="mt-1">{project.year}</p>
              </div>
              <div>
                <h3 className="font-heading text-xs uppercase tracking-widest text-dark/40">
                  Categoría
                </h3>
                <p className="mt-1 capitalize">{project.category.replace("-", " ")}</p>
              </div>
              <div>
                <h3 className="font-heading text-xs uppercase tracking-widest text-dark/40">
                  Herramientas
                </h3>
                <div className="mt-1 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="border border-dark/10 px-2 py-1 text-xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {project.palette && (
                <div>
                  <h3 className="font-heading text-xs uppercase tracking-widest text-dark/40">
                    Paleta
                  </h3>
                  <div className="mt-2 flex gap-2">
                    {project.palette.map((color) => (
                      <div
                        key={color}
                        className="h-8 w-8 rounded-full border border-dark/10"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 3: Create case study page**

```typescript
// src/app/[locale]/portfolio/[slug]/page.tsx
import { notFound } from "next/navigation";
import { projects, getProjectBySlug, getAdjacentProjects } from "@/data/projects";
import { CaseStudy } from "@/components/portfolio/CaseStudy";
import { ProjectNav } from "@/components/portfolio/ProjectNav";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <div className="relative z-10 min-h-screen pb-20">
      <CaseStudy project={project} />
      <div className="mx-auto max-w-5xl px-6">
        <ProjectNav prev={prev} next={next} />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify case study pages**

```bash
npm run dev
```

Visit `/portfolio/etreum` and test navigation.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add case study pages with project detail and navigation"
```

---

### Task 10: About Page

**Files:**
- Create: `src/app/[locale]/about/page.tsx`
- Create: `src/components/about/AboutContent.tsx`

- [ ] **Step 1: Create AboutContent component**

```typescript
// src/components/about/AboutContent.tsx
"use client";

import { useTranslations } from "next-intl";
import { skills, software, education, languages, contactInfo } from "@/data/about";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlitchText } from "@/components/animations/GlitchText";
import { motion } from "framer-motion";

function StarRating({ level, max = 5 }: { level: number; max?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <motion.svg
          key={i}
          className={`h-5 w-5 ${i < level ? "text-gold" : "text-dark/10"}`}
          fill="currentColor"
          viewBox="0 0 24 24"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </motion.svg>
      ))}
    </div>
  );
}

export function AboutContent() {
  const t = useTranslations("about");

  return (
    <div className="mx-auto max-w-5xl">
      {/* Bio */}
      <div className="grid gap-12 md:grid-cols-[300px_1fr]">
        <ScrollReveal>
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden bg-dark/5">
              <div className="flex h-full items-center justify-center font-heading text-4xl text-dark/20">
                PM
              </div>
            </div>
            {/* Geometric mask decoration */}
            <div className="absolute -bottom-4 -right-4 h-24 w-24 border-2 border-gold" />
            <div className="absolute -top-4 -left-4 h-16 w-16 bg-sky/20" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-lg leading-relaxed text-dark/70">{t("bio")}</p>
        </ScrollReveal>
      </div>

      {/* Skills */}
      <ScrollReveal className="mt-24">
        <h2 className="mb-8 font-heading text-3xl uppercase">{t("skills")}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((skill, i) => (
            <ScrollReveal key={skill.name} delay={i * 0.03}>
              <div className="flex items-center justify-between border-b border-dark/10 py-3">
                <span className="text-sm">{skill.name}</span>
                <StarRating level={skill.level} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>

      {/* Software */}
      <ScrollReveal className="mt-24">
        <h2 className="mb-8 font-heading text-3xl uppercase">{t("software")}</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {software.map((sw, i) => (
            <ScrollReveal key={sw.name} delay={i * 0.04}>
              <motion.div
                className="group relative flex flex-col items-center border border-dark/10 bg-white p-4"
                whileHover={{ y: -4 }}
              >
                <div
                  className="mb-2 flex h-10 w-10 items-center justify-center rounded text-xs font-bold text-white"
                  style={{ backgroundColor: sw.color }}
                >
                  {sw.shortName}
                </div>
                <span className="text-center text-xs">{sw.name}</span>
                <StarRating level={sw.level} />
                {/* Tooltip on hover */}
                <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-dark px-3 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {sw.name} - {sw.level}/5
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>

      {/* Education Timeline */}
      <ScrollReveal className="mt-24">
        <h2 className="mb-8 font-heading text-3xl uppercase">{t("education")}</h2>
        <div className="relative border-l-2 border-gold pl-8">
          {education.map((edu, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="relative mb-12 last:mb-0">
                <div className="absolute -left-[2.55rem] top-1 h-4 w-4 rounded-full border-2 border-gold bg-cream" />
                <p className="font-heading text-sm uppercase tracking-widest text-gold">
                  {edu.years}
                </p>
                <h3 className="mt-1 font-heading text-xl uppercase">{edu.institution}</h3>
                <p className="mt-1 text-dark/70">{edu.degree}</p>
                {edu.details && (
                  <ul className="mt-2 space-y-1">
                    {edu.details.map((d) => (
                      <li key={d} className="text-sm text-dark/50">
                        &bull; {d}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>

      {/* Languages */}
      <ScrollReveal className="mt-24">
        <h2 className="mb-8 font-heading text-3xl uppercase">{t("languages")}</h2>
        <div className="flex gap-4">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="border border-dark/10 bg-white px-6 py-3"
            >
              <span className="font-heading uppercase">{lang.name}</span>
              <span className="ml-2 text-sm text-dark/50">({lang.level})</span>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal className="mt-24 text-center">
        <a
          href={`https://wa.me/${contactInfo.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] px-8 py-4 font-heading uppercase tracking-wider text-white transition-transform hover:scale-105"
        >
          WhatsApp
        </a>
      </ScrollReveal>
    </div>
  );
}
```

- [ ] **Step 2: Create about page**

```typescript
// src/app/[locale]/about/page.tsx
import { GlitchText } from "@/components/animations/GlitchText";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { AboutContent } from "@/components/about/AboutContent";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="relative z-10 min-h-screen px-6 pt-32 pb-20">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <GlitchText
            text={t("title")}
            as="h1"
            className="mb-16 font-heading text-6xl text-dark md:text-8xl"
          />
        </ScrollReveal>
        <AboutContent />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify about page**

```bash
npm run dev
```

Visit `/sobre-mi`.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add about page with skills, software, education, and languages"
```

---

### Task 11: Contact Page

**Files:**
- Create: `src/app/[locale]/contact/page.tsx`
- Create: `src/components/contact/ContactForm.tsx`

- [ ] **Step 1: Create ContactForm component**

```typescript
// src/components/contact/ContactForm.tsx
"use client";

import { useTranslations } from "next-intl";
import { contactInfo } from "@/data/about";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlitchText } from "@/components/animations/GlitchText";
import { motion } from "framer-motion";

export function ContactForm() {
  const t = useTranslations("contact");

  return (
    <div className="mx-auto max-w-3xl">
      {/* WhatsApp CTA */}
      <ScrollReveal className="text-center">
        <motion.a
          href={`https://wa.me/${contactInfo.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] px-10 py-5 font-heading text-lg uppercase tracking-wider text-white"
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

      {/* Social links */}
      <ScrollReveal className="mt-12 flex flex-col items-center gap-4">
        <a href={`mailto:${contactInfo.email}`} className="text-dark/60 transition-colors hover:text-sky">
          {contactInfo.email}
        </a>
        <div className="flex gap-6">
          <a href={contactInfo.behance} target="_blank" rel="noopener noreferrer" className="font-heading text-sm uppercase tracking-widest text-dark/60 transition-colors hover:text-sky">
            Behance
          </a>
          <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="font-heading text-sm uppercase tracking-widest text-dark/60 transition-colors hover:text-sky">
            LinkedIn
          </a>
        </div>
      </ScrollReveal>

      {/* Form */}
      <ScrollReveal className="mt-16">
        <form
          className="space-y-6 border border-dark/10 bg-white p-8"
          style={{
            backgroundImage:
              "linear-gradient(#E0DED8 1px, transparent 1px), linear-gradient(90deg, #E0DED8 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            backgroundPosition: "-1px -1px",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = formData.get("name");
            const email = formData.get("email");
            const message = formData.get("message");
            const whatsappMsg = encodeURIComponent(
              `Hola Pedro! Soy ${name} (${email}). ${message}`
            );
            window.open(
              `https://wa.me/${contactInfo.whatsapp}?text=${whatsappMsg}`,
              "_blank"
            );
          }}
        >
          <div>
            <label className="mb-2 block font-heading text-xs uppercase tracking-widest">
              {t("form.name")}
            </label>
            <input
              name="name"
              type="text"
              required
              className="w-full border border-dark/20 bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
            />
          </div>
          <div>
            <label className="mb-2 block font-heading text-xs uppercase tracking-widest">
              {t("form.email")}
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full border border-dark/20 bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
            />
          </div>
          <div>
            <label className="mb-2 block font-heading text-xs uppercase tracking-widest">
              {t("form.message")}
            </label>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full resize-none border border-dark/20 bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-dark py-4 font-heading uppercase tracking-widest text-white transition-colors hover:bg-dark/80"
          >
            {t("form.send")}
          </button>
        </form>
      </ScrollReveal>
    </div>
  );
}
```

- [ ] **Step 2: Create contact page**

```typescript
// src/app/[locale]/contact/page.tsx
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
          className="mb-16 text-center font-heading text-6xl text-dark md:text-8xl"
        />
      </ScrollReveal>
      <ContactForm />
    </div>
  );
}
```

- [ ] **Step 3: Verify contact page**

```bash
npm run dev
```

Visit `/contacto`.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add contact page with WhatsApp CTA and form"
```

---

### Task 12: Final Polish & Build Verification

**Files:**
- Modify: `src/app/[locale]/layout.tsx` (add PageTransition)
- Modify: `src/app/globals.css` (add scrollbar and selection styles)

- [ ] **Step 1: Add PageTransition to layout**

Wrap `{children}` with `<PageTransition>` in the locale layout.

- [ ] **Step 2: Add global CSS polish**

Add to `globals.css`:
```css
/* Selection color */
::selection {
  background-color: #F5C518;
  color: #1A1A1A;
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #FAF8F5;
}
::-webkit-scrollbar-thumb {
  background: #1A1A1A;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #2D9BF0;
}
```

- [ ] **Step 3: Run build to verify SSG**

```bash
npm run build
```

Fix any build errors.

- [ ] **Step 4: Test production build**

```bash
npm run start
```

Navigate through all pages and verify everything works.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add page transitions, global styles, and verify production build"
```
