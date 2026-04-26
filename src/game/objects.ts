export type UpgradeType = "click" | "cps";

export type skillDefinition = {
  id: string;
  name: string;
  baseCost: number;
  baseTime: number;
  description: string;
  prerequisites: Array<skillDefinition | null>;
  reward: Array<itemDefinition | null>;
  rewardMoney: number;
  tooltip: string;
  subject: subjectDefinition;
  ticksToFinish: number;
};

export type subjectDefinition = {
  id: string;
  name: string;

};

export type itemDefinition = {
  id: string;
  name: string;
  image: string;
  baseCost: number;
  description: string;
  effect: Array<string | null>;
  tooltip: string;
  category: "food" | "clothes" | "medicine"
};

export type shopDefinition = {
  id: string;
  name: string;
  image: string;
  baseCost: number;
  description: string;
  tooltip: string;
  items: Array<itemDefinition>
};


export type statDefinition = {
  id: string;
  name: string;
  description: string;
  type: string;
};

export type levelProgress = {
  id: string;
  curTick: number;
  totalTick: number;
  complete: boolean;
}

export type GameState = {
  cookies: number;
  //lifetimeCookies: number;
  totalTicks: number;
  tickProgressSeconds: number;
  //upgrades: Array<skillDefinition | null>;
  //upgradeLevels: Record<string, number>;
  upgradeLevelProgress: Array<levelProgress| null>;
  activeSlots: Array<string | null>;
  inventoryItems: Record<string, number>;
  lastUpgrade: string;
};
