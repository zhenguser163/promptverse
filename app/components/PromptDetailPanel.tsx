'use client'

import { X, Copy, GitBranch, AlertTriangle } from 'lucide-react'
import type { PromptItem } from '@/data/mockPrompts'
import { promptContents } from '@/data/mockPrompts'
import StatusBadge from './StatusBadge'
import VersionTimeline from './VersionTimeline'
import EffectNotes from './EffectNotes'
import CopyButton from './CopyButton'

export default function PromptDetailPanel({
  prompt, onClose
}: {
  prompt: PromptItem | null
  onClose: () => void
}) {
  if (!prompt) return null

  const fullContent = promptContents[prompt.id] ?? '（Prompt 内容未收录）'

  return (
    <aside className="w-[380px] border-l border-border bg-bg-white flex flex-col shrink-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between p-4 border-b border-border shrink-0">
        <div className="min-w-0 flex-1 mr-4">
          <div className="flex items-center gap-2 mb-1">
            <StatusBadge status={prompt.status} />
            <span className="text-2xs text-text-muted font-mono">v{prompt.version}</span>
          </div>
          <h2 className="text-[15px] font-semibold text-text-primary leading-snug">{prompt.title}</h2>
        </div>
        <button onClick={onClose} className="p-1 rounded hover:bg-bg-secondary transition shrink-0">
          <X size={16} className="text-text-muted" />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Description */}
        <section>
          <h3 className="text-2xs font-medium text-text-muted uppercase tracking-wider mb-1.5">简介</h3>
          <p className="text-sm text-text-secondary leading-relaxed">{prompt.description}</p>
        </section>

        {/* Meta */}
        <section className="grid grid-cols-2 gap-3">
          <MetaItem label="作者" value={prompt.author} />
          <MetaItem label="最近更新" value={prompt.updatedAt} />
          <MetaItem label="使用次数" value={`${prompt.usageCount} 次`} />
          <MetaItem label="适用平台" value={prompt.platforms.join('、')} />
        </section>

        {/* Usage guide */}
        <section>
          <h3 className="text-2xs font-medium text-text-muted uppercase tracking-wider mb-1.5">使用说明</h3>
          <p className="text-sm text-text-secondary leading-relaxed">{prompt.usageGuide}</p>
        </section>

        {/* Version timeline */}
        <section>
          <h3 className="flex items-center gap-1.5 text-2xs font-medium text-text-muted uppercase tracking-wider mb-2">
            <GitBranch size={12} /> 版本记录
          </h3>
          <VersionTimeline versions={prompt.versions} />
        </section>

        {/* Effect notes */}
        <section>
          <h3 className="text-2xs font-medium text-text-muted uppercase tracking-wider mb-2">效果记录</h3>
          <EffectNotes notes={prompt.effectNotes} />
        </section>

        {/* Risk warnings */}
        {prompt.riskWarnings.length > 0 && (
          <section>
            <h3 className="flex items-center gap-1.5 text-2xs font-medium text-amber-700 uppercase tracking-wider mb-1.5">
              <AlertTriangle size={12} /> 风险提醒
            </h3>
            <ul className="space-y-1">
              {prompt.riskWarnings.map((w, i) => (
                <li key={i} className="text-xs text-amber-800 leading-relaxed flex gap-1.5">
                  <span className="shrink-0 mt-0.5">•</span>
                  {w}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Prompt content preview */}
        <section>
          <h3 className="text-2xs font-medium text-text-muted uppercase tracking-wider mb-1.5">Prompt 内容</h3>
          <div className="relative">
            <pre className="text-xs bg-bg-secondary rounded-md p-3 max-h-60 overflow-y-auto border border-border">
              {fullContent}
            </pre>
            <div className="absolute top-2 right-2">
              <CopyButton text={fullContent} label="复制" />
            </div>
          </div>
        </section>
      </div>

      {/* Footer actions */}
      <div className="border-t border-border p-3 flex gap-2 shrink-0">
        <CopyButton text={fullContent} label="复制 Prompt" />
        <button className="flex-1 inline-flex items-center justify-center gap-1.5 h-8 rounded-md border border-border bg-bg-white text-xs text-text-secondary hover:bg-bg-secondary transition">
          <GitBranch size={13} />
          创建新版本
        </button>
        <button className="flex-1 inline-flex items-center justify-center gap-1.5 h-8 rounded-md bg-[#111827] text-white text-xs font-medium hover:bg-[#1F2937] transition">
          记录效果
        </button>
      </div>
    </aside>
  )
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-2xs text-text-muted">{label}</div>
      <div className="text-xs text-text-secondary mt-0.5 truncate">{value}</div>
    </div>
  )
}
