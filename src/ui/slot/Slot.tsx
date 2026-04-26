import DraggableChip from './DraggableChip'
import type { RefObject } from 'react'
import { ItemTypes } from '../ItemTypes'
import { useCallback, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

type ChipName = 'flora' | 'winston' | 'heathcliffe'
type SlotId = 0 | 1

interface DragItem {
  type: typeof ItemTypes.FLORA
  name: ChipName
}

interface SlotProps {
  clearChip: (name: string) => void
  placeChip: (name: string, slot: SlotId) => void
  placedChip: string | null
  registerSlotRef: (slot: SlotId, node: HTMLDivElement | null) => void
  slotId: SlotId
  slotRefs: RefObject<(HTMLDivElement | null)[]>
}

const Slot = ({ clearChip, placeChip, placedChip, registerSlotRef, slotId, slotRefs }: SlotProps) => {
  const [{ isOver, draggingChip }, drop] = useDrop<
    DragItem,
    void,
    { isOver: boolean; draggingChip: string | null }
  >(
    () => ({
      accept: ItemTypes.FLORA,
      drop: (item) => {
        placeChip(item.name, slotId)
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        draggingChip: monitor.getItem<DragItem>()?.name ?? null,
      }),
    }),
    [placeChip, slotId],
  )

  const setSlotRef = useCallback(
    (node: HTMLDivElement | null) => {
      registerSlotRef(slotId, node)
      if (node) {
        drop(node)
      }
    },
    [drop, registerSlotRef, slotId],
  )

  const previewChip = isOver ? draggingChip : null
  const chipToShow = previewChip ?? placedChip

  return (
    <div ref={setSlotRef} className={`flora-slot${isOver ? ' flora-slot--active' : ''}`}>
      {chipToShow ? (

        <DraggableChip
          isPreview={previewChip !== null}
          isPlaced={placedChip !== null}
          name={chipToShow}
          onResetOutside={clearChip}
          slotRefs={slotRefs}
        />

      ) : (
        
        `Drop here ${slotId + 1}`
        
      )}
    </div>
  )
}

export default Slot