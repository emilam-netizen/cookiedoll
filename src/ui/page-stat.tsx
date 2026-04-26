import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'

import type { CSSProperties, DragEvent } from "react";
import { SHOP_LIST, ITEM_LIST } from "../game/shop-list";
import type { shopDefinition, itemDefinition } from "../game/objects";
import { SKILL_LIST } from "../game/skill-list";
import Draggable from "react-draggable";

import  Box  from './Box'
import DraggableChip from './slot/DraggableChip'
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

const PageStat = ({instate}: StatProps ) => {
  const ACTIVE_SLOT_COUNT = 3;
  const wut = instate.activeSlots[0]
  const elements = [];  

  //for (var key in instate.upgradeLevelProgress) {
  //  elements.push(<li key={key}>{key}:{instate.upgradeLevelProgress[key]}</li>);
  //}

  return (
    <>
    
    <div>
      {instate.activeSlots.map((slot)=>{

        return(
          <div>{slot}</div>
        )})
      }
     
    </div>
    </>
  )
}

export default PageStat

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
