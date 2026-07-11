import type { Cake } from "../types";

export const CATEGORIES = [
  "Signature Cakes",
  "Custom Birthday Cakes",
  "Novelty & Kids Cakes",
] as const;

export const INITIAL_CAKES: Cake[] = [
  {
    id: "golden-honey-heart",
    name: "Golden Honey Heart Cake",
    category: "Signature Cakes",
    description:
      "Our beloved medovik — delicate honey sponge layers wrapped in silky cream, finished with white chocolate hearts and a hand-painted charm.",
    price: 95,
    image: "/images/cakes/golden-honey-heart.webp",
    featured: true,
  },
  {
    id: "ruby-velvet-heart",
    name: "Ruby Velvet Heart",
    category: "Signature Cakes",
    description:
      "A red velvet mousse heart dusted in ruby velour, crowned with silver pearls and a delicate gold butterfly. Made for love and celebration.",
    price: 110,
    image: "/images/cakes/ruby-velvet-heart.webp",
    featured: true,
  },
  {
    id: "midnight-chocolate",
    name: "Midnight Chocolate Ganache Cake",
    category: "Signature Cakes",
    description:
      "Rich dark chocolate sponge under a glossy ganache mirror glaze, topped with hazelnut truffles and your personal message piped in chocolate.",
    price: 90,
    image: "/images/cakes/midnight-chocolate-ilya.webp",
    featured: true,
  },
  {
    id: "chocolate-drip-party",
    name: "Chocolate Drip Party Cake",
    category: "Custom Birthday Cakes",
    description:
      "A showstopping drip cake loaded with chocolates, cookies and candy, finished with a personalised name and number in white chocolate.",
    price: 120,
    image: "/images/cakes/chocolate-drip-egor.webp",
  },
  {
    id: "frozen-wonderland",
    name: "Frozen Winter Wonderland Cake",
    category: "Custom Birthday Cakes",
    description:
      "A frosted blue buttercream cake featuring hand-cut edible snowflakes and your little one's favourite icy friends.",
    price: 130,
    image: "/images/cakes/frozen-theme.jpg",
  },
  {
    id: "veggie-garden",
    name: "Veggie Garden Cake",
    category: "Custom Birthday Cakes",
    description:
      "A whimsical fondant vegetable garden scene — blooming roses, chillies and peapods — personalised with any name.",
    price: 115,
    image: "/images/cakes/garden-alex.jpg",
  },
  {
    id: "little-lamb",
    name: "Little Lamb Cake",
    category: "Novelty & Kids Cakes",
    description:
      "A hand-sculpted 3D lamb cake with fluffy fondant curls, sweet button eyes and a scattering of fondant daisies. Almost too cute to cut.",
    price: 105,
    image: "/images/cakes/little-lamb.webp",
    featured: true,
  },
];
