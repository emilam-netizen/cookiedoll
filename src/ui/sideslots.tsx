import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import type { CSSProperties, DragEvent } from "react";
import { SHOP_LIST, ITEM_LIST } from "../game/shop-list";
import type { shopDefinition, itemDefinition } from "../game/objects";
import Draggable from "react-draggable";
import {Dustbin} from './Dustbin'
import { SKILL_LIST } from "../game/skill-list";
import type { GameState } from "../game/objects";

import Slot from '../ui/slot/Slot'
import {
  ACTIVE_SLOT_COUNT,
  SECONDS_PER_TICK,
  TICKS_PER_REWARD,
  createInitialState,
  advanceWorldTime,
  advanceUpgradeProgress,
  getCurrentDay,
  getCurrentSeason,
  getSeasonDay,
  getYear,
  getAlphaCurrentDay,
  getHour,
  getMinute,

} from "../game/logic";

type SlotId = 0 | 1
const SLOT_IDS: SlotId[] = [0, 1]
type ChipName = 'flora' | 'winston' | 'heathcliffe'

const INITIAL_PLACEMENT: Record<string, SlotId | null> = {}

SKILL_LIST.forEach((skill) => {
  INITIAL_PLACEMENT[skill.id] = null;
});


//const CHIP_NAMES: ChipName[] = ['flora', 'winston', 'heathcliffe']
const CHIP_NAMES: string[] = SKILL_LIST.map(skill => skill.id)

interface SideSlotProps {
  instate: GameState,
  insetState: React.Dispatch<React.SetStateAction<GameState>>
  setSkill: (skillId: string, pos: number) => void,
  removeSkill:(skillId: string) => void
}

const SideSlots = ({instate, insetState, setSkill, removeSkill}:SideSlotProps) => {

  const [placement, setPlacement] = useState<Record<string, SlotId | null>>(INITIAL_PLACEMENT)
  const slotRefs = useRef<(HTMLDivElement | null)[]>([])

  const clearChip = useCallback((name: string) => {
    setPlacement((prev) => ({ ...prev, [name]: null }))
    removeSkill(name)
  }, [])

  const getChipInSlot = useCallback(
    (slot: SlotId): string | null => CHIP_NAMES.find((name) => placement[name] === slot) ?? null,
    [placement],
  )

  const placeChip = useCallback((name: string, slot: SlotId) => {
    setPlacement((prev) => {
      const next = { ...prev }
      const sourceSlot = prev[name]
      const occupant =
        CHIP_NAMES.find((chip) => chip !== name && prev[chip] === slot) ?? null

      next[name] = slot
      setSkill(name, slot)
      console.log("setplacement")

      if (occupant) {
        next[occupant] = sourceSlot
      }

      return next
    })
  }, [])

  const registerSlotRef = useCallback((slot: SlotId, node: HTMLDivElement | null) => {
    slotRefs.current[slot] = node
  }, [])

  const resetAll = useCallback(() => {
    setPlacement({ ...INITIAL_PLACEMENT })
    insetState((current) => {
      let newActiveSlots = current.activeSlots
      newActiveSlots.fill(null);
      return {
        ...current,
        activeSlots: newActiveSlots,
  };
    });

  }, [])

  useEffect(() => {
    //console.log("finish upgrade" + instate.lastUpgrade)

    for (let i = 0; i < instate.activeSlots.length; i++) {
      const selected = instate.activeSlots[i];
      if(selected===instate.lastUpgrade)
      {
        instate.activeSlots[i]=null;
        setPlacement((prev) => ({ ...prev, [selected]: null }))
      }
    
      //console.log(`Index ${i}: ${fruits[i]}`);
    }
  }, [instate.lastUpgrade]);
  
  return (
    <>
      <div className="flora-slots">
        {SLOT_IDS.map((slotId) => {
          let progressPercent = 0;
          //const progressPercent = instate.upgradeLevelProgress[slotId]
          const foundid = instate.activeSlots[slotId]
          
          if(foundid){
            const foundskill = instate.upgradeLevelProgress.find((entry) => entry?.id === foundid)
            if(foundskill)
              progressPercent = foundskill.curTick/foundskill.totalTick*100
          }
          return(
            
            <>
            <Slot
              key={slotId}
              clearChip={clearChip}
              placeChip={placeChip}
              placedChip={getChipInSlot(slotId)}
              registerSlotRef={registerSlotRef}
              slotId={slotId}
              slotRefs={slotRefs}
            />

              <div className="progress-track" aria-hidden="true">
                <div className="progress-fill" style={{ width: `${progressPercent}%` }} >
                   {progressPercent}
                </div>
              </div>
            </>
        )})}
        {typeof(INITIAL_PLACEMENT)}
      </div>
      <button type="button" className="flora-reset" onClick={resetAll}>
        Reset
      </button>

    </>
  )
}

export default SideSlots

/*
      <div style={{width: 300, display:"flex", flexDirection:"column"}}>
        {Array.from({ length: ACTIVE_SLOT_COUNT }, (_, slotIndex) => {
          
          const skillId = activeSlot[slotIndex]["id"];
          return (
            
            <Draggable  nodeRef={nodeRef}>
              <div ref={nodeRef} className="box drop-target" onMouseEnter={onDropAreaMouseEnter} onMouseLeave={onDropAreaMouseLeave}>I can detect drops from the next box.</div>
            </Draggable>
            

          );
        })}
      </div>*/
