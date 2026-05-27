'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { prompts as staticPrompts, type Prompt, type PromptVersion } from '@/data/prompts'

/* ─── localStorage keys ─── */
const LS_USER_PROMPTS = 'pv_user_prompts'
const LS_LIKES = 'pv_likes'
const LS_COMMENTS = 'pv_comments'
const LS_USERNAME = 'pv_username'

/* ─── Types ─── */
export interface Comment {
  id: string
  author: string
  content: string
  createdAt: string
}

interface PromptContextType {
  allPrompts: Prompt[]
  username: string
  setUsername: (name: string) => void

  /* likes */
  getLikes: (promptId: string) => number
  isLiked: (promptId: string) => boolean
  toggleLike: (promptId: string) => void

  /* comments */
  getComments: (promptId: string) => Comment[]
  addComment: (promptId: string, content: string) => void

  /* submit */
  submitPrompt: (data: {
    title: string
    description: string
    category: Prompt['category']
    tags: string[]
    content: string
    model: string
  }) => void
}

const PromptContext = createContext<PromptContextType | null>(null)

/* ─── helpers ─── */
function loadJSON<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveJSON(key: string, data: unknown) {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(data))
}

let _idCounter = Date.now()
function uid() { return 'id_' + (_idCounter++).toString(36) }

/* ─── Provider ─── */
export function PromptProvider({ children }: { children: ReactNode }) {
  const [username, setUsernameState] = useState('')
  const [userPrompts, setUserPrompts] = useState<Prompt[]>([])
  const [likes, setLikes] = useState<Record<string, string[]>>({})
  const [comments, setComments] = useState<Record<string, Comment[]>>({})
  const [mounted, setMounted] = useState(false)

  /* load on mount */
  useEffect(() => {
    setUsernameState(loadJSON(LS_USERNAME, '匿名用户'))
    setUserPrompts(loadJSON<Prompt[]>(LS_USER_PROMPTS, []))
    setLikes(loadJSON<Record<string, string[]>>(LS_LIKES, {}))
    setComments(loadJSON<Record<string, Comment[]>>(LS_COMMENTS, {}))
    setMounted(true)
  }, [])

  /* persist */
  const setUsername = useCallback((name: string) => {
    setUsernameState(name)
    saveJSON(LS_USERNAME, name)
  }, [])

  /* ── likes ── */
  const getLikes = useCallback((promptId: string) => {
    return (likes[promptId]?.length ?? 0)
  }, [likes])

  const isLiked = useCallback((promptId: string) => {
    return likes[promptId]?.includes(username) ?? false
  }, [likes, username])

  const toggleLike = useCallback((promptId: string) => {
    setLikes(prev => {
      const list = prev[promptId] ?? []
      const next = list.includes(username)
        ? list.filter(n => n !== username)
        : [...list, username]
      const updated = { ...prev, [promptId]: next }
      saveJSON(LS_LIKES, updated)
      return updated
    })
  }, [username])

  /* ── comments ── */
  const getComments = useCallback((promptId: string) => {
    return comments[promptId] ?? []
  }, [comments])

  const addComment = useCallback((promptId: string, content: string) => {
    const c: Comment = {
      id: uid(),
      author: username,
      content,
      createdAt: new Date().toISOString().slice(0, 10),
    }
    setComments(prev => {
      const updated = {
        ...prev,
        [promptId]: [...(prev[promptId] ?? []), c],
      }
      saveJSON(LS_COMMENTS, updated)
      return updated
    })
  }, [username])

  /* ── submit ── */
  const submitPrompt = useCallback((data: {
    title: string; description: string; category: Prompt['category']; tags: string[]; content: string; model: string
  }) => {
    const now = new Date().toISOString().slice(0, 10)
    const newPrompt: Prompt = {
      id: uid(),
      title: data.title,
      description: data.description,
      category: data.category,
      tags: data.tags,
      author: username,
      createdAt: now,
      updatedAt: now,
      model: data.model,
      stats: { copies: 0, likes: 0 },
      versions: [{
        version: 1,
        content: data.content,
        changelog: '初始版本',
        createdAt: now,
      }],
    }
    setUserPrompts(prev => {
      const updated = [newPrompt, ...prev]
      saveJSON(LS_USER_PROMPTS, updated)
      return updated
    })
  }, [username])

  /* merge static + user prompts */
  const allPrompts = [...userPrompts, ...staticPrompts]

  return (
    <PromptContext.Provider value={{
      allPrompts,
      username,
      setUsername,
      getLikes,
      isLiked,
      toggleLike,
      getComments,
      addComment,
      submitPrompt,
    }}>
      {children}
    </PromptContext.Provider>
  )
}

export function usePrompts() {
  const ctx = useContext(PromptContext)
  if (!ctx) throw new Error('usePrompts must be inside PromptProvider')
  return ctx
}
