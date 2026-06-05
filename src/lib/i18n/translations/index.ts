import { common } from './common'
import { converters } from './converters'
import { calculators } from './calculators'
import { devTools } from './devTools'

const zh = {
  ...common.zh,
  ...converters.zh,
  ...calculators.zh,
  ...devTools.zh,
}

const en = {
  ...common.en,
  ...converters.en,
  ...calculators.en,
  ...devTools.en,
}

export const translations = { zh, en }
export type Language = 'zh' | 'en'
export type Translations = typeof zh
