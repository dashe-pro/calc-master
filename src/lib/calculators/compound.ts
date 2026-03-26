export interface CompoundParams {
  principal: number
  rate: number
  years: number
  monthlyContribution: number
}

export const calculateCompoundInterest = ({ principal, rate, years, monthlyContribution }: CompoundParams) => {
  const monthlyRate = rate / 100 / 12
  const periods = years * 12

  let futureValue = principal * Math.pow(1 + monthlyRate, periods)
  if (monthlyContribution > 0) {
    futureValue += monthlyContribution * ((Math.pow(1 + monthlyRate, periods) - 1) / monthlyRate)
  }

  const totalContributions = principal + monthlyContribution * periods
  const totalInterest = futureValue - totalContributions

  return { futureValue, totalContributions, totalInterest }
}
