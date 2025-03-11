import { Mushroom } from "../types";

// Initial mushroom data based on the game design document
export const mushrooms: Mushroom[] = [
  {
    id: "boletus-edulis",
    name: "Porcini",
    scientificName: "Boletus edulis",
    type: "bolete",
    rarity: "uncommon",
    description:
      "Known as the king of mushrooms, the Porcini is prized for its rich, nutty flavor and meaty texture. It forms a symbiotic relationship with trees and is found in forests worldwide.",
    baseValue: 75,
    biomes: ["forest", "mountain"],
    properties: ["edible", "culinary", "valuable"],
    imageUrl: "/assets/mushrooms/boletus-edulis.png",
    identified: false,
    color: "#8B4513", // Brown for Porcini
  },
  {
    id: "cantharellus-cibarius",
    name: "Chanterelle",
    scientificName: "Cantharellus cibarius",
    type: "chanterelle",
    rarity: "common",
    description:
      "With its distinctive golden-yellow color and trumpet-like shape, the Chanterelle is a popular edible mushroom with a fruity aroma reminiscent of apricots.",
    baseValue: 50,
    biomes: ["forest"],
    properties: ["edible", "culinary", "aromatic"],
    imageUrl: "/assets/mushrooms/cantharellus-cibarius.png",
    identified: false,
    color: "#FFD700", // Golden yellow for Chanterelle
  },
  {
    id: "morchella-esculenta",
    name: "Morel",
    scientificName: "Morchella esculenta",
    type: "morel",
    rarity: "rare",
    description:
      "The Morel is highly sought after for its unique honeycomb appearance and rich, earthy flavor. It appears briefly in spring, making it a prized seasonal delicacy.",
    baseValue: 100,
    biomes: ["forest", "mountain"],
    properties: ["edible", "culinary", "seasonal", "valuable"],
    imageUrl: "/assets/mushrooms/morchella-esculenta.png",
    identified: false,
    color: "#696969", // Dark gray for Morel
  },
  {
    id: "ganoderma-sichuanense",
    name: "Reishi",
    scientificName: "Ganoderma sichuanense",
    type: "reishi",
    rarity: "rare",
    description:
      'Known as the "mushroom of immortality" in traditional Chinese medicine, the Reishi is valued for its potential health benefits and medicinal properties.',
    baseValue: 120,
    biomes: ["forest", "mountain"],
    properties: ["medicinal", "valuable", "long-lasting"],
    imageUrl: "/assets/mushrooms/ganoderma-sichuanense.png",
    identified: false,
    color: "#8B0000", // Dark red for Reishi
  },
  {
    id: "amanita-muscaria",
    name: "Fly Agaric",
    scientificName: "Amanita muscaria",
    type: "bolete",
    rarity: "uncommon",
    description:
      "With its iconic red cap and white spots, the Fly Agaric is perhaps the most recognizable mushroom. Despite its toxicity, it has cultural significance in many societies.",
    baseValue: 60,
    biomes: ["forest"],
    properties: ["toxic", "decorative", "cultural"],
    imageUrl: "/assets/mushrooms/amanita-muscaria.png",
    identified: false,
    color: "#FF0000", // Bright red for Fly Agaric
  },
  {
    id: "pleurotus-ostreatus",
    name: "Oyster Mushroom",
    scientificName: "Pleurotus ostreatus",
    type: "chanterelle",
    rarity: "common",
    description:
      "Growing in shelf-like clusters on trees, the Oyster Mushroom is known for its delicate flavor and versatility in cooking.",
    baseValue: 40,
    biomes: ["forest", "swamp"],
    properties: ["edible", "culinary", "decomposer"],
    imageUrl: "/assets/mushrooms/pleurotus-ostreatus.png",
    identified: false,
    color: "#E8E8E8", // Light gray for Oyster Mushroom
  },
  {
    id: "lentinula-edodes",
    name: "Shiitake",
    scientificName: "Lentinula edodes",
    type: "bolete",
    rarity: "uncommon",
    description:
      "Originally from East Asia, the Shiitake is prized for its rich, umami flavor and potential health benefits.",
    baseValue: 65,
    biomes: ["forest", "mountain"],
    properties: ["edible", "culinary", "medicinal"],
    imageUrl: "/assets/mushrooms/lentinula-edodes.png",
    identified: false,
    color: "#483C32", // Dark brown for Shiitake
  },
  {
    id: "trametes-versicolor",
    name: "Turkey Tail",
    scientificName: "Trametes versicolor",
    type: "reishi",
    rarity: "common",
    description:
      "Named for its colorful, fan-shaped fruiting bodies that resemble turkey tails, this mushroom is known for its potential immune-boosting properties.",
    baseValue: 55,
    biomes: ["forest"],
    properties: ["medicinal", "decorative"],
    imageUrl: "/assets/mushrooms/trametes-versicolor.png",
    identified: false,
    color: "#DEB887", // Light brown with hints of blue for Turkey Tail
  },
];
