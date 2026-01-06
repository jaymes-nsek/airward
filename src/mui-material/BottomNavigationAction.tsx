import type {
  ButtonHTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
  SyntheticEvent,
} from 'react'

type InternalProps<T = unknown> = {
  __selectedValue?: T
  __onChange?: (event: SyntheticEvent, value: T) => void
  __showLabels?: boolean
}

export type BottomNavigationActionProps<T = unknown> = InternalProps<T> &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: ReactNode
    label?: ReactNode
    value?: T
  }

function BottomNavigationAction<T = unknown>({
  icon,
  label,
  value,
  __selectedValue,
  __onChange,
  __showLabels,
  onClick,
  className,
  ...buttonProps
}: BottomNavigationActionProps<T>): ReactElement {
  const selected = value === __selectedValue
  const showLabel = __showLabels || selected
  const classes = [
    'MuiBottomNavigationAction-root',
    selected ? 'Mui-selected' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    __onChange?.(event, value as T)
    onClick?.(event)
  }

  return (
    <button
      type="button"
      className={classes}
      aria-pressed={selected}
      aria-label={typeof label === 'string' ? label : undefined}
      {...buttonProps}
      onClick={handleClick}
    >
      {icon ? <span className="MuiBottomNavigationAction-icon">{icon}</span> : null}
      <span
        className={`MuiBottomNavigationAction-label ${
          showLabel ? 'MuiBottomNavigationAction-labelShow' : ''
        }`}
      >
        {label}
      </span>
    </button>
  )
}

export default BottomNavigationAction
