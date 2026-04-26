import type { statDefinition, subjectDefinition } from "./objects";
import { SUBJECT_LIST } from "./subject-list";

const mathSubject = SUBJECT_LIST.find((entry) => entry.id === 'math');
const artSubject = SUBJECT_LIST.find((entry) => entry.id === 'art');
const scienceSubject = SUBJECT_LIST.find((entry) => entry.id === 'science');
const englishSubject = SUBJECT_LIST.find((entry) => entry.id === 'english');

export const SKILL_LIST: statDefinition[] = [
  {
    id: "str",
    name: "Strength",
    description: "strength",
    type: "base"
  },
  {
    id: "int",
    name: "Intelligence",
    description: "intelligence",
    type: "base"
  },
  {
    id: "charm",
    name: "Charm",
    description: "charm",
    type: "base"
  },
  {
    id: "wisdom",
    name: "wisdom",
    description: "wisdom",
    type: "base"
  },
  {
    id: "morals",
    name: "morals",
    description: "morals",
    type: "base"
  },
    {
    id: "faith",
    name: "faith",
    description: "faith",
    type: "base"
  },
  {
    id: "luck",
    name: "luck",
    description: "luck",
    type: "base"
  },
  {
    id: "street-smarts",
    name: "street-smarts",
    description: "street-smarts",
    type: "base"
  },
  {
    id: "resilience",
    name: "resilience",
    description: "resilience",
    type: "base"
  },
  {
    id: "language",
    name: "language",
    description: "language",
    type: "education"
  },
    {
    id: "literature",
    name: "literature",
    description: "literature",
    type: "education"
  },
    {
    id: "social-sciences",
    name: "social-sciences",
    description: "social-sciences",
    type: "education"
  },
    {
    id: "math",
    name: "math",
    description: "math",
    type: "education"
  },
    {
    id: "science",
    name: "science",
    description: "science",
    type: "education"
  },
    {
    id: "phys-ed",
    name: "phys-ed",
    description: "phys-ed",
    type: "education"
  },
    {
    id: "history",
    name: "history",
    description: "history",
    type: "education"
  },
    {
    id: "visual-arts",
    name: "visual-arts",
    description: "visual-arts",
    type: "education"
  },
    {
    id: "performance-arts",
    name: "performance-arts",
    description: "performance-arts",
    type: "base"
  },
    {
    id: "music",
    name: "music",
    description: "music",
    type: "base"
  },
];
