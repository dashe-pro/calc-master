export interface BMICategoryResult {
  key: string
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
  labelKey: string
}
