'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { DATA_UNITS, convertData, getDataUnitName } from '@/lib/converters/data'
import { formatNumber } from '@/lib/utils'

export default function DataConverter() {
  const [value, setValue] = useState<string>('1')
  const [fromUnit, setFromUnit] = useState<typeof DATA_UNITS[number]>(DATA_UNITS[2])
  const [toUnit, setToUnit] = useState<typeof DATA_UNITS[number]>(DATA_UNITS[3])

  const numValue = parseFloat(value) || 0
  const result = convertData(numValue, fromUnit, toUnit)

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">数据存储换算</h2>

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
            onChange={(e) => setFromUnit(e.target.value as typeof DATA_UNITS[number])}
          >
            {DATA_UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {getDataUnitName(unit)}
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
            onChange={(e) => setToUnit(e.target.value as typeof DATA_UNITS[number])}
          >
            {DATA_UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {getDataUnitName(unit)}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </Card>
  )
}
