'use client'

import { Search } from 'lucide-react'

export default function SearchInput({
  value, onChange, placeholder = '搜索 Prompt、标签、场景或作者...'
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <div className="relative flex-1 max-w-md">
      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-9 pl-9 pr-3 rounded-md bg-bg-white border border-border text-sm text-text-primary placeholder:text-text-muted"
        style={{ fontSize: '13px' }}
      />
    </div>
  )
}
