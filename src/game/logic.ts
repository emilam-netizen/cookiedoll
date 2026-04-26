import type { GameState, itemDefinition, skillDefinition} from "./objects";
import { SKILL_LIST } from "./skill-list";
import { type levelProgress } from "./objects"

export const COST_MULTIPLIER = 1.15;
export const LEVEL_BONUS_PER_LEVEL = 0.15;
export const ACTIVE_SLOT_COUNT = 4;
export const ITEM_COST_MULTIPLIER = 1.2;
export const SECONDS_PER_TICK = 4;
export const TICKS_PER_DAY = 48;
export const TICKS_PER_REWARD = 12;
export const COOKIES_PER_TICK_REWARD = 1000;
export const DAYS_PER_SEASON = 30;
const SEASONS = ["Spring", "Summer", "Fall", "Winter"] as const;
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const newUser: levelProgress = {
  id: "hey",
  curTick: 0,
  totalTick: 10,
  complete: false
};
    

export function createInitialState(): GameState {
  return {
    cookies: 0,
    //lifetimeCookies: 0,S
    totalTicks: 0,
    tickProgressSeconds: 0,
    //upgrades: Array.from({ length: 1 }, () => null),
    //upgradeLevels: {},
    //var arr: { name: string }[] = [];
    upgradeLevelProgress: Array.from({length: 1}, () => null),
    activeSlots: Array.from({ length: 2}, () => null),
    inventoryItems: {},
    lastUpgrade:"",
  };
}

export function toSerializableState(state: Partial<GameState>): GameState {
  //const ulen = state.upgrades?.length as number;
  //const upgrades = Array.from({ length: ulen }, (_, index) => {
  //  const value = state.upgrades?.[index];
  //  return typeof value === "string" ? value : null;
  //});
  const slots = Array.from({ length: 2 }, (_, index) => {
    const value = state.activeSlots?.[index];
    return typeof value === "string" ? value : null;
  });
  let ulen = state.upgradeLevelProgress?.length as number;
  const upgrades = Array.from({ length: ulen }, (_, index) => {
    const value = state.upgradeLevelProgress?.[index];
    return typeof value === "string" ? value : null;
  });

  return {
    cookies: Number(state.cookies) || 0,
    //lifetimeCookies: Number(state.lifetimeCookies) || 0,
    totalTicks: Number(state.totalTicks) || 0,
    tickProgressSeconds: Number(state.tickProgressSeconds) || 0,
    //upgrades: upgrades,
    //upgradeLevels: { ...(state.upgradeLevels ?? {}) },
    upgradeLevelProgress: upgrades,
    activeSlots: slots,
    inventoryItems: { ...(state.inventoryItems ?? {}) },
    lastUpgrade: String(state.lastUpgrade),
  };
}

export function inRemoveSkill(state: GameState, skillId: string): GameState {

  const newSlots = state.activeSlots
  const foundindex = newSlots.findIndex(slot => slot === skillId);
  newSlots[foundindex]=null;

  
  return {
    ...state,
    activeSlots: newSlots
  };
}
export function inSetSkill(state: GameState, skillId: string, pos: number): GameState{

  
  const newUpgradeLevelProgress = state.upgradeLevelProgress

  const found = newUpgradeLevelProgress.find((entry) => entry?.id === skillId)
  

  //console.log("wtf guys", Array.isArray(newUpgradeLevelProgress))
  console.log("wtf guys1", state)

  //const found = newUpgradeLevelProgress[skillId]
  
  //const newUser: levelProgress = {
  //  id: "hey",
  //  curTick: 0,
  //  totalTick: 10
  //};
  //newUpgradeLevelProgress.push(newUser)
      
  
  if(!found){
    const skill = SKILL_LIST.find((entry) => entry.id === skillId)
    if(skill){
      const newUser: levelProgress = {
        id: skill.id,
        curTick: 0,
        totalTick: skill.ticksToFinish,
        complete: false
      };
      newUpgradeLevelProgress.push(newUser)
    }
  }


  const newSlots = state.activeSlots
  newSlots[pos] = skillId;
  
  return {
    ...state,
    //upgradeLevelProgress : newUpgradeLevelProgress,
    activeSlots : newSlots
  };
}

export function getOwnedItemCount(state: GameState, itemId: string): number {
  return state.inventoryItems[itemId] ?? 0;
}

export function getItemCost(item: itemDefinition, ownedCount: number): number {
  return Math.floor(item.baseCost * ownedCount);
}

export function canBuyItem(state: GameState, item: itemDefinition): boolean {
  return state.cookies >= getItemCost(item, getOwnedItemCount(state, item.id));
}

export function getCurrentDay(state: GameState): number {
  return Math.floor(state.totalTicks / TICKS_PER_DAY) + 1;
}
export function getSeasonDay(state: GameState): number {
  const dayIndex = getCurrentDay(state) - 1;
  return Math.floor(dayIndex % DAYS_PER_SEASON) + 1;
}

export function getYear(state: GameState): number {
  const dayIndex = getCurrentDay(state) - 1;
  //return Math.floor(dayIndex % (120)) + 1;
  return Math.floor(dayIndex / 120) + 1;
}

export function getHour(state: GameState): number {
 
  let afterDecimal = state.tickProgressSeconds / SECONDS_PER_TICK;
  let totalAmt = state.totalTicks + afterDecimal;
  let mult = 24/TICKS_PER_DAY;
  let retVal = ((totalAmt*mult) % (24) + 1);
  return Math.floor(retVal);
}

export function getMinute(state: GameState): number {
  let mult = 60/SECONDS_PER_TICK*.5;
  let hmult = (state.totalTicks % (TICKS_PER_DAY/24)) * SECONDS_PER_TICK;
  let outVal = Math.floor((state.tickProgressSeconds + hmult) * mult ) + 1;
  return Math.floor(outVal * .1) * 10;
}

export function getAlphaCurrentDay(state: GameState): string {
  const dayIndex = getCurrentDay(state) - 1;
  const dayNum = dayIndex % DAYS.length;
  return DAYS[dayNum];
}

export function getCurrentSeason(state: GameState): (typeof SEASONS)[number] {
  const dayIndex = getCurrentDay(state) - 1;
  const seasonIndex = Math.floor(dayIndex / DAYS_PER_SEASON) % SEASONS.length;
  return SEASONS[seasonIndex];
}

export function isUpgradeSlotted(state: GameState, upgradeId: string): boolean {
  return state.activeSlots.includes(upgradeId);
}

export function advanceWorldTime(state: GameState, deltaSeconds: number): GameState {
  if (deltaSeconds <= 0) {
    return state;
  }

  let progressSeconds = state.tickProgressSeconds + deltaSeconds;
  let ticksGained = 0;

  while (progressSeconds >= SECONDS_PER_TICK) {
    progressSeconds -= SECONDS_PER_TICK;
    ticksGained += 1;
  }

  if (ticksGained === 0) {
    return {
      ...state,
      tickProgressSeconds: progressSeconds,
    };
  }
  //if(ticksGained > 0){
  //  advanceUpgradeProgress(state, SKILL_LIST, deltaSeconds);
  //  console.log(ticksGained + "ticksgained")
  //}

  const previousRewards = Math.floor(state.totalTicks / TICKS_PER_REWARD);
  const newTotalTicks = state.totalTicks + ticksGained;
  const nextRewards = Math.floor(newTotalTicks / TICKS_PER_REWARD);
  const rewardsGained = nextRewards - previousRewards;
  const bonusCookies = rewardsGained * COOKIES_PER_TICK_REWARD;

  console.log(state);

  //advanceUpgradeProgress(state, SKILL_LIST, deltaSeconds);
  return {
    ...state,
    totalTicks: newTotalTicks,
    tickProgressSeconds: progressSeconds,
  };
}
export function dd(
)
{
  console.log("huh")
}

export function advanceUpgradeProgress(
  state: GameState,
  definitions: skillDefinition[],
  deltaSeconds: number,
): GameState {
  if (deltaSeconds <= 0) {
    return state;
  }

  //const newTotalTicks = state.totalTicks + ticksGained;


  //const nextLevels = { ...state.upgradeLevels };
  const nextProgress = state.upgradeLevelProgress;
  //const nextUpgrade = state.lastUpgrade;
  let changed = false;
  let outTask = "";

  for (const upgrade of definitions) {
    if (!isUpgradeSlotted(state, upgrade.id)) {
      continue;
    }

    //let progressSec = (nextProgress[upgrade.id] ?? 0) + deltaSeconds;
    //let level = nextLevels[upgrade.id] ?? 0;

    //while (progressSec >= upgrade.levelDurationSec) {
    //  progressSec -= upgrade.levelDurationSec;
    //  level += 1;
    //  changed = true;
    //}

    //if ((nextProgress[upgrade.id] ?? 0) !== progressSec) {
    //  changed = true;
    //}
    if(isUpgradeSlotted(state, upgrade.id)){
      //console.log("isslotted")
      //console.log(nextProgress)
      const found = nextProgress.find((entry) => entry?.id === upgrade.id)
      if(found){
        //console.log("foundguy")
        found.curTick += 1
        if(found.curTick >= found.totalTick && found.complete===false){
          found.complete = true
          
          state.lastUpgrade = found.id
        }
      }
      
    }
    
    //nextLevels[upgrade.id] = level;
  }

  //if (!changed) {
  //  return state;
  //}

  return {
    ...state,
    upgradeLevelProgress: nextProgress,
    //lastUpgrade: outTask,
  };
}

export function buyItem(state: GameState, item: itemDefinition): GameState {
  const ownedCount = getOwnedItemCount(state, item.id);
  const cost = getItemCost(item, ownedCount);
  /*
  if (state.cookies < cost) {
    return state;
  }*/

  return {
    ...state,
    //cookies: state.cookies - cost,
    inventoryItems: {
      ...state.inventoryItems,
      [item.id]: ownedCount + 1,
    },
  };
}