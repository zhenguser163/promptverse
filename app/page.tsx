'use client'

import { useState, useMemo, useCallback } from 'react'
import TopNav from './components/TopNav'
import Sidebar from './components/Sidebar'
import PromptTable from './components/PromptTable'
import PromptDetailPanel from './components/PromptDetailPanel'
import { useToast, Toast } from './components/Toast'
import { mockPrompts, promptContents } from '@/data/mockPrompts'
import type { PromptItem } from '@/data/mockPrompts'

export default function Dashboard() {
  const [search, setSearch] = useState('')
  const [activeNav, setActiveNav] = useState('all')
  const [activeStatus, setActiveStatus] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { toast, show } = useToast()

  /* ── Filtering ── */
  const filteredPrompts = useMemo(() => {
    let result = mockPrompts

    // Nav filter (category or custom filter)
    const navItem = ['douyin','xiaohongshu','ecommerce','live','service','private-domain','draft','shared'].find(
      id => activeNav === `cat-${id}` || activeNav === id
    )
    if (navItem) {
      if (['draft','shared'].includes(navItem)) {
        result = result.filter(p => p.status === navItem)
      } else {
        result = result.filter(p => p.category === navItem)
      }
    }

    // Status filter
    if (activeStatus) {
      result = result.filter(p => p.status === activeStatus)
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.scenario.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.author.toLowerCase().includes(q) ||
        p.platforms.some(pl => pl.toLowerCase().includes(q))
      )
    }

    return result
  }, [search, activeNav, activeStatus])

  const selectedPrompt = useMemo(
    () => mockPrompts.find(p => p.id === selectedId) ?? null,
    [selectedId]
  )

  /* ── Handlers ── */
  const handleSelect = useCallback((prompt: PromptItem) => {
    setSelectedId(prev => prev === prompt.id ? null : prompt.id)
  }, [])

  const handleCopy = useCallback((prompt: PromptItem) => {
    const content = promptContents[prompt.id] ?? ''
    navigator.clipboard.writeText(content).then(() => {
      show('已复制到剪贴板')
    })
  }, [show])

  return (
    <div className="h-screen flex flex-col bg-bg">
      {/* Top Nav */}
      <TopNav search={search} onSearchChange={setSearch} />

      {/* Body: Sidebar | Table | Detail */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeNav={activeNav}
          activeStatus={activeStatus}
          onNavChange={setActiveNav}
          onStatusChange={setActiveStatus}
        />

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-bg-white">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-border shrink-0">
            <div className="text-xs text-text-muted">
              {filteredPrompts.length} 个 Prompt
              {activeNav !== 'all' && <span className="text-text-tertiary"> · 已筛选</span>}
            </div>
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <span className="text-text-tertiary">排序：</span>
              <select className="text-xs bg-transparent border-none text-text-secondary cursor-pointer">
                <option>最近更新</option>
                <option>使用次数</option>
                <option>版本数</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <PromptTable
            prompts={filteredPrompts}
            selectedId={selectedId}
            onSelect={handleSelect}
            onCopy={handleCopy}
          />
        </div>

        {/* Detail Panel */}
        <PromptDetailPanel
          prompt={selectedPrompt}
          onClose={() => setSelectedId(null)}
        />
      </div>

      {/* Toast */}
      <Toast message={toast} />
    </div>
  )
}
