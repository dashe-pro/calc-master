'use client'

import { useState } from 'react'
import Card from '@/components/Card'

export default function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [testText, setTestText] = useState('')
  const [matches, setMatches] = useState<RegExpMatchArray | null>(null)
  const [error, setError] = useState('')

  const testRegex = () => {
    try {
      setError('')
      const regex = new RegExp(pattern, flags)
      const matchResults = testText.match(regex)
      setMatches(matchResults)
    } catch (e) {
      setError(e instanceof Error ? e.message : '无效的正则表达式')
      setMatches(null)
    }
  }

  const clearAll = () => {
    setPattern('')
    setFlags('g')
    setTestText('')
    setMatches(null)
    setError('')
  }

  return (
    <Card>
      <div className="p-6 md:p-8 bg-gradient-to-r from-pink-50 to-rose-50 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">🔍 正则表达式测试</h2>
        <p className="text-gray-600 mt-1">文本匹配、表单验证，快速测试正则表达式</p>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <div className="grid md:grid-cols-4 gap-3">
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              正则表达式
            </label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-mono text-sm focus:ring-4 focus:ring-pink-100 focus:border-pink-500 transition-all"
              placeholder="\d+"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              标志
            </label>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-mono text-sm focus:ring-4 focus:ring-pink-100 focus:border-pink-500 transition-all"
              placeholder="g"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            测试文本
          </label>
          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl font-mono text-sm focus:ring-4 focus:ring-pink-100 focus:border-pink-500 transition-all resize-none"
            placeholder="输入要测试的文本..."
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={testRegex}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl hover:from-pink-700 hover:to-pink-800 transition-all shadow-md hover:shadow-lg font-medium"
          >
            🧪 测试
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg font-medium"
          >
            🗑️ 清空
          </button>
        </div>

        {error && (
          <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-xl">
            <p className="text-red-700 font-bold">{error}</p>
          </div>
        )}

        {matches && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              匹配结果 ({matches.length} 个匹配)
            </label>
            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-xl">
              <div className="flex flex-wrap gap-2">
                {matches.map((match, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-green-200 text-green-800 rounded-full text-sm font-mono font-medium"
                  >
                    {match || '(空)'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {!error && !matches && pattern && testText && (
          <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl">
            <p className="text-gray-600 font-medium">没有匹配结果</p>
          </div>
        )}
      </div>
    </Card>
  )
}
