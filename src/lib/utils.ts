export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export const formatNumber = (num: number, decimals: number = 4): string => {
  if (Number.isNaN(num) || !Number.isFinite(num)) return '0'
  const formatted = Number(num.toFixed(decimals))
  return formatted.toString()
}
