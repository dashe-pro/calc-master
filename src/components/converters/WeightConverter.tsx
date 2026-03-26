'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { WEIGHT_UNITS, convertWeight, getWeightUnitName } from '@/lib/converters/weight'
import { formatNumber } from '@/lib/utils'

export default function WeightConverter() {
  const [value, setValue] = useState<string>('1')
  const [fromUnit, setFromUnit] = useState<typeof WEIGHT_UNITS[number]>(WEIGHT_UNITS[0])
  const [toUnit, setToUnit] = useState<typeof WEIGHT_UNITS[number]>(WEIGHT_UNITS[1])

  const numValue = parseFloat(value) || 0
  const result = convertWeight(numValue, fromUnit, toUnit)

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">重量换算</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="输入数值"
          />
          <Select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as typeof WEIGHT_UNITS[number])}
          >
            {WEIGHT_UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {getWeightUnitName(unit)}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-3">
          <Input
            type="number"
            value={formatNumber(result, 8)}
            readOnly
            placeholder="结果"
          />
          <Select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value as typeof WEIGHT_UNITS[number])}
          >
            {WEIGHT_UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {getWeightUnitName(unit)}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </Card>
  )
}
