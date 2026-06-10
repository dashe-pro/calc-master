'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from '@/lib/dev-tools/color'
import type { RGB, HSL } from '@/lib/dev-tools/color'
import { useI18n } from '@/lib/i18n/context'

export default function ColorConverter() {
  const { t } = useI18n()
  const [hex, setHex] = useState('#3B82F6')
  const [rgb, setRgb] = useState<RGB>({ r: 59, g: 130, b: 246 })
  const [hsl, setHsl] = useState<HSL>({ h: 217, s: 91, l: 60 })

  const updateFromHex = (value: string) => {
    setHex(value)
    const result = hexToRgb(value)
    if (result) {
      setRgb(result)
      setHsl(rgbToHsl(result.r, result.g, result.b))
    }
  }

  const updateFromRgb = (channel: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgb, [channel]: Math.max(0, Math.min(255, value)) }
    setRgb(newRgb)
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b))
  }

  const updateFromHsl = (channel: 'h' | 's' | 'l', value: number) => {
    const newHsl = { ...hsl, [channel]: Math.max(0, Math.min(channel === 'h' ? 360 : 100, value)) }
    setHsl(newHsl)
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    setRgb(newRgb)
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }

  const colorString = `rgb(${rgb.r},${rgb.g},${rgb.b})`

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.devTools.colorConverter}</h2>

      <div className="mb-6 flex items-center gap-4">
        <input
          type="color"
          value={hex}
          onChange={(e) => updateFromHex(e.target.value)}
          className="w-20 h-20 rounded-xl border-2 border-gray-200 cursor-pointer"
        />
        <div
          className="flex-1 h-20 rounded-xl border border-gray-200"
          style={{ backgroundColor: colorString }}
        />
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">{t.devToolUI.colorHex}</label>
          <Input value={hex} onChange={(e) => updateFromHex(e.target.value)} placeholder="#000000" />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">{t.devToolUI.colorRgb}</label>
          <div className="grid grid-cols-3 gap-2">
            <Input type="number" min={0} max={255} value={String(rgb.r)} onChange={(e) => updateFromRgb('r', parseInt(e.target.value) || 0)} />
            <Input type="number" min={0} max={255} value={String(rgb.g)} onChange={(e) => updateFromRgb('g', parseInt(e.target.value) || 0)} />
            <Input type="number" min={0} max={255} value={String(rgb.b)} onChange={(e) => updateFromRgb('b', parseInt(e.target.value) || 0)} />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">{t.devToolUI.colorHsl}</label>
          <div className="grid grid-cols-3 gap-2">
            <Input type="number" min={0} max={360} value={String(hsl.h)} onChange={(e) => updateFromHsl('h', parseInt(e.target.value) || 0)} />
            <Input type="number" min={0} max={100} value={String(hsl.s)} onChange={(e) => updateFromHsl('s', parseInt(e.target.value) || 0)} />
            <Input type="number" min={0} max={100} value={String(hsl.l)} onChange={(e) => updateFromHsl('l', parseInt(e.target.value) || 0)} />
          </div>
        </div>
      </div>
    </Card>
  )
}
