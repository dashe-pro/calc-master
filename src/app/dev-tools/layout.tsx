import Link from 'next/link'

const tools = [
  { path: '/dev-tools/json-formatter', name: 'JSON格式化', emoji: '📋' },
  { path: '/dev-tools/timestamp-converter', name: '时间戳转换', emoji: '⏰' },
  { path: '/dev-tools/base64-encoder', name: 'Base64编码', emoji: '🔢' },
  { path: '/dev-tools/url-encoder', name: 'URL编码', emoji: '🔗' },
  { path: '/dev-tools/regex-tester', name: '正则测试', emoji: '🔍' },
  { path: '/dev-tools/code-formatter', name: '代码格式化', emoji: '💻' },
  { path: '/dev-tools/text-diff', name: '文本对比', emoji: '📝' },
  { path: '/dev-tools/qr-generator', name: '二维码', emoji: '📱' },
]

export default function DevToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4 transition-colors">
            <span className="text-xl">←</span>
            <span className="font-medium">返回首页</span>
          </Link>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🛠️ 开发者工具</h1>
            <p className="text-gray-600">一站式开发者常用工具集合，提高开发效率</p>
          </div>

          <nav className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <Link
                  key={tool.path}
                  href={tool.path}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <span>{tool.emoji}</span>
                  <span>{tool.name}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {children}
      </div>
    </div>
  )
}
