import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'

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

interface stateProps {
  state: GameState;

}

const PageInventory = ({state}: stateProps) => {


  return (
    <>
    
    <div>
        {Object.keys(state.inventoryItems).map((key) => (
          // A unique 'key' prop is essential for list items in React
          <li key={key}>
            <strong>{key}</strong>: {state.inventoryItems[key]}
          </li>
        ))}
        
    </div>
    </>
  )
}

export default PageInventory

/*
        {Object.keys(state.inventoryItems).map((key) => (
          // A unique 'key' prop is essential for list items in React
          <li key={key}>
            <strong>{key}</strong>:wut {state.inventoryItems[key]}
          </li>
        ))}*/