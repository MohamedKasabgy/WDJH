import { Link } from 'react-router-dom';

const quickLinks = [
  { to: '/about', label: 'عن وادي جدة' },
  { to: '/directory', label: 'دليل الشركات' },
  { to: '/sectors', label: 'القطاعات' },
  { to: '/matching', label: 'المطابقة الذكية' },
];

const informationLinks = [
  { label: 'الشروط والأحكام', href: '#' },
  { label: 'سياسة الخصوصية', href: '#' },
  { label: 'اتصل بنا', href: '#' },
];

export default function Footer() {
  return (
    <footer
      className="relative mt-12 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.95), var(--color-soft) 62%, #fff)',
        borderTop: '1px solid rgba(230, 231, 232, 0.9)',
      }}
    >
      <div className="relative z-20 h-1 w-full bg-gradient-to-l from-[var(--color-tertiary)] via-[var(--color-secondary)] to-[var(--color-primary)] pointer-events-none" />
      <div className="wadi-pattern opacity-[0.45]" />
      <div className="contour-field opacity-20" />
      <span className="absolute -right-16 top-12 h-48 w-48 rounded-lg bg-[var(--color-tertiary)] opacity-[0.15] blur-3xl animate-footer-float" />
      <span className="absolute -left-10 bottom-10 h-44 w-44 rounded-lg bg-[var(--color-secondary)] opacity-10 blur-3xl animate-footer-float" style={{ animationDelay: '1.4s' }} />
      <span className="absolute left-[32%] top-14 h-20 w-20 petal-mark opacity-25 animate-footer-float" style={{ animationDelay: '0.7s' }} />

      <div className="container relative z-10 mx-auto px-4 pb-12 pt-16 lg:px-8 lg:pb-16 lg:pt-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_0.62fr_0.62fr_0.82fr] lg:gap-10">
          <div className="max-w-xl">
            <Link to="/" className="mb-5 inline-flex items-center gap-4 rounded-lg p-1 transition-colors hover:bg-white/[0.55]" aria-label="وادي جدة للابتكار">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-white/[0.15] bg-[var(--color-primary)] shadow-[0_14px_32px_rgba(23,33,63,0.16)]">
                <img
                  src="/logo-white.png"
                  alt="وادي جدة للابتكار - Wadi Jeddah Innovation Hub"
                  className="max-h-10 max-w-10 object-contain"
                />
              </span>
              <span className="flex flex-col">
                <span className="text-2xl font-bold leading-tight" style={{ color: 'var(--color-neutral)' }}>
                  وادي جدة
                </span>
                <span className="text-xs font-semibold" style={{ color: 'rgba(31, 42, 74, 0.55)' }}>
                  Wadi Jeddah Innovation Hub
                </span>
              </span>
            </Link>

            <p className="max-w-lg text-sm leading-7" style={{ color: 'rgba(31, 42, 74, 0.68)' }}>
              بيئة ريادية متكاملة تدعم نمو الشركات الناشئة والمبتكرين في مدينة جدة، وتسهم في تحقيق رؤية المملكة 2030.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="premium-chip">منظومة الابتكار</span>
              <span className="premium-chip">ريادة الأعمال</span>
              <span className="premium-chip">رؤية 2030</span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
              روابط سريعة
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-2 text-sm font-medium transition-colors"
                    style={{ color: 'rgba(31, 42, 74, 0.62)' }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-tertiary)] transition-colors group-hover:bg-[var(--color-secondary)]" />
                    <span className="group-hover:text-[var(--color-secondary)]">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
              معلومات
            </h4>
            <ul className="flex flex-col gap-3">
              {informationLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm font-medium transition-colors"
                    style={{ color: 'rgba(31, 42, 74, 0.62)' }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-secondary)] opacity-75 transition-colors group-hover:bg-[var(--color-tertiary)]" />
                    <span className="group-hover:text-[var(--color-secondary)]">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
              تواصل معنا
            </h4>
            <div className="space-y-3 text-sm font-medium" style={{ color: 'rgba(31, 42, 74, 0.62)' }}>
              <a href="tel:0550268326" className="flex items-center gap-2 transition-colors hover:text-[var(--color-secondary)]">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-secondary-light)] text-[var(--color-secondary)]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                0550268326
              </a>
              <a href="mailto:Wjih@wadi-jeddah.com.sa" className="flex items-center gap-2 transition-colors hover:text-[var(--color-secondary)]">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-tertiary-light)] text-[var(--color-primary)]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                Wjih@wadi-jeddah.com.sa
              </a>
            </div>
            <div className="mt-5 flex gap-2">
              {[
                {
                  label: 'in',
                  href: 'http://linkedin.com/company/wjih-%D9%85%D8%AC%D9%85%D8%B9-%D9%88%D8%A7%D8%AF%D9%8A-%D8%AC%D8%AF%D8%A9-%D9%84%D9%84%D8%A7%D8%A8%D8%AA%D9%83%D8%A7%D8%B1/posts/?feedView=all',
                  ariaLabel: 'LinkedIn',
                },
                {
                  label: 'x',
                  href: 'https://x.com/Wjihub?lang=ar',
                  ariaLabel: 'X',
                },
              ].map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(31,42,74,0.1)] bg-white/70 text-xs font-bold uppercase text-[var(--color-primary)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-tertiary)] hover:text-[var(--color-secondary)]"
                  aria-label={item.ariaLabel}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-5 rounded-lg border border-[rgba(31,42,74,0.08)] bg-white/75 p-3 shadow-sm">
              <span className="mb-2 block text-[11px] font-semibold" style={{ color: 'rgba(31,42,74,0.5)' }}>
                ضمن منظومة الشراكات
              </span>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-16 items-center justify-center rounded-md bg-white">
                  <img src="/assets/wjihub/cic-logo.webp" alt="CIC" className="max-h-7 max-w-12 object-contain" />
                </span>
                <span className="text-xs leading-5" style={{ color: 'rgba(31,42,74,0.62)' }}>
                  تعاون مجتمعي يعزز بيئة الابتكار.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="wjih-image-surface relative mt-10 min-h-[120px] overflow-hidden rounded-lg border border-white/60"
          style={{ '--wjih-image': "url('/assets/wjihub/reception-alt.webp')" }}
        >
          <div className="relative z-10 flex min-h-[120px] items-end p-5">
            <p className="max-w-lg text-xs leading-6 text-white/75">
              واجهة رقمية مستوحاة من هوية وادي جدة ومساحات الابتكار والعمل الريادي.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-[rgba(31,42,74,0.1)] pt-7 text-center">
          <p className="text-xs font-medium" style={{ color: 'rgba(31, 42, 74, 0.5)' }}>
            © 2026 وادي جدة. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
