import MenuBookRounded from '@mui/icons-material/MenuBookRounded'
import HeadphonesRounded from '@mui/icons-material/HeadphonesRounded'
import MicRounded from '@mui/icons-material/MicRounded'
import InsightsRounded from '@mui/icons-material/InsightsRounded'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { useState, type ReactElement } from 'react'

import './App.css'

type NavKey = 'library' | 'listen' | 'speak' | 'stats'

const navItems: Array<{ key: NavKey; label: string; icon: ReactElement }> = [
  { key: 'library', label: 'Library', icon: <MenuBookRounded /> },
  { key: 'listen', label: 'Listen', icon: <HeadphonesRounded /> },
  { key: 'speak', label: 'Speak', icon: <MicRounded /> },
  { key: 'stats', label: 'Stats', icon: <InsightsRounded /> },
]

function App() {
  const [active, setActive] = useState<NavKey>('listen')

  return (
    <div className="shell">
      <header className="shell__header">
        <div className="header__meta">
          <span className="brand">Airward</span>
          <span className="pill">Practice</span>
        </div>
        <p className="header__subtitle">
          Navigate between learning tools with the bottom bar.
        </p>
      </header>

      <main className="shell__main">
        <div className="card card--ghost">
          <p className="card__eyebrow">Active view</p>
          <h2 className="card__title">
            {navItems.find((item) => item.key === active)?.label}
          </h2>
          <p className="card__body">
            This placeholder content shows which section is selected in the
            bottom navigation. On mobile and tablet, the navigation is pinned to
            the bottom with elevated styling.
          </p>
        </div>
      </main>

      <BottomNavigation
        showLabels
        value={active}
        onChange={(_, newValue) => setActive(newValue)}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.key}
            label={item.label}
            icon={item.icon}
            value={item.key}
          />
        ))}
      </BottomNavigation>
    </div>
  )
}

export default App
