import { companies } from '../data/companies';
import { getUniqueValues } from '../utils/companyUtils';

const services = [
  {
    title: 'مساحات عمل مشتركة',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M12 6h.01" />
        <path d="M12 10h.01" />
        <path d="M12 14h.01" />
        <path d="M16 10h.01" />
        <path d="M16 14h.01" />
        <path d="M8 10h.01" />
        <path d="M8 14h.01" />
      </svg>
    ),
  },
  {
    title: 'مكاتب خاصة',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 21V8a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v13" />
        <path d="M6 21V3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
      </svg>
    ),
  },
  {
    title: 'قاعات اجتماعات',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'مساحات فعاليات وورش عمل',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h20" />
        <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
        <path d="m7 21 5-5 5 5" />
      </svg>
    ),
  },
  {
    title: 'إنترنت عالي السرعة',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 1 10 10" />
        <path d="M12 6a6 6 0 0 1 6 6" />
        <path d="M12 10a2 2 0 0 1 2 2" />
        <path d="M6 12h.01" />
        <path d="M2.5 15H2" />
      </svg>
    ),
  },
  {
    title: 'دعم تقني وفني',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    title: 'نظام أمني شامل',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'دخول على مدار الساعة',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'مجتمع ريادي',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      </svg>
    ),
  },
  {
    title: 'التصوير والطباعة',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9V3h12v6" />
        <path d="M6 15H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
        <path d="M6 21h12v-4H6z" />
      </svg>
    ),
  },
  {
    title: 'خزائن شخصية',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="M12 12h.01" />
        <path d="M8 12h.01" />
        <path d="M16 12h.01" />
      </svg>
    ),
  },
  {
    title: 'منطقة قهوة',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
        <line x1="6" x2="6" y1="2" y2="4" />
        <line x1="10" x2="10" y1="2" y2="4" />
        <line x1="14" x2="14" y1="2" y2="4" />
      </svg>
    ),
  },
];

export default function About() {
  const startupCount = companies.filter(c => c.type === 'شركة ناشئة').length;
  const categoryCount = getUniqueValues(companies, 'mainCategory').length;

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* Header */}
      <div className="pt-24 lg:pt-28 pb-12 section-surface">
        <div className="contour-field" />
        {/* Petal Pattern Decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, var(--color-secondary-light) 0%, transparent 50%)' }}>
          <svg className="absolute top-0 right-0 w-64 h-64 text-[var(--color-secondary)] opacity-10" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C70 20 100 20 100 50 C100 80 70 80 50 100 C30 80 0 80 0 50 C0 20 30 20 50 0 Z" />
          </svg>
          <svg className="absolute -bottom-10 -left-10 w-48 h-48 text-[var(--color-tertiary)] opacity-20" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C70 20 100 20 100 50 C100 80 70 80 50 100 C30 80 0 80 0 50 C0 20 30 20 50 0 Z" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center animate-fade-up">
          <h1 className="page-title text-4xl lg:text-5xl mb-4">عن مجمع وادي جدة للابتكار</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            بيئة ريادية متكاملة لدعم نمو الشركات الناشئة في مدينة جدة.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 pb-16">
        {/* About Content */}
        <div className="card premium-card p-6 lg:p-10 mb-10 relative overflow-hidden animate-fade-up" style={{ animationDelay: '100ms' }}>
          {/* Subtle bg pattern */}
          <div className="absolute inset-0 pattern-dots opacity-30" />
          
          <div className="max-w-3xl relative z-10 mx-auto text-center">
            <p className="text-base lg:text-lg leading-relaxed mb-8 font-medium" style={{ color: 'var(--color-primary)' }}>
              بيئة ريادية توفر لرواد الأعمال والمبتكرين الاستفادة من مجموعة مختلفة من الخدمات، وتتيح فرصة للتعرف على البرامج والأنشطة الريادية التي تسهم في تسريع نمو الشركات الناشئة بمدينة جدة.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 rounded-lg flex flex-col items-center justify-center border border-white/50 shadow-sm glass-panel hover-lift">
                <span className="text-3xl lg:text-4xl font-bold block mb-2 text-gradient">{startupCount}</span>
                <span className="text-sm font-semibold" style={{ color: 'rgba(31, 42, 74, 0.7)' }}>شركة ناشئة</span>
              </div>
              <div className="p-6 rounded-lg flex flex-col items-center justify-center border border-white/50 shadow-sm glass-panel hover-lift">
                <span className="text-3xl lg:text-4xl font-bold block mb-2 text-gradient">{categoryCount}</span>
                <span className="text-sm font-semibold" style={{ color: 'rgba(31, 42, 74, 0.7)' }}>قطاعات رئيسية</span>
              </div>
              <div className="p-6 rounded-lg flex flex-col items-center justify-center border border-white/50 shadow-sm glass-panel hover-lift">
                <span className="text-3xl lg:text-4xl font-bold block mb-2 text-gradient">{services.length}</span>
                <span className="text-sm font-semibold" style={{ color: 'rgba(31, 42, 74, 0.7)' }}>خدمة متاحة</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
              خدمات المجمع
            </h2>
            <p className="text-sm mt-2" style={{ color: 'rgba(31, 42, 74, 0.55)' }}>
              مجموعة متكاملة من الخدمات لدعم الشركات الناشئة
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {services.map((service, i) => (
              <div
                key={i}
                className="card premium-card p-5 flex flex-col items-center text-center gap-4 animate-fade-up hover-lift border-b-2 group overflow-hidden"
                style={{ animationDelay: `${200 + (i * 50)}ms`, borderBottomColor: 'transparent' }}
              >
                <div
                  className="icon-tile transition-colors group-hover:bg-[var(--color-secondary-light)] group-hover:text-[var(--color-secondary)]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {service.icon}
                </div>
                <span className="text-sm font-bold group-hover:text-[var(--color-secondary)] transition-colors" style={{ color: 'var(--color-primary)' }}>
                  {service.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-10 card premium-card p-6 lg:p-8 overflow-hidden">
          <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
            تواصل معنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--color-secondary-light)', color: 'var(--color-secondary)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <span className="text-xs block" style={{ color: 'rgba(31, 42, 74, 0.5)' }}>الهاتف</span>
                <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>0550268326</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--color-secondary-light)', color: 'var(--color-secondary)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div>
                <span className="text-xs block" style={{ color: 'rgba(31, 42, 74, 0.5)' }}>البريد الإلكتروني</span>
                <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>Wjih@wadi-jeddah.com.sa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
