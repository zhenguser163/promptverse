'use client'

import type { PromptStatus } from '@/data/mockPrompts'

const statusConfig: Record<PromptStatus, { label: string; cls: string }> = {
  verified: { label: '已验证', cls: 'bg-verified-bg text-verified-text' },
  testing:  { label: '待测试', cls: 'bg-testing-bg text-testing-text' },
  draft:    { label: '草稿',   cls: 'bg-draft-bg text-draft-text' },
  private:  { label: '私有',   cls: 'bg-private-bg text-private-text' },
  shared:   { label: '团队共享', cls: 'bg-shared-bg text-shared-text' },
}

export default function StatusBadge({ status }: { status: PromptStatus }) {
  const cfg = statusConfig[status]
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-2xs font-medium ${cfg.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full bg-${status}-dot`} />
      {cfg.label}
    </span>
  )
}
