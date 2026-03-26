export const calculateTip = (billAmount: number, tipPercent: number, splitCount: number = 1) => {
  const tipAmount = billAmount * (tipPercent / 100)
  const total = billAmount + tipAmount
  const perPerson = total / splitCount
  return { tipAmount, total, perPerson }
}
