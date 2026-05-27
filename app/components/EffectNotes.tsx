import type { EffectNote } from '@/data/mockPrompts'

export default function EffectNotes({ notes }: { notes: EffectNote[] }) {
  if (notes.length === 0) {
    return <p className="text-xs text-text-muted">暂无效果记录</p>
  }

  return (
    <div className="space-y-3">
      {notes.map((n, i) => (
        <div key={i} className="text-xs leading-relaxed">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-2xs text-text-muted">{n.date}</span>
            <span className="text-2xs text-text-tertiary">{n.author}</span>
          </div>
          <p className="text-text-secondary">{n.content}</p>
        </div>
      ))}
    </div>
  )
}
