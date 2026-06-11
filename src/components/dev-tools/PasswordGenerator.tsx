'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import { generatePassword, getPasswordStrength } from '@/lib/dev-tools/password'
import type { PasswordOptions } from '@/lib/dev-tools/password'
import { useI18n } from '@/lib/i18n/context'

const strengthColors: Record<string, string> = {
  weak: 'bg-red-500',
  fair: 'bg-orange-500',
  good: 'bg-green-400',
  strong: 'bg-green-600',
}

export default function PasswordGenerator() {
  const { t } = useI18n()
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    digits: true,
    symbols: true,
    excludeAmbiguous: false,
  })
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const strength = getPasswordStrength(password)
  const strengthKey = strength.label

  const handleGenerate = () => {
    setPassword(generatePassword(options))
    setCopied(false)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const strengthLabels: Record<string, string> = {
    weak: t.devToolUI.strengthWeak,
    fair: t.devToolUI.strengthFair,
    good: t.devToolUI.strengthGood,
    strong: t.devToolUI.strengthStrong,
  }

  const updateOption = (key: keyof PasswordOptions, value: boolean | number) => {
    setOptions((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.devTools.passwordGenerator}</h2>

      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm font-medium text-gray-700">
            {t.devToolUI.passwordLength}: {options.length} {t.devToolUI.passwordLengthLabel}
          </label>
          <input
            type="range"
            min={8}
            max={64}
            value={options.length}
            onChange={(e) => updateOption('length', parseInt(e.target.value))}
            className="w-full mt-1"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>8</span>
            <span>64</span>
          </div>
        </div>

        {[
          { key: 'uppercase' as keyof PasswordOptions, label: t.devToolUI.uppercase },
          { key: 'lowercase' as keyof PasswordOptions, label: t.devToolUI.lowercase },
          { key: 'digits' as keyof PasswordOptions, label: t.devToolUI.numbers },
          { key: 'symbols' as keyof PasswordOptions, label: t.devToolUI.symbolsOption },
          { key: 'excludeAmbiguous' as keyof PasswordOptions, label: t.devToolUI.excludeAmbiguous },
        ].map(({ key, label }) =>
            <label key={key} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={options[key] as boolean}
                onChange={(e) => updateOption(key, e.target.checked)}
                className="rounded"
              />
              {label}
            </label>
        )}
      </div>

      <button
        onClick={handleGenerate}
        className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors mb-6"
      >
        {t.devToolUI.refresh}
      </button>

      {password && (
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{t.devToolUI.passwordStrength}:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`w-6 h-2 rounded ${
                      level <= (strength.score < 1 ? 1 : strength.score < 3 ? 2 : strength.score < 5 ? 3 : 4)
                        ? strengthColors[strengthKey]
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">{strengthLabels[strengthKey]}</span>
            </div>
            <button onClick={handleCopy} className="text-sm text-blue-600 hover:underline">
              {copied ? '✓ ' + (t.devToolUI.copyResult || 'Copied') : t.devToolUI.copy}
            </button>
          </div>
          <p className="text-lg font-mono text-gray-900 break-all bg-white rounded-lg p-3 border border-gray-200">
            {password}
          </p>
        </div>
      )}
    </Card>
  )
}
