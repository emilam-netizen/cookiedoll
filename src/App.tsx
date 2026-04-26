
import './App.css'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import React, { useState, useEffect } from 'react';
import Child  from "./Child";
import SideMenu from "./ui/sidemenu";
import SideSlots from "./ui/sideslots";
import Time from "./ui/time";
import SelectionScreen from "./ui/selectionscreen";
import Reward from "./ui/Reward";
import Doll from "./doll/doll"

import type { GameState } from "./game/objects";
import { loadGameState, saveGameState } from "./game/storage";
import { SHOP_LIST, ITEM_LIST } from "./game/shop-list";



import {
  createInitialState,
  buyItem,
  inSetSkill,
  inRemoveSkill
} from "./game/logic";

type handleProps = {
  handleCallback: (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

type LevelUpToast = {
  id: number;
  text: string;
};

const App = () => {
  const [state, setState] = useState<GameState>(() => loadGameState() ?? createInitialState());
  const [toasts, setToasts] = useState<LevelUpToast[]>([]);
  const [menuVal, setMenuVal] = useState("")
  const nodeRef = React.useRef(null);

  const handleCallback = (childData: string):void => {
        // Update the name in the component's state
        if(menuVal===childData)
        {
          setMenuVal("")
        }
        else{
          setMenuVal(childData);
        }   
  }
  
  const itemBuyCallback = (itemId: string):void => {
    const item = ITEM_LIST.find((entry) => entry.id === itemId);
    if (!item) {
      return;
    }
    setState((current) => buyItem(current, item));
  }

  const setSkill = (skillId: string, pos: number):void => {
    setState((current) => inSetSkill(current, skillId, pos));
  }
  const removeSkill = (skillId: string):void => {
    setState((current) => inRemoveSkill(current, skillId));
  }
  useEffect(() => {
    saveGameState(state);
  }, [state]);


/*
  useEffect(() => {
    if (toasts.length === 0) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setToasts((current) => current.slice(1));
    }, 2200);
    return () => window.clearTimeout(timeoutId);
  }, [toasts]);*/


  return(
    /*
    <Draggable nodeRef={nodeRef}>
      <div ref={nodeRef}>I can now be moved around!</div>
    </Draggable>*/

    //sidemenu
    //mainscreen
    //selectionscreen

    

    
    <div className="App" style={{}}>
      <DndProvider backend={HTML5Backend}>
        <div className="toast-stack" aria-live="polite" aria-atomic="true">
          {toasts.map((toast) => (
            <div className="toast" key={toast.id}>
              {toast.text}
            </div>
          ))}
        </div>
        <div style={{backgroundColor:"pink", display:"flex", flexDirection:"row"}}>
          <div>
            <Reward instate={state}></Reward>
          </div>
          <div style={{flexGrow: 2}}>
            <Doll></Doll>
          </div>

          <div>
            <Time instate={state} insetState={setState}></Time>
          </div>
          <div>
            <SideMenu handleCallback={handleCallback}></SideMenu>
          </div>
          <div>
            <SideSlots instate={state} insetState={setState} setSkill={setSkill} removeSkill={removeSkill}></SideSlots>
          </div>
          <SelectionScreen screenVal={menuVal} itemBuyCallback={itemBuyCallback} instate={state}></SelectionScreen>
          <></>
          </div>
         
      </DndProvider>
    </div>
 
    
    //{ 
      //selectionscreen
    //}

    /*

              <div style={{flexGrow: 2}}>
            <Doll></Doll>
          </div>
    <div style={{left:750, top:100, width: 500, height: 400, position:"fixed", backgroundColor:"greenyellow"}}>

    </div>*/
    /*
    showStats()
    showOutfit()
    showInventory()
    showShops()
    showSchedule()*/

    /*
    const Parent = () => {
  const [myParentData, setParentMyData] = React.useState({
    foo: "bar",
    hello: "world"
  });
  return <Child data={myParentData} updateParentData={setParentMyData} />;
};

const Child = (props) => {
  const [myChildData, setMyChildData] = React.useState(props.data);

  return (
    <button
      onClick={() => {
        props.updateParentData((prevState) => ({ ...prevState, hello: "bye" }))
      }}
    >
      Change Parent Data
    </button>
  );
};*/
    
  )
}

export default App
