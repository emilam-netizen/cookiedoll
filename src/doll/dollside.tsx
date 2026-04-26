import { useEffect, useMemo, useRef, useState } from 'react'      
type Mode = 'dress' | 'view'     

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
type Framing = 'full' | 'knee'
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
type Slot = 'hat' | 'top' | 'coat' | 'dress' | 'bottom' | 'gloves' | 'shoes'

type ClothingItem = {
  id: string
  name: string
  slot: Slot
  image: string
}
type Equipped = Partial<Record<Slot, ClothingItem>>


function Doll() {
    const [mode, setMode] = useState<Mode>('dress')
    const [hair, setHair] = useState<Haircut>(HAIRCUTS[0])
    const [equipped, setEquipped] = useState<Equipped>({})
    const [framing, setFraming] = useState<Framing>('full')
    const [fullZoom, setFullZoom] = useState(1)
    const [kneeZoom, setKneeZoom] = useState(1.35)
    const closetDropRef = useRef<HTMLDivElement>(null)
    const available = useMemo(() => CLOTHES.filter((item) => equipped[item.slot]?.id !== item.id), [equipped])


    const clearOutfit = () => setEquipped({})

    return(
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
    )
}     