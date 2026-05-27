import { FileText } from 'lucide-react'

export default function EmptyState({
  title = '没有找到符合条件的 Prompt',
  subtitle = '试试更换关键词，或新建一个模板。',
}: {
  title?: string
  subtitle?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-12 h-12 rounded-lg bg-bg-secondary flex items-center justify-center mb-4">
        <FileText size={22} className="text-text-muted" />
      </div>
      <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
      <p className="text-xs text-text-muted">{subtitle}</p>
    </div>
  )
}
