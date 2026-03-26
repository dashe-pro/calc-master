'use client'

import { useState } from 'react'
import Card from '@/components/Card'

export default function UrlEncoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const encode = () => {
    try {
      const encoded = encodeURIComponent(input)
      setOutput(encoded)
    } catch (e) {
      setOutput('编码失败')
    }
  }

  const decode = () => {
    try {
      const decoded = decodeURIComponent(input)
      setOutput(decoded)
    } catch (e) {
      setOutput('解码失败：无效的URL编码字符串')
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
      <div className="p-6 md:p-8 bg-gradient-to-r from-cyan-50 to-sky-50 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">🔗 URL编码/解码</h2>
        <p className="text-gray-600 mt-1">前端传参调试、URL参数编码转换</p>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex gap-3">
          <button
            onClick={() => { setMode('encode'); setOutput('') }}
            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${
              mode === 'encode'
                ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🔒 编码
          </button>
          <button
            onClick={() => { setMode('decode'); setOutput('') }}
            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${
              mode === 'decode'
                ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🔓 解码
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {mode === 'encode' ? '输入URL' : '输入编码字符串'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl font-mono text-sm focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition-all resize-none"
            placeholder={mode === 'encode' ? '输入要编码的URL...' : '输入要解码的字符串...'}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={processInput}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-xl hover:from-cyan-700 hover:to-cyan-800 transition-all shadow-md hover:shadow-lg font-medium"
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
              {mode === 'encode' ? '编码结果' : '解码结果'}
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
