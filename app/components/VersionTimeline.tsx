import type { PromptVersion } from '@/data/mockPrompts'

export default function VersionTimeline({ versions }: { versions: PromptVersion[] }) {
  return (
    <div className="space-y-0">
      {versions.map((v, i) => (
        <div key={v.version} className="relative pl-5 pb-3 last:pb-0">
          {/* Line */}
          {i < versions.length - 1 && (
            <div className="absolute left-[5px] top-3 w-px h-full bg-border" />
          )}
          {/* Dot */}
          <div className={`absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full border-2 border-bg-white ${
            i === 0 ? 'bg-accent' : 'bg-border'
          }`} />

          <div className="text-xs font-medium text-text-primary">v{v.version}</div>
          <div className="text-2xs text-text-tertiary leading-relaxed mt-0.5">{v.changelog}</div>
          <div className="text-2xs text-text-muted mt-0.5">{v.createdAt}</div>
        </div>
      ))}
    </div>
  )
}
