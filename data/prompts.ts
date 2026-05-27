export interface PromptVersion {
  version: number
  content: string
  changelog: string
  createdAt: string
  metrics?: {
    label: string
    value: string
  }
}

export interface Prompt {
  id: string
  title: string
  description: string
  category: 'douyin' | 'xiaohongshu' | 'ecommerce' | 'service' | 'live'
  tags: string[]
  author: string
  createdAt: string
  updatedAt: string
  versions: PromptVersion[]
  stats: {
    copies: number
    likes: number
  }
  model: string
}

export const categories = [
  { id: 'douyin', name: '抖音短视频', color: 'douyin', icon: '🎵' },
  { id: 'xiaohongshu', name: '小红书', color: 'xiaohongshu', icon: '📕' },
  { id: 'ecommerce', name: '电商文案', color: 'ecommerce', icon: '🛒' },
  { id: 'service', name: '客服话术', color: 'service', icon: '💬' },
  { id: 'live', name: '直播带货', color: 'live', icon: '📺' },
] as const

export const prompts: Prompt[] = [
  {
    id: 'douyin-script-viral',
    title: '抖音爆款短视频脚本生成器',
    description: '一键生成带货类短视频脚本，包含黄金3秒开头、产品卖点、信任背书、转化话术，适配抖音算法推荐机制。',
    category: 'douyin',
    tags: ['短视频', '带货', '脚本', '爆款'],
    author: '运营老张',
    createdAt: '2025-11-15',
    updatedAt: '2026-05-20',
    model: 'GPT-4 / Claude',
    stats: { copies: 3842, likes: 256 },
    versions: [
      {
        version: 3,
        content: `# 角色
你是一个资深抖音带货短视频编导，擅长打造爆款带货视频。你深谙抖音算法推荐机制，擅长用前3秒抓住用户注意力。

# 任务
根据我提供的产品信息，生成一个完整的60秒带货短视频脚本。

# 输入信息
产品名称：{product_name}
核心卖点：{selling_points}
目标人群：{target_audience}
价格：{price}
使用场景：{use_scene}

# 脚本结构
## 【0-3秒】黄金开头（钩子）
- 痛点共鸣型 / 反常识型 / 效果对比型（三选一）
- 必须有强烈的情绪冲突或认知反差

## 【3-15秒】产品展示
- 实物/效果展示，突出核心卖点
- 用"你"而不是"大家"，营造一对一对话感

## 【15-40秒】使用教程+信任背书
- 演示使用过程，展示解决痛点的过程
- 植入信任信号：销量数据、用户反馈、检测报告

## 【40-55秒】价格锚点+限时优惠
- 先报原价或市场价，再报直播间价
- "这个价格只准备了多少单"制造稀缺感

## 【55-60秒】强转化收尾
- 清晰的行动指令："左下角点进去"
- "拼手速"等紧迫感话术

# 输出要求
- 每个时间段标注秒数
- 画面描述+口播文案分开
- 加入情绪提示（语速、语气）
- 口播文案口语化，杜绝书面语`,
        changelog: '新增使用场景字段；优化黄金开头三选一策略；口红播文案加入情绪提示',
        createdAt: '2026-05-20',
        metrics: { label: '平均完播率', value: '42%' },
      },
      {
        version: 2,
        content: `# 角色：抖音带货短视频编导

# 任务
根据产品信息生成60秒带货短视频脚本。

# 输入
- 产品：{product_name}
- 卖点：{selling_points}
- 人群：{target_audience}
- 价格：{price}

# 脚本结构
【0-3秒】痛点/好奇开头
【3-15秒】产品卖点展示
【15-40秒】使用演示
【40-55秒】价格对比
【55-60秒】引导下单

# 输出：画面描述 + 口播文案，标注秒数`,
        changelog: '简化脚本结构；移除信任背书模块；去掉情绪提示',
        createdAt: '2026-03-10',
      },
      {
        version: 1,
        content: `你是一个抖音带货博主，帮我写一个带货视频脚本。
产品：{product_name}
卖点：{selling_points}
价格：{price}
要能火的那种。`,
        changelog: '初始版本 - 简单指令',
        createdAt: '2025-11-15',
        metrics: { label: '平均完播率', value: '18%' },
      },
    ],
  },
  {
    id: 'xhs-note-generator',
    title: '小红书爆款笔记生成器',
    description: '根据产品/话题自动生成小红书笔记，包含标题公式、正文结构、emoji排版、话题标签策略。符合小红书流量分发逻辑。',
    category: 'xiaohongshu',
    tags: ['小红书', '种草', '文案', '排版'],
    author: '内容组长 Lisa',
    createdAt: '2025-12-01',
    updatedAt: '2026-05-25',
    model: 'GPT-4 / Claude',
    stats: { copies: 5621, likes: 389 },
    versions: [
      {
        version: 4,
        content: `# 角色
你是小红书资深内容运营，熟悉小红书社区规范和流量分发机制。你擅长用"利他性内容"获得高互动和高收藏。

# 任务
根据产品/话题信息，生成一篇高转化的小红书笔记。

# 输入信息
产品/话题：{topic}
核心亮点：{highlights}
目标用户：{target_user}
使用场景/效果：{scene_result}
竞品对比优势（可选）：{competitor_advantage}

# 标题生成（提供3个备选）
遵循公式：「目标人群 + 痛点/效果 + 解决方案 + 情绪词」
示例：敏感肌姐妹求你看！这个修护霜让我素颜敢出门了😭

# 正文结构
## 开头（2-3句）
- 痛点共鸣或结果先行
- 用"谁懂啊""救命"等小红书高互动句式

## 中段（分点展开）
- 3-4个要点，每个用emoji开头
- 要点类型：成分解析、使用感受、效果对比、使用方法
- 每个要点2-3句，保持段落短小

## 结尾
- 总结推荐理由
- 互动引导："你们还有什么好用的推荐吗？"
- 评论区置顶话术建议

# 排版要求
- 每段不超过3行
- 善用emoji分段（📌 ✨ 💡 🔥 ✅）
- 关键词加粗或用【】标注
- 保持"碎碎念"的亲切感

# 标签策略（输出3组）
- 1-2个大流量标签（如 #护肤 #穿搭）
- 2-3个精准标签（如 #敏感肌护肤 #修护霜推荐）
- 1-2个长尾标签（如 #干皮换季救命面霜）

# 发布建议
- 最佳发布时间段
- 首图建议`,
        changelog: '新增标题公式和3个备选标题；加入发布建议模块；优化标签分组策略；添加竞品对比字段',
        createdAt: '2026-05-25',
        metrics: { label: '平均互动率', value: '5.8%' },
      },
      {
        version: 3,
        content: `# 角色：小红书内容运营

# 任务
根据产品信息生成小红书种草笔记。

# 输入
- 话题：{topic}
- 亮点：{highlights}
- 用户：{target_user}
- 场景：{scene_result}

# 输出
1. 标题（3个备选）
2. 正文（开头+分点+结尾）
3. 推荐标签（5-8个）
4. emoji排版风格`,
        changelog: '简化结构，去掉细分模块；版本2到3的大幅精简',
        createdAt: '2026-03-20',
      },
      {
        version: 2,
        content: `写一篇小红书种草笔记。
产品：{topic}
亮点：{highlights}

要火的那种，加emoji，加话题标签。`,
        changelog: '从v1简单指令扩展为基础小红书格式',
        createdAt: '2026-01-15',
      },
      {
        version: 1,
        content: `帮我写一篇小红书笔记推广{topic}`,
        changelog: '初始版本',
        createdAt: '2025-12-01',
        metrics: { label: '平均互动率', value: '1.2%' },
      },
    ],
  },
  {
    id: 'ecommerce-detail-page',
    title: '电商详情页文案生成器',
    description: '输入产品信息，自动生成淘宝/天猫/拼多多详情页全套文案：主图文案、卖点提炼、规格参数、痛点解决方案、信任背书。',
    category: 'ecommerce',
    tags: ['电商', '详情页', '淘宝', '拼多多'],
    author: '运营老张',
    createdAt: '2026-01-10',
    updatedAt: '2026-05-18',
    model: 'GPT-4 / Claude',
    stats: { copies: 2187, likes: 178 },
    versions: [
      {
        version: 2,
        content: `# 角色：电商资深文案策划
你有8年淘宝/天猫详情页文案经验，擅长把产品功能翻译成用户利益点。

# 输入
产品名称：{product_name}
品类：{category}
核心参数：{specs}
目标用户：{target_user}
价格区间：{price_range}
竞品劣势：{competitor_weakness}

# 输出模块

## 1. 主图文案（5张主图文案）
- 第1张：核心卖点+促销信息（不超过10个字）
- 第2张：痛点场景（用户现状）
- 第3张：产品解决方案
- 第4张：效果/数据证明
- 第5张：信任背书/售后承诺

## 2. 卖点提炼（3个核心卖点）
每个卖点格式：卖点标题 + 一句话解释 + 用户利益

## 3. 痛点-解决方案模块
3组「用户痛点 → 产品如何解决 → 最终效果」

## 4. 详情页文案
- 品牌故事（2-3句）
- 产品参数表（表格格式）
- 使用场景（3个场景x1句话）
- 常见问题QA（5组）
- 售后保障

## 5. 评论区引导话术
3条引导好评的话术模板

# 风格要求
- 淘宝风格：直接、卖点前置、促销感强
- 可用感叹号、数字强化说服力`,
        changelog: 'v2: 加入竞品劣势字段；新增评论区引导；优化主图文案结构',
        createdAt: '2026-05-18',
        metrics: { label: '平均转化率', value: '3.2%' },
      },
      {
        version: 1,
        content: `写一个{product_name}的电商详情页文案，品类是{category}，卖点是{selling_points}。要能提高转化率的。`,
        changelog: '初始版本',
        createdAt: '2026-01-10',
        metrics: { label: '平均转化率', value: '1.5%' },
      },
    ],
  },
  {
    id: 'customer-service-reply',
    title: '高情商客服回复模板',
    description: '电商客服万能回复公式。处理差评、砍价、催发货、退货退款等高频场景。让客服回复既专业又有温度。',
    category: 'service',
    tags: ['客服', '话术', '差评', '售后'],
    author: '客服主管小王',
    createdAt: '2026-02-20',
    updatedAt: '2026-05-22',
    model: 'GPT-4 / Claude',
    stats: { copies: 4203, likes: 312 },
    versions: [
      {
        version: 3,
        content: `# 角色
你是一名金牌电商客服，有5年淘宝/拼多多客服经验，客户满意度评分4.9。你擅长用共情+解决方案化解客户情绪。

# 任务
根据场景类型和客户消息，生成高情商回复话术。

# 输入
场景类型：{scenario_type}
客户消息：{customer_message}
客户等级：{customer_level}
订单信息：{order_info}
店铺风格：{shop_style}

# 场景类型及回复框架

## 差评挽回
1. 真诚道歉（具体到问题，不说"抱歉给你带来不便"这种模板）
2. 承认问题（不推卸责任）
3. 给出具体解决方案（补偿+改进）
4. 私域引导（引导加微信给专属福利）

## 砍价
1. 表示理解（共情预算有限的处境）
2. 强调品质/服务价值（不直接降价）
3. 给出可替代的小让步（赠品/优惠券/凑单建议）
4. 制造紧迫感（库存不多/活动即将结束）

## 催发货
1. 第一时间确认订单（让客户感到被重视）
2. 解释原因（具体、诚实）
3. 给出明确时间节点
4. 超额补偿（小赠品/优先发货）

## 退货退款
1. 先认可客户感受
2. 了解具体原因（不急着说规则）
3. 提供替代方案（换货/部分退款/优惠券）
4. 爽快处理（降低客户退出门槛=减少差评）

# 输出格式
- 【安抚话术】1-2句
- 【解决方案】具体操作
- 【收尾话术】关系升温
- 【敏感词提醒】避免踩雷的词

# 语气指南
- {shop_style}风格适配
- 避免"亲"过度使用，用"您"
- 感叹号不超过每句1个
- 不用"哦""呢"等轻浮语气词`,
        changelog: '新增客户等级和店铺风格参数；加入敏感词提醒；优化四种场景的回复框架细节',
        createdAt: '2026-05-22',
        metrics: { label: '好评转化率', value: '78%' },
      },
      {
        version: 2,
        content: `# 角色：电商客服专家

# 任务
根据客户消息生成客服回复。

# 输入
场景：{scenario_type}（差评/砍价/催发货/退货）
客户消息：{customer_message}
订单：{order_info}

# 输出
- 安抚话术
- 解决方案
- 收尾话术`,
        changelog: 'v2: 简化为四种核心场景，结构更清晰',
        createdAt: '2026-04-10',
      },
      {
        version: 1,
        content: `帮我用客服口吻回复这个客户：{customer_message}`,
        changelog: '初始版本',
        createdAt: '2026-02-20',
        metrics: { label: '好评转化率', value: '52%' },
      },
    ],
  },
  {
    id: 'live-script-template',
    title: '直播带货话术全流程',
    description: '完整的直播间话术模板：开场留人、产品讲解、逼单转化、下播收尾。适配抖音/快手直播间节奏。',
    category: 'live',
    tags: ['直播', '带货', '话术', '转化'],
    author: '直播运营阿杰',
    createdAt: '2026-03-05',
    updatedAt: '2026-05-24',
    model: 'GPT-4 / Claude',
    stats: { copies: 3156, likes: 203 },
    versions: [
      {
        version: 2,
        content: `# 角色
你是月销千万的抖音直播间操盘手，擅长用话术节奏带动直播间转化。

# 输入
产品：{product_name}
价格：{price}
原价：{original_price}
库存：{stock}
核心卖点：{selling_points}
赠品：{gifts}

# 话术全流程

## 【开场留人】（前3分钟）
"刚进来的宝宝不要走！今天这个品我们只播20分钟——"
- 用稀缺感留人
- 抛出悬念问题
- 让观众扣"1"互动拉停留

## 【产品引入】（3-5分钟）
"有多少宝宝被{痛点}困扰过的？扣个1我看看"
- 痛点共鸣
- 引出产品
- 建立需求认知

## 【产品讲解】（5-15分钟）
### 讲卖点（每个卖点2-3分钟）
"来看这个{卖点}，我给你们演示一下——"
- 实物演示 > 口播描述
- 每个卖点配合一个使用场景
- 弹幕互动确认"看到效果的扣666"

### 讲价格（3分钟）
"这个品平时我们卖{original_price}，今天直播间——"
- 先报原价锚定
- 今天机制解密
- 加上赠品拉高价值感
- "就这个机制，你们说划不划算？"

## 【逼单转化】（5分钟）
"就{stock}单，我数一下还剩多少——"
- 倒计时+实时库存播报
- "没付款的抓紧，30秒后踢库存"
- "买了的回来打'已拍'，我给你们看下一个品"

## 【下播收尾】（2分钟）
- 感谢今天下单的粉丝
- 预告明天产品
- 引导关注、粉丝群

# 输出
- 完整话术逐字稿
- 互动节点标记
- 情绪/语速提示`,
        changelog: 'v2: 细化每个环节的时间分配；加入互动节点标记；赠品价值塑造策略',
        createdAt: '2026-05-24',
        metrics: { label: '平均GPM', value: '¥2,350' },
      },
      {
        version: 1,
        content: `帮我写一个{product_name}的直播话术，价格是{price}，卖点是{selling_points}。要有开场、讲品、逼单。`,
        changelog: '初始版本',
        createdAt: '2026-03-05',
        metrics: { label: '平均GPM', value: '¥980' },
      },
    ],
  },
  {
    id: 'douyin-title-optimizer',
    title: '抖音标题优化器',
    description: '输入视频主题，生成10个高点击率标题备选。基于抖音标题公式库：数字型、悬念型、对比型、情绪型、恐吓型。',
    category: 'douyin',
    tags: ['标题', '抖音', '点击率', '优化'],
    author: '运营老张',
    createdAt: '2026-04-01',
    updatedAt: '2026-05-26',
    model: 'GPT-4 / Claude',
    stats: { copies: 1987, likes: 145 },
    versions: [
      {
        version: 2,
        content: `# 角色
抖音标题优化师，专注提升视频点击率。你了解抖音推荐算法中标题权重，知道什么样的标题会被打上"高点击"标签。

# 任务
根据视频主题生成10个高点击率标题备选。

# 输入
视频主题：{video_topic}
视频类型：{video_type}（口播/剧情/测评/Vlog/教程）
目标人群：{target_audience}

# 标题公式（每种生成2个）

1. **数字型**："X个方法/步骤/技巧 + 效果承诺"
   例：3个动作，7天消除副乳

2. **悬念型**："结果/发现 + 原因你绝对想不到"
   例：用了3年的洗面奶，成分表第一居然是它

3. **对比型**："A vs B + 结果出人意料"
   例：同样100块，拼多多 vs 淘宝买到的差别

4. **情绪型**："强烈情绪 + 事件 + 感叹"
   例：气哭了！退货率90%的产品居然还在卖

5. **恐吓型**："错误行为 + 严重后果 + 赶紧改"
   例：还在这样洗脸？皮肤科医生说你每天都在毁脸

# 输出
10个标题，标注公式类型和预估点击率（高/中），按预估点击率排序`,
        changelog: 'v2: 新增视频类型参数；加入预估点击率标注和排序',
        createdAt: '2026-05-26',
        metrics: { label: '平均CTR', value: '8.5%' },
      },
      {
        version: 1,
        content: `帮我写10个关于{video_topic}的抖音标题，要吸引人点击。`,
        changelog: '初始版本',
        createdAt: '2026-04-01',
        metrics: { label: '平均CTR', value: '4.1%' },
      },
    ],
  },
]
