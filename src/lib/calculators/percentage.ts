export function percentOf(value: number, percent: number): number {
  return (value * percent) / 100
}

export function percentWhatIs(value: number, total: number): number {
  if (total === 0) return 0
  return (value / total) * 100
}

export function percentChange(from: number, to: number): { difference: number; percentChange: number; isIncrease: boolean } {
  if (from === 0) return { difference: 0, percentChange: 0, isIncrease: true }
  const difference = to - from
  const percentChange = (Math.abs(difference) / Math.abs(from)) * 100
  return { difference, percentChange, isIncrease: difference >= 0 }
}
