import { ExplorationArea, GameEvent } from "../types";

// Initial exploration areas based on the game design document
export const explorationAreas: ExplorationArea[] = [
  {
    id: "mosswood-forest",
    name: "Mosswood Forest",
    biome: "forest",
    difficulty: 1,
    mushrooms: [
      { mushroomId: "cantharellus-cibarius", spawnChance: 0.7 },
      { mushroomId: "boletus-edulis", spawnChance: 0.4 },
      { mushroomId: "amanita-muscaria", spawnChance: 0.5 },
      { mushroomId: "pleurotus-ostreatus", spawnChance: 0.6 },
      { mushroomId: "trametes-versicolor", spawnChance: 0.5 },
    ],
    events: [
      {
        id: "forest-rain",
        title: "Sudden Rain",
        description:
          "Dark clouds gather overhead, and a gentle rain begins to fall. The forest floor becomes damp, creating ideal conditions for mushroom growth.",
        choices: [
          {
            text: "Take shelter and wait for the rain to pass",
            outcome:
              "You find a dry spot under a large tree and wait patiently. When the rain stops, you notice several mushrooms have emerged from the damp soil.",
            effect: {
              type: "stamina",
              value: -10,
            },
          },
          {
            text: "Continue foraging in the rain",
            outcome:
              "The rain makes it harder to see, but you press on. Your clothes are soaked, but you find several mushrooms that have just emerged.",
            effect: {
              type: "stamina",
              value: -20,
            },
          },
        ],
      },
      {
        id: "forest-clearing",
        title: "Sunlit Clearing",
        description:
          "You stumble upon a beautiful clearing bathed in sunlight. The ground is covered in a variety of plants and fungi.",
        choices: [
          {
            text: "Search the clearing thoroughly",
            outcome:
              "You take your time to search every inch of the clearing and find several valuable mushrooms hidden among the grass.",
            effect: {
              type: "stamina",
              value: -15,
            },
          },
          {
            text: "Take a moment to rest in the sunlight",
            outcome:
              "The warm sunlight rejuvenates you. As you rest, you notice a cluster of mushrooms growing near a fallen log.",
            effect: {
              type: "stamina",
              value: 15,
            },
          },
        ],
      },
    ],
    discovered: true,
    imageUrl: "/assets/areas/mosswood-forest.png",
  },
  {
    id: "misty-swamp",
    name: "Misty Swamp",
    biome: "swamp",
    difficulty: 2,
    mushrooms: [
      { mushroomId: "pleurotus-ostreatus", spawnChance: 0.8 },
      { mushroomId: "trametes-versicolor", spawnChance: 0.6 },
      { mushroomId: "ganoderma-sichuanense", spawnChance: 0.3 },
    ],
    events: [
      {
        id: "swamp-fog",
        title: "Dense Fog",
        description:
          "A thick fog rolls in, reducing visibility to just a few feet. The swamp becomes eerily quiet.",
        choices: [
          {
            text: "Proceed carefully through the fog",
            outcome:
              "You move slowly, using your other senses to guide you. The fog conceals many dangers, but also reveals hidden mushroom patches.",
            effect: {
              type: "stamina",
              value: -20,
            },
          },
          {
            text: "Wait for the fog to clear",
            outcome:
              "You find a safe spot and wait. When the fog finally lifts, you discover you're near a rich mushroom patch.",
            effect: {
              type: "stamina",
              value: -10,
            },
          },
        ],
      },
      {
        id: "swamp-creature",
        title: "Strange Creature",
        description:
          "You hear splashing nearby and glimpse a strange creature moving through the swamp. It seems to be gathering something from the water.",
        choices: [
          {
            text: "Observe the creature from a distance",
            outcome:
              "You watch as the creature collects mushrooms growing on submerged logs. When it leaves, you investigate the area and find some remaining specimens.",
            effect: {
              type: "stamina",
              value: -5,
            },
          },
          {
            text: "Approach the creature",
            outcome:
              "The creature is startled but doesn't flee. It seems curious about you and offers a strange mushroom as a gift before disappearing into the mist.",
            effect: {
              type: "reputation",
              value: 5,
            },
          },
        ],
      },
    ],
    discovered: false,
    imageUrl: "/assets/areas/misty-swamp.png",
  },
  {
    id: "ancient-mountains",
    name: "Ancient Mountains",
    biome: "mountain",
    difficulty: 3,
    mushrooms: [
      { mushroomId: "boletus-edulis", spawnChance: 0.6 },
      { mushroomId: "morchella-esculenta", spawnChance: 0.4 },
      { mushroomId: "ganoderma-sichuanense", spawnChance: 0.5 },
      { mushroomId: "lentinula-edodes", spawnChance: 0.5 },
    ],
    events: [
      {
        id: "mountain-storm",
        title: "Mountain Storm",
        description:
          "Dark clouds gather around the mountain peaks, and a storm begins to brew. Thunder echoes through the valleys.",
        choices: [
          {
            text: "Seek shelter in a nearby cave",
            outcome:
              "You find a dry cave and wait out the storm. Inside, you discover a variety of fungi growing in the damp environment.",
            effect: {
              type: "stamina",
              value: -10,
            },
          },
          {
            text: "Descend to lower elevation",
            outcome:
              "You quickly make your way down the mountain, but the rain makes the path slippery. You lose some time but avoid the worst of the storm.",
            effect: {
              type: "stamina",
              value: -25,
            },
          },
        ],
      },
      {
        id: "mountain-vista",
        title: "Breathtaking Vista",
        description:
          "You reach a high point with a stunning view of the surrounding landscape. The air is clear and invigorating.",
        choices: [
          {
            text: "Take time to appreciate the view",
            outcome:
              "The beautiful scenery refreshes your spirit. As you rest, you notice some rare mushrooms growing in the rocky soil nearby.",
            effect: {
              type: "stamina",
              value: 20,
            },
          },
          {
            text: "Focus on searching the area",
            outcome:
              "You concentrate on your task and discover a patch of valuable mushrooms hidden among the rocks.",
            effect: {
              type: "stamina",
              value: -15,
            },
          },
        ],
      },
    ],
    discovered: false,
    imageUrl: "/assets/areas/ancient-mountains.png",
  },
  {
    id: "crystal-caves",
    name: "Crystal Caves",
    biome: "cave",
    difficulty: 4,
    mushrooms: [
      { mushroomId: "ganoderma-sichuanense", spawnChance: 0.7 },
      { mushroomId: "morchella-esculenta", spawnChance: 0.3 },
      { mushroomId: "trametes-versicolor", spawnChance: 0.5 },
    ],
    events: [
      {
        id: "cave-crystals",
        title: "Glowing Crystals",
        description:
          "You enter a chamber filled with luminescent crystals that bathe the cave in an ethereal blue light. Strange fungi grow in the glow.",
        choices: [
          {
            text: "Study the relationship between the crystals and fungi",
            outcome:
              "You observe that the mushrooms seem to thrive in the crystal light. Your research yields valuable insights about a new species.",
            effect: {
              type: "reputation",
              value: 10,
            },
          },
          {
            text: "Collect as many mushrooms as possible",
            outcome:
              "You gather a good number of the glowing fungi, but disturbing them dims the crystals temporarily.",
            effect: {
              type: "stamina",
              value: -20,
            },
          },
        ],
      },
      {
        id: "cave-underground-river",
        title: "Underground River",
        description:
          "You discover an underground river flowing through the cave system. The banks are lined with unusual fungi.",
        choices: [
          {
            text: "Follow the river deeper into the cave",
            outcome:
              "The river leads you to a hidden grotto with a diverse ecosystem of rare mushrooms.",
            effect: {
              type: "stamina",
              value: -25,
            },
          },
          {
            text: "Collect samples from the riverbank",
            outcome:
              "You carefully gather specimens from along the river. Some appear to be previously undocumented varieties.",
            effect: {
              type: "stamina",
              value: -15,
            },
          },
        ],
      },
    ],
    discovered: false,
    imageUrl: "/assets/areas/crystal-caves.png",
  },
];
