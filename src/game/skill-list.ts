import type { itemDefinition, skillDefinition, subjectDefinition } from "./objects";
import { SUBJECT_LIST } from "./subject-list";
import { ITEM_LIST } from "./shop-list"

const mathSubject = SUBJECT_LIST.find((entry) => entry.id === 'math');
const artSubject = SUBJECT_LIST.find((entry) => entry.id === 'art');
const scienceSubject = SUBJECT_LIST.find((entry) => entry.id === 'science');
const englishSubject = SUBJECT_LIST.find((entry) => entry.id === 'english');

export const SKILL_LIST: skillDefinition[] = [
  {
    id: "arithmetic-addition",
    name: "Arithmetic: Addition",
    baseCost: 0,
    baseTime: 10,
    description: "As simple as adding 1+1 but with more context",
    prerequisites: Array.from({ length: 1 }, () => null),
    //reward: Array.from({ length: 1 }, () => null),
    reward: [ ITEM_LIST.find(item => item.id === "food-croissant") as itemDefinition,
              ITEM_LIST.find(item => item.id === "clothes-hat") as itemDefinition,
    ],
    rewardMoney: 100,
    tooltip: "hello tooltip",
    subject: mathSubject as subjectDefinition,
    ticksToFinish: 5
  },
  {
    id: "arithmetic-subtraction",
    name: "Arithmetic: Subtraction",
    baseCost: 0,
    baseTime: 10,
    description: "Addition but the opposite whatever that means",
    prerequisites: Array.from({ length: 1 }, () => null),
    reward: [ ITEM_LIST.find(item => item.id === "food-toast") as itemDefinition,
              ITEM_LIST.find(item => item.id === "clothes-coat") as itemDefinition,],
    rewardMoney: 110, 
    tooltip: "hello tooltip",
    subject: mathSubject as subjectDefinition,
    ticksToFinish: 8
  },
  {
    id: "arithmetic-multiplaction",
    name: "Arithmetic: Multiplication",
    baseCost: 0,
    baseTime: 10,
    description: "When there's stuff to add together and addition just doesn't cut it anymore",
    prerequisites: Array.from({ length: 1 }, () => null),
    reward: [ ITEM_LIST.find(item => item.id === "food-cookie") as itemDefinition,
              ITEM_LIST.find(item => item.id === "clothes-shirt") as itemDefinition,],
    rewardMoney: 120,
    tooltip: "hello tooltip",
    subject: mathSubject as subjectDefinition,
    ticksToFinish: 4
  },
  {
    id: "arithmetic-division",
    name: "Arithmetic: Division",
    baseCost: 0,
    baseTime: 10,
    description: "Usually used when things have to be reduced but knowledge is a harsh mistress sometimes",
    prerequisites: Array.from({ length: 1 }, () => null),
    reward: [ ITEM_LIST.find(item => item.id === "food-croissant") as itemDefinition,
              ITEM_LIST.find(item => item.id === "clothes-shoes") as itemDefinition,],
    rewardMoney: 130,
    tooltip: "hello tooltip",
    subject: mathSubject as subjectDefinition,
    ticksToFinish: 2
  },
  {
    id: "drawering",
    name: "Drawering",
    baseCost: 0,
    baseTime: 10,
    description: "What you think",
    prerequisites: Array.from({ length: 1 }, () => null),
    reward: [ ITEM_LIST.find(item => item.id === "food-cookie") as itemDefinition,
              ITEM_LIST.find(item => item.id === "clothes-shirt") as itemDefinition,],
    rewardMoney: 140,
    tooltip: "hello tooltip",
    subject: artSubject as subjectDefinition,
    ticksToFinish: 10
  },
];
