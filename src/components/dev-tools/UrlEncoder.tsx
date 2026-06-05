'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import { useI18n } from '@/lib/i18n/context'

export default function UrlEncoder() {
  const { t } = useI18n()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const encode = () => {
    try { setOutput(encodeURIComponent(input)) }
    catch { setOutput(t.devToolUI.urlEncodeFailed) }
  }

  const decode = () => {
    try { setOutput(decodeURIComponent(input)) }
    catch { setOutput(t.devToolUI.urlDecodeFailed) }
  }

  const processInput = () => { mode === 'encode' ? encode() : decode() }
  const copyOutput = () => { if (output) navigator.clipboard.writeText(output) }
  const clearAll = () => { setInput(''); setOutput('') }

  return (
    <Card>
      <div className="p-6 md:p-8 bg-gradient-to-r from-cyan-50 to-sky-50 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">🔗 {t.devTools.urlEncoder}</h2>
        <p className="text-gray-600 mt-1">{t.devToolUI.urlEncoderDescription}</p>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex gap-3">
          <button onClick={() => { setMode('encode'); setOutput('') }}
            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${mode === 'encode' ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-md hover:shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            {t.devToolUI.encode}
          </button>
          <button onClick={() => { setMode('decode'); setOutput('') }}
            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${mode === 'decode' ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-md hover:shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            {t.devToolUI.decode}
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {mode === 'encode' ? t.devToolUI.inputURL : t.devToolUI.inputEncodedString}
          </label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)}
            className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl font-mono text-sm focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition-all resize-none"
            placeholder={mode === 'encode' ? t.devToolUI.urlEncodePlaceholder : t.devToolUI.urlDecodePlaceholder} />
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={processInput}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-xl hover:from-cyan-700 hover:to-cyan-800 transition-all shadow-md hover:shadow-lg font-medium">
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
              {mode === 'encode' ? t.devToolUI.encodedResult : t.devToolUI.decodedResult}
            </label>
            <textarea readOnly value={output}
              className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl font-mono text-sm bg-gray-50 resize-none" />
          </div>
        )}
      </div>
    </Card>
  )
}
