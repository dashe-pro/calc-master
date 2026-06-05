# CalcMaster 全面重构 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 对 CalcMaster 项目进行全方位重构：添加测试、完成国际化、修复类型、消除重复代码、修复 React 反模式、统一样式

**Architecture:** 保持 Next.js App Router 结构不变，lib 层纯函数 + 测试，components 层提取共享布局组件，i18n 按模块拆分翻译文件

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS v4, Vitest, Prettier API

---

## Phase 0: 基础设施

### Task 0.1: 安装 Vitest 测试框架

**Files:**
- Modify: `package.json`

- [ ] **Step 1: 安装依赖**

```bash
cd c:\Users\707829851\Desktop\calc-master && npm install --save-dev vitest @vitest/coverage-v8
```

### Task 0.2: 配置 Vitest

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json`

- [ ] **Step 1: 创建 vitest.config.ts**

```typescript
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 2: 添加 test 脚本到 package.json**

在 `package.json` 的 scripts 中添加：
```json
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage"
```

### Task 0.3: 安装 Prettier (CodeFormatter 依赖)

```bash
cd c:\Users\707829851\Desktop\calc-master && npm install --save-dev prettier
```

---

## Phase 1: 单元测试

### Task 1.1: 创建 lib/types.ts 共享类型

**Files:**
- Create: `src/lib/types.ts`

类型定义：
```typescript
export interface BMICategoryResult {
  category: string
  color: string
}

export interface CompoundResult {
  futureValue: number
  totalContributions: number
  totalInterest: number
}

export interface DiscountResult {
  finalPrice: number
  discountAmount: number
  savings: number
}

export interface TipResult {
  tipAmount: number
  total: number
  perPerson: number
}

export interface DueDateResult {
  dueDate: Date
  weeksPregnant: number
  daysPregnant: number
}

export interface CompoundParams {
  principal: number
  rate: number
  years: number
  monthlyContribution: number
}

export interface MortgageParams {
  loanAmount: number
  interestRate: number
  loanTerm: number
  repaymentType: 'equal-principal-interest' | 'equal-principal'
}

export interface MortgagePaymentSchedule {
  month: number
  payment: number
  principal: number
  interest: number
  remainingPrincipal: number
}

export interface MortgageResult {
  monthlyPayment: number
  firstMonthPayment?: number
  lastMonthPayment?: number
  totalPayment: number
  totalInterest: number
  paymentSchedule?: MortgagePaymentSchedule[]
  monthlyPaymentDecrease?: number
}

export interface GrowthPercentileResult {
  percentile: number
  label: string
}
```

- [ ] **Step 1: 创建文件并提交**

### Task 1.2: 测试 utils.ts (cn, formatNumber)

**Files:**
- Create: `src/lib/__tests__/utils.test.ts`

测试代码：
```typescript
import { describe, it, expect } from 'vitest'
import { cn, formatNumber } from '@/lib/utils'

describe('cn', () => {
  it('应该合并多个类名', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c')
  })

  it('应该过滤掉 falsy 值', () => {
    expect(cn('a', false, undefined, null, 'b')).toBe('a b')
  })

  it('空输入返回空字符串', () => {
    expect(cn()).toBe('')
  })
})

describe('formatNumber', () => {
  it('默认保留 4 位小数', () => {
    expect(formatNumber(3.14159265)).toBe('3.1416')
  })

  it('自定义小数位数', () => {
    expect(formatNumber(3.14159265, 2)).toBe('3.14')
  })

  it('NaN 返回 "0"', () => {
    expect(formatNumber(NaN)).toBe('0')
  })

  it('Infinity 返回 "0"', () => {
    expect(formatNumber(Infinity)).toBe('0')
  })

  it('负数工作正常', () => {
    expect(formatNumber(-3.14, 1)).toBe('-3.1')
  })

  it('0 工作正常', () => {
    expect(formatNumber(0)).toBe('0')
  })

  it('去除末尾多余的零', () => {
    expect(formatNumber(1.20004, 3)).toBe('1.2')
  })
})
```

### Task 1.3: 测试 BMI 计算

**Files:**
- Create: `src/lib/__tests__/calculators/bmi.test.ts`

```typescript
import { describe, it, expect } from 'vitest'
import { calculateBMI, getBMICategory } from '@/lib/calculators/bmi'

describe('calculateBMI', () => {
  it('标准输入：70kg, 175cm', () => {
    const bmi = calculateBMI(70, 175)
    expect(bmi).toBeCloseTo(22.86, 1)
  })

  it('边界值：身高为 0 返回 NaN', () => {
    const bmi = calculateBMI(70, 0)
    expect(bmi).toBe(Infinity)
  })

  it('体重大值', () => {
    const bmi = calculateBMI(100, 200)
    expect(bmi).toBe(25)
  })
})

describe('getBMICategory', () => {
  it('BMI < 18.5 → 偏瘦', () => {
    expect(getBMICategory(17).category).toBe('偏瘦')
  })

  it('18.5 ≤ BMI < 24 → 正常', () => {
    expect(getBMICategory(22).category).toBe('正常')
  })

  it('24 ≤ BMI < 28 → 偏胖', () => {
    expect(getBMICategory(26).category).toBe('偏胖')
  })

  it('BMI ≥ 28 → 肥胖', () => {
    expect(getBMICategory(30).category).toBe('肥胖')
  })
})
```

### Task 1.4: 测试按揭计算

**Files:**
- Create: `src/lib/__tests__/calculators/mortgage.test.ts`

```typescript
import { describe, it, expect } from 'vitest'
import { calculateMortgage, calculateEqualPrincipalInterest, calculateEqualPrincipal } from '@/lib/calculators/mortgage'

describe('calculateEqualPrincipalInterest', () => {
  const loanAmount = 1_000_000
  const monthlyRate = 0.049 / 12
  const totalPayments = 30 * 12 // 360

  it('计算月供和总还款', () => {
    const result = calculateEqualPrincipalInterest(loanAmount, monthlyRate, totalPayments)
    expect(result.monthlyPayment).toBeGreaterThan(0)
    expect(result.totalPayment).toBeGreaterThan(loanAmount)
    expect(result.totalInterest).toBeGreaterThan(0)
    expect(result.paymentSchedule).toHaveLength(totalPayments)
  })

  it('还款计划期数从 1 开始', () => {
    const result = calculateEqualPrincipalInterest(loanAmount, monthlyRate, totalPayments)
    expect(result.paymentSchedule![0].month).toBe(1)
    expect(result.paymentSchedule![359].month).toBe(360)
  })

  it('最后一期剩余本金应为 0', () => {
    const result = calculateEqualPrincipalInterest(loanAmount, monthlyRate, totalPayments)
    const last = result.paymentSchedule![359]
    expect(last.remainingPrincipal).toBeCloseTo(0, 0)
  })

  it('零利率时每月还款 = 贷款 / 期数', () => {
    const result = calculateEqualPrincipalInterest(1000, 0, 10)
    expect(result.monthlyPayment).toBeCloseTo(100, 0)
    expect(result.totalInterest).toBe(0)
  })
})

describe('calculateEqualPrincipal', () => {
  const loanAmount = 1_000_000
  const monthlyRate = 0.049 / 12
  const totalPayments = 30 * 12

  it('计算首月还款和总还款', () => {
    const result = calculateEqualPrincipal(loanAmount, monthlyRate, totalPayments)
    expect(result.firstMonthPayment).toBeGreaterThan(result.lastMonthPayment!)
    expect(result.totalInterest).toBeGreaterThan(0)
    expect(result.monthlyPaymentDecrease).toBeGreaterThan(0)
  })

  it('等额本金总利息 < 等额本息总利息', () => {
    const ep = calculateEqualPrincipal(loanAmount, monthlyRate, totalPayments)
    const epi = calculateEqualPrincipalInterest(loanAmount, monthlyRate, totalPayments)
    expect(ep.totalInterest).toBeLessThan(epi.totalInterest)
  })
})

describe('calculateMortgage', () => {
  it('默认使用等额本息', () => {
    const result = calculateMortgage({
      loanAmount: 1_000_000,
      interestRate: 4.9,
      loanTerm: 30,
      repaymentType: 'equal-principal-interest',
    })
    expect(result.monthlyPayment).toBeGreaterThan(0)
  })

  it('切换为等额本金', () => {
    const result = calculateMortgage({
      loanAmount: 1_000_000,
      interestRate: 4.9,
      loanTerm: 30,
      repaymentType: 'equal-principal',
    })
    expect(result.firstMonthPayment).toBeGreaterThan(0)
    expect(result.lastMonthPayment).toBeGreaterThan(0)
  })
})
```

### Task 1.5: 测试 compound, discount, tip, dueDate

**Files:**
- Create: `src/lib/__tests__/calculators/compound.test.ts`
- Create: `src/lib/__tests__/calculators/discount.test.ts`
- Create: `src/lib/__tests__/calculators/tip.test.ts`
- Create: `src/lib/__tests__/calculators/dueDate.test.ts`

compound.test.ts:
```typescript
import { describe, it, expect } from 'vitest'
import { calculateCompoundInterest } from '@/lib/calculators/compound'

describe('calculateCompoundInterest', () => {
  it('基本复利计算', () => {
    const result = calculateCompoundInterest({
      principal: 10000, rate: 5, years: 10, monthlyContribution: 1000,
    })
    expect(result.futureValue).toBeGreaterThan(result.totalContributions)
    expect(result.totalInterest).toBeGreaterThan(0)
  })

  it('零月供', () => {
    const result = calculateCompoundInterest({
      principal: 10000, rate: 5, years: 10, monthlyContribution: 0,
    })
    expect(result.totalContributions).toBe(10000)
  })

  it('零本金零利率', () => {
    const result = calculateCompoundInterest({
      principal: 0, rate: 0, years: 0, monthlyContribution: 0,
    })
    expect(result.futureValue).toBe(0)
    expect(result.totalInterest).toBe(0)
  })
})
```

discount.test.ts:
```typescript
import { describe, it, expect } from 'vitest'
import { calculateDiscount } from '@/lib/calculators/discount'

describe('calculateDiscount', () => {
  it('100元打8折', () => {
    const result = calculateDiscount(100, 20)
    expect(result.finalPrice).toBe(80)
    expect(result.discountAmount).toBe(20)
    expect(result.savings).toBe(20)
  })

  it('零折扣', () => {
    const result = calculateDiscount(100, 0)
    expect(result.finalPrice).toBe(100)
    expect(result.savings).toBe(0)
  })

  it('免单', () => {
    const result = calculateDiscount(100, 100)
    expect(result.finalPrice).toBe(0)
    expect(result.discountAmount).toBe(100)
  })
})
```

tip.test.ts:
```typescript
import { describe, it, expect } from 'vitest'
import { calculateTip } from '@/lib/calculators/tip'

describe('calculateTip', () => {
  it('200元15%小费2人分摊', () => {
    const result = calculateTip(200, 15, 2)
    expect(result.tipAmount).toBe(30)
    expect(result.total).toBe(230)
    expect(result.perPerson).toBe(115)
  })

  it('单人不分摊', () => {
    const result = calculateTip(100, 10, 1)
    expect(result.perPerson).toBe(110)
  })
})
```

dueDate.test.ts:
```typescript
import { describe, it, expect } from 'vitest'
import { calculateDueDate, formatDate } from '@/lib/calculators/dueDate'

describe('calculateDueDate', () => {
  it('末次月经加 280 天为预产期', () => {
    const lastPeriod = new Date('2025-01-01')
    const result = calculateDueDate(lastPeriod)
    const expectedDue = new Date('2025-10-08')
    expect(result.dueDate.toISOString().split('T')[0]).toBe(expectedDue.toISOString().split('T')[0])
  })

  it('返回正确的孕周和天数', () => {
    const result = calculateDueDate(new Date('2025-01-01'))
    expect(result.weeksPregnant).toBeGreaterThan(0)
    expect(result.daysPregnant).toBeGreaterThanOrEqual(0)
    expect(result.daysPregnant).toBeLessThan(7)
  })
})

describe('formatDate', () => {
  it('按 yyyy-MM-dd 格式化', () => {
    expect(formatDate(new Date('2025-01-15'))).toBe('2025-01-15')
  })
})
```

### Task 1.6: 测试所有转换器

**Files:**
- Create: `src/lib/__tests__/converters/length.test.ts`
- Create: `src/lib/__tests__/converters/weight.test.ts`
- Create: `src/lib/__tests__/converters/temperature.test.ts`
- Create: `src/lib/__tests__/converters/area.test.ts`
- Create: `src/lib/__tests__/converters/data.test.ts`

**length.test.ts:**
```typescript
import { describe, it, expect } from 'vitest'
import { convertLength, getLengthUnitName } from '@/lib/converters/length'

describe('convertLength', () => {
  it('同一单位返回原值', () => {
    expect(convertLength(5, 'm', 'm')).toBe(5)
  })

  it('米转英尺', () => {
    expect(convertLength(1, 'm', 'ft')).toBeCloseTo(3.28084, 3)
  })

  it('英寸转厘米', () => {
    expect(convertLength(1, 'in', 'cm')).toBe(2.54)
  })

  it('零值', () => {
    expect(convertLength(0, 'm', 'ft')).toBe(0)
  })
})

describe('getLengthUnitName', () => {
  it('中文名称', () => {
    expect(getLengthUnitName('m', 'zh')).toBe('米')
    expect(getLengthUnitName('ft', 'zh')).toBe('英尺')
  })

  it('英文名称', () => {
    expect(getLengthUnitName('m', 'en')).toBe('Meter')
    expect(getLengthUnitName('ft', 'en')).toBe('Foot')
  })
})
```

**weight.test.ts:**
```typescript
import { describe, it, expect } from 'vitest'
import { convertWeight, getWeightUnitName } from '@/lib/converters/weight'

describe('convertWeight', () => {
  it('kg 转 lb', () => {
    expect(convertWeight(1, 'kg', 'lb')).toBeCloseTo(2.20462, 3)
  })

  it('同一单位', () => {
    expect(convertWeight(10, 'kg', 'kg')).toBe(10)
  })
})

describe('getWeightUnitName', () => {
  it('中文名称', () => {
    expect(getWeightUnitName('kg', 'zh')).toBe('千克')
  })
})
```

**temperature.test.ts:**
```typescript
import { describe, it, expect } from 'vitest'
import { convertTemperature, getTempUnitName } from '@/lib/converters/temperature'

describe('convertTemperature', () => {
  it('冰点', () => {
    expect(convertTemperature(0, 'C', 'F')).toBe(32)
  })

  it('沸点', () => {
    expect(convertTemperature(100, 'C', 'F')).toBe(212)
  })

  it('华氏转摄氏', () => {
    expect(convertTemperature(32, 'F', 'C')).toBe(0)
  })

  it('同一单位', () => {
    expect(convertTemperature(25, 'C', 'C')).toBe(25)
  })
})
```

**area.test.ts:**
```typescript
import { describe, it, expect } from 'vitest'
import { convertArea, getAreaUnitName } from '@/lib/converters/area'

describe('convertArea', () => {
  it('平方米转平方英尺', () => {
    expect(convertArea(1, 'm2', 'ft2')).toBeCloseTo(10.7639, 3)
  })

  it('亩转平方米', () => {
    expect(convertArea(1, 'mu', 'm2')).toBeCloseTo(666.67, 0)
  })
})

describe('getAreaUnitName', () => {
  it('中文名称', () => {
    expect(getAreaUnitName('mu', 'zh')).toBe('亩')
  })
})
```

**data.test.ts:**
```typescript
import { describe, it, expect } from 'vitest'
import { convertData, getDataUnitName } from '@/lib/converters/data'

describe('convertData', () => {
  it('KB 转 B', () => {
    expect(convertData(1, 'KB', 'B')).toBe(1024)
  })

  it('GB 转 MB', () => {
    expect(convertData(1, 'GB', 'MB')).toBe(1024)
  })

  it('同一单位', () => {
    expect(convertData(100, 'MB', 'MB')).toBe(100)
  })
})
```

### Task 1.7: 测试 growthData

**Files:**
- Create: `src/lib/__tests__/growthData.test.ts`

```typescript
import { describe, it, expect } from 'vitest'
import { getGrowthPercentile, getPercentileRange } from '@/lib/growthData'

describe('getGrowthPercentile', () => {
  it('P3 以下', () => {
    const result = getGrowthPercentile(40, 0, 'boy', 'height')
    expect(result.percentile).toBe(3)
  })

  it('P50 正常', () => {
    const result = getGrowthPercentile(85, 24, 'boy', 'height')
    expect(result.percentile).toBeGreaterThanOrEqual(25)
    expect(result.percentile).toBeLessThanOrEqual(75)
  })

  it('女孩体重', () => {
    const result = getGrowthPercentile(10, 12, 'girl', 'weight')
    expect(result.percentile).toBeGreaterThan(0)
  })
})

describe('getPercentileRange', () => {
  it('返回正确的范围', () => {
    const range = getPercentileRange(12, 'boy', 'height')
    expect(range.P3).toBeDefined()
    expect(range.P50).toBeDefined()
    expect(range.P97).toBeDefined()
    expect(range.P3).toBeLessThan(range.P50)
    expect(range.P50).toBeLessThan(range.P97)
  })
})
```

---

## Phase 2: 国际化拆分

### Task 2.1: 创建拆分后的翻译文件

**Files:**
- Create: `src/lib/i18n/translations/common.ts`
- Create: `src/lib/i18n/translations/converters.ts`
- Create: `src/lib/i18n/translations/calculators.ts`
- Create: `src/lib/i18n/translations/devTools.ts`
- Create: `src/lib/i18n/translations/index.ts`
- Modify: `src/lib/i18n/translations.ts` → 替换为 re-export

**common.ts** — 包含 header, footer, common, home：
```typescript
export const common = {
  zh: {
    header: { title: 'CalcMaster' },
    footer: {
      copyright: '© 2026 CalcMaster. 保留所有权利。',
      description: '免费、易用的在线计算工具',
    },
    common: { language: '语言', chinese: '中文', english: 'English' },
    home: {
      title: '全能在线计算工具',
      subtitle: '免费、易用的在线计算工具，涵盖单位换算、财务计算、健康计算、开发者工具等多种功能',
      unitConverters: '单位换算工具',
      onlineCalculators: '在线计算器',
      devTools: '开发者工具',
    },
  },
  en: {
    header: { title: 'CalcMaster' },
    footer: {
      copyright: '© 2026 CalcMaster. All rights reserved.',
      description: 'Free and easy-to-use online calculator tools',
    },
    common: { language: 'Language', chinese: '中文', english: 'English' },
    home: {
      title: 'All-in-One Online Calculator',
      subtitle: 'Free and easy-to-use online calculator tools covering unit conversion, financial calculation, health calculation, developer tools and more',
      unitConverters: 'Unit Converters',
      onlineCalculators: 'Online Calculators',
      devTools: 'Developer Tools',
    },
  },
}
```

**converters.ts** — converters + converterPages：
```typescript
export const converters = {
  zh: {
    converters: {
      length: '长度换算', weight: '重量换算', temperature: '温度换算',
      area: '面积换算', data: '数据存储', currency: '汇率换算', time: '时间换算',
    },
    converterPages: {
      length: { title: '长度换算 - CalcMaster', description: '免费的长度单位换算器，支持米、英尺、厘米、英寸等多种单位转换' },
      weight: { title: '重量换算 - CalcMaster', description: '免费的重量单位换算器，支持千克、磅、克、盎司等多种单位转换' },
      temperature: { title: '温度换算 - CalcMaster', description: '免费的温度单位换算器，支持摄氏度、华氏度、开尔文等单位转换' },
      area: { title: '面积换算 - CalcMaster', description: '免费的面积单位换算器，支持平方米、平方英尺、公顷等多种单位转换' },
      data: { title: '数据存储换算 - CalcMaster', description: '免费的数据存储单位换算器，支持字节、KB、MB、GB、TB等单位转换' },
      currency: { title: '汇率换算 - CalcMaster', description: '免费的汇率换算工具' },
      time: { title: '时间换算 - CalcMaster', description: '免费的时间单位换算器，支持秒、分钟、小时、天等单位转换' },
    },
  },
  en: {
    converters: {
      length: 'Length Converter', weight: 'Weight Converter', temperature: 'Temperature Converter',
      area: 'Area Converter', data: 'Data Storage Converter', currency: 'Currency Converter', time: 'Time Converter',
    },
    converterPages: {
      length: { title: 'Length Converter - CalcMaster', description: 'Free length unit converter supporting meters, feet, centimeters, inches and more' },
      weight: { title: 'Weight Converter - CalcMaster', description: 'Free weight unit converter supporting kilograms, pounds, grams, ounces and more' },
      temperature: { title: 'Temperature Converter - CalcMaster', description: 'Free temperature unit converter supporting Celsius, Fahrenheit, Kelvin and more' },
      area: { title: 'Area Converter - CalcMaster', description: 'Free area unit converter supporting square meters, square feet, hectares and more' },
      data: { title: 'Data Storage Converter - CalcMaster', description: 'Free data storage unit converter supporting bytes, KB, MB, GB, TB and more' },
      currency: { title: 'Currency Converter - CalcMaster', description: 'Free currency converter tool' },
      time: { title: 'Time Converter - CalcMaster', description: 'Free time unit converter supporting seconds, minutes, hours, days and more' },
    },
  },
}
```

**calculators.ts** — calculators + calculatorPages + mortgage UI：
包含所有计算器翻译和 mortgage 相关 UI 文本。

**devTools.ts** — devTools + devToolPages

**index.ts:**
```typescript
import { common } from './common'
import { converters } from './converters'
import { calculators } from './calculators'
import { devTools } from './devTools'

const zh = {
  ...common.zh, ...converters.zh, ...calculators.zh, ...devTools.zh,
}
const en = {
  ...common.en, ...converters.en, ...calculators.en, ...devTools.en,
}

export const translations = { zh, en }
export type Language = 'zh' | 'en'
export type Translations = typeof zh
```

### Task 2.2: 更新 translations.ts 为 re-export

**Files:**
- Modify: `src/lib/i18n/translations.ts`

```typescript
export { translations, type Language, type Translations } from './translations/index'
```

---

## Phase 3: 国际化修复 + 类型修复

### Task 3.1: 修复 BMICalculator

**Files:**
- Modify: `src/components/calculators/BMICalculator.tsx`

将硬编码中文替换为 `t.bmi.xxx`，并在 translations/calculators.ts 中添加 bmi 翻译：
```typescript
bmi: {
  title: 'BMI计算器',
  weight: '体重（kg）',
  height: '身高（cm）',
  underweight: '偏瘦',
  normal: '正常',
  overweight: '偏胖',
  obese: '肥胖',
  range: '偏瘦: <18.5 正常: 18.5-24 偏胖: 24-28 肥胖: >28',
}
```

使用具体类型替代 `any`:
```typescript
const [category, setCategory] = useState<BMICategoryResult | null>(null)
```

### Task 3.2: 修复 TipCalculator

**Files:**
- Modify: `src/components/calculators/TipCalculator.tsx`

类似模式，添加 `t.tip.xxx` 翻译 key。

### Task 3.3: 修复 DiscountCalculator

**Files:**
- Modify: `src/components/calculators/DiscountCalculator.tsx`

### Task 3.4: 修复 CompoundCalculator

**Files:**
- Modify: `src/components/calculators/CompoundCalculator.tsx`

### Task 3.5: 修复 DateCalculator

**Files:**
- Modify: `src/components/calculators/DateCalculator.tsx`

### Task 3.6: 修复 DueDateCalculator

**Files:**
- Modify: `src/components/calculators/DueDateCalculator.tsx`

### Task 3.7: 修复 BabyGrowthCalculator

**Files:**
- Modify: `src/components/calculators/BabyGrowthCalculator.tsx`

### Task 3.8: 修复 lib 中的硬编码中文

**Files:**
- Modify: `src/lib/calculators/bmi.ts` — getBMICategory 返回 key 而非硬编码中文
- Modify: `src/lib/growthData.ts` — getGrowthPercentile 返回 key 而非硬编码中文

BMICategory 新接口：
```typescript
export type BMICategoryKey = 'underweight' | 'normal' | 'overweight' | 'obese'

export const getBMICategory = (bmi: number): { key: BMICategoryKey; color: string } => {
  if (bmi < 18.5) return { key: 'underweight', color: 'text-blue-500' }
  if (bmi < 24) return { key: 'normal', color: 'text-green-500' }
  if (bmi < 28) return { key: 'overweight', color: 'text-yellow-500' }
  return { key: 'obese', color: 'text-red-500' }
}
```

---

## Phase 4: 组件提取 + 消除重复

### Task 4.1: 创建 PageLayout 共享组件

**Files:**
- Create: `src/components/PageLayout.tsx`

```tsx
import Link from 'next/link'

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6">
          <span>←</span>
          <span>返回首页</span>
        </Link>
        {children}
      </div>
    </div>
  )
}
```

### Task 4.2: 更新 calculators/layout.tsx 和 converters/layout.tsx

**Files:**
- Modify: `src/app/calculators/layout.tsx`
- Modify: `src/app/converters/layout.tsx`

改为使用 PageLayout 组件。

### Task 4.3: 提取 HomeClient 中的 ToolCategory 组件

**Files:**
- Create: `src/components/ToolCategory.tsx`
- Modify: `src/app/HomeClient.tsx`

```tsx
// ToolCategory.tsx
import Link from 'next/link'
import Card from '@/components/Card'

interface ToolItem { title: string; href: string }

interface ToolCategoryProps {
  icon: string
  title: string
  items: ToolItem[]
  colorClass: string   // 'blue' | 'indigo' | 'green'
  columns?: string     // grid-cols class
}

export default function ToolCategory({ icon, title, items, colorClass, columns = 'lg:grid-cols-7' }: ToolCategoryProps) {
  const colorMap = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
  }
  const colors = colorMap[colorClass as keyof typeof colorMap] || colorMap.blue

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center`}>
          <span className={`${colors.text} font-bold`}>{icon}</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className={`grid grid-cols-2 md:grid-cols-3 ${columns} gap-4`}>
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer text-center">
              <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center mb-3 mx-auto`}>
                <span className={`${colors.text} text-lg`}>🔄</span>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

---

## Phase 5: CodeFormatter + ErrorBoundary + 环境变量

### Task 5.1: 实现真正的 CodeFormatter

**Files:**
- Modify: `src/components/dev-tools/CodeFormatter.tsx`

使用 prettier 的 format() API：
```typescript
import { format } from 'prettier'
import * as prettierPluginHtml from 'prettier/plugins/html'
import * as prettierPluginBabel from 'prettier/plugins/babel'
import * as prettierPluginEstree from 'prettier/plugins/estree'
import * as prettierPluginPostcss from 'prettier/plugins/postcss'

const formatCode = async () => {
  try {
    let formatted: string
    if (language === 'html') {
      formatted = await format(input, { parser: 'html', plugins: [prettierPluginHtml] })
    } else if (language === 'css') {
      formatted = await format(input, { parser: 'css', plugins: [prettierPluginPostcss] })
    } else {
      formatted = await format(input, { parser: 'babel', plugins: [prettierPluginBabel, prettierPluginEstree] })
    }
    setOutput(formatted)
  } catch (e) {
    setOutput(e instanceof Error ? `格式化失败：${e.message}` : '格式化失败')
  }
}
```

### Task 5.2: 创建 ErrorBoundary

**Files:**
- Create: `src/components/ErrorBoundary.tsx`

```tsx
'use client'

import { Component, ReactNode } from 'react'

interface Props { children: ReactNode; fallback?: ReactNode }
interface State { hasError: boolean; error: Error | null }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8 text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">出错了</h2>
          <p className="text-gray-600">{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            重试
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
```

### Task 5.3: 环境变量管理 baseUrl

**Files:**
- Create: `.env.local`
- Modify: `src/app/robots.ts`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/layout.tsx` (og:url)

.env.local:
```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

各文件使用 `process.env.NEXT_PUBLIC_BASE_URL || 'https://calcmaster.com'`。

---

## Phase 6: 反模式修复 + 样式统一

### Task 6.1: 修复 TimeConverter Math.random()

**Files:**
- Modify: `src/components/converters/TimeConverter.tsx`

将 `key={zone.value + Math.random()}` 改为 `key={zone.value}`。

### Task 6.2: 修复 DateCalculator 原地修改

**Files:**
- Modify: `src/components/calculators/DateCalculator.tsx`

修复 calculateWorkdays 中的 Date 修改问题：
```typescript
const calculateWorkdays = (start: Date, end: Date): number => {
  let count = 0
  const current = new Date(start)
  const endTime = end.getTime()
  while (current.getTime() <= endTime) {
    if (!isWeekend(current)) count++
    current.setDate(current.getDate() + 1)
  }
  return count
}
```

### Task 6.3: 创建统一样式常量

**Files:**
- Create: `src/lib/theme.ts`

```typescript
export const TOOL_THEMES = {
  blue:   { gradient: 'from-blue-50 to-indigo-50', button: 'from-blue-600 to-blue-700', focus: 'focus:ring-blue-100 focus:border-blue-500' },
  green:  { gradient: 'from-green-50 to-emerald-50', button: 'from-green-600 to-green-700', focus: 'focus:ring-green-100 focus:border-green-500' },
  orange: { gradient: 'from-orange-50 to-amber-50', button: 'from-orange-600 to-orange-700', focus: 'focus:ring-orange-100 focus:border-orange-500' },
  purple: { gradient: 'from-purple-50 to-violet-50', button: 'from-purple-600 to-purple-700', focus: 'focus:ring-purple-100 focus:border-purple-500' },
  pink:   { gradient: 'from-pink-50 to-rose-50', button: 'from-pink-600 to-pink-700', focus: 'focus:ring-pink-100 focus:border-pink-500' },
  teal:   { gradient: 'from-teal-50 to-emerald-50', button: 'from-teal-600 to-teal-700', focus: 'focus:ring-teal-100 focus:border-teal-500' },
  cyan:   { gradient: 'from-cyan-50 to-sky-50', button: 'from-cyan-600 to-cyan-700', focus: 'focus:ring-cyan-100 focus:border-cyan-500' },
  yellow: { gradient: 'from-yellow-50 to-amber-50', button: 'from-yellow-600 to-yellow-700', focus: 'focus:ring-yellow-100 focus:border-yellow-500' },
  red:    { gradient: 'from-red-50 to-red-100', button: 'from-red-600 to-red-700', focus: 'focus:ring-red-100 focus:border-red-500' },
  gray:   { gradient: 'from-gray-50 to-gray-100', button: 'from-gray-600 to-gray-700', focus: 'focus:ring-gray-100 focus:border-gray-500' },
} as const

export type ThemeKey = keyof typeof TOOL_THEMES

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
```

### Task 6.4: 在 dev-tools 组件中使用统一样式

**Files:**
- Modify: 所有 `src/components/dev-tools/*.tsx` 文件

将硬编码的 gradient/button 样式引用改为使用 `TOOL_THEMES`。

---

## Phase 7: 验证

### Task 7.1: 运行全部测试

```bash
npm test
```

预期：全部测试通过。

### Task 7.2: 运行构建

```bash
npm run build
```

预期：构建成功，无 TypeScript 错误。

### Task 7.3: 开发服务器验证

```bash
npm run dev
```

逐一验证每个功能页面。

### Task 7.4: Git 提交

```bash
git add -A
git commit -m "refactor: comprehensive refactoring - tests, i18n, types, shared components"
```
