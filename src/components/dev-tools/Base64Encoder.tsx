'use client'

import { useState } from 'react'
import Card from '@/components/Card'

export default function Base64Encoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const encode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)))
      setOutput(encoded)
    } catch (e) {
      setOutput('编码失败')
    }
  }

  const decode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)))
      setOutput(decoded)
    } catch (e) {
      setOutput('解码失败：无效的Base64字符串')
    }
  }

  const processInput = () => {
    if (mode === 'encode') {
      encode()
    } else {
      decode()
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
      <div className="p-6 md:p-8 bg-gradient-to-r from-purple-50 to-violet-50 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">🔢 Base64编码/解码</h2>
        <p className="text-gray-600 mt-1">图片转码、数据传输编码转换工具</p>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex gap-3">
          <button
            onClick={() => { setMode('encode'); setOutput('') }}
            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${
              mode === 'encode'
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🔒 编码
          </button>
          <button
            onClick={() => { setMode('decode'); setOutput('') }}
            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${
              mode === 'decode'
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🔓 解码
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {mode === 'encode' ? '输入文本' : '输入Base64字符串'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl font-mono text-sm focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all resize-none"
            placeholder={mode === 'encode' ? '输入要编码的文本...' : '输入要解码的Base64字符串...'}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={processInput}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg font-medium"
          >
            {mode === 'encode' ? '🔒 编码' : '🔓 解码'}
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
              {mode === 'encode' ? 'Base64结果' : '解码结果'}
            </label>
            <textarea
              value={output}
              readOnly
              className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl font-mono text-sm bg-gray-50 resize-none"
            />
          </div>
        )}
      </div>
    </Card>
  )
}
