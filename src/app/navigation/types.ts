import type { ReactElement } from 'react'

export type NavKey = 'library' | 'listen' | 'speak' | 'stats'

export type NavItem = {
    key: NavKey
    label: string
    icon: ReactElement
}
