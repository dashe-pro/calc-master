import { addDays, addWeeks, differenceInDays, format } from 'date-fns'

export const calculateDueDate = (lastPeriod: Date) => {
  const dueDate = addDays(lastPeriod, 280)
  const weeksPregnant = Math.floor(differenceInDays(new Date(), lastPeriod) / 7)
  const daysPregnant = differenceInDays(new Date(), lastPeriod) % 7
  return { dueDate, weeksPregnant, daysPregnant }
}

export const formatDate = (date: Date) => format(date, 'yyyy-MM-dd')
