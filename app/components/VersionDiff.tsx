'use client'

import { useState } from 'react'
import type { PromptVersion } from '@/data/prompts'

export default function VersionDiff({
  versions,
  currentIndex,
  onSelectVersion,
}: {
  versions: PromptVersion[]
  currentIndex: number
  onSelectVersion: (idx: number) => void
}) {
  const [compareIdx, setCompareIdx] = useState<number | null>(
    currentIndex > 0 ? currentIndex - 1 : null
  )

  const current = versions[currentIndex]
  const compare = compareIdx !== null ? versions[compareIdx] : null

  const lines = (text: string) => text.split('\n')

  const renderDiff = () => {
    if (!compare) return null
    const currentLines = lines(current.content)
    const compareLines = lines(compare.content)

    // Simple line-by-line diff (character-level would be heavier)
    const maxLen = Math.max(currentLines.length, compareLines.length)
    const result: { type: 'add' | 'remove' | 'same'; text: string }[] = []

    // Very basic diff - just show what's different
    const compareSet = new Set(compareLines.map(l => l.trim()).filter(Boolean))
    const currentSet = new Set(currentLines.map(l => l.trim()).filter(Boolean))

    for (const line of currentLines) {
      const trimmed = line.trim()
      if (!trimmed) { result.push({ type: 'same', text: line }); continue }
      if (!compareSet.has(trimmed)) {
        result.push({ type: 'add', text: line })
      } else {
        result.push({ type: 'same', text: line })
      }
    }

    return result
  }

  const diff = renderDiff()

  return (
    <div className="space-y-4">
      {/* Version selector */}
      <div className="flex items-center gap-3 text-sm">
        <span className="text-[#9494a8]">对比版本：</span>
        <div className="flex gap-1.5">
          {versions.map((v, i) => (
            <button
              key={v.version}
              onClick={() => setCompareIdx(i === compareIdx ? null : i)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition ${
                i === currentIndex
                  ? 'bg-[#6366f1]/20 text-[#818cf8] border border-[#6366f1]/40'
                  : i === compareIdx
                  ? 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40'
                  : 'bg-[#1a1a24] text-[#9494a8] border border-[#2a2a3e] hover:border-[#6366f1]/30'
              }`}
            >
              v{v.version}
            </button>
          ))}
        </div>
        <span className="text-xs text-[#9494a8]">
          {compare ? `v${current.version} vs v${compare.version}` : '选择版本对比'}
        </span>
      </div>

      {/* Diff view */}
      {diff && (
        <div className="rounded-xl border border-[#2a2a3e] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1a24] border-b border-[#2a2a3e] text-xs">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-[#10b981]" />
              新增 {diff.filter(d => d.type === 'add').length} 行
            </span>
            <span className="text-[#9494a8]">·</span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
              删除 {diff.filter(d => d.type === 'remove').length} 行
            </span>
          </div>
          <div className="p-4 font-mono text-sm leading-relaxed overflow-x-auto max-h-96 overflow-y-auto">
            {diff.map((line, i) => (
              <div
                key={i}
                className={`px-2 py-0.5 rounded ${
                  line.type === 'add'
                    ? 'bg-[#10b981]/10 text-[#6ee7b7] border-l-2 border-[#10b981]'
                    : line.type === 'remove'
                    ? 'bg-[#ef4444]/10 text-[#fca5a5] border-l-2 border-[#ef4444]'
                    : 'text-[#9494a8]'
                }`}
              >
                <span className="select-none mr-3 text-[#9494a8]/40">
                  {line.type === 'add' ? '+' : line.type === 'remove' ? '-' : ' '}
                </span>
                {line.text || ' '}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
