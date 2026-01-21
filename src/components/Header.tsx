'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/'
        return pathname?.startsWith(path)
    }

    return (
        <header className={`header-main ${scrolled ? 'header-scrolled' : ''}`} id="header">
            <div className="container">
                <nav className="navbar">
                    <Link href="/" className="brand-logo">
                        <img src="/images/logo.png" alt="Felsen Servis Logo" />
                    </Link>

                    <div className="mobile-nav-toggle" id="navToggle" onClick={toggleMobileMenu}>
                        <i className="fas fa-bars"></i>
                    </div>

                    <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`} id="navLinks">
                        <li>
                            <Link href="/" className={isActive('/') ? 'active-link' : ''} onClick={() => setMobileMenuOpen(false)}>
                                Ana Sayfa
                            </Link>
                        </li>
                        <li>
                            <Link href="/hizmetlerimiz" className={isActive('/hizmetlerimiz') ? 'active-link' : ''} onClick={() => setMobileMenuOpen(false)}>
                                Hizmetlerimiz
                            </Link>
                        </li>
                        <li>
                            <Link href="/felsen-grup" className={isActive('/felsen-grup') ? 'active-link' : ''} onClick={() => setMobileMenuOpen(false)}>
                                Sigorta & Kiralama
                            </Link>
                        </li>

                        <li>
                            <Link href="/mutlu-aku" className={isActive('/mutlu-aku') ? 'active-link' : ''} onClick={() => setMobileMenuOpen(false)}>
                                Mutlu Akü
                            </Link>
                        </li>
                        <li>
                            <Link href="/hakkimizda" className={isActive('/hakkimizda') ? 'active-link' : ''} onClick={() => setMobileMenuOpen(false)}>
                                Hakkımızda
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" className={isActive('/blog') ? 'active-link' : ''} onClick={() => setMobileMenuOpen(false)}>
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="/sss" className={isActive('/sss') ? 'active-link' : ''} onClick={() => setMobileMenuOpen(false)}>
                                S.S.S
                            </Link>
                        </li>
                        <li>
                            <Link href="/iletisim" className={isActive('/iletisim') ? 'active-link' : ''} onClick={() => setMobileMenuOpen(false)}>
                                İletişim
                            </Link>
                        </li>
                        <li>
                            <Link href="/iletisim" className="btn-custom nav-btn" onClick={() => setMobileMenuOpen(false)}>
                                Randevu Al
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
