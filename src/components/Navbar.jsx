import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/overview', label: 'نظرة عامة' },
  { to: '/directory', label: 'دليل الشركات' },
  { to: '/matching', label: 'المطابقة الذكية' },
  { to: '/sectors', label: 'القطاعات' },
  { to: '/about', label: 'عن المجمع' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled ? 'rgba(31, 42, 74, 0.94)' : 'rgba(31, 42, 74, 0.9)',
        backdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
        boxShadow: isScrolled ? '0 16px 38px rgba(15, 21, 37, 0.22)' : '0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Brand */}
          <Link to="/" className="flex items-center" aria-label="وادي جدة للابتكار">
            <img
              src="/logo-white.png"
              alt="وادي جدة للابتكار - Wadi Jeddah Innovation Hub"
              className="h-10 lg:h-12 object-contain"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="relative px-4 py-2 text-sm font-medium transition-colors rounded-lg group overflow-hidden"
                style={{
                  color: location.pathname === link.to ? '#fff' : 'rgba(255,255,255,0.7)',
                  background: location.pathname === link.to ? 'rgba(255,255,255,0.075)' : 'transparent',
                }}
              >
                <span className="relative z-10">{link.label}</span>
                <span
                  className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full transition-all duration-300 origin-center group-hover:opacity-100 group-hover:scale-x-100"
                  style={{ 
                    background: 'linear-gradient(90deg, var(--color-secondary), var(--color-tertiary))',
                    opacity: location.pathname === link.to ? 1 : 0,
                    transform: location.pathname === link.to ? 'scaleX(1)' : 'scaleX(0)',
                    boxShadow: location.pathname === link.to ? '0 0 18px rgba(117, 3, 28, 0.55)' : 'none',
                  }}
                />
                <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/10 transition-colors" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              to="/directory"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover-lift"
              style={{ background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-dark))', boxShadow: 'var(--shadow-burgundy)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              استكشف الآن
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="فتح القائمة"
            >
              {mobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden border-t border-white/10 animate-fade-in"
          style={{ background: 'rgba(31, 42, 74, 0.98)', backdropFilter: 'blur(12px)' }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3"
                style={{
                  color: location.pathname === link.to ? '#fff' : 'rgba(255,255,255,0.7)',
                  background: location.pathname === link.to ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: location.pathname === link.to ? 'var(--color-secondary)' : 'transparent',
                  }}
                />
                {link.label}
              </Link>
            ))}
            <Link
              to="/directory"
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-dark))' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              استكشف الشركات
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
