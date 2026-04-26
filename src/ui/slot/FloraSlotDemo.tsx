import { useCallback, useRef, useState } from 'react'
import DraggableChip from './DraggableChip'
import Slot from './Slot'

export type ChipName = 'flora' | 'winston' | 'heathcliffe'
export type SlotId = 0 | 1

const CHIP_NAMES: ChipName[] = ['flora', 'winston', 'heathcliffe']
const SLOT_IDS: SlotId[] = [0, 1]
const INITIAL_PLACEMENT: Record<string, SlotId | null> = {
  flora: null,
  winston: null,
  heathcliffe: null,
}

const FloraSlotDemo = () => {
  const [placement, setPlacement] = useState<Record<string, SlotId | null>>({ ...INITIAL_PLACEMENT })
  const slotRefs = useRef<(HTMLDivElement | null)[]>([])

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
      const occupant = CHIP_NAMES.find((chip) => chip !== name && prev[chip] === slot) ?? null

      next[name] = slot
      if (occupant) {
        next[occupant] = sourceSlot
      }

      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    setPlacement({ ...INITIAL_PLACEMENT })
  }, [])

  const registerSlotRef = useCallback((slot: SlotId, node: HTMLDivElement | null) => {
    slotRefs.current[slot] = node
  }, [])

  return (
    <div className="flora-demo">
      <div className="flora-source">
        {CHIP_NAMES.map((name) =>
          placement[name] === null ? (
            <DraggableChip
              key={name}
              isPlaced={false}
              name={name}
              onResetOutside={clearChip}
              slotRefs={slotRefs}
            />
          ) : null,
        )}
      </div>

      <div className="flora-slots">
        {SLOT_IDS.map((slotId) => (
          <Slot
            key={slotId}
            clearChip={clearChip}
            placeChip={placeChip}
            placedChip={getChipInSlot(slotId)}
            registerSlotRef={registerSlotRef}
            slotId={slotId}
            slotRefs={slotRefs}
          />
        ))}
      </div>

      <button type="button" className="flora-reset" onClick={resetAll}>
        Reset
      </button>
    </div>
  )
}

export default FloraSlotDemo
