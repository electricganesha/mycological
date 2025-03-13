import { Mushroom } from "../types";

// Initial mushroom data based on the game design document
export const mushrooms: Mushroom[] = [
  {
    id: "boletus-edulis",
    name: "Porcini",
    displayName: "Porcini",
    scientificName: "Boletus edulis",
    type: "bolete",
    rarity: "uncommon",
    description:
      "Known as the king of mushrooms, the Porcini is prized for its rich, nutty flavor and meaty texture. It forms a symbiotic relationship with trees and is found in forests worldwide.",
    realDescription:
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
    displayName: "Golden Chanterelle",
    scientificName: "Cantharellus cibarius",
    type: "chanterelle",
    rarity: "common",
    description:
      "With its distinctive golden-yellow color and trumpet-like shape, the Chanterelle is a popular edible mushroom with a fruity aroma reminiscent of apricots.",
    realDescription:
      "With its distinctive golden-yellow color and trumpet-like shape, the Chanterelle is a popular edible mushroom with a fruity aroma reminiscent of apricots. Often found in forest ecosystems with oak, birch, or pine trees.",
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
    displayName: "Yellow Morel",
    scientificName: "Morchella esculenta",
    type: "morel",
    rarity: "rare",
    description:
      "The Morel is highly sought after for its unique honeycomb appearance and rich, earthy flavor. It appears briefly in spring, making it a prized seasonal delicacy.",
    realDescription:
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
    displayName: "Chinese Reishi",
    scientificName: "Ganoderma sichuanense",
    type: "reishi",
    rarity: "rare",
    description:
      'Known as the "mushroom of immortality" in traditional Chinese medicine, the Reishi is valued for its potential health benefits and medicinal properties.',
    realDescription:
      'Known as the "mushroom of immortality" in traditional Chinese medicine, the Reishi has been used for thousands of years. It grows on hardwood trees and features a distinctive lacquered appearance.',
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
    displayName: "Fly Amanita",
    scientificName: "Amanita muscaria",
    type: "amanita",
    rarity: "uncommon",
    description:
      "With its iconic red cap and white spots, the Fly Agaric is perhaps the most recognizable mushroom. Despite its toxicity, it has cultural significance in many societies.",
    realDescription:
      "With its iconic red cap and white spots, the Fly Agaric is perhaps the most recognizable mushroom. Contains psychoactive compounds that affect the central nervous system. Historically used in shamanic practices in certain cultures.",
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
    displayName: "Pearl Oyster",
    scientificName: "Pleurotus ostreatus",
    type: "pleurotus",
    rarity: "common",
    description:
      "Growing in shelf-like clusters on trees, the Oyster Mushroom is known for its delicate flavor and versatility in cooking.",
    realDescription:
      "Growing in shelf-like clusters on dead or dying trees, the Oyster Mushroom is known for its delicate flavor and versatility in cooking. It's also noted for its ability to break down pollutants and use them as food.",
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
    displayName: "Shiitake",
    scientificName: "Lentinula edodes",
    type: "bolete",
    rarity: "uncommon",
    description:
      "Originally from East Asia, the Shiitake is prized for its rich, umami flavor and potential health benefits.",
    realDescription:
      "Originally from East Asia, the Shiitake is prized for its rich, umami flavor and potential health benefits. Traditionally grown on logs, it contains compounds that may support immune function.",
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
    displayName: "Turkey Tail",
    scientificName: "Trametes versicolor",
    type: "reishi",
    rarity: "common",
    description:
      "Named for its colorful, fan-shaped fruiting bodies that resemble turkey tails, this mushroom is known for its potential immune-boosting properties.",
    realDescription:
      "Named for its colorful, fan-shaped fruiting bodies that resemble turkey tails, this mushroom contains polysaccharides that have been researched for potential immune system benefits. Commonly found on dead logs throughout forests worldwide.",
    baseValue: 55,
    biomes: ["forest"],
    properties: ["medicinal", "decorative"],
    imageUrl: "/assets/mushrooms/trametes-versicolor.png",
    identified: false,
    color: "#DEB887", // Light brown with hints of blue for Turkey Tail
  },
  {
    id: "russula-emetica",
    name: "Sickener",
    displayName: "The Sickener",
    scientificName: "Russula emetica",
    type: "russula",
    rarity: "common",
    description:
      "With its bright red cap, this mushroom earns its name from the gastrointestinal distress it causes when consumed.",
    realDescription:
      "With its bright red cap and white stem, this brittle mushroom causes severe gastrointestinal distress when consumed raw. Common in coniferous forests, it forms mycorrhizal relationships with trees.",
    baseValue: 30,
    biomes: ["forest"],
    properties: ["toxic", "colorful", "brittle"],
    imageUrl: "/assets/mushrooms/russula-emetica.png",
    identified: false,
    color: "#FF3030", // Bright red for Russula
  },
  {
    id: "agaricus-bisporus",
    name: "Button Mushroom",
    displayName: "White Button",
    scientificName: "Agaricus bisporus",
    type: "agaricus",
    rarity: "common",
    description:
      "The most widely cultivated mushroom in the world, found in grocery stores everywhere.",
    realDescription:
      "The most widely cultivated mushroom in the world, accounting for about 40% of mushroom production. The same species produces white button, cremini, and portobello mushrooms, depending on maturity and strain.",
    baseValue: 20,
    biomes: ["meadow", "forest"],
    properties: ["edible", "culinary", "common"],
    imageUrl: "/assets/mushrooms/agaricus-bisporus.png",
    identified: false,
    color: "#FFFFFF", // White for Button Mushroom
  },
  {
    id: "coprinus-comatus",
    name: "Shaggy Ink Cap",
    displayName: "Shaggy Mane",
    scientificName: "Coprinus comatus",
    type: "coprinus",
    rarity: "common",
    description:
      "A distinctive mushroom that dissolves into black ink as it matures, used historically for writing.",
    realDescription:
      "A distinctive mushroom that dissolves into black ink (auto-digests) as it matures. It was historically used for writing and must be harvested and consumed quickly before it liquefies. Often found in disturbed areas and lawns.",
    baseValue: 35,
    biomes: ["meadow", "forest"],
    properties: ["edible", "deliquescent", "temporary"],
    imageUrl: "/assets/mushrooms/coprinus-comatus.png",
    identified: false,
    color: "#F0F0F0", // Off-white for Shaggy Ink Cap
  },
  {
    id: "lactarius-deliciosus",
    name: "Saffron Milk Cap",
    displayName: "Red Pine Mushroom",
    scientificName: "Lactarius deliciosus",
    type: "lactarius",
    rarity: "uncommon",
    description:
      "A distinctive mushroom that exudes a bright orange latex when cut, prized in Mediterranean cuisine.",
    realDescription:
      "A distinctive mushroom that exudes a bright orange latex when cut or damaged. Forms mycorrhizal relationships primarily with pine trees and is highly valued in Spanish, Mediterranean and Eastern European cuisine.",
    baseValue: 55,
    biomes: ["forest"],
    properties: ["edible", "culinary", "bleeds"],
    imageUrl: "/assets/mushrooms/lactarius-deliciosus.png",
    identified: false,
    color: "#FF7F00", // Orange for Saffron Milk Cap
  },
  {
    id: "psilocybe-cubensis",
    name: "Golden Teacher",
    displayName: "Golden Teacher",
    scientificName: "Psilocybe cubensis",
    type: "psilocybe",
    rarity: "rare",
    description:
      "A mushroom known for its psychoactive properties and distinctive golden-capped appearance.",
    realDescription:
      "A mushroom containing psilocybin and psilocin, compounds that produce psychedelic effects when consumed. Found naturally in subtropical regions growing on cattle dung. Subject to legal restrictions in many jurisdictions.",
    baseValue: 90,
    biomes: ["meadow", "forest"],
    properties: ["psychoactive", "medicinal", "restricted"],
    imageUrl: "/assets/mushrooms/psilocybe-cubensis.png",
    identified: false,
    color: "#DAA520", // Golden brown
  },
  {
    id: "morchella-conica",
    name: "Black Morel",
    displayName: "Black Morel",
    scientificName: "Morchella conica",
    type: "morchella",
    rarity: "rare",
    description:
      "A highly prized edible with a distinctive honeycomb pattern and earthy flavor.",
    realDescription:
      "A highly prized edible with a distinctive dark honeycomb pattern and deeply pitted cap. Often appears after forest fires or in disturbed areas. Must be cooked thoroughly before consumption as it contains toxins that break down with heat.",
    baseValue: 110,
    biomes: ["forest"],
    properties: ["edible", "valuable", "seasonal"],
    imageUrl: "/assets/mushrooms/morchella-conica.png",
    identified: false,
    color: "#2F2F2F", // Dark gray/black for Black Morel
  },
  {
    id: "tricholoma-matsutake",
    name: "Matsutake",
    displayName: "Pine Mushroom",
    scientificName: "Tricholoma matsutake",
    type: "tricholoma",
    rarity: "rare",
    description:
      "A highly prized mushroom in Japanese cuisine known for its distinctive spicy-aromatic odor.",
    realDescription:
      "Culturally significant in Japan where it can fetch extremely high prices. Known for its distinctive spicy-aromatic odor and flavor. Forms mycorrhizal relationships with specific tree species and is becoming increasingly rare due to habitat loss.",
    baseValue: 150,
    biomes: ["forest"],
    properties: ["edible", "aromatic", "valuable", "cultural"],
    imageUrl: "/assets/mushrooms/tricholoma-matsutake.png",
    identified: false,
    color: "#D2B48C", // Tan/light brown for Matsutake
  },
  {
    id: "hygrocybe-coccinea",
    name: "Scarlet Waxy Cap",
    displayName: "Scarlet Hood",
    scientificName: "Hygrocybe coccinea",
    type: "hygrocybe",
    rarity: "uncommon",
    description:
      "A brilliantly colored small mushroom known for its waxy texture and vibrant red cap.",
    realDescription:
      "A brilliantly colored small mushroom known for its waxy texture and vibrant red cap. Often found in old grasslands and meadows. Its presence indicates healthy, unimproved grassland ecosystems with low nitrogen levels.",
    baseValue: 45,
    biomes: ["meadow"],
    properties: ["edible", "colorful", "indicator"],
    imageUrl: "/assets/mushrooms/hygrocybe-coccinea.png",
    identified: false,
    color: "#FF2400", // Scarlet for Waxy Cap
  },
  {
    id: "cortinarius-violaceus",
    name: "Violet Webcap",
    displayName: "Violet Cort",
    scientificName: "Cortinarius violaceus",
    type: "cortinarius",
    rarity: "uncommon",
    description:
      "A striking deep purple mushroom with a distinctive cobweb-like partial veil in young specimens.",
    realDescription:
      "A striking deep purple mushroom with a distinctive cobweb-like partial veil in young specimens. The largest entirely purple mushroom, it forms mycorrhizal relationships primarily with birch and conifer trees.",
    baseValue: 60,
    biomes: ["forest"],
    properties: ["inedible", "colorful", "mycorrhizal"],
    imageUrl: "/assets/mushrooms/cortinarius-violaceus.png",
    identified: false,
    color: "#483D8B", // Dark slate blue for Violet Webcap
  },
  {
    id: "clavaria-zollingeri",
    name: "Purple Coral",
    displayName: "Violet Coral",
    scientificName: "Clavaria zollingeri",
    type: "clavaria",
    rarity: "rare",
    description:
      "An unusual branched, coral-like mushroom with a striking purple color.",
    realDescription:
      "An unusual branched, coral-like mushroom with a striking violet to amethyst purple color. Relatively rare and typically found in woodland areas and mossy forests with high humidity. Its vibrant color makes it easily recognizable.",
    baseValue: 80,
    biomes: ["forest"],
    properties: ["inedible", "decorative", "colorful"],
    imageUrl: "/assets/mushrooms/clavaria-zollingeri.png",
    identified: false,
    color: "#9370DB", // Medium purple for Purple Coral
  },
  {
    id: "suillus-luteus",
    name: "Slippery Jack",
    displayName: "Slippery Jack",
    scientificName: "Suillus luteus",
    type: "suillus",
    rarity: "common",
    description:
      "A bolete mushroom with a distinctive slimy cap and ring on the stem.",
    realDescription:
      "A bolete mushroom with a distinctive slimy brown cap and ring on the stem. Forms symbiotic relationships specifically with pine trees. While edible, the slimy cap cuticle is often removed before cooking to improve palatability.",
    baseValue: 30,
    biomes: ["forest"],
    properties: ["edible", "slimy", "mycorrhizal"],
    imageUrl: "/assets/mushrooms/suillus-luteus.png",
    identified: false,
    color: "#8B4513", // Brown for Slippery Jack
  },
  {
    id: "hebeloma-crustuliniforme",
    name: "Poison Pie",
    displayName: "Poison Pie",
    scientificName: "Hebeloma crustuliniforme",
    type: "hebeloma",
    rarity: "common",
    description:
      "A plain-looking but deceptively toxic mushroom with a radish-like odor.",
    realDescription:
      "A plain-looking but deceptively toxic mushroom with a radish-like odor. Despite its unassuming appearance, it causes severe gastrointestinal distress. Forms mycorrhizal associations with various trees and is common in both natural and disturbed habitats.",
    baseValue: 25,
    biomes: ["forest"],
    properties: ["toxic", "plain", "deceptive"],
    imageUrl: "/assets/mushrooms/hebeloma-crustuliniforme.png",
    identified: false,
    color: "#D2B48C", // Tan for Poison Pie
  },
  {
    id: "entoloma-sinuatum",
    name: "Livid Pinkgill",
    displayName: "Livid Entoloma",
    scientificName: "Entoloma sinuatum",
    type: "entoloma",
    rarity: "uncommon",
    description:
      "A toxic mushroom that develops pink gills and spores as it matures.",
    realDescription:
      "A toxic mushroom that develops pink gills and spores as it matures. Often mistaken for edible species, it causes severe gastrointestinal illness. Found in deciduous woodlands, especially near beech and oak trees.",
    baseValue: 40,
    biomes: ["forest"],
    properties: ["toxic", "deceptive", "pink-spored"],
    imageUrl: "/assets/mushrooms/entoloma-sinuatum.png",
    identified: false,
    color: "#C0C0C0", // Silver/gray for Livid Pinkgill
  },
  {
    id: "armillaria-mellea",
    name: "Honey Fungus",
    displayName: "Honey Mushroom",
    scientificName: "Armillaria mellea",
    type: "armillaria",
    rarity: "common",
    description:
      "A cluster-forming parasitic mushroom that feeds on living and dead trees.",
    realDescription:
      "A cluster-forming parasitic mushroom that feeds on living and dead trees. Contains some of the largest and oldest living organisms on Earth, with mycelial networks spanning many acres and living for thousands of years. While edible when cooked thoroughly, it is a serious forest pathogen.",
    baseValue: 35,
    biomes: ["forest"],
    properties: ["edible", "parasitic", "bioluminescent"],
    imageUrl: "/assets/mushrooms/armillaria-mellea.png",
    identified: false,
    color: "#DAA520", // Golden color for Honey Fungus
  },
];
