import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://calcmasters.org'

  const converters = ['length', 'weight', 'temperature', 'area', 'data', 'currency', 'time']
  const calculators = ['mortgage', 'bmi', 'discount', 'tip', 'compound', 'date', 'due-date', 'baby-growth', 'percentage', 'age', 'random-number']
  const devTools = ['json-formatter', 'timestamp-converter', 'base64-encoder', 'url-encoder', 'regex-tester', 'code-formatter', 'text-diff', 'qr-generator', 'password-generator', 'color-converter']

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...converters.map((c) => ({
      url: `${baseUrl}/converters/${c}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...calculators.map((c) => ({
      url: `${baseUrl}/calculators/${c}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...devTools.map((t) => ({
      url: `${baseUrl}/dev-tools/${t}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
