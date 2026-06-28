import { useMemo } from 'react';
import { getUniqueValues } from '../utils/companyUtils';

export default function StatsCards({ companies }) {
  const stats = useMemo(() => {
    const totalCompanies = companies.length;
    const sectors = getUniqueValues(companies, 'sector');
    const sectorCount = sectors.length;
    const startupCount = companies.filter(c => c.type === 'شركة ناشئة').length;
    const categoryCount = getUniqueValues(companies, 'mainCategory').length;

    return [
      {
        label: 'إجمالي الشركات',
        value: totalCompanies,
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 21V8a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v13" />
            <path d="M6 21V3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
            <path d="M10 9h4" />
            <path d="M10 13h4" />
          </svg>
        ),
        color: 'var(--color-primary)',
        bgColor: 'var(--color-primary-light)',
      },
      {
        label: 'عدد القطاعات',
        value: sectorCount,
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" x2="12" y1="22.08" y2="12" />
          </svg>
        ),
        color: 'var(--color-secondary)',
        bgColor: 'var(--color-secondary-light)',
      },
      {
        label: 'الشركات الناشئة',
        value: startupCount,
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        ),
        color: 'var(--color-tertiary)',
        bgColor: 'var(--color-tertiary-light)',
      },
      {
        label: 'التصنيفات المتوفرة',
        value: categoryCount,
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
          </svg>
        ),
        color: 'var(--color-neutral)',
        bgColor: 'rgba(154, 197, 219, 0.15)',
      },
    ];
  }, [companies]);

  return (
    <section className="stats-section relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #fff 0%, var(--color-bg) 100%)' }}>
      <div className="wadi-pattern opacity-50" />
      <div className="contour-field opacity-20" />
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stats-card card premium-card animate-fade-up hover-lift group overflow-hidden"
              style={{
                animationDelay: `${i * 0.1}s`,
                borderTop: `3px solid ${stat.color}`,
              }}
            >
              <span
                className="absolute -left-8 -top-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: stat.bgColor }}
              />
              <div
                className="icon-tile stats-card__icon relative transition-transform group-hover:scale-105 duration-300"
                style={{ color: stat.color }}
              >
                {stat.icon}
              </div>
              <div className="relative text-center">
                <span className="stat-number text-3xl lg:text-4xl font-black block leading-none transition-colors group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--color-primary)] group-hover:to-[var(--color-secondary)]" style={{ color: 'var(--color-primary)' }}>
                  {stat.value}
                </span>
                <span className="mt-2 block text-xs lg:text-sm font-medium" style={{ color: 'rgba(31, 42, 74, 0.62)' }}>
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
