import type { CSSProperties, FC, ReactNode } from 'react'
import { useCallback } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import Box from './Box'

function getStyle(backgroundColor: string): CSSProperties {
  return {
    border: '1px solid rgba(0,0,0,0.2)',
    minHeight: '1rem',
    color: 'white',
    width: 250,
    height: 60,
    backgroundColor,
    float: 'left',
    fontSize: '1rem',
  }
}

export interface DustbinProps {
  onLeave?: () => void
  children?: ReactNode
}

export const Dustbin: FC<DustbinProps> = ({ children }) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop: () => undefined,
      collect: (monitor) => ({
        canDrop: monitor.canDrop(),
        isOver: monitor.isOver(),
      }),
    }),
    [],
  )

  const handleDropRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (element) {
        drop(element)
      }
    },
    [drop],
  )

  const backgroundColor = isOver ? '#16a34a' : canDrop ? '#0ea5e9' : 'rgba(0, 0, 0, .5)'

  return (
    <div ref={handleDropRef} style={getStyle(backgroundColor)}>
      {children}
      <Box name="huh" />
      <div>{isOver ? 'isOver: true' : 'isOver: false'}</div>
      <div>{canDrop ? 'canDrop: true' : 'canDrop: false'}</div>
    </div>
  )
}
