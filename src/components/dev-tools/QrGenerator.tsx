'use client'

import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import Card from '@/components/Card'
import { useI18n } from '@/lib/i18n/context'

export default function QrGenerator() {
  const { t } = useI18n()
  const [text, setText] = useState('')
  const [qrType, setQrType] = useState<'text' | 'wifi'>('text')
  const [ssid, setSsid] = useState('')
  const [password, setPassword] = useState('')
  const [encryption, setEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA')
  const [qrValue, setQrValue] = useState<string | null>(null)
  const [qrSize, setQrSize] = useState(256)

  const generateQr = () => {
    let value = ''
    if (qrType === 'text') {
      if (!text.trim()) return
      value = text
    } else {
      if (!ssid.trim()) return
      if (encryption === 'nopass') {
        value = `WIFI:S:${ssid};T:nopass;;`
      } else {
        value = `WIFI:S:${ssid};T:${encryption};P:${password};;`
      }
    }
    setQrValue(value)
  }

  const clearAll = () => {
    setText(''); setSsid(''); setPassword(''); setQrValue(null)
  }

  const downloadQr = () => {
    if (!qrValue) return
    const svg = document.getElementById('qr-code')
    if (!svg) return
    const svgData = new XMLSerializer().serializeToString(svg)
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url; link.download = 'qrcode.svg'
    document.body.appendChild(link); link.click()
    document.body.removeChild(link); URL.revokeObjectURL(url)
  }

  return (
    <Card>
      <div className="p-6 md:p-8 bg-gradient-to-r from-indigo-50 to-violet-50 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">📱 {t.devTools.qrGenerator}</h2>
        <p className="text-gray-600 mt-1">{t.devToolUI.qrDescription}</p>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex gap-3">
          <button onClick={() => { setQrType('text'); setQrValue(null) }}
            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${qrType === 'text' ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md hover:shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            {t.devToolUI.textOrURL}
          </button>
          <button onClick={() => { setQrType('wifi'); setQrValue(null) }}
            className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${qrType === 'wifi' ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md hover:shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            {t.devToolUI.wifi}
          </button>
        </div>

        {qrType === 'text' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">{t.devToolUI.inputTextOrURL}</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)}
              className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all resize-none"
              placeholder={t.devToolUI.inputTextOrURLPlaceholder} />
          </div>
        )}

        {qrType === 'wifi' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">{t.devToolUI.wifiName}</label>
              <input type="text" value={ssid} onChange={(e) => setSsid(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
                placeholder={t.devToolUI.wifiNamePlaceholder} />
            </div>
            {encryption !== 'nopass' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">{t.devToolUI.password}</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
                  placeholder={t.devToolUI.passwordPlaceholder} />
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">{t.devToolUI.encryption}</label>
              <select value={encryption} onChange={(e) => setEncryption(e.target.value as any)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all">
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">{t.devToolUI.encryption === 'Encryption' ? 'No Password' : '无密码'}</option>
              </select>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {t.devToolUI.qrSize}: {qrSize}px
          </label>
          <input type="range" min="128" max="512" value={qrSize} onChange={(e) => setQrSize(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={generateQr}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-md hover:shadow-lg font-medium">
            {t.devToolUI.generateQR}
          </button>
          {qrValue && (
            <button onClick={downloadQr}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg font-medium">
              {t.devToolUI.download}
            </button>
          )}
          <button onClick={clearAll}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg font-medium">
            🗑️ {t.devToolUI.clear}
          </button>
        </div>

        <div className="flex justify-center">
          {qrValue ? (
            <div className="p-6 bg-white border-2 border-gray-200 rounded-xl shadow-inner">
              <QRCodeSVG id="qr-code" value={qrValue} size={qrSize} level="H" includeMargin={true} />
            </div>
          ) : (
            <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
              <p className="text-gray-500 text-center font-medium">{t.devToolUI.enterContentAndGenerate}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
