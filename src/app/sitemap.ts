import { MetadataRoute } from 'next'
import { blogs } from '@/data/blogs'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://felsen.com.tr'

    const routes = [
        '',
        '/hakkimizda',
        '/hizmetlerimiz',
        '/iletisim',
        '/randevu',
        '/felsen-grup',
        '/mutlu-aku',
        '/kariyer',
        '/blog',
        '/sss',
    ]

    const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : route === '/randevu' ? 0.95 : 0.8,
    }))

    const blogRoutes: MetadataRoute.Sitemap = blogs.map((post) => ({
        url: `${baseUrl}/blog/${post.id}`,
        lastModified: new Date(post.createdDate),
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    return [...staticRoutes, ...blogRoutes]
}
