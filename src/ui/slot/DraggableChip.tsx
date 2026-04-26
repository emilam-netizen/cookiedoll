import type { RefObject } from 'react'
import { useCallback } from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../ItemTypes'
import type { ChipName } from './FloraSlotDemo'

const OUTSIDE_TOLERANCE = 8

interface DragItem {
  type: typeof ItemTypes.FLORA
  name: string
}

interface DraggableChipProps {
  isPlaced: boolean
  isPreview?: boolean
  name: string
  onResetOutside: (name: string) => void
  slotRefs: RefObject<(HTMLDivElement | null)[]>
}

const DraggableChip = ({
  isPlaced,
  isPreview = false,
  name,
  onResetOutside,
  slotRefs,
}: DraggableChipProps) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.FLORA,
      item: { type: ItemTypes.FLORA, name } satisfies DragItem,
      canDrag: !isPreview,
      end: (_item, monitor) => {
        if (!isPlaced || monitor.didDrop()) {
          return
        }

        const pointer = monitor.getClientOffset()
        if (!pointer) {
          onResetOutside(name)
          return
        }

        const isInsideAnySlot = slotRefs.current.some((slot) => {
          if (!slot) {
            return false
          }

          const rect = slot.getBoundingClientRect()
          return (
            pointer.x >= rect.left - OUTSIDE_TOLERANCE &&
            pointer.x <= rect.right + OUTSIDE_TOLERANCE &&
            pointer.y >= rect.top - OUTSIDE_TOLERANCE &&
            pointer.y <= rect.bottom + OUTSIDE_TOLERANCE
          )
        })

        if (!isInsideAnySlot) {
          onResetOutside(name)
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [isPlaced, isPreview, name, onResetOutside, slotRefs],
  )

  const setDragRef = useCallback(
    (node: HTMLButtonElement | null) => {
      if (node) {
        drag(node)
      }
    },
    [drag],
  )

  return (
    <button
      type="button"
      ref={setDragRef}
      className="flora-chip"
      style={{ opacity: isPreview ? 1 : isDragging ? 0.4 : 1 }}
    >
      {name}
    </button>
  )
}

export default DraggableChip
