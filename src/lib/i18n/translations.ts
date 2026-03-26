export const translations = {
  zh: {
    header: {
      title: 'CalcMaster'
    },
    footer: {
      copyright: '© 2026 CalcMaster. 保留所有权利。',
      description: '免费、易用的在线计算工具'
    },
    common: {
      language: '语言',
      chinese: '中文',
      english: 'English'
    },
    home: {
      title: '全能在线计算工具',
      subtitle: '免费、易用的在线计算工具，涵盖单位换算、财务计算、健康计算、开发者工具等多种功能',
      unitConverters: '单位换算工具',
      onlineCalculators: '在线计算器',
      devTools: '开发者工具'
    },
    converters: {
      length: '长度换算',
      weight: '重量换算',
      temperature: '温度换算',
      area: '面积换算',
      data: '数据存储',
      currency: '汇率换算',
      time: '时间换算'
    },
    converterPages: {
      length: {
        title: '长度换算 - CalcMaster',
        description: '免费的长度单位换算器，支持米、英尺、厘米、英寸等多种单位转换'
      },
      weight: {
        title: '重量换算 - CalcMaster',
        description: '免费的重量单位换算器，支持千克、磅、克、盎司等多种单位转换'
      },
      temperature: {
        title: '温度换算 - CalcMaster',
        description: '免费的温度单位换算器，支持摄氏度、华氏度、开尔文等单位转换'
      },
      area: {
        title: '面积换算 - CalcMaster',
        description: '免费的面积单位换算器，支持平方米、平方英尺、公顷等多种单位转换'
      },
      data: {
        title: '数据存储换算 - CalcMaster',
        description: '免费的数据存储单位换算器，支持字节、KB、MB、GB、TB等单位转换'
      },
      currency: {
        title: '汇率换算 - CalcMaster',
        description: '免费的汇率换算工具'
      },
      time: {
        title: '时间换算 - CalcMaster',
        description: '免费的时间单位换算器，支持秒、分钟、小时、天等单位转换'
      }
    },
    calculators: {
      mortgage: '房贷计算器',
      bmi: 'BMI计算器',
      discount: '折扣计算器',
      tip: '小费计算器',
      compound: '复利计算器',
      date: '日期计算器',
      dueDate: '预产期计算器',
      babyGrowth: '宝宝生长百分位'
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
    }
  },
  devTools: {
    jsonFormatter: 'JSON格式化/校验',
    timestampConverter: '时间戳转换',
    base64Encoder: 'Base64编码/解码',
    urlEncoder: 'URL编码/解码',
    regexTester: '正则表达式测试',
    codeFormatter: '代码格式化',
    textDiff: '文本对比',
    qrGenerator: '二维码生成器'
  },
  devToolPages: {
    jsonFormatter: {
      title: 'JSON格式化/校验 - CalcMaster',
      description: '免费的JSON格式化和校验工具，调试API、查看日志'
    },
    timestampConverter: {
      title: '时间戳转换 - CalcMaster',
      description: '免费的时间戳转换工具，前后端联调、日志分析'
    },
    base64Encoder: {
      title: 'Base64编码/解码 - CalcMaster',
      description: '免费的Base64编码和解码工具，图片转码、数据传输'
    },
    urlEncoder: {
      title: 'URL编码/解码 - CalcMaster',
      description: '免费的URL编码和解码工具，前端传参调试'
    },
    regexTester: {
      title: '正则表达式测试 - CalcMaster',
      description: '免费的正则表达式测试工具，文本匹配、表单验证'
    },
    codeFormatter: {
      title: '代码格式化 - CalcMaster',
      description: '免费的代码格式化工具，美化HTML/CSS/JS'
    },
    textDiff: {
      title: '文本对比 - CalcMaster',
      description: '免费的文本对比工具，代码版本差异对比'
    },
    qrGenerator: {
      title: '二维码生成器 - CalcMaster',
      description: '免费的二维码生成器，分享链接、Wi-Fi配置'
    }
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
    header: {
      title: 'CalcMaster'
    },
    footer: {
      copyright: '© 2026 CalcMaster. All rights reserved.',
      description: 'Free and easy-to-use online calculator tools'
    },
    common: {
      language: 'Language',
      chinese: '中文',
      english: 'English'
    },
    home: {
      title: 'All-in-One Online Calculator',
      subtitle: 'Free and easy-to-use online calculator tools covering unit conversion, financial calculation, health calculation, developer tools and more',
      unitConverters: 'Unit Converters',
      onlineCalculators: 'Online Calculators',
      devTools: 'Developer Tools'
    },
    converters: {
      length: 'Length Converter',
      weight: 'Weight Converter',
      temperature: 'Temperature Converter',
      area: 'Area Converter',
      data: 'Data Storage Converter',
      currency: 'Currency Converter',
      time: 'Time Converter'
    },
    converterPages: {
      length: {
        title: 'Length Converter - CalcMaster',
        description: 'Free length unit converter supporting meters, feet, centimeters, inches and more'
      },
      weight: {
        title: 'Weight Converter - CalcMaster',
        description: 'Free weight unit converter supporting kilograms, pounds, grams, ounces and more'
      },
      temperature: {
        title: 'Temperature Converter - CalcMaster',
        description: 'Free temperature unit converter supporting Celsius, Fahrenheit, Kelvin and more'
      },
      area: {
        title: 'Area Converter - CalcMaster',
        description: 'Free area unit converter supporting square meters, square feet, hectares and more'
      },
      data: {
        title: 'Data Storage Converter - CalcMaster',
        description: 'Free data storage unit converter supporting bytes, KB, MB, GB, TB and more'
      },
      currency: {
        title: 'Currency Converter - CalcMaster',
        description: 'Free currency converter tool'
      },
      time: {
        title: 'Time Converter - CalcMaster',
        description: 'Free time unit converter supporting seconds, minutes, hours, days and more'
      }
    },
    calculators: {
      mortgage: 'Mortgage Calculator',
      bmi: 'BMI Calculator',
      discount: 'Discount Calculator',
      tip: 'Tip Calculator',
      compound: 'Compound Interest Calculator',
      date: 'Date Calculator',
      dueDate: 'Due Date Calculator',
      babyGrowth: 'Baby Growth Percentile'
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
      }
    },
    devTools: {
      jsonFormatter: 'JSON Formatter/Validator',
      timestampConverter: 'Timestamp Converter',
      base64Encoder: 'Base64 Encoder/Decoder',
      urlEncoder: 'URL Encoder/Decoder',
      regexTester: 'Regex Tester',
      codeFormatter: 'Code Formatter',
      textDiff: 'Text Diff',
      qrGenerator: 'QR Code Generator'
    },
    devToolPages: {
      jsonFormatter: {
        title: 'JSON Formatter/Validator - CalcMaster',
        description: 'Free JSON formatter and validator tool for debugging APIs and viewing logs'
      },
      timestampConverter: {
        title: 'Timestamp Converter - CalcMaster',
        description: 'Free timestamp converter tool for frontend-backend integration and log analysis'
      },
      base64Encoder: {
        title: 'Base64 Encoder/Decoder - CalcMaster',
        description: 'Free Base64 encoding and decoding tool for image transcoding and data transmission'
      },
      urlEncoder: {
        title: 'URL Encoder/Decoder - CalcMaster',
        description: 'Free URL encoding and decoding tool for frontend parameter debugging'
      },
      regexTester: {
        title: 'Regex Tester - CalcMaster',
        description: 'Free regex tester tool for text matching and form validation'
      },
      codeFormatter: {
        title: 'Code Formatter - CalcMaster',
        description: 'Free code formatter tool for beautifying HTML/CSS/JS'
      },
      textDiff: {
        title: 'Text Diff - CalcMaster',
        description: 'Free text diff tool for code version comparison'
      },
      qrGenerator: {
        title: 'QR Code Generator - CalcMaster',
        description: 'Free QR code generator for sharing links and Wi-Fi configuration'
      }
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

export type Language = 'zh' | 'en'
export type Translations = typeof translations.zh
