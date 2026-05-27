# PromptVerse

把团队里好用的 Prompt 沉淀下来。记录每次修改、测试结果和适用场景，让爆款脚本、直播话术、种草笔记不再散落在聊天记录里。

## 截图

> 浅色 Notion / Linear 风格 Dashboard。左侧分类筛选，中间表格视图，右侧详情面板。

## 功能

- **Prompt 管理** — 表格视图展示所有 Prompt，按场景分类浏览
- **版本记录** — 每个 Prompt 的完整迭代历史（v1 → vN），含 changelog
- **效果追踪** — 记录每次改动的实际效果，有据可查
- **状态标签** — 已验证 / 待测试 / 草稿 / 私有 / 团队共享
- **风险提醒** — 标注使用注意事项，避免合规风险
- **一键复制** — 复制 Prompt 内容到剪贴板，带 Toast 提示
- **搜索筛选** — 按标题、标签、场景、作者搜索；按分类和状态筛选

## 技术栈

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

## 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 浏览器打开
open http://localhost:3000
```

## 项目结构

```
app/
├── page.tsx                    # Dashboard 主页面（三栏布局）
├── layout.tsx                  # 根布局
├── globals.css                 # 全局样式
└── components/
    ├── TopNav.tsx              # 顶部导航栏
    ├── Sidebar.tsx             # 左侧分类 + 状态筛选
    ├── PromptTable.tsx         # 中间列表（表格视图）
    ├── PromptListItem.tsx      # 列表行组件
    ├── PromptDetailPanel.tsx   # 右侧详情面板（380px）
    ├── StatusBadge.tsx         # 状态标签
    ├── VersionTimeline.tsx     # 版本时间线
    ├── EffectNotes.tsx         # 效果记录
    ├── SearchInput.tsx         # 搜索输入框
    ├── CopyButton.tsx          # 复制按钮
    ├── EmptyState.tsx          # 空状态提示
    └── Toast.tsx               # Toast 通知

data/
└── mockPrompts.ts              # 示例数据 + 类型定义
```

## 设计参考

- [Linear](https://linear.app/)
- [Notion](https://notion.so/)
- [Vercel Dashboard](https://vercel.com/dashboard)

## License

MIT
