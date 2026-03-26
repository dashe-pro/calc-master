export interface BMICategory {
  category: string
  color: string
}

export const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100
  return weight / (heightInMeters * heightInMeters)
}

export const getBMICategory = (bmi: number): BMICategory => {
  if (bmi < 18.5) return { category: '偏瘦', color: 'text-blue-500' }
  if (bmi < 24) return { category: '正常', color: 'text-green-500' }
  if (bmi < 28) return { category: '偏胖', color: 'text-yellow-500' }
  return { category: '肥胖', color: 'text-red-500' }
}
