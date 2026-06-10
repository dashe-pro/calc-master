'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import { percentOf, percentWhatIs, percentChange } from '@/lib/calculators/percentage'
import { useI18n } from '@/lib/i18n/context'

type Mode = 'percentOf' | 'whatPercent' | 'change'

export default function PercentageCalculator() {
  const { t } = useI18n()
  const [mode, setMode] = useState<Mode>('percentOf')
  const [value, setValue] = useState('200')
  const [percent, setPercent] = useState('10')
  const [value2, setValue2] = useState('50')
  const [result, setResult] = useState<string | null>(null)

  const modes: { key: Mode; label: string }[] = [
    { key: 'percentOf', label: t.percentage.modePercentOf },
    { key: 'whatPercent', label: t.percentage.modeWhatPercent },
    { key: 'change', label: t.percentage.modeChange },
  ]

  useEffect(() => {
    const v = parseFloat(value) || 0
    const p = parseFloat(percent) || 0
    const v2 = parseFloat(value2) || 0

    if (mode === 'percentOf') {
      setResult(`${percentOf(v, p)}`)
    } else if (mode === 'whatPercent') {
      setResult(`${percentWhatIs(v, v2).toFixed(2)}%`)
    } else {
      const r = percentChange(v, v2)
      setResult(`${r.isIncrease ? '+' : '-'}${r.percentChange.toFixed(2)}%`)
    }
  }, [mode, value, percent, value2])

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.percentage.title}</h2>

      <div className="flex gap-2 mb-6 flex-wrap">
        {modes.map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === m.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="space-y-4 mb-6">
        {mode === 'change' ? (
          <>
            <Input label={t.percentage.from} type="number" value={value} onChange={(e) => setValue(e.target.value)} />
            <Input label={t.percentage.to} type="number" value={value2} onChange={(e) => setValue2(e.target.value)} />
          </>
        ) : (
          <>
            <Input label={t.percentage.value} type="number" value={value} onChange={(e) => setValue(e.target.value)} />
            <Input label={mode === 'whatPercent' ? t.percentage.total : t.percentage.percent} type="number" value={mode === 'whatPercent' ? value2 : percent} onChange={(e) => mode === 'whatPercent' ? setValue2(e.target.value) : setPercent(e.target.value)} />
          </>
        )}
      </div>

      {result !== null && (
        <div className="text-center bg-gray-50 rounded-xl py-8">
          <p className="text-4xl font-bold text-gray-900">{result}</p>
        </div>
      )}
    </Card>
  )
}
