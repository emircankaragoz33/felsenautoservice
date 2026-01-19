import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://felsen.com.tr'

    // Statik sayfalarımız
    const routes = [
        '',
        '/hakkimizda',
        '/hizmetlerimiz',
        '/iletisim',
        '/blog',
        '/sss',
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }))
}
