# Pedro Magallanes - Portfolio Web Design Spec

## Overview

Portfolio web interactivo y experimental para Pedro Magallanes, diseñador gráfico artístico digital de Argentina. El sitio funciona como carta de presentación para atraer clientes, combinando una landing page inmersiva con case studies individuales por proyecto. Bilingüe (ES/EN).

## Stack Técnico

- **Framework:** Next.js 14+ (App Router) con TypeScript
- **Estilos:** Tailwind CSS
- **Animaciones:** Framer Motion
- **i18n:** next-intl (ES/EN)
- **Contenido:** Archivos estáticos (JSON/TS), sin CMS
- **Deploy:** Vercel (optimizado para Next.js)

## Estructura de Rutas

Estrategia de i18n: `localePrefix: 'as-needed'`. Español es el idioma default y no lleva prefijo. Inglés usa `/en/`.

Layout del App Router (usa `pathnames` de next-intl para rutas localizadas):
```
app/
  [locale]/
    layout.tsx           → Root layout con next-intl provider
    page.tsx             → Landing
    portfolio/
      page.tsx           → Grid de proyectos
      [slug]/
        page.tsx         → Case study
    about/
      page.tsx           → About (next-intl mapea: ES→/sobre-mi, EN→/en/about)
    contact/
      page.tsx           → Contacto (next-intl mapea: ES→/contacto, EN→/en/contact)
```

Configuración de `pathnames` en next-intl:
```typescript
// i18n/routing.ts
pathnames: {
  '/': '/',
  '/portfolio': '/portfolio',
  '/portfolio/[slug]': '/portfolio/[slug]',
  '/about': {
    es: '/sobre-mi',
    en: '/about'
  },
  '/contact': {
    es: '/contacto',
    en: '/contact'
  }
}
```

Rutas resultantes:
```
/                    → Landing page (hero + portfolio preview + servicios + testimonios + contacto CTA)
/portfolio           → Grid de todos los proyectos filtrable por categoría
/portfolio/[slug]    → Case study individual
/sobre-mi            → About con skills, formación, software
/contacto            → Página de contacto completa (standalone)

/en/                 → Landing (EN)
/en/portfolio        → Portfolio (EN)
/en/portfolio/[slug] → Case study (EN)
/en/about            → About (EN)
/en/contact          → Contact (EN)
```

## Paleta de Colores

Extraída del PDF original:

| Color | Hex | Uso |
|-------|-----|-----|
| Amarillo dorado | `#F5C518` | Títulos principales, acentos |
| Azul celeste | `#2D9BF0` | Formas decorativas, links, CTAs secundarios |
| Negro | `#1A1A1A` | Textos body, títulos alternos |
| Blanco/Crema | `#FAF8F5` | Fondo principal |
| Blanco puro | `#FFFFFF` | Cards, overlays |

## Tipografía

- **Títulos:** Font condensada bold (Anton o Bebas Neue) — replica el estilo tipográfico heavy del PDF
- **Body:** Sans-serif limpia (Inter o DM Sans)

## Elementos Visuales del PDF a Replicar

- Patrón de cuadrícula/papel milimetrado como fondo
- Triángulos amarillos decorativos
- Semicírculos/formas orgánicas azules
- Flechas chevron animadas (>>>)
- Elementos decorativos tipo sol/estrella
- Barra inferior con datos (nombre, rol, fecha, ubicación)

---

## Páginas

### 1. Landing Page

#### Hero Section
- Fondo con patrón de cuadrícula animado (las líneas se dibujan al cargar)
- "PEDRO MAGALLANES." en tipografía bold condensada con efecto glitch que alterna colores (amarillo/azul/negro)
- "DISEÑADOR GRÁFICO" con animación tipo máquina de escribir con distorsión
- Formas geométricas flotantes que reaccionan al cursor (triángulos amarillos, semicírculos azules)
- Flechas chevron (>>>) animadas como indicador de scroll
- Cursor personalizado con trail y efecto de distorsión

#### Portfolio Preview
- Grid asimétrico mostrando 1 proyecto destacado por cada categoría (5 cards fijas, curadas)
- Hover: efecto de distorsión/displacement sobre la imagen + nombre con glitch
- Cada card navega al case study correspondiente
- Botón "Ver todo el portfolio" que lleva a `/portfolio` (el filtro por categoría vive allí, no acá)

#### Servicios
- Cards con bordes estilo cuadrícula del PDF
- Cada servicio: ícono animado + descripción + rango de precios
- Servicios: Identidad Visual, Branding, Packaging, Diseño Editorial, Social Media, Diseño Web
- Hover: efecto glitch momentáneo en la card

#### Testimonios/Clientes
- Marquee horizontal infinito con logos de clientes (del logofolio del PDF)
- Cards de testimonios con efecto de rotación 3D sutil

#### Contacto (Footer CTA)
- Versión resumida del contacto: CTA grande a WhatsApp + link "Ver más formas de contacto" hacia `/contacto`
- Links secundarios: email, Behance, LinkedIn
- Background con formas orgánicas azules del PDF
- **Nota:** Esta es una versión simplificada. La página `/contacto` es standalone con formulario completo

### 2. Portfolio (`/portfolio`)

- Grid filtrable por las 6 categorías (Logofolio, Branding, Packaging, Editorial, Social Media, Web Design)
- Cada proyecto como card con imagen, título, categoría y año
- Animaciones de entrada con distorsión que se estabiliza
- Filtro con transiciones animadas entre categorías

### 3. Case Study (`/portfolio/[slug]`)

- **Hero:** Imagen principal full-width con título y categoría, entrada con parallax + distorsión
- **Ficha técnica:** Cliente, año, categoría, herramientas — barra lateral fija en scroll
- **El problema:** Descripción del desafío/necesidad del cliente
- **El proceso:** Imágenes del proceso, bocetos, iteraciones — scroll storytelling con reveal animations
- **La solución:** Resultado final con mockups e imágenes de producto aplicado
- **Paleta y tipografía:** Muestra visual de colores y fuentes del proyecto
- **Navegación:** Botones anterior/siguiente con preview glitch del próximo proyecto

Proyectos iniciales basados en el contenido del PDF:
- Etreum (2024) - Logofolio/Branding
- Nacional Futbol (2022) - Logofolio
- Segurola y Habana (2024) - Logofolio/Branding (incluye diseño de indumentaria)
- Kaffeehaus (2020) - Logofolio
- GM Muebles (2023) - Logofolio
- Inspectre (2024) - Logofolio/Branding/Packaging
- Mega Viajeros (2024) - Logofolio
- La 2 Rusa (2023) - Logofolio
- Etreum Horror Film Festival - Branding/Editorial/Social Media
- World Cup Qatar 2022 Fixture - Editorial
- Bauhaus Infographic - Editorial
- Social Media projects (múltiples)

### 4. Sobre Mí (`/sobre-mi`)

- Foto de Pedro con efecto de recorte/máscara geométrica animada
- Bio animada con reveal por líneas (texto del PDF)
- **Skills:** Indicadores animados que replican el sistema de estrellas del PDF, se llenan al scroll
- **Software:** Grid de íconos con nivel de dominio, hover con tooltip (Photoshop, Illustrator, InDesign, After Effects, Lightroom, Cinema 4D, Adobe XD, WordPress, Elementor, HTML5/CSS/Bootstrap)
- **Formación:** Timeline vertical animada (Escuela Da Vinci 2020-2024, Coderhouse 2018-2019)
- **Idiomas:** Badges con nivel (Español nativo, Inglés intermedio)
- CTA final hacia contacto/WhatsApp

### 5. Contacto (`/contacto`)

- WhatsApp como canal principal (11-3460-0597) con CTA prominente
- Links a redes: Behance, LinkedIn, email
- Formulario secundario simple (nombre, email, mensaje)

---

## Animaciones y Efectos Experimentales

| Efecto | Descripción | Ubicación | `prefers-reduced-motion` |
|--------|-------------|-----------|--------------------------|
| Cursor personalizado | Círculo que se deforma al moverse, trail con blend mode | Global | Desactivado, cursor default del OS |
| Transiciones de página | Efecto cortina con cuadrícula que se dibuja/borra | Entre páginas | Corte instantáneo sin animación |
| Scroll reveal | Elementos entran con distorsión/displacement y se estabilizan | Todas las secciones | Elementos visibles sin animación |
| Glitch | Títulos principales en hover + intervalos aleatorios sutiles | Hero, cards, títulos | Desactivado, texto estático |
| Parallax | Capas de profundidad en formas geométricas decorativas | Hero, backgrounds | Sin parallax, posición fija |
| Noise/grain overlay | Textura sutil sobre todo el sitio, carácter analógico | Global | Se mantiene (es estático, no animado) |
| Marquee | Scroll infinito horizontal de logos de clientes | Landing - testimonios | Grid estático de logos |
| Typewriter + distorsión | Texto que se escribe con efecto de distorsión | Hero subtitle | Texto visible inmediatamente sin animación |

## Internacionalización

- next-intl como solución de i18n
- Español como idioma default
- Toggle de idioma visible en el navbar
- Rutas localizadas (/en/ prefix para inglés)
- Archivos de traducción en JSON (messages/es.json, messages/en.json)

## Datos y Contenido

- Proyectos definidos en archivos TypeScript (`data/projects.ts`)
- Servicios y precios en archivo separado (`data/services.ts`)
- Testimonios en archivo separado (`data/testimonials.ts`)
- Información personal centralizada (`data/about.ts`)
- Imágenes de proyectos en `/public/projects/[slug]/`

### Interfaz de Proyecto

```typescript
interface Project {
  slug: string;
  title: string;
  category: 'logofolio' | 'branding' | 'packaging' | 'editorial' | 'social-media' | 'web-design';
  year: number;
  client: string;
  coverImage: string;
  images: string[];
  tools: string[];
  featured: boolean; // true = aparece en el portfolio preview del landing
  description: {
    problem: string;
    process: string;
    solution: string;
  };
  palette?: string[];   // hex colors del proyecto
  typography?: string[]; // fuentes usadas en el proyecto
}
```

## Responsive

- Mobile-first
- Breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)
- Animaciones reducidas en mobile para rendimiento
- Cursor personalizado desactivado en touch devices
- Menú hamburguesa en mobile: el ícono tiene efecto glitch decorativo sutil (solo en el ícono, no afecta el tap target de 44x44px mínimo). Se activa al abrir/cerrar el menú

## Performance

- Next.js Image optimization para todas las imágenes de proyectos
- Static Site Generation (SSG) para todas las páginas
- Lazy loading de imágenes en grids
- Animaciones con GPU acceleration (transform, opacity)
- Reducción de animaciones respetando `prefers-reduced-motion`
