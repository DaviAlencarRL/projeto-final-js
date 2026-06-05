// src/data/products.js

export const CATEGORIES = ["Vestidos", "Blusas", "Calças", "Casacos", "Acessórios"];

export const CATEGORY_COLORS = {
  Vestidos:   "#E8D5B5",
  Blusas:     "#D5E5D5",
  Calças:     "#D5DCE8",
  Casacos:    "#E8D5DC",
  Acessórios: "#E8E8D5",
};

export const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Vestido Midi Floral",
    category: "Vestidos",
    price: 289.9,
    desc: "Vestido fluido com estampa floral delicada, perfeito para ocasiões especiais ou um dia casual elegante.",
    sizes: "PP, P, M, G",
    badge: "new",
    image: "",
  },
  {
    id: 2,
    name: "Blazer Estruturado Off-White",
    category: "Casacos",
    price: 459.0,
    desc: "Blazer de alfaiataria em tecido premium, corte clássico que nunca sai de moda.",
    sizes: "P, M, G, GG",
    badge: "sale",
    image: "",
  },
  {
    id: 3,
    name: "Calça Wide Leg Caramelo",
    category: "Calças",
    price: 199.9,
    desc: "Corte amplo e confortável em tons terrosos que combinam com tudo.",
    sizes: "PP, P, M, G, GG",
    badge: "",
    image: "",
  },
  {
    id: 4,
    name: "Blusa de Seda Champagne",
    category: "Blusas",
    price: 175.0,
    desc: "Blusa de seda natural com caimento perfeito, elegância sem esforço.",
    sizes: "P, M, G",
    badge: "new",
    image: "",
  },
  {
    id: 5,
    name: "Maxi Casaco Trench",
    category: "Casacos",
    price: 620.0,
    desc: "Clássico trench coat alongado em gabardine italiana, peça atemporal.",
    sizes: "P, M, G",
    badge: "",
    image: "",
  },
  {
    id: 6,
    name: "Conjunto Linho Natural",
    category: "Blusas",
    price: 349.9,
    desc: "Conjunto blusa e calça em linho puro, ideal para o verão com sofisticação.",
    sizes: "PP, P, M, G",
    badge: "sale",
    image: "",
  },
];