import { ReactNode } from 'react'

const Button = ({
  disabled,
  children,
  onClick,
}: {
  disabled: boolean
  children: ReactNode
  onClick: () => void
}) => {
  return (
    <button
      style={{ backgroundColor: disabled ? 'red' : 'blue' }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
