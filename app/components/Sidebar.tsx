'use client'

import { useState } from 'react'
import { navSections, NavItem, statusFilters } from '@/data/mockPrompts'

export default function Sidebar({
  activeNav, activeStatus, onNavChange, onStatusChange
}: {
  activeNav: string
  activeStatus: string
  onNavChange: (id: string) => void
  onStatusChange: (id: string) => void
}) {
  const [collapsed, setCollapsed] = useState(false)

  if (collapsed) {
    return (
      <aside className="w-12 border-r border-border bg-bg-white flex flex-col items-center pt-3 gap-3 shrink-0">
        <button onClick={() => setCollapsed(false)} className="text-xs text-text-muted hover:text-text-secondary">☰</button>
        {navSections.flatMap(s => s.items).slice(0, 8).map(item => (
          <button key={item.id} className="text-sm" title={item.name}>{item.icon}</button>
        ))}
      </aside>
    )
  }

  return (
    <aside className="w-[220px] border-r border-border bg-bg-white flex flex-col shrink-0 overflow-y-auto">
      <div className="p-3 flex items-center justify-between">
        <span className="text-2xs font-medium text-text-muted uppercase tracking-wider">工作区</span>
        <button onClick={() => setCollapsed(true)} className="text-xs text-text-muted hover:text-text-secondary">◁</button>
      </div>

      <nav className="flex flex-col gap-0.5 px-1.5">
        {navSections.map(section => (
          <div key={section.label} className="mb-2">
            <div className="px-2 py-1 text-2xs font-medium text-text-muted uppercase tracking-wider">
              {section.label}
            </div>
            {section.items.map(item => (
              <button
                key={item.id}
                onClick={() => onNavChange(item.id)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors text-left ${
                  activeNav === item.id
                    ? 'bg-accent-light text-accent font-medium'
                    : 'text-text-secondary hover:bg-bg-secondary'
                }`}
              >
                {item.icon && <span className="text-xs w-4 text-center">{item.icon}</span>}
                <span className="truncate">{item.name}</span>
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Status filter */}
      <div className="border-t border-border mt-2 pt-2 px-1.5">
        <div className="px-2 py-1 text-2xs font-medium text-text-muted uppercase tracking-wider">状态</div>
        {statusFilters.map(sf => (
          <button
            key={sf.id}
            onClick={() => onStatusChange(sf.filter)}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors text-left ${
              activeStatus === sf.filter
                ? 'bg-accent-light text-accent font-medium'
                : 'text-text-secondary hover:bg-bg-secondary'
            }`}
          >
            <span className="truncate">{sf.name}</span>
          </button>
        ))}
      </div>
    </aside>
  )
}
