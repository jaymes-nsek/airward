import {useCallback, useMemo} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import type {NavItem} from "../../App.tsx";

export function useNavRouting<NavKey extends string>(
    items: ReadonlyArray<NavItem<NavKey>>,
) {
    const navigate = useNavigate()
    const location = useLocation()

    const keyByPath = useMemo(() => {
        const map = new Map<string, NavKey>()
        for (const item of items) map.set(item.to, item.key)
        return map
    }, [items])

    const pathByKey = useMemo(() => {
        const map = new Map<NavKey, string>()
        for (const item of items) map.set(item.key, item.to)
        return map
    }, [items])

    const activeKey = useMemo<NavKey>(() => {
        // fall back to first item to keep your current behaviour
        return keyByPath.get(location.pathname) ?? items[0]?.key
    }, [keyByPath, location.pathname, items])

    const handleNavChange = useCallback(
        (newKey: NavKey) => {
            const to = pathByKey.get(newKey)
            if (to && to !== location.pathname) navigate(to)
        },
        [pathByKey, navigate, location.pathname],
    )

    return {activeKey, handleNavChange, pathname: location.pathname}
}
