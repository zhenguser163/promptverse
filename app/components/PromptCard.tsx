'use client'

import Link from 'next/link'
import { Copy, ThumbsUp, Clock, ArrowUpRight } from 'lucide-react'
import type { Prompt } from '@/data/prompts'
import { categories } from '@/data/prompts'
import { usePrompts } from '@/app/context/PromptContext'

export default function PromptCard({ prompt }: { prompt: Prompt }) {
  const { getLikes, isLiked, toggleLike } = usePrompts()
  const cat = categories.find(c => c.id === prompt.category)!
  const latestVersion = prompt.versions[0]
  const hasMetrics = latestVersion.metrics != null
  const dynamicLikes = prompt.stats.likes + getLikes(prompt.id)
  const liked = isLiked(prompt.id)

  return (
    <div className="group block p-5 rounded-2xl bg-[#1a1a24] border border-[#2a2a3e] hover:border-[#6366f1]/40 transition-all hover:shadow-lg hover:shadow-[#6366f1]/5 relative">
      {/* Top row: category + stats */}
      <div className="flex items-center justify-between mb-3">
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium`}
          style={{
            backgroundColor: cat.color === 'douyin' ? 'rgba(255,0,80,0.15)' : cat.color === 'xiaohongshu' ? 'rgba(255,36,66,0.15)' : cat.color === 'ecommerce' ? 'rgba(245,158,11,0.15)' : cat.color === 'service' ? 'rgba(16,185,129,0.15)' : 'rgba(139,92,246,0.15)',
            color: cat.color === 'douyin' ? '#ff0050' : cat.color === 'xiaohongshu' ? '#ff2442' : cat.color === 'ecommerce' ? '#f59e0b' : cat.color === 'service' ? '#10b981' : '#8b5cf6',
          }}
        >
          {cat.icon} {cat.name}
        </span>
        <div className="flex items-center gap-3 text-xs text-[#9494a8]">
          <span className="flex items-center gap-1"><Copy size={11} /> {prompt.stats.copies.toLocaleString()}</span>
          <button
            onClick={(e) => { e.preventDefault(); toggleLike(prompt.id) }}
            className={`flex items-center gap-1 transition ${liked ? 'text-[#6366f1]' : 'hover:text-white'}`}
          >
            <ThumbsUp size={11} fill={liked ? '#6366f1' : 'none'} /> {dynamicLikes}
          </button>
        </div>
      </div>

      {/* Title */}
      <Link href={`/prompt/${prompt.id}`} className="block">
        <h3 className="text-lg font-semibold mb-2 group-hover:text-[#818cf8] transition">
          {prompt.title}
        </h3>
      </Link>

      {/* Description */}
      <p className="text-sm text-[#9494a8] mb-4 line-clamp-2 leading-relaxed">
        {prompt.description}
      </p>

      {/* Bottom row */}
      <div className="flex items-center justify-between text-xs text-[#9494a8]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            v{latestVersion.version} · {prompt.updatedAt}
          </span>
          {hasMetrics && (
            <span className="text-[#10b981]">
              {latestVersion.metrics!.label}: {latestVersion.metrics!.value}
            </span>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {prompt.tags.map(tag => (
          <span key={tag} className="px-2 py-0.5 rounded-md bg-[#24243a] text-xs text-[#9494a8]">
            #{tag}
          </span>
        ))}
        <span className="text-[10px] text-[#9494a8]/50 mt-0.5">by {prompt.author}</span>
      </div>
    </div>
  )
}
