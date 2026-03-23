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
