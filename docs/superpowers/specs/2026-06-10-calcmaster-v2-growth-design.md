# CalcMaster V2 增长设计文档

**日期**: 2026-06-10
**版本**: v2.0
**目标**: 广告变现 × SEO 流量 × 快速 MVP

---

## 战略方针

| 维度 | 决策 |
|------|------|
| 商业模式 | 广告变现（Google AdSense） |
| 流量渠道 | 搜索引擎 SEO（自然搜索） |
| 开发节奏 | 快节奏 MVP，低成本高回报 |
| 成功指标 | 页面浏览量 ↑、用户停留时长 ↑、回访率 ↑ |

---

## P0：高流量计算器（5 个新工具）

**目标**: 通过新工具页面覆盖更多搜索关键词，增加 SEO 入口。

### 1. 百分比计算器 (`/calculators/percentage`)

**搜索关键词**: 百分比计算、百分比计算器、百分比怎么算、what is X% of Y

**功能**:
- "X 的 Y% 是多少" / "X 占 Y 的百分之几" / "百分比变化（从 A 到 B）"
- 实时计算，输入即出结果
- 显示计算步骤和公式（提升 SEO 内容深度）

### 2. 年龄计算器 (`/calculators/age`)

**搜索关键词**: 年龄计算器、年龄计算、周岁计算器

**功能**:
- 输入出生日期 → 精确显示：岁、月、天
- 额外显示：下一个生日倒计时、生肖、星座
- 农历年份对应（照顾中文用户）

### 3. 随机数生成器 (`/calculators/random-number`)

**搜索关键词**: 随机数生成器、随机数字、抽签、随机抽奖

**功能**:
- 设置范围（最小值/最大值）+ 生成数量
- 一键复制结果
- 可选：去重模式
- 传播性强，用户可能分享给朋友

### 4. 密码生成器 (`/dev-tools/password-generator`)

**搜索关键词**: 密码生成器、随机密码、强密码生成器

**功能**:
- 自定义长度（8-64 位）
- 选项：大写字母、小写字母、数字、特殊符号
- 实时显示密码强度
- 一键复制 + 自动排除易混淆字符（0/O, 1/l/I）

### 5. 颜色工具 (`/dev-tools/color-converter`)

**搜索关键词**: 颜色转换、RGB 转 HEX、颜色选择器

**功能**:
- RGB ↔ HEX ↔ HSL 互转
- 内嵌颜色选择器（input type="color"）
- 实时预览颜色
- 点击复制颜色值

### 技术实现

每个新工具遵循现有模式：
```
src/app/calculators/<slug>/page.tsx   — 页面入口 + metadata（SEO）
src/components/calculators/<Name>.tsx  — 客户端组件（'use client'）
src/lib/i18n/translations/calculators.ts — 中英文翻译
```

- SEO: 每个工具有独立的 title/description/keywords
- 结构化数据: 添加 FAQ 或 HowTo schema
- 遵循现有 `PageLayout` 和 `Card` 组件模式

---

## P1：用户留存（3 个功能）

**目标**: 提升用户停留时长和回访率。

### 1. 首页搜索框

**位置**: 首页 Hero 区域下方，三个工具分类上方

**功能**:
- 实时过滤：输入即匹配工具名称
- 匹配关键词高亮
- 支持中英文搜索
- 键盘快捷键：`Ctrl+K` / `Cmd+K` 打开搜索

**技术**: 纯前端，基于当前页面的工具列表进行过滤，无需后端

### 2. 「最近使用」记录

**实现**: `localStorage` 存储最近使用的 5 个工具

**触发**: 用户进入任一工具页面时自动记录

**展示**: 首页搜索栏下方出现「最近使用」区域（仅在有记录时显示）

**数据结构**:
```ts
interface RecentTool {
  href: string;       // 工具路径
  title: string;      // 工具名称（当前语言）
  usedAt: number;     // 时间戳
}
```

### 3. 工具收藏

**位置**: 每个工具页面标题右侧 ⭐ 图标

**实现**: `localStorage` 存储收藏列表

**展示**: 首页「我的收藏」区域（仅在有收藏时显示，排在最近使用后面）

### localStorage Key 设计

```
calc-master:recent-tools   → RecentTool[]
calc-master:favorites      → string[] (href list)
```

---

## P2：数据驱动（2 项）

**目标**: 用数据指导后续迭代决策。

### 1. Umami 统计分析

**选择理由**:
- 开源免费，可自部署（一个 Docker 容器）
- 轻量（脚本 < 2KB，不影响页面加载速度）
- 隐私友好（不需要 Cookie 横幅）
- 提供单页分析：每个工具页的 PV、停留时长、来源

**集成方式**:
- 在 `layout.tsx` 中添加 Umami 脚本
- 通过 `NEXT_PUBLIC_UMAMI_WEBSITE_ID` 环境变量配置
- 自部署在同一个 VPS 上（额外容器）

### 2. 结构化数据 JSON-LD

**实现**: 每个工具页面添加 `WebApplication` 或 `HowTo` schema

**效果**: Google 搜索结果中显示富文本摘要（星级、步骤等），提高点击率

**示例**:
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "百分比计算器",
  "url": "https://calcmasters.org/calculators/percentage",
  "description": "免费的在线百分比计算器，支持百分比计算、占比计算、百分比变化计算",
  "applicationCategory": "Calculator",
  "operatingSystem": "All"
}
```

---

## 完整文件变更清单

### 新文件 (P0)
```
src/app/calculators/percentage/page.tsx
src/components/calculators/PercentageCalculator.tsx
src/app/calculators/age/page.tsx
src/components/calculators/AgeCalculator.tsx
src/app/calculators/random-number/page.tsx
src/components/calculators/RandomNumberGenerator.tsx
src/app/dev-tools/password-generator/page.tsx
src/components/dev-tools/PasswordGenerator.tsx
src/app/dev-tools/color-converter/page.tsx
src/components/dev-tools/ColorConverter.tsx
```

### 修改文件 (P0)
```
src/app/HomeClient.tsx                              — 添加新工具到对应分类
src/lib/i18n/translations/calculators.ts            — 百分比/年龄/随机数翻译
src/lib/i18n/translations/devTools.ts               — 密码生成器/颜色工具翻译
```

### 修改文件 (P1)
```
src/components/Header.tsx                           — 可能添加搜索入口
src/app/HomeClient.tsx                              — 搜索框 + 最近使用 + 收藏
src/hooks/useRecentTools.ts                         — 新：最近使用 hook
src/hooks/useFavorites.ts                           — 新：收藏 hook
src/components/SearchBox.tsx                        — 新：搜索框组件
```

### 修改文件 (P2)
```
src/app/layout.tsx                                  — 添加 Umami 脚本
src/app/calculators/*/page.tsx                      — 添加 JSON-LD schema
src/app/converters/*/page.tsx                       — 添加 JSON-LD schema
src/app/dev-tools/*/page.tsx                        — 添加 JSON-LD schema
docker-compose.yml                                  — 添加 Umami 容器
```

---

## 实施顺序

| 阶段 | 内容 | 预估时间 | 依赖 |
|------|------|----------|------|
| P0 | 5 个新计算器 | 2-3 天 | 无 |
| P1 | 搜索 + 最近使用 + 收藏 | 1 天 | P0 完成（首页结构确定后） |
| P2 | Umami + 结构化数据 | 0.5 天 | 无 |

> **建议**: P0 和 P2 可以并行（不同文件），P1 在 P0 之后做。

---

## 成功指标

上线后通过 Umami 对比数据：
- 新工具页面的日均 PV
- 全局平均停留时长变化
- 回访用户比例
- 各工具页广告点击率
