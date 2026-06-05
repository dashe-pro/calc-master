export const TOOL_THEMES = {
  blue:   { gradient: 'from-blue-50 to-indigo-50', button: 'from-blue-600 to-blue-700', focus: 'focus:ring-blue-100 focus:border-blue-500' },
  green:  { gradient: 'from-green-50 to-emerald-50', button: 'from-green-600 to-green-700', focus: 'focus:ring-green-100 focus:border-green-500' },
  orange: { gradient: 'from-orange-50 to-amber-50', button: 'from-orange-600 to-orange-700', focus: 'focus:ring-orange-100 focus:border-orange-500' },
  purple: { gradient: 'from-purple-50 to-violet-50', button: 'from-purple-600 to-purple-700', focus: 'focus:ring-purple-100 focus:border-purple-500' },
  pink:   { gradient: 'from-pink-50 to-rose-50', button: 'from-pink-600 to-pink-700', focus: 'focus:ring-pink-100 focus:border-pink-500' },
  teal:   { gradient: 'from-teal-50 to-emerald-50', button: 'from-teal-600 to-teal-700', focus: 'focus:ring-teal-100 focus:border-teal-500' },
  cyan:   { gradient: 'from-cyan-50 to-sky-50', button: 'from-cyan-600 to-cyan-700', focus: 'focus:ring-cyan-100 focus:border-cyan-500' },
  yellow: { gradient: 'from-yellow-50 to-amber-50', button: 'from-yellow-600 to-yellow-700', focus: 'focus:ring-yellow-100 focus:border-yellow-500' },
  red:    { gradient: 'from-red-50 to-red-100', button: 'from-red-600 to-red-700', focus: 'focus:ring-red-100 focus:border-red-500' },
  gray:   { gradient: 'from-gray-50 to-gray-100', button: 'from-gray-600 to-gray-700', focus: 'focus:ring-gray-100 focus:border-gray-500' },
} as const

export type ThemeKey = keyof typeof TOOL_THEMES
