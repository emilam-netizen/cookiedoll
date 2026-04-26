import { useState, useRef, useEffect, useMemo } from 'react'
import type { CSSProperties, DragEvent } from "react";
import { SHOP_LIST, ITEM_LIST } from "../game/shop-list";
import type { shopDefinition, itemDefinition } from "../game/objects";
import type { GameState } from "../game/objects";
//import { ITEM_DEFINITIONS } from "./game/items";
//import { ITEM_LIST } from "../game/shop-list"

import {

  buyItem,

} from "../game/logic";

interface SelectionScreenProps {

  itemBuyCallback: (itemId: string) => void
}

const PageShop = ({itemBuyCallback}: SelectionScreenProps) => {
  const [count, setCount] = useState(0)
  const [inStore, setInStore] = useState("")
  const [itemArr, setItemArr] = useState([ITEM_LIST.find(item => item.id === "clothes-hat") as itemDefinition])
 
  
  const setPage = (shopId: string) =>
  {
    setInStore(shopId)
  }



  function displayItems(inStore: string){
    const store = SHOP_LIST.find(shop=>shop.id===inStore);
    if(store)
    {
    setItemArr(store.items);
    }
    return(<>
    <div style={{display:"grid", gridTemplateColumns:"auto auto auto"}}>
    {
      itemArr.map((item)=>
      {
        const itemid = item.id;
        return(
          <>
          <div>
          <button onClick={() => itemBuyCallback(itemid)}>{itemid}</button>
          
          </div>
          </>
        )
      }

      )
    }
    </div>
    </>
    )
  }
  function goBack()
  {
    setInStore("")
  }

  function gatewayPage()
  {
    return(
      <>
      <div style={{display:"grid", gridTemplateColumns:"auto auto", backgroundColor:"red"}}>
      {
        SHOP_LIST.map((shop) => {
        const shopName = shop.name;
        const shopId = shop.id;
  
        return (
          <div style={{width:200}}>
          <button onClick={() => setPage(shopId)}>
            {shopName}
          </button>
          </div>

            )
          })
      }
      </div>
      </>
    )
  }

  return (
    <>
        {
          
          inStore==="" ? (
            gatewayPage()

        ) : (
          <div style={{display:"flex", flexDirection:"column", height:"100%", alignItems: "stretch",
             backgroundColor:"lightpink", justifyContent:"space-between"}}>
            <div style={{backgroundColor:"lightpink", flexShrink:0}}>
              <button onClick={()=>goBack()}>back</button>
            </div>
            <div style={{backgroundColor:"blue", flexGrow:1}}>
              {
                displayItems(inStore)
              }
            </div>
            <div style={{ height:120, backgroundColor:"lightpink", flexShrink:0}}>

            </div>
          </div>

        )
        }
      

    </>
  )
}

export default PageShop
