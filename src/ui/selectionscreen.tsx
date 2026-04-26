import PageSchedule from './page-schedule'
import PageShop from "./page-shop"
import PageInventory from "./page-inventory"
import PageStat from "./page-stat"
import type { GameState } from "../game/objects";

interface SelectionScreenProps {
  screenVal: string,
  itemBuyCallback: (itemId: string) => void
  instate: GameState

}



const SelectionScreen = ({ screenVal, itemBuyCallback, instate }: SelectionScreenProps) => {
  if (!screenVal) {
    return <div />
  }
  let button;
  if (screenVal==='schedule') {
    button = <PageSchedule instate={instate} />;
  } else if(screenVal==='shops') {
    button = <PageShop itemBuyCallback={itemBuyCallback}/>;
  } else if(screenVal==='inventory') {
    button = <PageInventory state={instate}/>;
  } else if(screenVal==='stat') {
    button = <PageStat instate={instate}/>;
  }



  return (
    <div
      style={{
        left: 950,
        top: 100,
        width: 500,
        height: 400,
        position: 'fixed',
        backgroundColor: 'greenyellow',
      }}
    >
      {screenVal}
      <div style={{ backgroundColor: 'pink', display: 'flex', flexDirection: 'column' }}>
      {button}
        
      </div>
    </div>
  )
}

export default SelectionScreen
