import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type SyntheticEvent,
} from 'react'

import './bottomNavigation.css'

type BottomNavigationChildProps<T> = {
  value?: T
  __selectedValue?: T
  __onChange?: (event: SyntheticEvent, value: T) => void
  __showLabels?: boolean
}

export type BottomNavigationProps<T = unknown> = {
  children: ReactNode
  className?: string
  value: T
  onChange?: (event: SyntheticEvent, value: T) => void
  showLabels?: boolean
}

function BottomNavigation<T = unknown>({
  children,
  className,
  value,
  onChange,
  showLabels = false,
}: BottomNavigationProps<T>): ReactElement {
  const classes = ['MuiBottomNavigation-root', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child
        const typedChild = child as ReactElement<BottomNavigationChildProps<T>>
        const childValue =
          typedChild.props.value !== undefined ? typedChild.props.value : (index as T)

        return cloneElement(typedChild, {
          value: childValue,
          __selectedValue: value,
          __onChange: onChange,
          __showLabels: showLabels,
        })
      })}
    </div>
  )
}

export default BottomNavigation
