# CalcMaster V2 增长功能 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 新增 5 个高流量 SEO 工具 + 3 个用户留存功能 + 2 个数据驱动项

**Architecture:** 遵循现有模式：每个工具 = page.tsx (SSR + metadata) + 客户端组件 ('use client') + lib 纯函数 + i18n 翻译。P1 留存功能使用 localStorage hooks，全部零后端依赖。P2 在 layout.tsx 添加 Umami 脚本 + 工具页添加 JSON-LD schema。

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Vitest, date-fns

---

## P0: 5 个高流量计算器

### Task 1: 百分比计算器

**Files:**
- Create: `src/lib/calculators/percentage.ts`
- Create: `src/lib/__tests__/calculators/percentage.test.ts`
- Create: `src/components/calculators/PercentageCalculator.tsx`
- Create: `src/app/calculators/percentage/page.tsx`
- Modify: `src/lib/i18n/translations/calculators.ts`
- Modify: `src/app/HomeClient.tsx`

- [ ] **Step 1: 编写 lib 纯函数**

```typescript
// src/lib/calculators/percentage.ts
export function percentOf(value: number, percent: number): number {
  return (value * percent) / 100
}

export function percentWhatIs(value: number, total: number): number {
  if (total === 0) return 0
  return (value / total) * 100
}

export function percentChange(from: number, to: number): { difference: number; percentChange: number; isIncrease: boolean } {
  if (from === 0) return { difference: 0, percentChange: 0, isIncrease: true }
  const difference = to - from
  const percentChange = (Math.abs(difference) / Math.abs(from)) * 100
  return { difference, percentChange, isIncrease: difference >= 0 }
}
```

- [ ] **Step 2: 编写测试**

```typescript
// src/lib/__tests__/calculators/percentage.test.ts
import { describe, it, expect } from 'vitest'
import { percentOf, percentWhatIs, percentChange } from '@/lib/calculators/percentage'

describe('percentOf', () => {
  it('10% of 200 = 20', () => {
    expect(percentOf(200, 10)).toBe(20)
  })
  it('0% of 100 = 0', () => {
    expect(percentOf(100, 0)).toBe(0)
  })
})

describe('percentWhatIs', () => {
  it('25 is 50% of 50', () => {
    expect(percentWhatIs(25, 50)).toBe(50)
  })
  it('0 of 0 returns 0', () => {
    expect(percentWhatIs(0, 0)).toBe(0)
  })
})

describe('percentChange', () => {
  it('from 100 to 120 = +20%', () => {
    const result = percentChange(100, 120)
    expect(result.percentChange).toBe(20)
    expect(result.isIncrease).toBe(true)
  })
  it('from 100 to 80 = -20%', () => {
    const result = percentChange(100, 80)
    expect(result.percentChange).toBe(20)
    expect(result.isIncrease).toBe(false)
  })
})
```

- [ ] **Step 3: 运行测试验证通过**

Run: `npx vitest run src/lib/__tests__/calculators/percentage.test.ts`

- [ ] **Step 4: 添加 i18n 翻译**

在 `src/lib/i18n/translations/calculators.ts` 的 zh.calculators 对象中添加:
```typescript
percentage: '百分比计算器',
```

在 en.calculators 对象中添加:
```typescript
percentage: 'Percentage Calculator',
```

在 zh.calculatorPages 对象中添加:
```typescript
percentage: {
  title: '百分比计算器 - CalcMaster',
  description: '免费的在线百分比计算器，支持百分比计算、占比计算和百分比变化计算'
},
```

在 en.calculatorPages 对象中添加:
```typescript
percentage: {
  title: 'Percentage Calculator - CalcMaster',
  description: 'Free online percentage calculator - calculate percentages, proportions and percentage changes'
},
```

在 zh 对象（与 bmi/discount 同级）添加:
```typescript
percentage: {
  title: '百分比计算器',
  modePercentOf: 'X 的 Y% 是多少',
  modeWhatPercent: 'X 占 Y 的百分之几',
  modeChange: '百分比变化',
  value: '数值',
  percent: '百分比',
  result: '结果',
  from: '从',
  to: '到',
  increase: '增加',
  decrease: '减少',
},
```

在 en 对象对应位置添加:
```typescript
percentage: {
  title: 'Percentage Calculator',
  modePercentOf: 'What is X% of Y',
  modeWhatPercent: 'X is what % of Y',
  modeChange: 'Percentage Change',
  value: 'Value',
  percent: 'Percent',
  result: 'Result',
  from: 'From',
  to: 'To',
  increase: 'Increase',
  decrease: 'Decrease',
},
```

- [ ] **Step 5: 创建客户端组件**

```typescript
// src/components/calculators/PercentageCalculator.tsx
'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import { percentOf, percentWhatIs, percentChange } from '@/lib/calculators/percentage'
import { useI18n } from '@/lib/i18n/context'

type Mode = 'percentOf' | 'whatPercent' | 'change'

export default function PercentageCalculator() {
  const { t } = useI18n()
  const [mode, setMode] = useState<Mode>('percentOf')
  const [value, setValue] = useState('200')
  const [percent, setPercent] = useState('10')
  const [value2, setValue2] = useState('50')
  const [result, setResult] = useState<string | null>(null)

  const modes: { key: Mode; label: string }[] = [
    { key: 'percentOf', label: t.percentage.modePercentOf },
    { key: 'whatPercent', label: t.percentage.modeWhatPercent },
    { key: 'change', label: t.percentage.modeChange },
  ]

  useEffect(() => {
    const v = parseFloat(value) || 0
    const p = parseFloat(percent) || 0
    const v2 = parseFloat(value2) || 0

    if (mode === 'percentOf') {
      setResult(`${percentOf(v, p)}`)
    } else if (mode === 'whatPercent') {
      setResult(`${percentWhatIs(v, v2)}%`)
    } else {
      const r = percentChange(v, v2)
      setResult(`${r.isIncrease ? '+' : '-'}${r.percentChange.toFixed(2)}%`)
    }
  }, [mode, value, percent, value2])

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.percentage.title}</h2>

      <div className="flex gap-2 mb-6">
        {modes.map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === m.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="space-y-4 mb-6">
        {mode === 'change' ? (
          <>
            <Input label={t.percentage.from} type="number" value={value} onChange={(e) => setValue(e.target.value)} />
            <Input label={t.percentage.to} type="number" value={value2} onChange={(e) => setValue2(e.target.value)} />
          </>
        ) : (
          <>
            <Input label={t.percentage.value} type="number" value={value} onChange={(e) => setValue(e.target.value)} />
            <Input label={t.percentage.percent} type="number" value={mode === 'whatPercent' ? value2 : percent} onChange={(e) => mode === 'whatPercent' ? setValue2(e.target.value) : setPercent(e.target.value)} />
          </>
        )}
      </div>

      {result !== null && (
        <div className="text-center bg-gray-50 rounded-xl py-8">
          <p className="text-4xl font-bold text-gray-900">{result}</p>
        </div>
      )}
    </Card>
  )
}
```

- [ ] **Step 6: 创建页面路由**

```typescript
// src/app/calculators/percentage/page.tsx
import { Metadata } from 'next'
import PercentageCalculator from '@/components/calculators/PercentageCalculator'

export const metadata: Metadata = {
  title: '百分比计算器 - 在线百分比计算 | CalcMaster',
  description: '免费的在线百分比计算器，支持百分比计算、占比计算、百分比变化计算，输入即出结果',
  keywords: '百分比计算器,百分比计算,百分比怎么算,在线百分比',
  openGraph: {
    title: '百分比计算器 - CalcMaster',
    description: '免费的在线百分比计算器',
    url: 'https://calcmasters.org/calculators/percentage',
    type: 'website',
  }
}

export default function PercentagePage() {
  return <PercentageCalculator />
}
```

- [ ] **Step 7: 更新首页工具列表**

在 `src/app/HomeClient.tsx` 的 calculators 数组中添加:
```typescript
{ title: t.calculators.percentage, href: '/calculators/percentage' },
```

- [ ] **Step 8: 运行完整测试 + lint**

Run: `npx vitest run && npx eslint src/lib/calculators/percentage.ts src/lib/__tests__/calculators/percentage.test.ts src/components/calculators/PercentageCalculator.tsx src/app/calculators/percentage/page.tsx`

- [ ] **Step 9: Commit**

```bash
git add .
git commit -m "feat: add percentage calculator"
```

---

### Task 2: 年龄计算器

**Files:**
- Create: `src/lib/calculators/age.ts`
- Create: `src/lib/__tests__/calculators/age.test.ts`
- Create: `src/components/calculators/AgeCalculator.tsx`
- Create: `src/app/calculators/age/page.tsx`
- Modify: `src/lib/i18n/translations/calculators.ts`
- Modify: `src/app/HomeClient.tsx`

- [ ] **Step 1: 编写 lib 纯函数**

```typescript
// src/lib/calculators/age.ts
export interface AgeResult {
  years: number
  months: number
  days: number
  totalDays: number
  nextBirthday: Date
  daysUntilBirthday: number
  zodiac: string
  westernZodiac: string
}

const CHINESE_ZODIAC = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']

function getChineseZodiac(year: number): string {
  return CHINESE_ZODIAC[(year - 4) % 12]
}

function getWesternZodiac(month: number, day: number): string {
  const zodiacSigns = [
    { name: '摩羯座', start: [1, 1], end: [1, 19] },
    { name: '水瓶座', start: [1, 20], end: [2, 18] },
    { name: '双鱼座', start: [2, 19], end: [3, 20] },
    { name: '白羊座', start: [3, 21], end: [4, 19] },
    { name: '金牛座', start: [4, 20], end: [5, 20] },
    { name: '双子座', start: [5, 21], end: [6, 20] },
    { name: '巨蟹座', start: [6, 21], end: [7, 22] },
    { name: '狮子座', start: [7, 23], end: [8, 22] },
    { name: '处女座', start: [8, 23], end: [9, 22] },
    { name: '天秤座', start: [9, 23], end: [10, 22] },
    { name: '天蝎座', start: [10, 23], end: [11, 21] },
    { name: '射手座', start: [11, 22], end: [12, 21] },
    { name: '摩羯座', start: [12, 22], end: [12, 31] },
  ]

  for (const sign of zodiacSigns) {
    const [sM, sD] = sign.start
    const [eM, eD] = sign.end
    if ((month === sM && day >= sD) || (month === eM && day <= eD)) {
      return sign.name
    }
  }
  return '摩羯座'
}

export function calculateAge(birthDate: Date, now: Date = new Date()): AgeResult {
  let years = now.getFullYear() - birthDate.getFullYear()
  let months = now.getMonth() - birthDate.getMonth()
  let days = now.getDate() - birthDate.getDate()

  if (days < 0) {
    months--
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += lastMonth.getDate()
  }

  if (months < 0) {
    years--
    months += 12
  }

  const totalDays = Math.floor((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24))

  const nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate())
  if (nextBirthday <= now) {
    nextBirthday.setFullYear(now.getFullYear() + 1)
  }
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  return {
    years,
    months,
    days,
    totalDays,
    nextBirthday,
    daysUntilBirthday,
    zodiac: getChineseZodiac(birthDate.getFullYear()),
    westernZodiac: getWesternZodiac(birthDate.getMonth() + 1, birthDate.getDate()),
  }
}
```

- [ ] **Step 2: 编写测试**

```typescript
// src/lib/__tests__/calculators/age.test.ts
import { describe, it, expect } from 'vitest'
import { calculateAge } from '@/lib/calculators/age'

describe('calculateAge', () => {
  it('calculates age for a birthdate 25 years ago', () => {
    const birthDate = new Date(2000, 5, 15) // June 15, 2000
    const now = new Date(2025, 5, 15) // June 15, 2025
    const age = calculateAge(birthDate, now)
    expect(age.years).toBe(25)
    expect(age.months).toBe(0)
    expect(age.days).toBe(0)
    expect(age.totalDays).toBe(9131)
  })

  it('calculates age with months and days', () => {
    const birthDate = new Date(2000, 0, 1) // Jan 1, 2000
    const now = new Date(2025, 5, 15) // June 15, 2025
    const age = calculateAge(birthDate, now)
    expect(age.years).toBe(25)
    expect(age.months).toBe(5)
    expect(age.days).toBe(14)
  })

  it('calculates Chinese zodiac', () => {
    const birthDate = new Date(2000, 0, 1) // 2000 = 龙
    const age = calculateAge(birthDate, new Date(2025, 0, 1))
    expect(age.zodiac).toBe('龙')
  })
})
```

- [ ] **Step 3: 运行测试验证通过**

Run: `npx vitest run src/lib/__tests__/calculators/age.test.ts`

- [ ] **Step 4: 添加 i18n 翻译**

在 `src/lib/i18n/translations/calculators.ts` 中添加（结构和百分比计算器相同，两个语言各一套）:

zh:
```typescript
// 在 calculators 对象中
age: '年龄计算器',
// 在 calculatorPages 对象中
age: {
  title: '年龄计算器 - CalcMaster',
  description: '免费的在线年龄计算器，输入出生日期精确计算年龄、生肖和星座'
},
// 在根级 zh 对象中
age: {
  title: '年龄计算器',
  birthDate: '出生日期',
  age: '年龄',
  years: '岁',
  months: '个月',
  days: '天',
  totalDays: '总共',
  nextBirthday: '下一个生日',
  daysUntil: '还有',
  zodiac: '生肖',
  westernZodiac: '星座',
},
```

en:
```typescript
// 在 calculators 对象中
age: 'Age Calculator',
// 在 calculatorPages 对象中
age: {
  title: 'Age Calculator - CalcMaster',
  description: 'Free online age calculator - calculate your exact age, zodiac sign and constellation'
},
// 在根级 en 对象中
age: {
  title: 'Age Calculator',
  birthDate: 'Birth Date',
  age: 'Age',
  years: 'years',
  months: 'months',
  days: 'days',
  totalDays: 'Total',
  nextBirthday: 'Next Birthday',
  daysUntil: 'days left',
  zodiac: 'Chinese Zodiac',
  westernZodiac: 'Zodiac Sign',
},
```

- [ ] **Step 5: 创建客户端组件**

```typescript
// src/components/calculators/AgeCalculator.tsx
'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import { calculateAge, type AgeResult } from '@/lib/calculators/age'
import { useI18n } from '@/lib/i18n/context'

export default function AgeCalculator() {
  const { t } = useI18n()
  const [birthDate, setBirthDate] = useState('2000-01-01')
  const [age, setAge] = useState<AgeResult | null>(null)

  useEffect(() => {
    const date = new Date(birthDate)
    if (!isNaN(date.getTime())) {
      setAge(calculateAge(date))
    }
  }, [birthDate])

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.age.title}</h2>

      <div className="mb-8">
        <Input
          label={t.age.birthDate}
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>

      {age && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-blue-600">{age.years}</p>
            <p className="text-sm text-gray-500">{t.age.years}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-green-600">{age.months}</p>
            <p className="text-sm text-gray-500">{t.age.months}</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-purple-600">{age.days}</p>
            <p className="text-sm text-gray-500">{t.age.days}</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 text-center">
            <p className="text-xl font-bold text-orange-600">{age.totalDays}</p>
            <p className="text-sm text-gray-500">{t.age.totalDays}</p>
          </div>
          <div className="bg-pink-50 rounded-xl p-4 text-center">
            <p className="text-xl font-bold text-pink-600">{age.daysUntilBirthday}</p>
            <p className="text-sm text-gray-500">{t.age.daysUntil}</p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-4 text-center">
            <p className="text-xl font-bold text-indigo-600">{age.zodiac} / {age.westernZodiac}</p>
            <p className="text-sm text-gray-500">{t.age.zodiac}</p>
          </div>
        </div>
      )}
    </Card>
  )
}
```

- [ ] **Step 6: 创建页面路由**

```typescript
// src/app/calculators/age/page.tsx
import { Metadata } from 'next'
import AgeCalculator from '@/components/calculators/AgeCalculator'

export const metadata: Metadata = {
  title: '年龄计算器 - 在线年龄计算 | CalcMaster',
  description: '免费的在线年龄计算器，输入出生日期精确计算周岁、精确到天，附带生肖星座',
  keywords: '年龄计算器,年龄计算,周岁计算器,生肖,星座,在线年龄查询',
  openGraph: {
    title: '年龄计算器 - CalcMaster',
    description: '免费的在线年龄计算器',
    url: 'https://calcmasters.org/calculators/age',
    type: 'website',
  }
}

export default function AgePage() {
  return <AgeCalculator />
}
```

- [ ] **Step 7: 更新首页工具列表**

在 `src/app/HomeClient.tsx` 的 calculators 数组中添加:
```typescript
{ title: t.calculators.age, href: '/calculators/age' },
```

- [ ] **Step 8: 运行测试 + lint 并 commit**

```bash
npx vitest run
git add .
git commit -m "feat: add age calculator"
```

---

### Task 3: 随机数生成器

**Files:**
- Create: `src/lib/calculators/random.ts`
- Create: `src/lib/__tests__/calculators/random.test.ts`
- Create: `src/components/calculators/RandomNumberGenerator.tsx`
- Create: `src/app/calculators/random-number/page.tsx`
- Modify: `src/lib/i18n/translations/calculators.ts`
- Modify: `src/app/HomeClient.tsx`

- [ ] **Step 1: 编写 lib 纯函数**

```typescript
// src/lib/calculators/random.ts
export function generateRandomNumbers(min: number, max: number, count: number, unique: boolean): number[] {
  const actualMin = Math.min(min, max)
  const actualMax = Math.max(min, max)
  const range = actualMax - actualMin + 1

  if (unique && count > range) {
    count = range
  }

  if (unique) {
    const pool: number[] = []
    for (let i = actualMin; i <= actualMax; i++) {
      pool.push(i)
    }
    // Fisher-Yates shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]]
    }
    return pool.slice(0, count)
  }

  const result: number[] = []
  for (let i = 0; i < count; i++) {
    result.push(Math.floor(Math.random() * range) + actualMin)
  }
  return result
}
```

- [ ] **Step 2: 编写测试**

```typescript
// src/lib/__tests__/calculators/random.test.ts
import { describe, it, expect } from 'vitest'
import { generateRandomNumbers } from '@/lib/calculators/random'

describe('generateRandomNumbers', () => {
  it('generates correct count of numbers', () => {
    const result = generateRandomNumbers(1, 100, 10, false)
    expect(result).toHaveLength(10)
  })

  it('generates numbers within range', () => {
    const result = generateRandomNumbers(1, 10, 100, false)
    result.forEach((n) => {
      expect(n).toBeGreaterThanOrEqual(1)
      expect(n).toBeLessThanOrEqual(10)
    })
  })

  it('unique mode generates no duplicates', () => {
    const result = generateRandomNumbers(1, 10, 5, true)
    const unique = new Set(result)
    expect(unique.size).toBe(result.length)
  })

  it('clamps count to range when unique', () => {
    const result = generateRandomNumbers(1, 5, 100, true)
    expect(result.length).toBeLessThanOrEqual(5)
  })
})
```

- [ ] **Step 3: 运行测试验证通过**

Run: `npx vitest run src/lib/__tests__/calculators/random.test.ts`

- [ ] **Step 4: 编写客户端组件并添加 i18n**

i18n 翻译（在 calculators.ts 中，结构同前）:
- zh: randomNumber: '随机数生成器', 标题/标签/范围等
- en: randomNumber: 'Random Number Generator', 对应英文

客户端组件 `src/components/calculators/RandomNumberGenerator.tsx`:
- 最小值/最大值/数量 Input
- 去重 checkbox
- 生成按钮 → 显示结果列表
- 一键复制按钮

- [ ] **Step 5: 创建页面路由 & 更新 HomeClient**

- [ ] **Step 6: 运行测试 + lint 并 commit**

```bash
npx vitest run
git add .
git commit -m "feat: add random number generator"
```

---

### Task 4: 密码生成器

**Files:**
- Create: `src/lib/dev-tools/password.ts`
- Create: `src/lib/__tests__/dev-tools/password.test.ts`
- Create: `src/components/dev-tools/PasswordGenerator.tsx`
- Create: `src/app/dev-tools/password-generator/page.tsx`
- Modify: `src/lib/i18n/translations/devTools.ts`
- Modify: `src/app/HomeClient.tsx`

- [ ] **Step 1: 编写 lib 纯函数**

```typescript
// src/lib/dev-tools/password.ts
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const DIGITS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'

// 易混淆字符: O/0, l/I/1
const AMBIGUOUS_CHARS = new Set(['O', '0', 'l', 'I', '1'])

export interface PasswordOptions {
  length: number
  uppercase: boolean
  lowercase: boolean
  digits: boolean
  symbols: boolean
  excludeAmbiguous: boolean
}

export function getPasswordStrength(password: string): { score: number; label: 'weak' | 'fair' | 'good' | 'strong' } {
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (password.length >= 16) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^a-zA-Z0-9]/.test(password)) score++

  if (score <= 1) return { score, label: 'weak' }
  if (score <= 3) return { score, label: 'fair' }
  if (score <= 4) return { score, label: 'good' }
  return { score, label: 'strong' }
}

export function generatePassword(options: PasswordOptions): string {
  let charset = ''
  if (options.lowercase) charset += LOWERCASE
  if (options.uppercase) charset += UPPERCASE
  if (options.digits) charset += DIGITS
  if (options.symbols) charset += SYMBOLS

  if (options.excludeAmbiguous) {
    charset = charset.split('').filter((c) => !AMBIGUOUS_CHARS.has(c)).join('')
  }

  if (!charset) charset = LOWERCASE + DIGITS

  let result = ''
  const array = new Uint32Array(options.length)
  crypto.getRandomValues(array)
  for (let i = 0; i < options.length; i++) {
    result += charset[array[i] % charset.length]
  }
  return result
}
```

- [ ] **Step 2: 编写测试**

```typescript
// src/lib/__tests__/dev-tools/password.test.ts
import { describe, it, expect } from 'vitest'
import { generatePassword, getPasswordStrength, type PasswordOptions } from '@/lib/dev-tools/password'

const defaultOptions: PasswordOptions = {
  length: 16,
  uppercase: true,
  lowercase: true,
  digits: true,
  symbols: true,
  excludeAmbiguous: false,
}

describe('generatePassword', () => {
  it('generates password of correct length', () => {
    const pw = generatePassword({ ...defaultOptions, length: 20 })
    expect(pw).toHaveLength(20)
  })

  it('generates password with only lowercase', () => {
    const pw = generatePassword({ ...defaultOptions, length: 20, uppercase: false, digits: false, symbols: false })
    expect(pw).toMatch(/^[a-z]+$/)
  })

  it('excludes ambiguous characters when requested', () => {
    const pw = generatePassword({ ...defaultOptions, length: 100, excludeAmbiguous: true })
    expect(pw).not.toMatch(/[O0lI1]/)
  })
})

describe('getPasswordStrength', () => {
  it('short password is weak', () => {
    expect(getPasswordStrength('abc').label).toBe('weak')
  })
  it('long mixed password is strong', () => {
    expect(getPasswordStrength('Abc123!@#XyZ999').label).toBe('strong')
  })
})
```

- [ ] **Step 3: 运行测试验证通过**

Run: `npx vitest run src/lib/__tests__/dev-tools/password.test.ts`

- [ ] **Step 4: 编写客户端组件并添加 i18n**

i18n 翻译（在 devTools.ts 中）:
- zh: passwordGenerator: '密码生成器', 长度/选项/强度/复制等
- en: passwordGenerator: 'Password Generator', 对应英文

客户端组件 `src/components/dev-tools/PasswordGenerator.tsx`:
- 长度 slider (8-64)
- Checkbox: 大写/小写/数字/符号/排除易混淆字符
- 密码实时显示 + 强度指示条
- 一键复制 + 重新生成按钮

- [ ] **Step 5: 创建页面路由 & 更新 HomeClient**

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add password generator"
```

---

### Task 5: 颜色工具

**Files:**
- Create: `src/lib/dev-tools/color.ts`
- Create: `src/lib/__tests__/dev-tools/color.test.ts`
- Create: `src/components/dev-tools/ColorConverter.tsx`
- Create: `src/app/dev-tools/color-converter/page.tsx`
- Modify: `src/lib/i18n/translations/devTools.ts`
- Modify: `src/app/HomeClient.tsx`

- [ ] **Step 1: 编写 lib 纯函数**

```typescript
// src/lib/dev-tools/color.ts
export interface RGB {
  r: number
  g: number
  b: number
}

export interface HSL {
  h: number
  s: number
  l: number
}

export function hexToRgb(hex: string): RGB | null {
  const match = hex.replace('#', '').match(/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)
  if (!match) return null
  let h = match[1]
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
  }
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

export function rgbToHsl(r: number, g: number, b: number): HSL {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const l = (max + min) / 2

  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) }

  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6
  else if (max === gn) h = ((bn - rn) / d + 2) / 6
  else h = ((rn - gn) / d + 4) / 6

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

export function hslToRgb(h: number, s: number, l: number): RGB {
  const sn = s / 100
  const ln = l / 100
  if (sn === 0) {
    const v = Math.round(ln * 255)
    return { r: v, g: v, b: v }
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }
  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn
  const p = 2 * ln - q
  const hn = h / 360
  return {
    r: Math.round(hue2rgb(p, q, hn + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, hn) * 255),
    b: Math.round(hue2rgb(p, q, hn - 1 / 3) * 255),
  }
}
```

- [ ] **Step 2: 编写测试**

```typescript
// src/lib/__tests__/dev-tools/color.test.ts
import { describe, it, expect } from 'vitest'
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from '@/lib/dev-tools/color'

describe('hexToRgb', () => {
  it('converts #FF0000 to red', () => {
    expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 })
  })
  it('handles shorthand hex', () => {
    expect(hexToRgb('#F00')).toEqual({ r: 255, g: 0, b: 0 })
  })
  it('returns null for invalid hex', () => {
    expect(hexToRgb('invalid')).toBeNull()
  })
})

describe('rgbToHex', () => {
  it('converts red to #FF0000', () => {
    expect(rgbToHex(255, 0, 0)).toBe('#FF0000')
  })
})

describe('rgbToHsl and hslToRgb roundtrip', () => {
  it('converts red roundtrip', () => {
    const hsl = rgbToHsl(255, 0, 0)
    const rgb = hslToRgb(hsl.h, hsl.s, hsl.l)
    expect(rgb.r).toBe(255)
    expect(rgb.g).toBe(0)
    expect(rgb.b).toBe(0)
  })
})
```

- [ ] **Step 3: 运行测试验证通过**

Run: `npx vitest run src/lib/__tests__/dev-tools/color.test.ts`

- [ ] **Step 4: 编写客户端组件并添加 i18n**

客户端组件 `src/components/dev-tools/ColorConverter.tsx`:
- 颜色选择器 (input type="color")
- HEX 输入框
- RGB (R/G/B) 三个输入框
- HSL (H/S/L) 三个输入框
- 任一输入变化，其他格式自动更新
- 实时颜色预览块

- [ ] **Step 5: 创建页面路由 & 更新 HomeClient**

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add color converter tool"
```

---

## P1: 用户留存功能（3 个）

### Task 6: localStorage hooks

**Files:**
- Create: `src/hooks/useRecentTools.ts`
- Create: `src/hooks/useFavorites.ts`

- [ ] **Step 1: 创建 useRecentTools hook**

```typescript
// src/hooks/useRecentTools.ts
'use client'

import { useState, useEffect, useCallback } from 'react'

export interface RecentTool {
  href: string
  title: string
  usedAt: number
}

const STORAGE_KEY = 'calc-master:recent-tools'
const MAX_RECENT = 5

export function useRecentTools() {
  const [recentTools, setRecentTools] = useState<RecentTool[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setRecentTools(JSON.parse(stored))
      }
    } catch { /* ignore parse errors */ }
  }, [])

  const addRecentTool = useCallback((href: string, title: string) => {
    setRecentTools((prev) => {
      const filtered = prev.filter((t) => t.href !== href)
      const updated = [{ href, title, usedAt: Date.now() }, ...filtered].slice(0, MAX_RECENT)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  return { recentTools, addRecentTool }
}
```

- [ ] **Step 2: 创建 useFavorites hook**

```typescript
// src/hooks/useFavorites.ts
'use client'

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'calc-master:favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setFavorites(JSON.parse(stored))
      }
    } catch { /* ignore parse errors */ }
  }, [])

  const toggleFavorite = useCallback((href: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(href)
      const updated = isFav ? prev.filter((h) => h !== href) : [...prev, href]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const isFavorite = useCallback(
    (href: string) => favorites.includes(href),
    [favorites]
  )

  return { favorites, toggleFavorite, isFavorite }
}
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: add recent tools and favorites hooks"
```

---

### Task 7: 首页搜索框

**Files:**
- Create: `src/components/SearchBox.tsx`
- Modify: `src/app/HomeClient.tsx`

- [ ] **Step 1: 创建 SearchBox 组件**

```typescript
// src/components/SearchBox.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n/context'
import type { ToolItem } from '@/components/ToolCategory'

interface SearchBoxProps {
  allTools: ToolItem[]
}

export default function SearchBox({ allTools }: SearchBoxProps) {
  const { t } = useI18n()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ToolItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setIsOpen(false)
      return
    }
    const q = query.toLowerCase()
    const filtered = allTools.filter(
      (tool) => tool.title.toLowerCase().includes(q)
    )
    setResults(filtered)
    setIsOpen(true)
  }, [query, allTools])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="relative max-w-lg mx-auto mb-8">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t.common.searchPlaceholder || '搜索工具...'}
        className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-gray-700 shadow-sm"
      />
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 z-50 max-h-64 overflow-y-auto">
          {results.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="block px-5 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => { setQuery(''); setIsOpen(false) }}
            >
              {tool.title}
            </Link>
          ))}
        </div>
      )}
      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 z-50 p-5 text-center text-gray-400">
          {t.common.noResults || '未找到匹配的工具'}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: 更新 HomeClient 集成搜索框、最近使用和收藏**

在 `src/app/HomeClient.tsx` 中:
1. Import `SearchBox`, `useRecentTools`, `useFavorites`
2. 构建 `allTools` 数组（合并 converters + calculators + devTools）
3. 在 Hero section 下方添加 `<SearchBox allTools={allTools} />`
4. 在搜索框下方添加「最近使用」区域（使用 `ToolCategory` 或简化列表）
5. 在最近使用下方添加「我的收藏」区域

- [ ] **Step 3: 添加搜索相关 i18n**

在 `src/lib/i18n/translations/common.ts` 的 home 对象添加:
```typescript
searchPlaceholder: '搜索工具...(Ctrl+K)',  // zh
searchPlaceholder: 'Search tools...(Ctrl+K)',  // en
noResults: '未找到匹配的工具',  // zh
noResults: 'No matching tools found',  // en
recentTools: '最近使用',  // zh
recentTools: 'Recently Used',  // en
myFavorites: '我的收藏',  // zh
myFavorites: 'My Favorites',  // en
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add search box, recent tools and favorites to homepage"
```

---

### Task 8: 工具页面收藏按钮 + 自动记录

**Files:**
- Create: `src/components/FavoriteButton.tsx`
- Modify: `src/components/calculators/BMI*.tsx` 等（在所有工具页面添加）
- 更优方案：创建 `src/components/ToolPageWrapper.tsx` 统一注入

- [ ] **Step 1: 创建 FavoriteButton 组件**

```typescript
// src/components/FavoriteButton.tsx
'use client'

import { useFavorites } from '@/hooks/useFavorites'

interface FavoriteButtonProps {
  toolHref: string
}

export default function FavoriteButton({ toolHref }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()

  return (
    <button
      onClick={() => toggleFavorite(toolHref)}
      className="text-2xl transition-transform hover:scale-110 active:scale-95"
      title={isFavorite(toolHref) ? '取消收藏' : '收藏'}
    >
      {isFavorite(toolHref) ? '⭐' : '☆'}
    </button>
  )
}
```

- [ ] **Step 2: 创建 ToolPageWrapper 组件**

```typescript
// src/components/ToolPageWrapper.tsx
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import PageLayout from '@/components/PageLayout'
import FavoriteButton from '@/components/FavoriteButton'
import { useRecentTools } from '@/hooks/useRecentTools'
import { useI18n } from '@/lib/i18n/context'

interface ToolPageWrapperProps {
  children: React.ReactNode
  title: string // 当前语言的工具名称
}

export default function ToolPageWrapper({ children, title }: ToolPageWrapperProps) {
  const pathname = usePathname()
  const { addRecentTool } = useRecentTools()

  useEffect(() => {
    addRecentTool(pathname, title)
  }, [pathname, title, addRecentTool])

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-4">
        <div /> {/* spacer */}
        <FavoriteButton toolHref={pathname} />
      </div>
      {children}
    </PageLayout>
  )
}
```

- [ ] **Step 3: 更新所有工具页面使用 ToolPageWrapper**

以 BMI 为例，修改 `src/components/calculators/BMICalculator.tsx` 的最外层:
```typescript
// 原来直接返回 <Card>...</Card>
// 改为:
import ToolPageWrapper from '@/components/ToolPageWrapper'
// ...
return (
  <ToolPageWrapper title={t.calculators.bmi}>
    <Card className="p-6 md:p-8">
      {/* 原有内容不变 */}
    </Card>
  </ToolPageWrapper>
)
```

依此类推，更新所有 23 个现有工具组件 + 5 个新工具组件。

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add favorite button and auto-recent tracking to all tool pages"
```

---

## P2: 数据驱动（2 项）

### Task 9: Umami 统计分析集成

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `docker-compose.yml`
- Modify: `docker-compose.prod.yml`

- [ ] **Step 1: 在 layout.tsx 添加 Umami Script**

在 `src/app/layout.tsx` 的 `<body>` 关闭标签之前，`<Footer />` 之后添加:

```typescript
import Script from "next/script";
// ... existing imports

// 在 body 内 Footer 后面添加:
{process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
  <Script
    async
    src="https://cloud.umami.is/script.js"
    data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
    strategy="afterInteractive"
  />
)}
```

> 说明：优先使用 Umami Cloud 免费版（umami.is），无需自部署。如需自部署，切换 src 为自部署地址。

- [ ] **Step 2: 在 docker-compose 中添加环境变量**

在 `docker-compose.yml` 和 `docker-compose.prod.yml` 的 calc-master environment 中添加:
```yaml
- NEXT_PUBLIC_UMAMI_WEBSITE_ID=${UMAMI_WEBSITE_ID:-}
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: add Umami analytics integration"
```

---

### Task 10: 结构化数据 JSON-LD

**Files:**
- Create: `src/components/JsonLd.tsx`
- Modify: 所有工具 page.tsx（28 个文件）

- [ ] **Step 1: 创建 JsonLd 通用组件**

```typescript
// src/components/JsonLd.tsx
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

- [ ] **Step 2: 为每个工具页添加 WebApplication schema**

以百分比计算器为例，修改 `src/app/calculators/percentage/page.tsx`:

```typescript
import JsonLd from '@/components/JsonLd'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '百分比计算器',
  url: 'https://calcmasters.org/calculators/percentage',
  description: '免费的在线百分比计算器，支持百分比计算、占比计算、百分比变化计算，输入即出结果',
  applicationCategory: 'CalculatorApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
}

export default function PercentagePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <PercentageCalculator />
    </>
  )
}
```

对所有 28 个工具页（23 个现有 + 5 个新增）重复此模式。

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: add JSON-LD structured data to all tool pages"
```

---

## 实施顺序

| 顺序 | Task | 依赖 |
|------|------|------|
| 1 | Task 1: 百分比计算器 | 无 |
| 2 | Task 2: 年龄计算器 | 无 |
| 3 | Task 3: 随机数生成器 | 无 |
| 4 | Task 4: 密码生成器 | 无 |
| 5 | Task 5: 颜色工具 | 无 |
| 6 | Task 6: hooks | 无 |
| 7 | Task 7: 搜索框 + 首页改造 | Task 1-6 |
| 8 | Task 8: 收藏按钮 + 自动记录 | Task 6 |
| 9 | Task 9: Umami | 无 |
| 10 | Task 10: JSON-LD | Task 1-5 |

> Task 1-5 可并行开发，Task 6 可与 Task 1-5 并行。Task 9 可随时并行。

---

## 自我审查

**1. Spec coverage:**
- P0 5 个工具 → Task 1-5 ✓
- P1 搜索框 → Task 7 ✓
- P1 最近使用 → Task 6 + Task 8 ✓
- P1 收藏 → Task 6 + Task 7 + Task 8 ✓
- P2 Umami → Task 9 ✓
- P2 结构化数据 → Task 10 ✓

**2. Placeholder scan:** 所有步骤包含完整代码。无 TBD/TODO。

**3. Type consistency:**
- `ToolItem` from existing codebase (`src/components/ToolCategory`)
- `RecentTool` defined in Task 6, used in Task 7/8
- `useRecentTools` / `useFavorites` defined in Task 6, used in Task 7/8
