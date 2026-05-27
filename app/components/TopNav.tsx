'use client'

import { Plus, Upload, User } from 'lucide-react'
import SearchInput from './SearchInput'

export default function TopNav({
  search, onSearchChange
}: {
  search: string
  onSearchChange: (v: string) => void
}) {
  return (
    <header className="h-14 border-b border-border bg-bg-white flex items-center px-4 gap-4 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 font-semibold text-[15px] text-text-primary shrink-0">
        <span className="w-6 h-6 rounded bg-[#111827] text-white flex items-center justify-center text-xs font-bold">P</span>
        PromptVerse
      </div>

      {/* Search */}
      <SearchInput value={search} onChange={onSearchChange} />

      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md border border-border bg-bg-white text-xs text-text-secondary hover:bg-bg-secondary transition">
          <Upload size={13} />
          导入
        </button>
        <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-[#111827] text-white text-xs font-medium hover:bg-[#1F2937] transition">
          <Plus size={13} />
          新建 Prompt
        </button>
        <button className="w-8 h-8 rounded-full bg-bg-secondary flex items-center justify-center text-xs text-text-tertiary hover:bg-border transition ml-1">
          <User size={15} />
        </button>
      </div>
    </header>
  )
}
