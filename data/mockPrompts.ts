/* ── 类型定义 ── */

export type PromptStatus = 'verified' | 'testing' | 'draft' | 'private' | 'shared'

export interface PromptVersion {
  version: number
  content: string
  changelog: string
  createdAt: string
}

export interface EffectNote {
  date: string
  content: string
  author: string
}

export interface PromptItem {
  id: string
  title: string
  description: string
  scenario: string
  platforms: string[]
  contentTypes: string[]
  status: PromptStatus
  version: number
  author: string
  updatedAt: string
  usageCount: number
  tags: string[]
  category: string
  versions: PromptVersion[]
  effectNotes: EffectNote[]
  riskWarnings: string[]
  usageGuide: string
}

/* ── 分类定义 ── */

export interface Category {
  id: string
  name: string
  count: number
}

export const categories: Category[] = [
  { id: 'douyin', name: '抖音短视频', count: 4 },
  { id: 'xiaohongshu', name: '小红书种草', count: 3 },
  { id: 'ecommerce', name: '电商详情页', count: 2 },
  { id: 'live', name: '直播话术', count: 3 },
  { id: 'service', name: '客服回复', count: 2 },
  { id: 'private-domain', name: '私域转化', count: 1 },
]

/* ── 侧边栏导航 ── */

export interface NavSection {
  label: string
  items: NavItem[]
}

export interface NavItem {
  id: string
  name: string
  icon: string
  filter?: string // category filter or status filter
}

export const navSections: NavSection[] = [
  {
    label: '浏览',
    items: [
      { id: 'all', name: '全部 Prompt', icon: '📋' },
      { id: 'favorites', name: '我的收藏', icon: '⭐' },
      { id: 'shared', name: '团队共享', icon: '👥', filter: 'shared' },
      { id: 'community', name: '社区精选', icon: '💡' },
      { id: 'recent', name: '最近更新', icon: '🕐' },
      { id: 'drafts', name: '草稿箱', icon: '📝', filter: 'draft' },
    ],
  },
  {
    label: '场景分类',
    items: [
      { id: 'cat-douyin', name: '抖音短视频', icon: '', filter: 'douyin' },
      { id: 'cat-xiaohongshu', name: '小红书种草', icon: '', filter: 'xiaohongshu' },
      { id: 'cat-ecommerce', name: '电商详情页', icon: '', filter: 'ecommerce' },
      { id: 'cat-live', name: '直播话术', icon: '', filter: 'live' },
      { id: 'cat-service', name: '客服回复', icon: '', filter: 'service' },
      { id: 'cat-private-domain', name: '私域转化', icon: '', filter: 'private-domain' },
    ],
  },
]

/* ── 状态筛选 ── */

export const statusFilters = [
  { id: 'all-status', name: '全部状态', filter: '' },
  { id: 'verified', name: '已验证', filter: 'verified' },
  { id: 'testing', name: '待测试', filter: 'testing' },
  { id: 'draft', name: '草稿', filter: 'draft' },
  { id: 'private', name: '私有', filter: 'private' },
  { id: 'shared', name: '团队共享', filter: 'shared' },
]

/* ── Mock 数据 ── */

export const mockPrompts: PromptItem[] = [
  {
    id: 'prompt-001',
    title: '抖音口播脚本｜美妆测评号',
    description: '适合 30-60 秒新品测评口播，重点解决开头不抓人、卖点太散、结尾转化弱的问题。把产品卖点前置到前 3 秒，用真实体验口吻替代过度营销表达。',
    scenario: '新品测评 / 平价替代 / 成分党内容',
    platforms: ['抖音', '视频号', '小红书视频'],
    contentTypes: ['新品测评', '平价替代', '成分解析', '真实使用反馈'],
    status: 'verified',
    version: 6,
    author: '运营 Lisa',
    updatedAt: '今天 14:32',
    usageCount: 128,
    tags: ['口播', '美妆', '测评', '抖音'],
    category: 'douyin',
    versions: [
      { version: 6, content: '...', changelog: '把核心卖点前置到开头 3 秒，删除无效寒暄', createdAt: '2026-05-26' },
      { version: 5, content: '...', changelog: '增加"适合谁/不适合谁"结构，帮助用户快速判断', createdAt: '2026-05-18' },
      { version: 4, content: '...', changelog: '去掉过度营销表达，改成真实体验口吻', createdAt: '2026-05-10' },
      { version: 3, content: '...', changelog: '增加结尾评论引导，提升互动数据', createdAt: '2026-04-28' },
      { version: 2, content: '...', changelog: '调整产品卖点顺序，把效果展示提前', createdAt: '2026-04-15' },
      { version: 1, content: '...', changelog: '初始版本，基础口播框架', createdAt: '2026-03-20' },
    ],
    effectNotes: [
      { date: '2026-05-26', content: '最近 12 条视频中，有 7 条完播表现优于账号均值。开头改动效果明显。', author: '运营 Lisa' },
      { date: '2026-05-10', content: '去掉过度营销表达后，评论区负面反馈减少，真实感增强。', author: '运营 Lisa' },
    ],
    riskWarnings: [
      '不要直接承诺具体功效',
      '不要虚构亲测体验，需要搭配真实产品实拍',
      '医美、食品、功效类产品需要人工审核后再发布',
    ],
    usageGuide: '使用时替换 {product_name}、{selling_points}、{target_audience} 三个变量。建议先用产品实拍画面，口播内容尽量脱稿而非念稿。',
  },
  {
    id: 'prompt-002',
    title: '小红书种草笔记｜低客单零食',
    description: '适合宿舍零食、办公室下午茶、囤货分享类内容。重点是写出"真实分享"的感觉，不要写成广告。',
    scenario: '宿舍零食 / 办公室下午茶 / 囤货分享',
    platforms: ['小红书'],
    contentTypes: ['零食种草', '价格对比', '开箱体验', '囤货清单'],
    status: 'shared',
    version: 4,
    author: '内容组 Jay',
    updatedAt: '昨天 18:20',
    usageCount: 86,
    tags: ['种草', '零食', '小红书', '低客单'],
    category: 'xiaohongshu',
    versions: [
      { version: 4, content: '...', changelog: '调整语气，减少感叹号使用频率，更接近真实分享', createdAt: '2026-05-25' },
      { version: 3, content: '...', changelog: '增加价格对比板块，强化"划算"感知', createdAt: '2026-05-15' },
      { version: 2, content: '...', changelog: '添加话题标签策略，分大流量和精准标签', createdAt: '2026-04-30' },
      { version: 1, content: '...', changelog: '初始版本，基础小红书种草框架', createdAt: '2026-04-10' },
    ],
    effectNotes: [
      { date: '2026-05-20', content: '适合搭配真实试吃图使用，纯文字效果差。不建议写得过度广告化——用户能看出来。', author: '内容组 Jay' },
    ],
    riskWarnings: [
      '食品类需要注明"个人口味，仅供参考"',
      '不要使用"最好吃""全网第一"等绝对化用语',
      '拍摄时注意食品包装是否完整',
    ],
    usageGuide: '填入 {product_name}、{price}、{purchase_channel} 三个变量。正文建议 200-400 字，配 3-5 张实拍图效果最佳。',
  },
  {
    id: 'prompt-003',
    title: '直播间憋单话术｜99 元以下单品',
    description: '适合零食、日用百货、美妆小样等低客单产品。用在开价前 3 分钟的憋单环节，需要主播根据实时库存灵活调整数量和紧迫感。',
    scenario: '零食 / 日用百货 / 美妆小样',
    platforms: ['抖音', '快手', '视频号'],
    contentTypes: ['憋单话术', '限时优惠', '库存紧迫'],
    status: 'testing',
    version: 2,
    author: '直播运营 Chen',
    updatedAt: '2 天前',
    usageCount: 42,
    tags: ['直播', '憋单', '低客单', '话术'],
    category: 'live',
    versions: [
      { version: 2, content: '...', changelog: '增加库存数量动态调整指引，避免虚假承诺', createdAt: '2026-05-24' },
      { version: 1, content: '...', changelog: '初始版本，基础憋单框架', createdAt: '2026-05-10' },
    ],
    effectNotes: [
      { date: '2026-05-24', content: '适合客单价 99 元以下的品类。高客单产品需要更长的铺垫，不适合直接套用。', author: '直播运营 Chen' },
    ],
    riskWarnings: [
      '不能虚构库存数量',
      '不能承诺"最后几单"后继续加库存（平台判定诱导下单）',
      '价格对比需要真实可查的原价依据',
    ],
    usageGuide: '填入 {product_name}、{original_price}、{live_price}、{stock}。主播需要提前确认实时库存，话术中的数量不能瞎编。',
  },
  {
    id: 'prompt-004',
    title: '电商详情页首屏文案｜解决看完不下单',
    description: '针对淘宝、拼多多、抖店通用。优先突出使用场景和决策理由，不要只堆参数。核心思路：帮用户想象拥有产品后的状态。',
    scenario: '淘宝 / 拼多多 / 抖店通用',
    platforms: ['淘宝', '拼多多', '抖店'],
    contentTypes: ['详情页首屏', '主图文案', '卖点文案'],
    status: 'verified',
    version: 5,
    author: '电商组 Mia',
    updatedAt: '3 天前',
    usageCount: 73,
    tags: ['电商', '详情页', '首屏', '转化'],
    category: 'ecommerce',
    versions: [
      { version: 5, content: '...', changelog: '重新排序信息层级：场景 > 决策理由 > 参数', createdAt: '2026-05-23' },
      { version: 4, content: '...', changelog: '去掉技术参数为主的写法，改为用户视角', createdAt: '2026-05-12' },
      { version: 3, content: '...', changelog: '增加售后承诺板块', createdAt: '2026-04-25' },
      { version: 2, content: '...', changelog: '加入竞品差异对比框架', createdAt: '2026-04-10' },
      { version: 1, content: '...', changelog: '初始版本，标准详情页结构', createdAt: '2026-03-15' },
    ],
    effectNotes: [
      { date: '2026-05-20', content: '场景化首屏版本比参数堆砌版本停留时长提升约 30%。用户先看到使用场景，再看到参数时购买意愿更强。', author: '电商组 Mia' },
    ],
    riskWarnings: [
      '不能使用绝对化用语（最好、第一、全网最低）',
      '竞品对比需要用客观数据，不能贬低竞品',
      '功效类产品需要提供检测报告或资质',
    ],
    usageGuide: '填入 {product_name}、{use_scene}、{core_benefit}。建议首屏控制在 3-4 个信息模块，超过 5 个用户会跳过。',
  },
  {
    id: 'prompt-005',
    title: '客服追问回复｜用户只问不买',
    description: '适合私域、淘宝客服、小红书私信等场景。解决用户咨询后不下单的问题。核心：语气像真人，不要连续追问造成压力感。',
    scenario: '私域 / 淘宝客服 / 小红书私信',
    platforms: ['淘宝', '微信', '小红书'],
    contentTypes: ['客服回复', '追问话术', '私域转化'],
    status: 'private',
    version: 3,
    author: '客服主管 Ann',
    updatedAt: '5 天前',
    usageCount: 54,
    tags: ['客服', '追问', '私域', '转化'],
    category: 'service',
    versions: [
      { version: 3, content: '...', changelog: '降低追问频率，增加价值信息提供后再引导下单', createdAt: '2026-05-21' },
      { version: 2, content: '...', changelog: '移除过度热情表达，改为专业克制语气', createdAt: '2026-05-05' },
      { version: 1, content: '...', changelog: '初始版本，基础客服追问模板', createdAt: '2026-04-20' },
    ],
    effectNotes: [
      { date: '2026-05-21', content: 'v3 版本把追问间隔拉长后，客户反感率下降。核心是提供价值信息（搭配建议、优惠提醒）而非单纯催促。', author: '客服主管 Ann' },
    ],
    riskWarnings: [
      '不能连续发送超过 3 条追问消息',
      '不能使用"再不买就没了"等威胁性话术',
      '需要区分已读不回和未读两种情况',
    ],
    usageGuide: '填入 {customer_name}、{product_name}、{concern}（用户之前提到的顾虑）。每次追问间隔至少 4 小时，不要秒回追问。',
  },
  {
    id: 'prompt-006',
    title: '抖音标题测试框架｜测评类账号',
    description: '用于批量产出 A/B 测试标题。同一期内容出 5-8 个标题备选，按不同公式分类：数据型、悬念型、对比型、痛点型。',
    scenario: '测评类账号 / 知识分享 / 生活技巧',
    platforms: ['抖音'],
    contentTypes: ['标题测试', 'A/B 测试', '点击率优化'],
    status: 'verified',
    version: 6,
    author: '运营 Lisa',
    updatedAt: '1 周前',
    usageCount: 96,
    tags: ['标题', '抖音', '测试', '优化'],
    category: 'douyin',
    versions: [
      { version: 6, content: '...', changelog: '新增标题A/B测试记录板块，追踪每次的实际点击率', createdAt: '2026-05-19' },
      { version: 5, content: '...', changelog: '增加"什么是好的失败标题"分析，帮团队避坑', createdAt: '2026-05-08' },
      { version: 4, content: '...', changelog: '把公式从 3 种扩到 5 种，覆盖更多内容类型', createdAt: '2026-04-22' },
      { version: 3, content: '...', changelog: '加入标题字数控制建议（18-22 字最佳）', createdAt: '2026-04-10' },
      { version: 2, content: '...', changelog: '补充了反面案例，说明什么样的标题会翻车', createdAt: '2026-03-28' },
      { version: 1, content: '...', changelog: '初始版本，3 种基础公式', createdAt: '2026-03-10' },
    ],
    effectNotes: [
      { date: '2026-05-15', content: '用这个框架产出的标题，首轮测试中有 60% 优于直觉写的标题。数据型标题在测评类内容中表现最稳定。', author: '运营 Lisa' },
    ],
    riskWarnings: [
      '标题不能脱离视频内容，纯粹标题党的完播率反而低',
      '不要使用平台敏感词（例如"免费""白送""赚钱"）',
    ],
    usageGuide: '填入 {video_topic}、{content_type}。建议每次产出 5-8 个标题，前 3 天测试后保留 CTR 最高的 2 个。',
  },
  {
    id: 'prompt-007',
    title: '直播开场留人话术｜新号冷启动',
    description: '适合粉丝量 1 万以下的新号直播开场。核心不是卖货，而是用互动问题把人留下来。',
    scenario: '新号直播 / 冷启动 / 低在线人数',
    platforms: ['抖音', '快手'],
    contentTypes: ['开场话术', '留人互动', '新号策略'],
    status: 'testing',
    version: 3,
    author: '直播运营 Chen',
    updatedAt: '4 天前',
    usageCount: 38,
    tags: ['直播', '开场', '新号', '冷启动'],
    category: 'live',
    versions: [
      { version: 3, content: '...', changelog: '调整互动问题类型，从"扣1"改成更自然的提问方式', createdAt: '2026-05-22' },
      { version: 2, content: '...', changelog: '增加低在线人数下的应急话术变体', createdAt: '2026-05-08' },
      { version: 1, content: '...', changelog: '初始版本', createdAt: '2026-04-25' },
    ],
    effectNotes: [
      { date: '2026-05-22', content: '新号 100 人在线时用这套话术，平均停留时长从 45 秒提升到 1 分 20 秒。但 500+ 在线时效果衰减。', author: '直播运营 Chen' },
    ],
    riskWarnings: [
      '不要在新号直播时用大主播的逼单话术，节奏不匹配',
      '低在线人数时不要假装很多人，用户看得见在线数',
    ],
    usageGuide: '填入 {product_type}、{typical_problem}（目标用户常见痛点）。新号前 10 分钟以互动为主，不要急着上链接。',
  },
  {
    id: 'prompt-008',
    title: '私域朋友圈文案｜美妆护肤类',
    description: '用于微信私域朋友圈日常发布。核心是"像朋友在分享"而非"品牌在推送"。配合产品使用前后对比图效果更好。',
    scenario: '微信私域 / 朋友圈 / 社群同步',
    platforms: ['微信'],
    contentTypes: ['朋友圈文案', '私域运营', '日常种草'],
    status: 'draft',
    version: 1,
    author: '内容组 Jay',
    updatedAt: '1 周前',
    usageCount: 12,
    tags: ['私域', '朋友圈', '美妆', '护肤'],
    category: 'private-domain',
    versions: [
      { version: 1, content: '...', changelog: '初始草稿版本，待团队 Review', createdAt: '2026-05-19' },
    ],
    effectNotes: [],
    riskWarnings: [
      '朋友圈不能发硬广，会被折叠或降低权重',
      '不要每天发超过 3 条产品相关内容',
    ],
    usageGuide: '填入 {product_name}、{personal_experience}（个人使用感受）。配合一张真实使用图效果优于产品海报。',
  },
]

/* ── Prompt 内容（实际 prompt 文本） ── */

export const promptContents: Record<string, string> = {
  'prompt-001': `# 角色
你是一个美妆测评博主，你的粉丝信任你是因为你"说实话"。

# 任务
根据产品信息，写一个 30-60 秒的口播脚本，用于抖音/视频号发布。

# 输入
产品：{product_name}
核心卖点：{selling_points}
目标用户：{target_audience}
价格：{price}

# 脚本结构
## 0-3 秒：先把最打动你的那个卖点说出来
不要寒暄，不要自我介绍，直接说"这个东西我用了两周，最让我意外的是..."

## 3-15 秒：这个产品适合谁，不适合谁
诚实地说。不适合的人提前劝退，反而增加可信度。

## 15-40 秒：具体使用感受 + 效果展示
用你自己的话描述，不要念成分表。说"上脸的感觉像..."而不是"含有XX提取物"。

## 40-55 秒：价格对比
你买过类似的东西多少钱，这个多少钱。

## 55-60 秒：结尾引导
一句简单的引导关注或评论互动。不要太用力。

# 注意事项
- 不要用"姐妹们""家人们"过度
- 不要说"绝绝子""yyds"，用正常中文
- 如果有产品缺点，可以提，反而真实`,

  'prompt-004': `# 角色
电商文案策划，专注提升详情页首屏停留时长和转化率。

# 任务
为产品写详情页首屏文案。

# 输入
产品：{product_name}
使用场景：{use_scene}
核心利益点：{core_benefit}
技术参数（选填）：{specs}

# 信息层级（按此顺序排列）
1. 使用场景（用户看完能想象自己在用）
2. 决策理由（为什么选这个而不是别的）
3. 核心利益点（用户能得到什么）
4. 技术参数（放在最后，作为信任背书）

# 输出要求
- 首屏不超过 4 个信息模块
- 每段不超过 2 行手机屏幕
- 用短句，不用长从句
- 参数用表格，不要用段落`,

  'prompt-005': `# 角色
电商客服，目标是帮犹豫的用户下决策，而不是催他们下单。

# 任务
用户咨询后没有下单，24 小时内发一条追问消息。

# 输入
客户：{customer_name}
产品：{product_name}
用户之前提到的顾虑：{concern}

# 回复结构
1. 先提供一条有价值的信息（搭配建议/优惠提醒/使用 tip）
2. 自然地提到产品
3. 一句轻引导，不要用问号结尾

# 示例
"对了，上次你问的那款{product_name}，最近有个买家反馈说搭配{搭配建议}效果很好，分享给你参考～"

# 规则
- 不用"亲"，用"你"或客户名字
- 句子不超过 30 个字
- 不要连续追问，一次只说一件事`,
}
