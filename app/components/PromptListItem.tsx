'use client'

import type { PromptItem } from '@/data/mockPrompts'
import StatusBadge from './StatusBadge'
import { ChevronRight, Copy } from 'lucide-react'

export default function PromptListItem({
  prompt, isSelected, onClick, onCopy,
}: {
  prompt: PromptItem
  isSelected: boolean
  onClick: () => void
  onCopy: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`group grid grid-cols-[1fr_100px_80px_80px_100px_80px_28px] gap-3 px-4 py-3 items-center border-b border-border cursor-pointer transition-colors ${
        isSelected ? 'bg-accent-light' : 'hover:bg-bg-secondary'
      }`}
      style={{ fontSize: '13px' }}
    >
      {/* Name + scenario */}
      <div className="min-w-0">
        <div className="font-medium text-text-primary truncate">{prompt.title}</div>
        <div className="text-2xs text-text-muted truncate mt-0.5">{prompt.scenario}</div>
      </div>

      {/* Status */}
      <StatusBadge status={prompt.status} />

      {/* Version */}
      <span className="text-text-tertiary font-mono text-xs">v{prompt.version}</span>

      {/* Author */}
      <span className="text-text-tertiary truncate">{prompt.author}</span>

      {/* Updated */}
      <span className="text-text-muted text-2xs">{prompt.updatedAt}</span>

      {/* Usage count */}
      <span className="text-text-muted text-2xs text-right tabular-nums">{prompt.usageCount} 次</span>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); onCopy() }}
          className="p-1 rounded hover:bg-border transition"
          title="复制"
        >
          <Copy size={13} className="text-text-muted" />
        </button>
        <ChevronRight size={14} className="text-text-muted" />
      </div>
    </div>
  )
}
