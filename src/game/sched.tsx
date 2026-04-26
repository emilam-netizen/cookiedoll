//import { useState, useRef, useEffect, useMemo } from 'react'
import type { CSSProperties, DragEvent } from "react";
import { SHOP_LIST, ITEM_LIST } from "./shop-list";
import type { shopDefinition, itemDefinition } from "./objects";
import Draggable from 'react-draggable';
import React, { useState, useEffect } from 'react';

function Sched() {
  const [count, setCount] = useState(0)
  const [inStore, setInStore] = useState("")
  const [itemArr, setItemArr] = useState([ITEM_LIST.find(item => item.id === "clothes-hat") as itemDefinition])
  const nodeRef = React.useRef(null);

  return (
    <>
    <Draggable nodeRef={nodeRef}>
      <div ref={nodeRef}>I can now be moved around!</div>
    </Draggable>

    </>
  )
}

export default Sched
