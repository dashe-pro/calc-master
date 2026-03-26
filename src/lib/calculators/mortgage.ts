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

export const calculateEqualPrincipalInterest = (
  loanAmount: number,
  monthlyRate: number,
  totalPayments: number
): MortgageResult => {
  if (monthlyRate === 0) {
    const monthlyPayment = loanAmount / totalPayments
    const paymentSchedule: MortgagePaymentSchedule[] = []
    let remainingPrincipal = loanAmount
    
    for (let i = 1; i <= totalPayments; i++) {
      paymentSchedule.push({
        month: i,
        payment: monthlyPayment,
        principal: monthlyPayment,
        interest: 0,
        remainingPrincipal: Math.max(0, remainingPrincipal - monthlyPayment),
      })
      remainingPrincipal -= monthlyPayment
    }
    
    return {
      monthlyPayment,
      totalPayment: monthlyPayment * totalPayments,
      totalInterest: 0,
      paymentSchedule,
    }
  }

  const monthlyPayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1)

  const totalPayment = monthlyPayment * totalPayments
  const totalInterest = totalPayment - loanAmount
  
  const paymentSchedule: MortgagePaymentSchedule[] = []
  let remainingPrincipal = loanAmount
  
  for (let i = 1; i <= totalPayments; i++) {
    const interest = remainingPrincipal * monthlyRate
    const principal = monthlyPayment - interest
    remainingPrincipal -= principal
    
    paymentSchedule.push({
      month: i,
      payment: monthlyPayment,
      principal: principal,
      interest: interest,
      remainingPrincipal: Math.max(0, remainingPrincipal),
    })
  }

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    paymentSchedule,
  }
}

export const calculateEqualPrincipal = (
  loanAmount: number,
  monthlyRate: number,
  totalPayments: number
): MortgageResult => {
  const monthlyPrincipal = loanAmount / totalPayments
  let totalInterest = 0
  let remainingPrincipal = loanAmount
  const paymentSchedule: MortgagePaymentSchedule[] = []

  for (let i = 1; i <= totalPayments; i++) {
    const interest = remainingPrincipal * monthlyRate
    const payment = monthlyPrincipal + interest
    totalInterest += interest
    remainingPrincipal -= monthlyPrincipal

    paymentSchedule.push({
      month: i,
      payment,
      principal: monthlyPrincipal,
      interest,
      remainingPrincipal: Math.max(0, remainingPrincipal),
    })
  }

  const firstMonthPayment = paymentSchedule[0]?.payment || 0
  const lastMonthPayment = paymentSchedule[paymentSchedule.length - 1]?.payment || 0
  const monthlyPaymentDecrease = monthlyPrincipal * monthlyRate
  const totalPayment = loanAmount + totalInterest

  return {
    monthlyPayment: firstMonthPayment,
    firstMonthPayment,
    lastMonthPayment,
    totalPayment,
    totalInterest,
    paymentSchedule,
    monthlyPaymentDecrease,
  }
}

export const calculateMortgage = ({
  loanAmount,
  interestRate,
  loanTerm,
  repaymentType,
}: MortgageParams): MortgageResult => {
  const monthlyRate = interestRate / 100 / 12
  const totalPayments = loanTerm * 12

  if (repaymentType === 'equal-principal-interest') {
    return calculateEqualPrincipalInterest(loanAmount, monthlyRate, totalPayments)
  } else {
    return calculateEqualPrincipal(loanAmount, monthlyRate, totalPayments)
  }
}
