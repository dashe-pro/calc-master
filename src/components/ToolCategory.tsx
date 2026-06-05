import Link from 'next/link'
import Card from '@/components/Card'

export interface ToolItem {
  title: string
  href: string
}

interface ToolCategoryProps {
  icon: string
  title: string
  items: ToolItem[]
  colorClass: 'blue' | 'indigo' | 'green'
  columns?: string
}

const colorMap = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', dotIcon: '📏' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', dotIcon: '🧮' },
  green: { bg: 'bg-green-100', text: 'text-green-600', dotIcon: '⚙️' },
  gray: { bg: 'bg-gray-100', text: 'text-gray-600', dotIcon: '🔄' },
}

export default function ToolCategory({ icon, title, items, colorClass, columns = 'lg:grid-cols-7' }: ToolCategoryProps) {
  const colors = colorMap[colorClass] || colorMap.gray

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center`}>
          <span className={`${colors.text} font-bold`}>{icon}</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className={`grid grid-cols-2 md:grid-cols-3 ${columns} gap-4`}>
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer text-center">
              <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center mb-3 mx-auto`}>
                <span className={`${colors.text} text-lg`}>🔄</span>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
