'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{
      backgroundColor: '#1a1a2e',
      borderBottom: '1px solid #16213e',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <nav style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textDecoration: 'none',
        }}>
          VBA Dev Hub
        </Link>

        {/* Desktop Navigation */}
        <div style={{
          display: 'none',
          gap: '2rem',
          alignItems: 'center',
        }} className="desktop-nav">
          <Link href="/" style={{
            color: '#e0e0e0',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }} onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
             onMouseLeave={(e) => e.currentTarget.style.color = '#e0e0e0'}>
            ホーム
          </Link>
          <Link href="/tools" style={{
            color: '#e0e0e0',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }} onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
             onMouseLeave={(e) => e.currentTarget.style.color = '#e0e0e0'}>
            ツール
          </Link>
          <Link href="/snippets" style={{
            color: '#e0e0e0',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }} onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
             onMouseLeave={(e) => e.currentTarget.style.color = '#e0e0e0'}>
            スニペット
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#e0e0e0',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
          className="mobile-menu-btn"
          aria-label="メニュー"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#16213e',
          padding: '1rem',
          display: 'none',
        }} className="mobile-menu">
          <Link href="/" style={{
            display: 'block',
            color: '#e0e0e0',
            textDecoration: 'none',
            padding: '0.75rem 0',
            borderBottom: '1px solid #1a1a2e',
          }} onClick={() => setMobileMenuOpen(false)}>
            ホーム
          </Link>
          <Link href="/tools" style={{
            display: 'block',
            color: '#e0e0e0',
            textDecoration: 'none',
            padding: '0.75rem 0',
            borderBottom: '1px solid #1a1a2e',
          }} onClick={() => setMobileMenuOpen(false)}>
            ツール
          </Link>
          <Link href="/snippets" style={{
            display: 'block',
            color: '#e0e0e0',
            textDecoration: 'none',
            padding: '0.75rem 0',
          }} onClick={() => setMobileMenuOpen(false)}>
            スニペット
          </Link>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .mobile-menu-btn {
            display: block !important;
          }
          .mobile-menu {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
