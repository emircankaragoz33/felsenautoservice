import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogs } from '@/data/blogs';
import { Metadata } from 'next';

type Props = {
    params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = blogs.find((b) => b.id === Number(params.id));

    if (!post) {
        return {
            title: 'Yazı Bulunamadı - Felsen Servis',
        }
    }

    return {
        title: `${post.title} - Felsen Servis Blog`,
        description: post.content.substring(0, 160),
    }
}

export default function BlogPostPage({ params }: Props) {
    const post = blogs.find((b) => b.id === Number(params.id));

    if (!post) {
        notFound();
    }

    return (
        <>
            <div
                className="page-header"
                style={{
                    background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${post.imageUrl || '/images/hero-bg.png'}') center/cover`,
                    padding: '150px 0 80px',
                    textAlign: 'center',
                }}
            >
                <div className="container">
                    <h1 className="reveal">{post.title}</h1>
                    <p className="reveal" style={{ fontSize: '1.2rem', color: '#ccc' }}>
                        {new Date(post.createdDate).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                </div>
            </div>

            <section className="section-padding">
                <div className="container">
                    <div className="card-glass reveal" style={{ padding: '40px' }}>
                        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ccc' }}>
                            {post.content}
                        </div>
                        <div style={{ marginTop: '40px' }}>
                            <Link href="/blog" className="btn-custom btn-outline">
                                <i className="fas fa-arrow-left" style={{ marginRight: '10px' }}></i> Blog'a Dön
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
