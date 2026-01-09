import * as React from 'react'

type UseListboxNavigationArgs = {
    count: number
    selectedIndex: number
    onSelect: (index: number) => void
    /**
     * Default: true
     * If true, Arrow navigation wraps around (last -> first).
     */
    wrap?: boolean
    /**
     * If true, Space/Enter calls onSelect(selectedIndex) (often optional).
     * Default: false
     */
    confirmOnSpaceEnter?: boolean
}

type UseListboxNavigationResult = {
    safeSelectedIndex: number
    activeIndex: number
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void
}

function clamp(i: number, min: number, max: number) {
    return Math.max(min, Math.min(i, max))
}

function normaliseSelectedIndex(selectedIndex: number, count: number) {
    if (count <= 0) return -1
    return clamp(selectedIndex, 0, count - 1)
}

export function useListboxNavigation({
                                         count,
                                         selectedIndex,
                                         onSelect,
                                         wrap = true,
                                         confirmOnSpaceEnter = false,
                                     }: UseListboxNavigationArgs): UseListboxNavigationResult {
    const safeSelectedIndex = normaliseSelectedIndex(selectedIndex, count)
    const activeIndex = safeSelectedIndex >= 0 ? safeSelectedIndex : 0

    const move = React.useCallback(
        (next: number) => {
            if (count <= 0) return
            const finalIndex = wrap
                ? (next + count) % count
                : clamp(next, 0, count - 1)
            onSelect(finalIndex)
        },
        [count, onSelect, wrap]
    )

    const onKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLElement>) => {
            if (count <= 0) return

            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault()
                    move(activeIndex + 1)
                    return

                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault()
                    move(activeIndex - 1)
                    return

                case 'Home':
                    e.preventDefault()
                    move(0)
                    return

                case 'End':
                    e.preventDefault()
                    move(count - 1)
                    return

                case 'Enter':
                case ' ':
                    if (!confirmOnSpaceEnter) return
                    e.preventDefault()
                    if (safeSelectedIndex >= 0) onSelect(safeSelectedIndex)
                    return

                default:
                    return
            }
        },
        [count, activeIndex, move, confirmOnSpaceEnter, safeSelectedIndex, onSelect]
    )

    return { safeSelectedIndex, activeIndex, onKeyDown }
}
