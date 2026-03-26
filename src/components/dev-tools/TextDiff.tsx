'use client'

import { useState } from 'react'
import { diffLines, Change } from 'diff'
import Card from '@/components/Card'

export default function TextDiff() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [diffResult, setDiffResult] = useState<Change[] | null>(null)

  const compareTexts = () => {
    const diff = diffLines(text1, text2)
    setDiffResult(diff)
  }

  const clearAll = () => {
    setText1('')
    setText2('')
    setDiffResult(null)
  }

  const renderDiff = () => {
    if (!diffResult) return null

    return (
      <div className="p-4 bg-gray-900 rounded-xl overflow-x-auto">
        <pre className="text-sm font-mono">
          {diffResult.map((part, index) => {
            let className = 'text-gray-300'
            if (part.added) className = 'text-green-400 bg-green-900/30'
            if (part.removed) className = 'text-red-400 bg-red-900/30'
            
            return (
              <span key={index} className={className}>
                {part.value.split('\n').map((line, i) => (
                  line ? (
                    <div key={i} className="py-0.5">
                      {part.added && '+ '}
                      {part.removed && '- '}
                      {!part.added && !part.removed && '  '}
                      {line}
                    </div>
                  ) : null
                ))}
              </span>
            )
          })}
        </pre>
      </div>
    )
  }

  return (
    <Card>
      <div className="p-6 md:p-8 bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">📝 文本对比</h2>
        <p className="text-gray-600 mt-1">代码版本差异对比，快速定位内容变化</p>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              原始文本
            </label>
            <textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl font-mono text-sm focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all resize-none"
              placeholder="输入原始文本..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              对比文本
            </label>
            <textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl font-mono text-sm focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all resize-none"
              placeholder="输入对比文本..."
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={compareTexts}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all shadow-md hover:shadow-lg font-medium"
          >
            🔍 对比
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg font-medium"
          >
            🗑️ 清空
          </button>
        </div>

        {renderDiff()}
        
        {!diffResult && (
          <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl">
            <p className="text-gray-600 text-center font-medium">
              请输入文本并点击对比按钮
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
