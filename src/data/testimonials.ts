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
