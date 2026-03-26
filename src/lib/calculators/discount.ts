export const calculateDiscount = (originalPrice: number, discountPercent: number) => {
  const discountAmount = originalPrice * (discountPercent / 100)
  const finalPrice = originalPrice - discountAmount
  return { finalPrice, discountAmount, savings: discountAmount }
}
