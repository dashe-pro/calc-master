# CalcMaster 全面重构设计文档

**日期:** 2026-06-05
**状态:** 已批准

---

## 一、测试体系 (Vitest)

### 新增依赖
- `vitest` — 测试运行器
- `@vitest/coverage-v8` — 覆盖率报告

### 测试结构
```
src/lib/__tests__/
├── calculators/
│   ├── bmi.test.ts
│   ├── compound.test.ts
│   ├── discount.test.ts
│   ├── dueDate.test.ts
│   ├── mortgage.test.ts
│   └── tip.test.ts
├── converters/
│   ├── area.test.ts
│   ├── data.test.ts
│   ├── length.test.ts
│   ├── temperature.test.ts
│   └── weight.test.ts
├── growthData.test.ts
└── utils.test.ts
```

### 测试内容
- 正常输入 → 正确输出
- 边界值（0, 负数, 极大值, NaN/Infinity）
- i18n name 查询（zh/en 都存在）
- 房贷：零利率分支、等额本息 vs 等额本金对比
- 生长百分位：各百分位边界值

---

## 二、国际化完善 + 类型修复

### 翻译文件拆分
`src/lib/i18n/translations/` → `common.ts`, `converters.ts`, `calculators.ts`, `devTools.ts` + `index.ts` 合并

### 硬编码修复
修复以下组件中的硬编码中文：
BMICalculator, TipCalculator, DiscountCalculator, CompoundCalculator,
DateCalculator, DueDateCalculator, BabyGrowthCalculator
以及 lib 中的 BMICategory, GrowthPercentile 标签

### 类型修复
新增 `src/lib/types.ts`，替换全部 `useState<any>`

---

## 三、组件重构

### 新增共享组件
- `PageLayout.tsx` — 合并 calculators/layout 和 converters/layout
- `ConverterLayout.tsx` — 转换器通用布局（输入+单位 → 结果+单位）
- `ToolCategory.tsx` — 首页分类卡片区域

### 反模式修复
- TimeConverter: Math.random() in key → 直接使用 zone.value
- DateCalculator: Date 原地修改 → 使用 getTime() 比较

### 统一样式
`src/lib/theme.ts` 定义 TOOL_THEMES 常量

---

## 四、CodeFormatter + ErrorBoundary + 环境变量

### CodeFormatter
用 prettier API 实现真实格式化

### ErrorBoundary
`components/ErrorBoundary.tsx` class component

### 环境变量
`NEXT_PUBLIC_BASE_URL` 管理 baseUrl

---

## 五、实施顺序

1. 安装依赖 + 配置 Vitest
2. 编写测试（先写 → 确认全部通过）
3. 拆分翻译文件
4. 修复国际化（逐个组件）
5. 修复 TypeScript 类型
6. 提取共享组件 + 消除重复
7. 实现 CodeFormatter + ErrorBoundary + 环境变量
8. 修复 React 反模式
9. 统一样式系统
10. 全量功能验证

## 六、验证策略

每个功能页面通过 `npm run dev` 手动验证：
- 页面正常加载
- 计算结果正确
- 中英文切换正常
- 边界情况不崩溃
