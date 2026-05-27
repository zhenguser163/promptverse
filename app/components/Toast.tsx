'use client'

import { useState, useEffect, useCallback } from 'react'
import { Check } from 'lucide-react'

export function useToast() {
  const [toast, setToast] = useState<string | null>(null)

  const show = useCallback((msg: string) => {
    setToast(msg)
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(t)
  }, [toast])

  return { toast, show }
}

export function Toast({ message }: { message: string | null }) {
  if (!message) return null
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 toast-enter">
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#111827] text-white text-sm shadow-lg">
        <Check size={14} className="text-green-400" />
        {message}
      </div>
    </div>
  )
}
