'use client'

import { useState } from 'react'
import { blogs, BlogPost } from '@/data/blogs'

export default function Blog() {
    const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null)

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
                                <div key={item.id} className="card-glass reveal" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                    <img
                                        src={item.imageUrl || '/images/default-blog.png'}
                                        alt={item.title}
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                    <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <span className="text-primary" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                                            {new Date(item.createdDate).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase()}
                                        </span>
                                        <h3 style={{ margin: '10px 0' }}>{item.title}</h3>
                                        <p style={{ color: '#aaa', fontSize: '0.95rem', marginBottom: '20px', flex: 1 }}>
                                            {item.content.length > 100 ? `${item.content.substring(0, 100)}...` : item.content}
                                        </p>
                                        <button
                                            onClick={() => setSelectedBlog(item)}
                                            className="text-primary"
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                padding: 0,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                fontSize: '1rem',
                                                textAlign: 'left'
                                            }}
                                        >
                                            Devamını Oku <i className="fas fa-arrow-right"></i>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Modal */}
            {selectedBlog && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        zIndex: 9999,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px'
                    }}
                    onClick={() => setSelectedBlog(null)}
                >
                    <div
                        className="modal-content card-glass"
                        style={{
                            maxWidth: '800px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            position: 'relative',
                            padding: '30px',
                            borderRadius: '15px'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedBlog(null)}
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                background: 'transparent',
                                border: 'none',
                                color: '#fff',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                zIndex: 10
                            }}
                        >
                            <i className="fas fa-times"></i>
                        </button>

                        <img
                            src={selectedBlog.imageUrl || '/images/default-blog.png'}
                            alt={selectedBlog.title}
                            style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '10px', marginBottom: '20px' }}
                        />

                        <span className="text-primary" style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                            {new Date(selectedBlog.createdDate).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase()}
                        </span>

                        <h2 style={{ margin: '15px 0' }}>{selectedBlog.title}</h2>

                        <div style={{ color: '#ddd', fontSize: '1rem', lineHeight: '1.6' }}>
                            {selectedBlog.content}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
