'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import { useI18n } from '@/lib/i18n/context'

export default function Base64Encoder() {
  const { t } = useI18n()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const encode = () => {
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))))
    } catch {
      setOutput(t.devToolUI.encodeFailed)
    }
  }

  const decode = () => {
    try {
      setOutput(decodeURIComponent(escape(atob(input))))
    } catch {
      setOutput(t.devToolUI.decodeFailed)
    }
  }

  const processInput = () => { mode === 'encode' ? encode() : decode() }
  const copyOutput = () => { if (output) navigator.clipboard.writeText(output) }
  const clearAll = () => { setInput(''); setOutput('') }

  return (
    <Card>
      <div className="p-6 md:p-8 bg-gradient-to-r from-purple-50 to-violet-50 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">🔢 {t.devTools.base64Encoder}</h2>
        <p className="text-gray-600 mt-1">{t.devToolUI.base64Description}</p>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex gap-3">
          <button
            onClick={() => { setMode('encode'); setOutput('') }}
            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${mode === 'encode' ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            {t.devToolUI.encode}
          </button>
          <button
            onClick={() => { setMode('decode'); setOutput('') }}
            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${mode === 'decode' ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            {t.devToolUI.decode}
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {mode === 'encode' ? t.devToolUI.inputText : t.devToolUI.inputBase64}
          </label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)}
            className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl font-mono text-sm focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all resize-none"
            placeholder={mode === 'encode' ? t.devToolUI.encodePlaceholder : t.devToolUI.decodePlaceholder} />
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={processInput}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg font-medium">
            {mode === 'encode' ? t.devToolUI.encode : t.devToolUI.decode}
          </button>
          <button onClick={copyOutput} disabled={!output}
            className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all shadow-md hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            📋 {t.devToolUI.copy}
          </button>
          <button onClick={clearAll}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg font-medium">
            🗑️ {t.devToolUI.clear}
          </button>
        </div>

        {output && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              {mode === 'encode' ? t.devToolUI.base64Result : t.devToolUI.decodedResult}
            </label>
            <textarea readOnly value={output}
              className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl font-mono text-sm bg-gray-50 resize-none" />
          </div>
        )}
      </div>
    </Card>
  )
}
