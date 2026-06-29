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
        background: isScrolled
          ? 'linear-gradient(135deg, rgba(23, 33, 63, 0.86), rgba(31, 42, 74, 0.82) 62%, rgba(117, 3, 28, 0.36))'
          : 'linear-gradient(135deg, rgba(23, 33, 63, 0.78), rgba(31, 42, 74, 0.74) 62%, rgba(117, 3, 28, 0.28))',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
        boxShadow: isScrolled ? '0 18px 46px rgba(15, 21, 37, 0.24)' : '0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-l from-[var(--color-tertiary)] via-[var(--color-secondary)] to-transparent opacity-70" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute right-[8%] top-2 h-20 w-40 rounded-full bg-[var(--color-tertiary)] opacity-10 blur-3xl" />
        <span className="absolute left-[18%] top-1 h-16 w-36 rounded-full bg-[var(--color-secondary)] opacity-20 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative flex items-center justify-between h-16 lg:h-20 gap-3">
          {/* Brand */}
          <Link to="/" className="flex shrink-0 items-center rounded-lg px-1 py-1 transition-colors hover:bg-white/5" aria-label="الصفحة الرئيسية">
            <span className="relative flex h-12 w-16 shrink-0 items-center justify-center rounded-lg border border-white/[0.14] bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] lg:h-14 lg:w-20">
              <img
                src={`${import.meta.env.BASE_URL}logo-white.png`}
                alt="الشعار الرسمي"
                className="max-h-10 max-w-14 object-contain lg:max-h-12 lg:max-w-[4.5rem]"
              />
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.055] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link-premium relative overflow-hidden rounded-lg px-4 py-2.5 text-sm font-medium transition-colors group ${location.pathname === link.to ? 'is-active' : ''}`}
                style={{
                  color: location.pathname === link.to ? '#fff' : 'rgba(255,255,255,0.7)',
                  background: location.pathname === link.to ? 'rgba(255,255,255,0.095)' : 'transparent',
                }}
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 rounded-lg bg-white/0 transition-colors group-hover:bg-white/10" />
                <span className="absolute inset-0 rounded-lg opacity-0 transition-opacity group-hover:opacity-100" style={{ boxShadow: 'inset 0 0 0 1px rgba(154, 197, 219, 0.16), 0 0 22px rgba(154, 197, 219, 0.12)' }} />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/directory"
              className="hidden items-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 sm:flex"
              style={{
                background: 'linear-gradient(135deg, var(--color-secondary), #8f0422)',
                boxShadow: '0 14px 32px rgba(117, 3, 28, 0.32), inset 0 1px 0 rgba(255,255,255,0.18)',
                border: '1px solid rgba(255,255,255,0.13)',
              }}
            >
              استكشف الآن
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.07] text-white/80 transition-colors hover:bg-white/[0.12] hover:text-white lg:hidden"
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
          style={{ background: 'linear-gradient(180deg, rgba(23, 33, 63, 0.99), rgba(31, 42, 74, 0.99))', backdropFilter: 'blur(16px)' }}
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
              className="mt-2 flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-dark))' }}
            >
              استكشف الآن
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
