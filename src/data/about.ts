export interface Skill {
  name: string;
  level: number;
}

export interface Software {
  name: string;
  shortName: string;
  level: number;
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
