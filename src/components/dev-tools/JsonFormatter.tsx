'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import { useI18n } from '@/lib/i18n/context'

export default function JsonFormatter() {
  const { t } = useI18n()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [isValid, setIsValid] = useState(true)

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setError('')
      setIsValid(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON')
      setOutput('')
      setIsValid(false)
    }
  }

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError('')
      setIsValid(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON')
      setOutput('')
      setIsValid(false)
    }
  }

  const copyOutput = () => {
    if (output) navigator.clipboard.writeText(output)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
    setIsValid(true)
  }

  return (
    <Card>
      <div className="p-6 md:p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">📋 {t.devTools.jsonFormatter}</h2>
        <p className="text-gray-600 mt-1">{t.devToolUI.jsonFormatterDescription}</p>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">{t.devToolUI.inputJson}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl font-mono text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all resize-none"
            placeholder={t.devToolUI.jsonPlaceholder}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={formatJson}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg font-medium">
            {t.devToolUI.formatButton}
          </button>
          <button onClick={minifyJson}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg font-medium">
            {t.devToolUI.compress}
          </button>
          <button onClick={copyOutput} disabled={!output}
            className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all shadow-md hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            📋 {t.devToolUI.copyResult}
          </button>
          <button onClick={clearAll}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg font-medium">
            🗑️ {t.devToolUI.clear}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-xl">
            <p className="text-red-700 font-bold flex items-center gap-2">{t.devToolUI.jsonInvalid}</p>
            <p className="text-red-600 text-sm mt-2 font-mono">{error}</p>
          </div>
        )}

        {isValid && output && (
          <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-xl">
            <p className="text-green-700 font-bold flex items-center gap-2">{t.devToolUI.jsonValid}</p>
          </div>
        )}

        {output && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">{t.devToolUI.outputResult}</label>
            <textarea readOnly value={output}
              className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl font-mono text-sm bg-gray-50 resize-none" />
          </div>
        )}
      </div>
    </Card>
  )
}
