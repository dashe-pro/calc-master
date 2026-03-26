import Link from 'next/link'

export default function ConvertersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6">
          <span>←</span>
          <span>返回首页</span>
        </Link>
        {children}
      </div>
    </div>
  )
}
