'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/Card'

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [localDateTime, setLocalDateTime] = useState('')

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000)
    setTimestamp(now.toString())
    convertTimestampToDate(now)
  }, [])

  const convertTimestampToDate = (ts: number) => {
    try {
      const date = new Date(ts * 1000)
      const utcString = date.toUTCString()
      const localString = date.toLocaleString('zh-CN')
      setDateTime(utcString)
      setLocalDateTime(localString)
    } catch (e) {
      setDateTime('')
      setLocalDateTime('')
    }
  }

  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTimestamp(value)
    if (value) {
      convertTimestampToDate(parseInt(value))
    } else {
      setDateTime('')
      setLocalDateTime('')
    }
  }

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDateTime(value)
    if (value) {
      const date = new Date(value)
      const ts = Math.floor(date.getTime() / 1000)
      setTimestamp(ts.toString())
      setLocalDateTime(date.toLocaleString('zh-CN'))
    }
  }

  const getCurrentTimestamp = () => {
    const now = Math.floor(Date.now() / 1000)
    setTimestamp(now.toString())
    convertTimestampToDate(now)
  }

  const copyTimestamp = () => {
    if (timestamp) {
      navigator.clipboard.writeText(timestamp)
    }
  }

  return (
    <Card>
      <div className="p-6 md:p-8 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">⏰ 时间戳转换</h2>
        <p className="text-gray-600 mt-1">时间戳与日期时间双向转换，前后端联调必备</p>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            时间戳 (秒)
          </label>
          <div className="flex flex-wrap gap-3">
            <input
              type="number"
              value={timestamp}
              onChange={handleTimestampChange}
              className="flex-1 min-w-[200px] px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all"
              placeholder="1600000000"
            />
            <button
              onClick={getCurrentTimestamp}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg font-medium"
            >
              🕐 当前时间
            </button>
            <button
              onClick={copyTimestamp}
              className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all shadow-md hover:shadow-lg font-medium"
            >
              📋 复制
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            UTC 时间
          </label>
          <input
            type="datetime-local"
            value={dateTime ? new Date(parseInt(timestamp) * 1000).toISOString().slice(0, 16) : ''}
            onChange={handleDateTimeChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all"
          />
          {dateTime && (
            <div className="mt-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-700 font-mono">{dateTime}</p>
            </div>
          )}
        </div>

        {localDateTime && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              本地时间
            </label>
            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
              <p className="text-gray-900 font-semibold text-lg">{localDateTime}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
