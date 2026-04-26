import type { MouseEvent } from 'react'

interface ChildProps {
  handleCallback: (num: number) => void
}

const Child = ({ handleCallback }: ChildProps) => {
  const onTrigger = (event: MouseEvent<HTMLButtonElement>, num: number) => {
    handleCallback(num)
    event.preventDefault()
  }

  return (
    <button type="button" onClick={(event) => onTrigger(event, 10)}>
      Change Parent Data
    </button>
  )
}

export default Child
