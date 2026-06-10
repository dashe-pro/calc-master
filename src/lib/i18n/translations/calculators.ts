export const calculators = {
  zh: {
    calculators: {
      mortgage: '房贷计算器',
      bmi: 'BMI计算器',
      discount: '折扣计算器',
      tip: '小费计算器',
      compound: '复利计算器',
      date: '日期计算器',
      dueDate: '预产期计算器',
      babyGrowth: '宝宝生长百分位',
      percentage: '百分比计算器',
    },
    calculatorPages: {
      mortgage: {
        title: '房贷计算器 - CalcMaster',
        description: '免费的房贷计算器，计算每月还款额、总还款额和总利息'
      },
      bmi: {
        title: 'BMI计算器 - CalcMaster',
        description: '免费的BMI计算器，计算您的身体质量指数'
      },
      discount: {
        title: '折扣计算器 - CalcMaster',
        description: '免费的折扣计算器，计算打折后的价格和节省金额'
      },
      tip: {
        title: '小费计算器 - CalcMaster',
        description: '免费的小费计算器，快速计算应付小费金额'
      },
      compound: {
        title: '复利计算器 - CalcMaster',
        description: '免费的复利计算器，计算投资的复利增长'
      },
      date: {
        title: '日期计算器 - CalcMaster',
        description: '免费的日期计算器，计算日期差和添加天数'
      },
      dueDate: {
        title: '预产期计算器 - CalcMaster',
        description: '免费的预产期计算器，帮您计算宝宝的预产期'
      },
      babyGrowth: {
        title: '宝宝生长百分位 - CalcMaster',
        description: '免费的宝宝生长百分位计算器，评估宝宝的生长发育'
      },
      percentage: {
        title: '百分比计算器 - CalcMaster',
        description: '免费的在线百分比计算器，支持百分比计算、占比计算和百分比变化计算'
      }
    },
    bmi: {
      title: 'BMI计算器',
      weight: '体重（kg）',
      height: '身高（cm）',
      underweight: '偏瘦',
      normal: '正常',
      overweight: '偏胖',
      obese: '肥胖',
      range: '偏瘦: <18.5 正常: 18.5-24 偏胖: 24-28 肥胖: >28'
    },
    tip: {
      title: '小费计算器',
      billAmount: '账单金额（元）',
      tipPercent: '小费比例（%）',
      splitCount: '分摊人数',
      tip: '小费',
      total: '总计',
      perPerson: '人均'
    },
    discount: {
      title: '折扣计算器',
      originalPrice: '原价（元）',
      discountPercent: '折扣（%）',
      finalPrice: '折后价',
      savings: '节省'
    },
    compound: {
      title: '复利计算器',
      principal: '初始本金（元）',
      rate: '年利率（%）',
      years: '投资年限',
      monthlyContribution: '每月定投（元）',
      futureValue: '未来价值',
      totalContributions: '总投入',
      totalInterest: '总收益'
    },
    date: {
      title: '日期计算器',
      startDate: '开始日期',
      endDate: '结束日期',
      totalDays: '总天数',
      workdays: '工作日',
      days: '天'
    },
    dueDate: {
      title: '预产期计算器',
      lastPeriod: '末次月经日期',
      dueDate: '预产期',
      weeksPregnant: '当前孕周',
      remainingDays: '剩余天数',
      week: '周',
      days: '天'
    },
    babyGrowth: {
      title: '宝宝身高体重百分位',
      description: '基于中国九城市儿童生长标准（0-6岁）',
      gender: '性别',
      boy: '男孩',
      girl: '女孩',
      age: '年龄（月）',
      height: '身高（cm）',
      weight: '体重（kg）',
      heightPercentile: '身高百分位',
      weightPercentile: '体重百分位',
      referenceRange: '参考范围',
      legend: '百分位说明',
      underweight: '偏矮小',
      under: '偏矮',
      lowNormal: '中下',
      normal: '正常',
      highNormal: '中上',
      high: '偏高',
      veryHigh: '超高',
      legendNormal: '正常 (25-75%)',
      legendLowNormal: '中下/中上 (10-90%)',
      legendUnderOver: '偏矮/偏高 (3-97%)',
      legendExtreme: '偏矮小/超高 (<3% 或 >97%)'
    },
    percentage: {
      title: '百分比计算器',
      modePercentOf: 'X 的 Y% 是多少',
      modeWhatPercent: 'X 占 Y 的百分之几',
      modeChange: '百分比变化',
      value: '数值',
      percent: '百分比',
      total: '总数',
      result: '结果',
      from: '从',
      to: '到',
      increase: '增加',
      decrease: '减少',
    },
    mortgage: {
      title: '房贷计算器',
      loanAmount: '贷款金额（元）',
      interestRate: '年利率（%）',
      loanTerm: '贷款期限（年）',
      repaymentType: '还款方式',
      equalPrincipalInterest: '等额本息（每月还款相同）',
      equalPrincipal: '等额本金（利息逐月递减）',
      repaymentMethod: '还款方式',
      monthlyPayment: '每月还款',
      firstMonthPayment: '首月还款',
      totalPayment: '总还款额',
      totalInterest: '总利息',
      viewSchedule: '查看还款明细',
      hideSchedule: '收起还款明细',
      period: '期数',
      monthlyPaymentLabel: '月供',
      principal: '本金',
      interest: '利息',
      remainingPrincipal: '剩余本金',
      morePeriods: '还有 {count} 期',
      lastMonthPayment: '末月还款',
      viewComparison: '查看两种方式对比',
      hideComparison: '收起方式对比',
      repaymentComparison: '还款方式对比',
      interestDifference: '利息差额对比',
      monthlyDecrease: '每月递减'
    }
  },
  en: {
    calculators: {
      mortgage: 'Mortgage Calculator',
      bmi: 'BMI Calculator',
      discount: 'Discount Calculator',
      tip: 'Tip Calculator',
      compound: 'Compound Interest Calculator',
      date: 'Date Calculator',
      dueDate: 'Due Date Calculator',
      babyGrowth: 'Baby Growth Percentile',
      percentage: 'Percentage Calculator',
    },
    calculatorPages: {
      mortgage: {
        title: 'Mortgage Calculator - CalcMaster',
        description: 'Free mortgage calculator to calculate monthly payments, total payment and total interest'
      },
      bmi: {
        title: 'BMI Calculator - CalcMaster',
        description: 'Free BMI calculator to calculate your body mass index'
      },
      discount: {
        title: 'Discount Calculator - CalcMaster',
        description: 'Free discount calculator to calculate sale price and savings'
      },
      tip: {
        title: 'Tip Calculator - CalcMaster',
        description: 'Free tip calculator to quickly calculate tip amounts'
      },
      compound: {
        title: 'Compound Interest Calculator - CalcMaster',
        description: 'Free compound interest calculator to calculate investment growth'
      },
      date: {
        title: 'Date Calculator - CalcMaster',
        description: 'Free date calculator to calculate date differences and add days'
      },
      dueDate: {
        title: 'Due Date Calculator - CalcMaster',
        description: 'Free due date calculator to help calculate your baby\'s due date'
      },
      babyGrowth: {
        title: 'Baby Growth Percentile - CalcMaster',
        description: 'Free baby growth percentile calculator to assess your baby\'s growth and development'
      },
      percentage: {
        title: 'Percentage Calculator - CalcMaster',
        description: 'Free online percentage calculator - calculate percentages, proportions and percentage changes'
      }
    },
    bmi: {
      title: 'BMI Calculator',
      weight: 'Weight (kg)',
      height: 'Height (cm)',
      underweight: 'Underweight',
      normal: 'Normal',
      overweight: 'Overweight',
      obese: 'Obese',
      range: 'Underweight: <18.5 Normal: 18.5-24 Overweight: 24-28 Obese: >28'
    },
    tip: {
      title: 'Tip Calculator',
      billAmount: 'Bill Amount (¥)',
      tipPercent: 'Tip Percentage (%)',
      splitCount: 'Number of People',
      tip: 'Tip',
      total: 'Total',
      perPerson: 'Per Person'
    },
    discount: {
      title: 'Discount Calculator',
      originalPrice: 'Original Price (¥)',
      discountPercent: 'Discount (%)',
      finalPrice: 'Final Price',
      savings: 'Savings'
    },
    compound: {
      title: 'Compound Interest Calculator',
      principal: 'Principal (¥)',
      rate: 'Annual Rate (%)',
      years: 'Years',
      monthlyContribution: 'Monthly Contribution (¥)',
      futureValue: 'Future Value',
      totalContributions: 'Total Contributions',
      totalInterest: 'Total Interest'
    },
    date: {
      title: 'Date Calculator',
      startDate: 'Start Date',
      endDate: 'End Date',
      totalDays: 'Total Days',
      workdays: 'Workdays',
      days: 'days'
    },
    dueDate: {
      title: 'Due Date Calculator',
      lastPeriod: 'Last Menstrual Period',
      dueDate: 'Due Date',
      weeksPregnant: 'Weeks Pregnant',
      remainingDays: 'Remaining Days',
      week: 'Weeks',
      days: 'days'
    },
    babyGrowth: {
      title: 'Baby Growth Percentile',
      description: 'Based on China 9-city child growth standards (0-6 years)',
      gender: 'Gender',
      boy: 'Boy',
      girl: 'Girl',
      age: 'Age (months)',
      height: 'Height (cm)',
      weight: 'Weight (kg)',
      heightPercentile: 'Height Percentile',
      weightPercentile: 'Weight Percentile',
      referenceRange: 'Reference Range',
      legend: 'Percentile Legend',
      underweight: 'Short Stature',
      under: 'Short',
      lowNormal: 'Below Average',
      normal: 'Normal',
      highNormal: 'Above Average',
      high: 'Tall',
      veryHigh: 'Very Tall',
      legendNormal: 'Normal (25-75%)',
      legendLowNormal: 'Below/Above Average (10-90%)',
      legendUnderOver: 'Short/Tall (3-97%)',
      legendExtreme: 'Short Stature/Very Tall (<3% or >97%)'
    },
    percentage: {
      title: 'Percentage Calculator',
      modePercentOf: 'What is X% of Y',
      modeWhatPercent: 'X is what % of Y',
      modeChange: 'Percentage Change',
      value: 'Value',
      percent: 'Percent',
      total: 'Total',
      result: 'Result',
      from: 'From',
      to: 'To',
      increase: 'Increase',
      decrease: 'Decrease',
    },
    mortgage: {
      title: 'Mortgage Calculator',
      loanAmount: 'Loan Amount (¥)',
      interestRate: 'Annual Interest Rate (%)',
      loanTerm: 'Loan Term (Years)',
      repaymentType: 'Repayment Type',
      equalPrincipalInterest: 'Equal Principal & Interest (Fixed Monthly Payment)',
      equalPrincipal: 'Equal Principal (Decreasing Interest)',
      repaymentMethod: 'Repayment Method',
      monthlyPayment: 'Monthly Payment',
      firstMonthPayment: 'First Month Payment',
      totalPayment: 'Total Payment',
      totalInterest: 'Total Interest',
      viewSchedule: 'View Payment Schedule',
      hideSchedule: 'Hide Payment Schedule',
      period: 'Period',
      monthlyPaymentLabel: 'Monthly Payment',
      principal: 'Principal',
      interest: 'Interest',
      remainingPrincipal: 'Remaining Principal',
      morePeriods: '{count} more periods',
      lastMonthPayment: 'Last Month Payment',
      viewComparison: 'Compare Both Methods',
      hideComparison: 'Hide Comparison',
      repaymentComparison: 'Repayment Method Comparison',
      interestDifference: 'Interest Difference',
      monthlyDecrease: 'Monthly Decrease'
    }
  }
}
