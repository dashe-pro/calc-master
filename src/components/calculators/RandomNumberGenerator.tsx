'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import { generateRandomNumbers } from '@/lib/calculators/random'
import { useI18n } from '@/lib/i18n/context'

export default function RandomNumberGenerator() {
  const { t } = useI18n()
  const [min, setMin] = useState('1')
  const [max, setMax] = useState('100')
  const [count, setCount] = useState('5')
  const [unique, setUnique] = useState(false)
  const [results, setResults] = useState<number[] | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    const mn = parseInt(min) || 1
    const mx = parseInt(max) || 100
    const ct = parseInt(count) || 5
    setResults(generateRandomNumbers(mn, mx, ct, unique))
    setCopied(false)
  }

  const handleCopy = async () => {
    if (results) {
      await navigator.clipboard.writeText(results.join(', '))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.randomNumber.title}</h2>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Input label={t.randomNumber.min} type="number" value={min} onChange={(e) => setMin(e.target.value)} />
          <Input label={t.randomNumber.max} type="number" value={max} onChange={(e) => setMax(e.target.value)} />
        </div>
        <Input label={t.randomNumber.count} type="number" value={count} onChange={(e) => setCount(e.target.value)} />
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} className="rounded" />
          {t.randomNumber.unique}
        </label>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors mb-6"
      >
        {t.randomNumber.generate}
      </button>

      {results && results.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500">{t.randomNumber.result} ({results.length})</span>
            <button onClick={handleCopy} className="text-sm text-blue-600 hover:underline">
              {copied ? '✓ ' + t.randomNumber.copied : t.randomNumber.copy}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {results.map((n, i) => (
              <span key={i} className="inline-flex items-center justify-center min-w-[3rem] h-12 px-2 bg-blue-100 text-blue-700 font-bold rounded-lg text-lg">
                {n}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
