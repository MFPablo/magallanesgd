export interface Service {
  id: string;
  icon: string;
}

export const services: Service[] = [
  { id: "identity", icon: "eye" },
  { id: "branding", icon: "palette" },
  { id: "editorial", icon: "book" },
  { id: "social", icon: "share" },
];
