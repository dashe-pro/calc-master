import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calcmaster.com'
  
  const converters = [
    'length', 'weight', 'temperature', 'area', 'data', 'currency', 'time'
  ]
  
  const calculators = [
    'mortgage', 'bmi', 'discount', 'tip', 'compound', 'date', 'due-date', 'baby-growth'
  ]

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...converters.map((converter) => ({
      url: `${baseUrl}/converters/${converter}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...calculators.map((calculator) => ({
      url: `${baseUrl}/calculators/${calculator}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
