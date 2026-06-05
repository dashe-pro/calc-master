'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { TEMP_UNITS, convertTemperature, getTempUnitName } from '@/lib/converters/temperature'
import { formatNumber } from '@/lib/utils'
import { useI18n } from '@/lib/i18n/context'

export default function TemperatureConverter() {
  const { t, language } = useI18n()
  const [value, setValue] = useState<string>('1')
  const [fromUnit, setFromUnit] = useState<typeof TEMP_UNITS[number]>(TEMP_UNITS[0])
  const [toUnit, setToUnit] = useState<typeof TEMP_UNITS[number]>(TEMP_UNITS[1])

  const numValue = parseFloat(value) || 0
  const result = convertTemperature(numValue, fromUnit, toUnit)

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.converters.temperature}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder={t.converterUI.inputPlaceholder} />
          <Select value={fromUnit} onChange={(e) => setFromUnit(e.target.value as typeof TEMP_UNITS[number])}>
            {TEMP_UNITS.map((unit) => (
              <option key={unit} value={unit}>{getTempUnitName(unit, language)}</option>
            ))}
          </Select>
        </div>
        <div className="space-y-3">
          <Input type="number" value={formatNumber(result, 8)} readOnly placeholder={t.converterUI.resultPlaceholder} />
          <Select value={toUnit} onChange={(e) => setToUnit(e.target.value as typeof TEMP_UNITS[number])}>
            {TEMP_UNITS.map((unit) => (
              <option key={unit} value={unit}>{getTempUnitName(unit, language)}</option>
            ))}
          </Select>
        </div>
      </div>
    </Card>
  )
}
