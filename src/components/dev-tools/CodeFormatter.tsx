'use client'

import { useState } from 'react'
import Card from '@/components/Card'

let prettierFormat: any = null
let prettierHtml: any = null
let prettierBabel: any = null
let prettierEstree: any = null
let prettierPostcss: any = null

export default function CodeFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [language, setLanguage] = useState<'html' | 'css' | 'js'>('html')
  const [formatting, setFormatting] = useState(false)
  const [error, setError] = useState('')

  const formatCode = async () => {
    if (!input.trim()) {
      setError('请输入代码')
      return
    }
    setFormatting(true)
    setError('')
    try {
      // Dynamic import prettier plugins
      if (!prettierFormat) {
        const prettier = await import('prettier')
        prettierFormat = prettier.format
      }

      let formatted: string
      if (language === 'html') {
        if (!prettierHtml) {
          prettierHtml = (await import('prettier/plugins/html')).default
        }
        formatted = await prettierFormat(input, { parser: 'html', plugins: [prettierHtml] })
      } else if (language === 'css') {
        if (!prettierPostcss) {
          prettierPostcss = (await import('prettier/plugins/postcss')).default
        }
        formatted = await prettierFormat(input, { parser: 'css', plugins: [prettierPostcss] })
      } else {
        if (!prettierBabel) {
          prettierBabel = (await import('prettier/plugins/babel')).default
        }
        if (!prettierEstree) {
          prettierEstree = (await import('prettier/plugins/estree')).default
        }
        formatted = await prettierFormat(input, { parser: 'babel', plugins: [prettierBabel, prettierEstree] })
      }
      setOutput(formatted)
    } catch (e) {
      setError(e instanceof Error ? `格式化失败：${e.message}` : '格式化失败')
      setOutput('')
    } finally {
      setFormatting(false)
    }
  }

  const copyOutput = () => {
    if (output) navigator.clipboard.writeText(output)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <Card>
      <div className="p-6 md:p-8 bg-gradient-to-r from-yellow-50 to-amber-50 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">💻 代码格式化</h2>
        <p className="text-gray-600 mt-1">美化HTML/CSS/JS代码，提升可读性</p>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex gap-3">
          {(['html', 'css', 'js'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => { setLanguage(lang); setOutput(''); setError('') }}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${
                language === lang
                  ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {lang === 'html' ? '📄 HTML' : lang === 'css' ? '🎨 CSS' : '⚡ JavaScript'}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">输入代码</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl font-mono text-sm focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all resize-none"
            placeholder="输入要格式化的代码..."
          />
        </div>

        {error && (
          <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-xl">
            <p className="text-red-700 font-bold">{error}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button onClick={formatCode} disabled={formatting}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-xl hover:from-yellow-700 hover:to-yellow-800 transition-all shadow-md hover:shadow-lg font-medium disabled:opacity-50">
            {formatting ? '⏳ 格式化中...' : '✨ 格式化'}
          </button>
          <button onClick={copyOutput} disabled={!output}
            className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all shadow-md hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            📋 复制
          </button>
          <button onClick={clearAll}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg font-medium">
            🗑️ 清空
          </button>
        </div>

        {output && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">格式化结果</label>
            <textarea readOnly value={output}
              className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl font-mono text-sm bg-gray-50 resize-none" />
          </div>
        )}
      </div>
    </Card>
  )
}
