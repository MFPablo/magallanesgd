export type Category = "logofolio" | "branding" | "editorial" | "social-media";

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

const cl = (path: string) =>
  `https://res.cloudinary.com/dzje6hbhy/image/upload/portfolio/${path}`;

export const projects: Project[] = [
  {
    slug: "etreum",
    title: "Etreum",
    category: "logofolio",
    year: 2024,
    client: "Etreum Horror Film Festival",
    coverImage: cl("etreum/cover.jpg"),
    images: [cl("etreum/01.jpg"), cl("etreum/02.jpg"), cl("etreum/03.jpg")],
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
    coverImage: cl("inspectre/cover.jpg"),
    images: [cl("inspectre/01.jpg"), cl("inspectre/02.jpg"), cl("inspectre/03.jpg")],
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
    coverImage: cl("segurola-y-habana/cover.jpg"),
    images: [cl("segurola-y-habana/01.jpg"), cl("segurola-y-habana/02.jpg")],
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
    coverImage: cl("kaffeehaus/cover.jpg"),
    images: [cl("kaffeehaus/01.jpg")],
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
    coverImage: cl("gm-muebles/cover.jpg"),
    images: [cl("gm-muebles/01.jpg")],
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
    coverImage: cl("nacional-futbol/cover.jpg"),
    images: [cl("nacional-futbol/01.jpg")],
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
    coverImage: cl("mega-viajeros/cover.jpg"),
    images: [cl("mega-viajeros/01.jpg")],
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
    coverImage: cl("la-2-rusa/cover.jpg"),
    images: [cl("la-2-rusa/01.jpg"), cl("la-2-rusa/02.jpg")],
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
    coverImage: cl("etreum-festival/cover.jpg"),
    images: [cl("etreum-festival/01.jpg"), cl("etreum-festival/02.jpg"), cl("etreum-festival/03.jpg")],
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
    coverImage: cl("bauhaus/cover.jpg"),
    images: [cl("bauhaus/01.jpg")],
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
    coverImage: cl("social-inspectre/cover.jpg"),
    images: [cl("social-inspectre/01.jpg"), cl("social-inspectre/02.jpg")],
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
