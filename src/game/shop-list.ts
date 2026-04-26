import type { shopDefinition, itemDefinition } from "./objects";

export const ITEM_LIST: itemDefinition[] = [
  {
    id: "food-toast",
    name: "toast",
    image: "",
    baseCost: 10,
    description: "toast",
    effect: ["boh"],
    tooltip: "toast",
    category: "food"
  },
  {
    id: "food-cookie",
    name: "cookie",
    image: "",
    baseCost: 10,
    description: "cookie",
    effect: ["boh"],
    tooltip: "cookie",
    category: "food"
  },
  {
    id: "food-croissant",
    name: "croissant",
    image: "",
    baseCost: 10,
    description: "croissant",
    effect: ["boh"],
    tooltip: "croissant",
    category: "food"
  },
  {
    id: "clothes-hat",
    name: "hat",
    image: "",
    baseCost: 10,
    description: "hat",
    effect: ["boh"],
    tooltip: "hat",
    category: "clothes"
  },
  {
    id: "clothes-coat",
    name: "coat",
    image: "",
    baseCost: 10,
    description: "coat",
    effect: ["boh"],
    tooltip: "coat",
    category: "food"
  },
  {
    id: "clothes-shirt",
    name: "shirt",
    image: "",
    baseCost: 10,
    description: "shirt",
    effect: ["boh"],
    tooltip: "shirt",
    category: "clothes"
  },
  {
    id: "clothes-pants",
    name: "pants",
    image: "",
    baseCost: 10,
    description: "pants",
    effect: ["boh"],
    tooltip: "pants",
    category: "clothes"
  },
  {
    id: "clothes-shoes",
    name: "shoes",
    image: "",
    baseCost: 10,
    description: "shoes",
    effect: ["boh"],
    tooltip: "shoes",
    category: "clothes"
  },
  {
    id: "medicine-painkiller",
    name: "painkiller",
    image: "",
    baseCost: 10,
    description: "painkiller",
    effect: ["boh"],
    tooltip: "painkiller",
    category: "medicine"
  },
  {
    id: "medicine-vitamins",
    name: "vitamins",
    image: "",
    baseCost: 10,
    description: "vitamins",
    effect: ["boh"],
    tooltip: "vitamins",
    category: "medicine"
  },
  {
    id: "medicine-bandaid",
    name: "bandaid",
    image: "",
    baseCost: 10,
    description: "bandaid",
    effect: ["boh"],
    tooltip: "bandaid",
    category: "food"
  }
];    

 
ITEM_LIST.find(item => item.id === "medicine-bandaid") as itemDefinition;

export const SHOP_LIST: shopDefinition[] = [
  {
    id: "shop-food",
    name: "Shop Food",
    image: "",
    baseCost: 0,
    description: "Sells simple food",
    tooltip: "hello tooltip",
    items: [ITEM_LIST.find(item => item.id === "food-toast") as itemDefinition,
            ITEM_LIST.find(item => item.id === "food-cookie") as itemDefinition,
            ITEM_LIST.find(item => item.id === "food-croissant") as itemDefinition,
          ]
  },
  {
    id: "shop-clothes",
    name: "Shop Clothes",
    image: "",
    baseCost: 0,
    description: "Hey clothes to buy here",
    tooltip: "hello tooltip",
    items: [ITEM_LIST.find(item => item.id === "clothes-hat") as itemDefinition,
            ITEM_LIST.find(item => item.id === "clothes-coat") as itemDefinition,
            ITEM_LIST.find(item => item.id === "clothes-shirt") as itemDefinition,
            ITEM_LIST.find(item => item.id === "clothes-pants") as itemDefinition,
            ITEM_LIST.find(item => item.id === "clothes-shoes") as itemDefinition,
          ]
  },
  {
    id: "shop-pharmacy",
    name: "Shop Pharmacy",
    image: "",
    baseCost: 0,
    description: "Need medicine?",
    tooltip: "hello tooltip",
    items: [ITEM_LIST.find(item => item.id === "medicine-painkiller") as itemDefinition,
            ITEM_LIST.find(item => item.id === "medicine-vitamins") as itemDefinition,
            ITEM_LIST.find(item => item.id === "medicine-bandaid") as itemDefinition,
          ]
  },

];
