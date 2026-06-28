import { Link } from 'react-router-dom';

const beneficiaries = [
  {
    title: 'رواد الأعمال',
    description: 'اكتشف الشركات والشريكات المناسبة لمشروعك، وتواصل مع الجهات الداعمة لريادة الأعمال.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    link: '/directory',
    linkText: 'استكشف الشركات',
  },
  {
    title: 'المستثمرون',
    description: 'تصفح الفرص الاستثمارية في الشركات الناشئة بمراحلها المختلفة وقطاعاتها المتنوعة.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" x2="12" y1="2" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    link: '/directory',
    linkText: 'عرض الفرص',
  },
  {
    title: 'الطلاب والباحثون',
    description: 'تعرف على الشركات التي تقدم فرص تدريب وبحث في مجالات التقنية والابتكار.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    link: '/sectors',
    linkText: 'تصفح القطاعات',
  },
  {
    title: 'الجهات الحكومية والشركاء',
    description: 'تواصل مع الشركات الناشئة واستكشف فرص الشراكة والتعاون المشترك.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M14 3v4" />
        <path d="M10 3v4" />
        <path d="M6 7h12v14H6z" />
        <path d="M6 11h12" />
      </svg>
    ),
    link: '/matching',
    linkText: 'المطابقة الذكية',
  },
];

export default function BeneficiaryCards() {
  return (
    <section className="section relative overflow-hidden" style={{ background: 'linear-gradient(180deg, var(--color-bg), #fff)' }}>
      <div className="wadi-pattern opacity-40" />
      <div className="contour-field opacity-20" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>
            كيف تستفيد من المستكشف؟
          </h2>
          <p className="text-sm lg:text-base max-w-lg mx-auto" style={{ color: 'rgba(31, 42, 74, 0.6)' }}>
            منصة متكاملة تخدم مختلف الفئات في منظومة الابتكار
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {beneficiaries.map((item, i) => (
            <div
              key={i}
              className="card premium-card p-6 flex flex-col gap-4 animate-fade-up hover-lift group overflow-hidden"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="icon-tile transition-transform group-hover:scale-105"
                style={{ color: 'var(--color-secondary)' }}
              >
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-base mb-2" style={{ color: 'var(--color-primary)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(31, 42, 74, 0.6)' }}>
                  {item.description}
                </p>
              </div>
              <Link
                to={item.link}
                className="text-sm font-semibold flex items-center gap-1.5 transition-colors hover:opacity-80"
                style={{ color: 'var(--color-secondary)' }}
              >
                {item.linkText}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
