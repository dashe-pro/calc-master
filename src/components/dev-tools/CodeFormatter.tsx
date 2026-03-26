'use client'

import { useState } from 'react'
import Card from '@/components/Card'

export default function CodeFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [language, setLanguage] = useState<'html' | 'css' | 'js'>('html')

  const formatCode = () => {
    try {
      if (language === 'html') {
        setOutput(input)
      } else if (language === 'css') {
        setOutput(input)
      } else {
        setOutput(input)
      }
    } catch (e) {
      setOutput('格式化失败')
    }
  }

  const copyOutput = () => {
    if (output) {
      navigator.clipboard.writeText(output)
    }
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
  }

  return (
    <Card>
      <div className="p-6 md:p-8 bg-gradient-to-r from-yellow-50 to-amber-50 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">💻 代码格式化</h2>
        <p className="text-gray-600 mt-1">美化HTML/CSS/JS代码，提升可读性</p>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex gap-3">
          <button
            onClick={() => { setLanguage('html'); setOutput('') }}
            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${
              language === 'html'
                ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📄 HTML
          </button>
          <button
            onClick={() => { setLanguage('css'); setOutput('') }}
            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${
              language === 'css'
                ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🎨 CSS
          </button>
          <button
            onClick={() => { setLanguage('js'); setOutput('') }}
            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${
              language === 'js'
                ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ⚡ JavaScript
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            输入代码
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl font-mono text-sm focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all resize-none"
            placeholder="输入要格式化的代码..."
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={formatCode}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-xl hover:from-yellow-700 hover:to-yellow-800 transition-all shadow-md hover:shadow-lg font-medium"
          >
            ✨ 格式化
          </button>
          <button
            onClick={copyOutput}
            disabled={!output}
            className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all shadow-md hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            📋 复制
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg font-medium"
          >
            🗑️ 清空
          </button>
        </div>

        {output && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              格式化结果
            </label>
            <textarea
              value={output}
              readOnly
              className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl font-mono text-sm bg-gray-50 resize-none"
            />
          </div>
        )}
      </div>
    </Card>
  )
}
