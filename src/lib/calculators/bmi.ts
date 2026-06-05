import type { BMICategoryResult } from '@/lib/types'

export type BMICategoryKey = 'underweight' | 'normal' | 'overweight' | 'obese'

export interface BMICategoryInfo {
  key: BMICategoryKey
  color: string
}

export const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100
  return weight / (heightInMeters * heightInMeters)
}

export const getBMICategory = (bmi: number): BMICategoryInfo => {
  if (bmi < 18.5) return { key: 'underweight', color: 'text-blue-500' }
  if (bmi < 24) return { key: 'normal', color: 'text-green-500' }
  if (bmi < 28) return { key: 'overweight', color: 'text-yellow-500' }
  return { key: 'obese', color: 'text-red-500' }
}
