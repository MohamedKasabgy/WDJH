import { Link } from 'react-router-dom';

const footerLinks = [
  { to: '/about', label: 'عن وادي جدة' },
  { to: '/directory', label: 'دليل الشركات' },
  { to: '/sectors', label: 'القطاعات' },
  { to: '/matching', label: 'المطابقة الذكية' },
];

const footerLinks2 = [
  { label: 'الشروط والأحكام', href: '#' },
  { label: 'سياسة الخصوصية', href: '#' },
  { label: 'اتصل بنا', href: '#' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-white)', borderTop: '1px solid var(--color-border)' }}>
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--color-secondary), #a50528)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V7l8-4 8 4v14" />
                  <path d="M9 21v-6h6v6" />
                  <path d="M10 9h4" />
                  <path d="M10 13h4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg" style={{ color: 'var(--color-primary)' }}>وادي جدة</span>
                <span className="text-xs" style={{ color: 'rgba(31, 42, 74, 0.5)' }}>Wadi Jeddah Innovation Hub</span>
              </div>
            </Link>
            <p className="text-sm max-w-sm leading-relaxed" style={{ color: 'rgba(31, 42, 74, 0.6)' }}>
              بيئة ريادية متكاملة تدعم نمو الشركات الناشئة والمبتكرين في مدينة جدة، وتسهم في تحقيق رؤية المملكة 2030.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: 'var(--color-primary)' }}>روابط سريعة</h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors hover:underline"
                    style={{ color: 'rgba(31, 42, 74, 0.6)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: 'var(--color-primary)' }}>معلومات</h4>
            <ul className="flex flex-col gap-2">
              {footerLinks2.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:underline"
                    style={{ color: 'rgba(31, 42, 74, 0.6)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid var(--color-border)' }}>
          <p className="text-xs" style={{ color: 'rgba(31, 42, 74, 0.4)' }}>
            © 2026 وادي جدة. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs" style={{ color: 'rgba(31, 42, 74, 0.4)' }}>
              مجمع وادي جدة للابتكار
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
