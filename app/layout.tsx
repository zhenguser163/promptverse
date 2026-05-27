import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PromptVerse — 提示词版本管理',
  description: '把团队里好用的 Prompt 沉淀下来。记录每次修改、测试结果和适用场景。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="h-screen overflow-hidden">{children}</body>
    </html>
  )
}
