import { useCallback } from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

interface BoxProps {
  name: string
}

const style = {
  display: 'inline-block',
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  backgroundColor: 'white',
  color: 'black',
  width: 200,
  cursor: 'move',
}

const Box = ({ name }: BoxProps) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { name },
  }))

  const handleDragRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (element) {
        drag(element)
      }
    },
    [drag],
  )

  return (
    <div ref={handleDragRef} style={style}>
      {name}
    </div>
  )
}

export default Box
