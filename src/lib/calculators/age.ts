export interface AgeResult {
  years: number
  months: number
  days: number
  totalDays: number
  nextBirthday: Date
  daysUntilBirthday: number
  zodiac: string
  westernZodiac: string
}

const CHINESE_ZODIAC = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']

function getChineseZodiac(year: number): string {
  return CHINESE_ZODIAC[(year - 4) % 12]
}

function getWesternZodiac(month: number, day: number): string {
  const signs = [
    { name: '摩羯座', start: [1, 1], end: [1, 19] },
    { name: '水瓶座', start: [1, 20], end: [2, 18] },
    { name: '双鱼座', start: [2, 19], end: [3, 20] },
    { name: '白羊座', start: [3, 21], end: [4, 19] },
    { name: '金牛座', start: [4, 20], end: [5, 20] },
    { name: '双子座', start: [5, 21], end: [6, 20] },
    { name: '巨蟹座', start: [6, 21], end: [7, 22] },
    { name: '狮子座', start: [7, 23], end: [8, 22] },
    { name: '处女座', start: [8, 23], end: [9, 22] },
    { name: '天秤座', start: [9, 23], end: [10, 22] },
    { name: '天蝎座', start: [10, 23], end: [11, 21] },
    { name: '射手座', start: [11, 22], end: [12, 21] },
    { name: '摩羯座', start: [12, 22], end: [12, 31] },
  ]

  for (const sign of signs) {
    const [sM, sD] = sign.start
    const [eM, eD] = sign.end
    if ((month === sM && day >= sD) || (month === eM && day <= eD)) {
      return sign.name
    }
  }
  return '摩羯座'
}

export function calculateAge(birthDate: Date, now: Date = new Date()): AgeResult {
  let years = now.getFullYear() - birthDate.getFullYear()
  let months = now.getMonth() - birthDate.getMonth()
  let days = now.getDate() - birthDate.getDate()

  if (days < 0) {
    months--
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += lastMonth.getDate()
  }

  if (months < 0) {
    years--
    months += 12
  }

  const totalDays = Math.floor((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24))

  const nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate())
  if (nextBirthday <= now) {
    nextBirthday.setFullYear(now.getFullYear() + 1)
  }
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  return {
    years,
    months,
    days,
    totalDays,
    nextBirthday,
    daysUntilBirthday,
    zodiac: getChineseZodiac(birthDate.getFullYear()),
    westernZodiac: getWesternZodiac(birthDate.getMonth() + 1, birthDate.getDate()),
  }
}
