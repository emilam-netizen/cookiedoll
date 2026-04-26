
import type { GameState } from "../game/objects";
import { useEffect, useMemo, useRef, useState } from "react";
import { SKILL_LIST } from "../game/skill-list"

interface SelectionScreenProps {
  screenVal: string,
  itemBuyCallback: (itemId: string) => void
  instate: GameState

}

type RewardItem = {
  id: number;
  text: string;
};

interface RewardProps {
  instate: GameState,

}

const Reward = ({instate}:RewardProps) => {
  const [rewards, setRewards] = useState<RewardItem[]>([]);
  const nextRewardIdRef = useRef(1);

  useEffect(() => {
    //const previousLevels = previousLevelsRef.current;
    const newToasts: RewardItem[] = [];

    //for (const upgrade of UPGRADE_DEFINITIONS) {
    //  const previous = previousLevels[upgrade.id] ?? 0;
    //  const next = state.upgradeLevels[upgrade.id] ?? 0;
    //  if (next > previous) {
    //    const gained = next - previous;
    const lastUp = instate.lastUpgrade
    const foundItem = SKILL_LIST.find(item => item.id === lastUp)
    if(foundItem && instate.lastUpgrade !== ""){
      //foundItem.reward
      const fmoney = foundItem.rewardMoney
      let rewardString = ""
      for (let i = 0; i < foundItem.reward.length; i++) {
        rewardString += foundItem.reward[i]?.name + " | "
      }
      newToasts.push({
        id: nextRewardIdRef.current++,
        text: "Learned " + foundItem.id + "! you have received " + rewardString + 
        " and " + String(fmoney),
          });
      }
  
    if (newToasts.length > 0) {
      setRewards((current) => [...current, ...newToasts]);
    }
  }, [instate.lastUpgrade]);


  useEffect(() => {
    if (rewards.length === 0) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setRewards((current) => current.slice(1));
    }, 2200);
    return () => window.clearTimeout(timeoutId);
  }, [rewards]);


  return (
    <div className="toast-stack" aria-live="polite" aria-atomic="true">
      {rewards.map((toast) => (
        <div className="toast" key={toast.id}>
          {toast.text}
        </div>
      ))}
    </div>
  )
}

export default Reward
