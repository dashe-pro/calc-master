export function generateRandomNumbers(min: number, max: number, count: number, unique: boolean): number[] {
  const actualMin = Math.min(min, max)
  const actualMax = Math.max(min, max)
  const range = actualMax - actualMin + 1

  if (unique && count > range) {
    count = range
  }

  const safeCount = Math.max(1, Math.min(count, unique ? range : 10000))

  if (unique) {
    const pool: number[] = []
    for (let i = actualMin; i <= actualMax; i++) {
      pool.push(i)
    }
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]]
    }
    return pool.slice(0, safeCount)
  }

  const result: number[] = []
  for (let i = 0; i < safeCount; i++) {
    result.push(Math.floor(Math.random() * range) + actualMin)
  }
  return result
}
