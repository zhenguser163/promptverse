'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Plus, User, X } from 'lucide-react'
import { usePrompts } from '@/app/context/PromptContext'

export default function Header() {
  const { username, setUsername } = usePrompts()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(username)

  const handleSave = () => {
    const name = draft.trim() || '匿名用户'
    setUsername(name)
    setEditing(false)
  }

  return (
    <header className="sticky top-0 z-50 glass border-b border-[#2a2a3e]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold shrink-0">
          <span className="text-2xl">⚡</span>
          <span className="text-gradient">PromptVerse</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/submit" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6366f1]/10 hover:bg-[#6366f1]/20 text-[#818cf8] transition">
            <Plus size={15} /> 提交
          </Link>

          {/* Username */}
          {editing ? (
            <div className="flex items-center gap-1">
              <input
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSave()}
                className="w-24 px-2 py-1 rounded-lg bg-[#1a1a24] border border-[#6366f1]/40 text-sm text-white focus:outline-none"
                autoFocus
                maxLength={12}
              />
              <button onClick={handleSave} className="text-[#818cf8] text-xs">确定</button>
            </div>
          ) : (
            <button
              onClick={() => { setDraft(username); setEditing(true) }}
              className="flex items-center gap-1.5 text-[#9494a8] hover:text-white transition"
            >
              <User size={15} />
              <span className="hidden sm:inline">{username}</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
