import { useEffect, useMemo, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { useDragLayer } from 'react-dnd'
import './doll.css'

const DRAG_TYPE = 'clothing'

type Slot = 'hat' | 'top' | 'coat' | 'dress' | 'bottom' | 'gloves' | 'shoes'

type ClothingItem = {
  id: string
  name: string
  slot: Slot
  image: string
}
type Haircut = {
  id: string
  name: string
  thumbImage: string
  backImage: string
  frontImage: string
  backTop: number
  backLeft: number
  backWidth: number
  frontTop: number
  frontLeft: number
  frontWidth: number
}

type Equipped = Partial<Record<Slot, ClothingItem>>
type DragPayload = {
  item: ClothingItem
  source: 'closet' | 'equipped'
}
type Framing = 'full' | 'knee'
type Mode = 'dress' | 'view'

const CLOTHES: ClothingItem[] = [
  { id: 'sun-hat', name: 'Sun Hat', slot: 'hat', image: '/clothing-hat.svg' },
  { id: 'striped-top', name: 'Striped Top', slot: 'top', image: '/clothing-top.svg' },
  { id: 'red-coat', name: 'Red Coat', slot: 'coat', image: '/clothing-coat.svg' },
  { id: 'floral-dress', name: 'Floral Dress', slot: 'dress', image: '/clothing-dress.svg' },
  { id: 'black-dress', name: 'Black Dress', slot: 'dress', image: '/clothing-dress-black.svg' },
  { id: 'blue-skirt', name: 'Blue Skirt', slot: 'bottom', image: '/clothing-skirt.svg' },
  { id: 'winter-gloves', name: 'Winter Gloves', slot: 'gloves', image: '/clothing-gloves.svg' },
  { id: 'black-shoes', name: 'Black Shoes', slot: 'shoes', image: '/clothing-shoes.svg' },
]

const SLOT_LAYOUT: Record<Slot, { top: number; left: number; width: number; height: number; z: number }> = {
  hat: { top: 32, left: 120, width: 100, height: 64, z: 5 },
  top: { top: 124, left: 83, width: 174, height: 120, z: 4 },
  coat: { top: 112, left: 74, width: 192, height: 142, z: 7 },
  dress: { top: 130, left: 84, width: 172, height: 270, z: 4 },
  bottom: { top: 263, left: 93, width: 154, height: 136, z: 3 },
  gloves: { top: 188, left: 68, width: 204, height: 106, z: 8 },
  shoes: { top: 430, left: 91, width: 158, height: 74, z: 6 },
}

const HAIRCUTS: Haircut[] = [
  {
    id: 'bob',
    name: 'Bob',
    thumbImage: '/avatar-hair-bob.svg',
    backImage: '/avatar-hair-bob-back.svg',
    frontImage: '/avatar-hair-bob-front.svg',
    backTop: 22,
    backLeft: 107,
    backWidth: 126,
    frontTop: 32,
    frontLeft: 113,
    frontWidth: 114,
  },
  {
    id: 'curly',
    name: 'Curly',
    thumbImage: '/avatar-hair-curly.svg',
    backImage: '/avatar-hair-curly-back.svg',
    frontImage: '/avatar-hair-curly-front.svg',
    backTop: 18,
    backLeft: 101,
    backWidth: 138,
    frontTop: 30,
    frontLeft: 110,
    frontWidth: 120,
  },
  {
    id: 'ponytail',
    name: 'Ponytail',
    thumbImage: '/avatar-hair-ponytail.svg',
    backImage: '/avatar-hair-ponytail-back.svg',
    frontImage: '/avatar-hair-ponytail-front.svg',
    backTop: 16,
    backLeft: 99,
    backWidth: 142,
    frontTop: 30,
    frontLeft: 112,
    frontWidth: 116,
  },
]

function isPointInSlot(
  canvasRef: { current: HTMLDivElement | null },
  point: { x: number; y: number } | null,
  slot: Slot,
  view: { scale: number; offsetX: number; offsetY: number },
) {
  if (!canvasRef.current || !point) {
    return false
  }

  const canvasBounds = canvasRef.current.getBoundingClientRect()
  const slotBounds = SLOT_LAYOUT[slot]
  const cursorX = (point.x - canvasBounds.left - view.offsetX) / view.scale
  const cursorY = (point.y - canvasBounds.top - view.offsetY) / view.scale

  return (
    cursorX >= slotBounds.left &&
    cursorX <= slotBounds.left + slotBounds.width &&
    cursorY >= slotBounds.top &&
    cursorY <= slotBounds.top + slotBounds.height
  )
}

function ClosetItem({ item, editable }: { item: ClothingItem; editable: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: DRAG_TYPE,
    canDrag: editable,
    item: { item, source: 'closet' } satisfies DragPayload,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))
  drag(ref)
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview])

  return (
    <div ref={ref} className="closet-item" style={{ opacity: isDragging ? 0.45 : 1 }}>
      <img draggable={false} src={item.image} alt={item.name} className="closet-image" />
      <span>{item.name}</span>
    </div>
  )
}

function EquippedItem({
  item,
  style,
  onUnequip,
  editable,
}: {
  item: ClothingItem
  style: { top: number; left: number; width: number; zIndex: number }
  onUnequip: (slot: Slot) => void
  editable: boolean
}) {
  const ref = useRef<HTMLImageElement>(null)
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: DRAG_TYPE,
      canDrag: editable,
      item: { item, source: 'equipped' } satisfies DragPayload,
      end: (_payload, monitor) => {
        if (!monitor.didDrop()) {
          onUnequip(item.slot)
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [editable, item, onUnequip],
  )
  drag(ref)
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview])

  return (
    <img
      ref={ref}
      draggable={false}
      src={item.image}
      alt={item.name}
      className="equipped-item"
      style={{ ...style, opacity: isDragging ? 0.3 : 1, pointerEvents: editable ? 'auto' : 'none', cursor: editable ? 'grab' : 'default' }}
    />
  )
}

function CustomDragLayer({ enabled }: { enabled: boolean }) {
  const { isDragging, dragItem, currentOffset } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    dragItem: monitor.getItem<DragPayload | null>(),
    currentOffset: monitor.getClientOffset(),
  }))

  if (!enabled || !isDragging || !dragItem || !currentOffset) {
    return null
  }

  const width = SLOT_LAYOUT[dragItem.item.slot].width

  return (
    <div className="drag-layer">
      <img
        draggable={false}
        src={dragItem.item.image}
        alt={dragItem.item.name}
        className="drag-preview"
        style={{
          width,
          transform: `translate(${currentOffset.x - width / 2}px, ${currentOffset.y - 24}px)`,
        }}
      />
    </div>
  )
}

function DollCanvas({
  hair,
  equipped,
  onDropClothing,
  onUnequip,
  canvasRef,
  view,
  editable,
}: {
  hair: Haircut
  equipped: Equipped
  onDropClothing: (item: ClothingItem) => void
  onUnequip: (slot: Slot) => void
  canvasRef: { current: HTMLDivElement | null }
  view: { scale: number; offsetX: number; offsetY: number }
  editable: boolean
}) {
  const [{ isOver, hoveredSlot }, drop] = useDrop(() => ({
    accept: DRAG_TYPE,
    canDrop: () => editable,
    drop: (payload: DragPayload, monitor) => {
      if (!editable) return
      if (isPointInSlot(canvasRef, monitor.getClientOffset(), payload.item.slot, view)) {
        onDropClothing(payload.item)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      hoveredSlot: editable && monitor.isOver()
        ? (monitor.getItem<DragPayload | null>()?.item.slot ?? null)
        : null,
    }),
  }), [canvasRef, editable, onDropClothing, view])
  drop(canvasRef)

  return (
    <div ref={canvasRef} className={`doll-canvas ${isOver ? 'doll-canvas-active' : ''}`}>
      <div
        className="doll-content"
        style={{
          transform: `translate(${view.offsetX}px, ${view.offsetY}px) scale(${view.scale})`,
        }}
      >
        <img
          draggable={false}
          src={hair.backImage}
          alt=""
          className="avatar-hair-back"
          style={{ top: hair.backTop, left: hair.backLeft, width: hair.backWidth }}
        />
        <img draggable={false} src="/doll-base.svg" alt="Paper doll base" className="doll-base" />
        <img
          draggable={false}
          src={hair.frontImage}
          alt={`${hair.name} haircut`}
          className="avatar-hair-front"
          style={{ top: hair.frontTop, left: hair.frontLeft, width: hair.frontWidth }}
        />
        {hoveredSlot ? (
          <div
            className="slot-highlight"
            style={{
              top: SLOT_LAYOUT[hoveredSlot].top,
              left: SLOT_LAYOUT[hoveredSlot].left,
              width: SLOT_LAYOUT[hoveredSlot].width,
              height: SLOT_LAYOUT[hoveredSlot].height,
              zIndex: SLOT_LAYOUT[hoveredSlot].z + 1,
            }}
          />
        ) : null}
        {Object.values(equipped).map((item) => {
          if (!item) return null
          const slot = SLOT_LAYOUT[item.slot]
          return (
          <EquippedItem
            key={item.id}
            item={item}
            onUnequip={onUnequip}
            editable={editable}
            style={{ top: slot.top, left: slot.left, width: slot.width, zIndex: slot.z }}
          />
        )
      })}
      </div>
    </div>
  )
}

function Doll() {
  const [mode, setMode] = useState<Mode>('dress')
  const [equipped, setEquipped] = useState<Equipped>({})
  const [hair, setHair] = useState<Haircut>(HAIRCUTS[0])
  const [fullZoom, setFullZoom] = useState(1)
  const [kneeZoom, setKneeZoom] = useState(1.35)
  const [framing, setFraming] = useState<Framing>('full')
  const closetDropRef = useRef<HTMLDivElement>(null)
  const dollCanvasRef = useRef<HTMLDivElement>(null)
  const removedDuringDragRef = useRef<string | null>(null)
  const view = useMemo(() => {
    const scale = framing === 'knee' ? kneeZoom : fullZoom
    const offsetX = (340 - 340 * scale) / 2
    const offsetY = 0
    return { scale, offsetX, offsetY }
  }, [framing, fullZoom, kneeZoom])
  const editable = mode === 'dress'

  const available = useMemo(() => CLOTHES.filter((item) => equipped[item.slot]?.id !== item.id), [equipped])

  const onDropClothing = (item: ClothingItem) => {
    setEquipped((current) => {
      const next = { ...current, [item.slot]: item }
      if (item.slot === 'dress') {
        delete next.top
        delete next.bottom
      }
      if (item.slot === 'top' || item.slot === 'bottom') {
        delete next.dress
      }
      return next
    })
  }

  const onUnequip = (slot: Slot) => {
    setEquipped((current) => {
      const next = { ...current }
      delete next[slot]
      return next
    })
  }

  const [, closetDrop] = useDrop(
    () => ({
      accept: DRAG_TYPE,
      canDrop: () => editable,
      drop: (payload: DragPayload) => {
        if (!editable) return
        if (payload.source === 'equipped') {
          onUnequip(payload.item.slot)
        }
      },
    }),
    [editable],
  )
  closetDrop(closetDropRef)

  const { isDragging, dragItem, currentOffset } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    dragItem: monitor.getItem<DragPayload | null>(),
    currentOffset: monitor.getClientOffset(),
  }))

  useEffect(() => {
    if (!isDragging || !dragItem || !currentOffset) {
      removedDuringDragRef.current = null
      return
    }

    if (!editable || dragItem.source !== 'equipped' || !dollCanvasRef.current) {
      return
    }

    if (removedDuringDragRef.current === dragItem.item.id) {
      return
    }

    const isOutside = !isPointInSlot(dollCanvasRef, currentOffset, dragItem.item.slot, view)

    if (isOutside) {
      onUnequip(dragItem.item.slot)
      removedDuringDragRef.current = dragItem.item.id
    }
  }, [currentOffset, dragItem, editable, isDragging, view])

  const clearOutfit = () => setEquipped({})

  return (
    <div className={mode === 'view' ? 'viewing-no-select' : undefined}>
      <div className="mode-bar">
        <button
          type="button"
          className={`haircut-button ${mode === 'dress' ? 'haircut-button-active' : ''}`}
          onClick={() => {
            setFullZoom(1)
            setFraming('full')
            setMode('dress')
          }}
        >
          <span>Dressing Mode</span>
        </button>
        <button
          type="button"
          className={`haircut-button ${mode === 'view' ? 'haircut-button-active' : ''}`}
          onClick={() => {
            setKneeZoom(1.35)
            setFraming('knee')
            setMode('view')
          }}
        >
          <span>Viewing Mode</span>
        </button>
      </div>
      <main className={`app ${mode === 'view' ? 'app-viewing' : ''}`}>
        {mode === 'dress' ? <section className="panel">
          <h1>Paper Doll Studio</h1>
          <p>Drag clothes from the closet and drop them onto the doll.</p>
          <button type="button" className="clear-button" onClick={clearOutfit}>
            Clear outfit
          </button>
          <div className="haircuts">
            <p className="haircuts-label">Haircut</p>
            <div className="haircut-options">
              {HAIRCUTS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`haircut-button ${hair.id === option.id ? 'haircut-button-active' : ''}`}
                  onClick={() => setHair(option)}
                >
                  <img draggable={false} src={option.thumbImage} alt="" className="haircut-thumb" />
                  <span>{option.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="camera-controls">
            <p className="haircuts-label">View</p>
            <div className="camera-row">
              <button
                type="button"
                className={`haircut-button ${framing === 'full' ? 'haircut-button-active' : ''}`}
                onClick={() => {
                  setFullZoom(1)
                  setFraming('full')
                }}
              >
                <span>Full Body</span>
              </button>
              <button
                type="button"
                className={`haircut-button ${framing === 'knee' ? 'haircut-button-active' : ''}`}
                onClick={() => {
                  setKneeZoom(1.35)
                  setFraming('knee')
                }}
              >
                <span>Knee Up</span>
              </button>
            </div>
            <div className="camera-row">
              <button
                type="button"
                className="haircut-button"
                onClick={() => {
                  if (framing === 'knee') {
                    setKneeZoom((z) => {
                      const next = Math.max(1, z - 0.2)
                      if (next <= 1) {
                        setFullZoom(1)
                        setFraming('full')
                      }
                      return next
                    })
                    return
                  }
                  setFullZoom((z) => Math.max(1, z - 0.2))
                }}
              >
                <span>Zoom -</span>
              </button>
              <button
                type="button"
                className="haircut-button"
                onClick={() => {
                  if (framing === 'knee') {
                    setKneeZoom((z) => Math.min(2.2, z + 0.2))
                    return
                  }
                  setFullZoom((z) => Math.min(1.8, z + 0.2))
                }}
              >
                <span>Zoom +</span>
              </button>
            </div>
          </div>
          <div className="closet" ref={closetDropRef}>
            {available.map((item) => (
              <ClosetItem key={item.id} item={item} editable={editable} />
            ))}
          </div>
        </section> : null}

        <section className="stage">
          <DollCanvas
            hair={hair}
            equipped={equipped}
            onDropClothing={onDropClothing}
            onUnequip={onUnequip}
            canvasRef={dollCanvasRef}
            view={view}
            editable={editable}
          />
        </section>
      </main>
      <CustomDragLayer enabled={editable} />
    </div>
  )
}

export default Doll
