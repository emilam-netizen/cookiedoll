import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'

import type { CSSProperties, DragEvent } from "react";
import { SHOP_LIST, ITEM_LIST } from "../game/shop-list";
import type { shopDefinition, itemDefinition } from "../game/objects";
import { SKILL_LIST } from "../game/skill-list";
import Draggable from "react-draggable";

import  Box  from './Box'
import DraggableChip from '../ui/slot/DraggableChip'
import type { GameState } from "../game/objects";


type ChipName = 'flora' | 'winston' | 'heathcliffe'
type SlotId = 0 | 1
const CHIP_NAMES: ChipName[] = ['flora', 'winston', 'heathcliffe']
const INITIAL_PLACEMENT: Record<string, SlotId | null> = {
  flora: null,
  winston: null,
  heathcliffe: null,
}
interface StatProps {
  instate: GameState
}

function PageSchedule({instate}: StatProps) {
  const ACTIVE_SLOT_COUNT = 3;
  const [count, setCount] = useState(0)
  const [inStore, setInStore] = useState("")
  const [itemArr, setItemArr] = useState([ITEM_LIST.find(item => item.id === "clothes-hat") as itemDefinition])
  const [activeSlot, setActiveSlot] = useState(Array.from({ length: ACTIVE_SLOT_COUNT }, () => ({id:"", lock:false})));
  const nodeRef = React.useRef(null);

  const [placement, setPlacement] = useState<Record<string, SlotId | null>>(INITIAL_PLACEMENT)
  const slotRefs = useRef<(HTMLDivElement | null)[]>([])

  function makeSkillList(): string[] {
    let skilllist = []
    for (let i = 0; i < SKILL_LIST.length; i++) {
      
      const upgradeLevels = instate.upgradeLevelProgress
      const foundLvl = upgradeLevels.find(item => item?.id === SKILL_LIST[i].id)
      if(foundLvl?.complete!==true)
      {
        skilllist.push(SKILL_LIST[i].id)
      }
        //console.log(`Index ${i}: ${fruits[i]}`);
    }
    return skilllist
  }

  const clearChip = useCallback((name: string) => {
    setPlacement((prev) => ({ ...prev, [name]: null }))
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

      if (occupant) {
        next[occupant] = sourceSlot
      }

      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    setPlacement(INITIAL_PLACEMENT)
  }, [])

  const registerSlotRef = useCallback((slot: SlotId, node: HTMLDivElement | null) => {
    slotRefs.current[slot] = node
  }, [])

  const updatedSkill = makeSkillList();

  return (
    <>
    
    <div>
      {updatedSkill.map((skill) => 
        
        placement[skill] === undefined ? (
          <React.Fragment key={skill}>
          <DraggableChip
            key={skill}
            isPlaced={false}
            name={skill}
            onResetOutside={clearChip}
            slotRefs={slotRefs}
          /> 
          
          </React.Fragment>

        ) : (
          <React.Fragment key={skill}>
          {typeof(placement[skill])}</React.Fragment>
        ),
      
      )
      }
    </div>
    </>
  )
}

export default PageSchedule

/*
      <div style={{width: 200, display:"flex", flexDirection:"column"}}>
        {SKILL_LIST.map((skill) => {
          //const dragHandlers = {onStart: onStart, onStop: onStop};
          skill.id
          const foundid = activeSlot.find(({id})=> id === skill.id)
          return (
            
            <button disabled={foundid ? true : false} 
            draggable={foundid ? false : true} 
            onDragStart={(event) => onStartDragUpgrade(event, skill.id, 0, false)}> 
              {skill.name}
            </button>
            //<Sched />

            <Draggable nodeRef={nodeRef} position={{ x: 0, y: 0 }}>

              <button ref={nodeRef}>{skill.id}</button>
            </Draggable>
            <Box name={skill.id}/>
          );
        })}
      </div>*/
