'use client'

import type { PromptItem } from '@/data/mockPrompts'
import PromptListItem from './PromptListItem'
import EmptyState from './EmptyState'

export default function PromptTable({
  prompts, selectedId, onSelect, onCopy,
}: {
  prompts: PromptItem[]
  selectedId: string | null
  onSelect: (prompt: PromptItem) => void
  onCopy: (prompt: PromptItem) => void
}) {
  if (prompts.length === 0) return <EmptyState />

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Header */}
      <div
        className="grid grid-cols-[1fr_100px_80px_80px_100px_80px_28px] gap-3 px-4 py-2.5 border-b border-border bg-bg-secondary text-2xs font-medium text-text-muted uppercase tracking-wider shrink-0"
      >
        <span>Prompt 名称</span>
        <span>状态</span>
        <span>版本</span>
        <span>作者</span>
        <span>最近更新</span>
        <span className="text-right">使用</span>
        <span />
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-y-auto">
        {prompts.map(p => (
          <PromptListItem
            key={p.id}
            prompt={p}
            isSelected={selectedId === p.id}
            onClick={() => onSelect(p)}
            onCopy={() => onCopy(p)}
          />
        ))}
      </div>
    </div>
  )
}
