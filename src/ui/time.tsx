
import type { GameState } from "../game/objects";
import { useEffect, useMemo, useRef, useState } from "react";
import { SKILL_LIST } from "../game/skill-list"
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


interface TimeProps {
  instate: GameState,
  insetState: React.Dispatch<React.SetStateAction<GameState>>
}


const menuList = ['stat', 'outfit', 'inventory', 'shops', 'schedule']

const Time = ({ instate, insetState }: TimeProps) => {

  const currentDay = useMemo(() => getCurrentDay(instate), [instate]);
  const curHour = useMemo(() => getHour(instate), [instate]);
  const curMinute = useMemo(() => getMinute(instate), [instate]);
  const currentSeason = useMemo(() => getCurrentSeason(instate), [instate]);
  const curSeasonDay = useMemo(() => getSeasonDay(instate), [instate]);
  const curYear = useMemo(() => getYear(instate), [instate]);
  const curAlphaCurrentDay = useMemo(() => getAlphaCurrentDay(instate), [instate]);   
  const secondsUntilNextTick = useMemo(
    () => Math.max(0, SECONDS_PER_TICK - instate.tickProgressSeconds),
    [instate],
  );

  function resetStats()  {
    insetState(createInitialState())
    
  }

  useEffect(() => {
    console.log('time mounted')
    let previousMs = Date.now();

    const applyElapsedTime = () => {
      const nowMs = Date.now();
      const deltaSeconds = Math.max(0, (nowMs - previousMs) / 1000);
      previousMs = nowMs;

      if (deltaSeconds <= 0) {
        return;
      }

      insetState((current) => {
        //const withTime = advanceWorldTime(current, deltaSeconds);
        //const withIncome = applyPassiveIncome(withTime, UPGRADE_DEFINITIONS, deltaSeconds);
        //return advanceUpgradeProgress(withIncome, UPGRADE_DEFINITIONS, deltaSeconds);
        return advanceWorldTime(current, deltaSeconds);
      });
    };

    const intervalId = window.setInterval(applyElapsedTime, 250);
    const onVisibilityChange = () => {
      if (!document.hidden) {
        applyElapsedTime();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    advanceUpgradeProgress(instate, SKILL_LIST, 1);
  }, [instate.totalTicks]);




  return (
    <>
    <div style={{ width:200, backgroundColor: 'lightblue', display: 'flex', flexDirection: 'column' }}>
        <p className="cps-count">total ticks: {instate.totalTicks} </p>
        <p className="cps-count">total ticks: {instate.tickProgressSeconds} </p>
        <p className="cps-count">Hour: {curHour} </p>
        <p className="cps-count">Minute: {curMinute} </p>
        <p className="cps-count">Day: {currentDay}</p>
        <p className="cps-count">Year: {curYear}</p>
        <p className="cps-count">Current Day: {curAlphaCurrentDay}</p>
        <p className="cps-count">Season: {currentSeason}</p>
        <p className="cps-count">Season Day: {curSeasonDay}</p>
        <p className="cps-count">Next tick in: {secondsUntilNextTick.toFixed(1)}s</p>
    </div>
    <div>
      <button
        className="upgrade-icon" onClick={() => resetStats()} >
        RESET GUY
      </button>
    </div>
  </>
  )
}

export default Time
