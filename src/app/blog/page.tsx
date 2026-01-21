import Link from 'next/link'
import { blogs } from '@/data/blogs'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blog & Haberler - Felsen Servis',
    description: 'Otomotiv dünyasından en güncel haberler, bakım ipuçları ve Felsen Servis duyuruları.',
}

export default function Blog() {
    return (
        <>
            <div
                className="page-header"
                style={{
                    background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/images/hero-bg.png') center/cover",
                    padding: '150px 0 80px',
                    textAlign: 'center',
                }}
            >
                <div className="container">
                    <h1 className="reveal">Blog & Haberler</h1>
                    <p className="reveal" style={{ fontSize: '1.2rem', color: '#ccc' }}>
                        Otomotiv dünyasından en güncel bilgiler
                    </p>
                </div>
            </div>

            <section className="section-padding">
                <div className="container">
                    <div
                        className="row"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '40px',
                        }}
                    >
                        {blogs.length === 0 ? (
                            <div className="col-12 text-center" style={{ color: '#aaa' }}>
                                <p>Henüz blog yazısı bulunmamaktadır.</p>
                            </div>
                        ) : (
                            blogs.map((item) => (
                                <div key={item.id} className="card-glass reveal" style={{ padding: 0, overflow: 'hidden' }}>
                                    <img
                                        src={item.imageUrl || '/images/default-blog.png'}
                                        alt={item.title}
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                    <div style={{ padding: '25px' }}>
                                        <span className="text-primary" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                                            {new Date(item.createdDate).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase()}
                                        </span>
                                        <h3 style={{ margin: '10px 0' }}>{item.title}</h3>
                                        <p style={{ color: '#aaa', fontSize: '0.95rem', marginBottom: '20px' }}>
                                            {item.content.length > 100 ? `${item.content.substring(0, 100)}...` : item.content}
                                        </p>
                                        <Link href={`/blog/${item.id}`} className="text-primary">
                                            Devamını Oku <i className="fas fa-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
