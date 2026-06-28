import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { companies } from '../data/companies';

const sectorImages = [
  '/assets/wjihub/open-workspace.webp',
  '/assets/wjihub/reception-main.webp',
  '/assets/wjihub/workspace-quote-wall.webp',
  '/assets/wjihub/reception-alt.webp',
];

export default function Sectors() {
  const sectors = useMemo(() => {
    const sectorMap = {};

    companies.forEach(company => {
      if (!company.sector) return;

      if (!sectorMap[company.sector]) {
        sectorMap[company.sector] = {
          name: company.sector,
          count: 0,
          tags: new Set(),
          mainCategory: company.mainCategory || '',
        };
      }

      sectorMap[company.sector].count++;

      // Collect sample tags
      if (company.tags) {
        company.tags.slice(0, 2).forEach(tag => {
          sectorMap[company.sector].tags.add(tag);
        });
      }
    });

    return Object.values(sectorMap)
      .map(s => ({
        ...s,
        tags: Array.from(s.tags).slice(0, 4),
      }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const mainCategories = useMemo(() => {
    const catMap = {};
    companies.forEach(company => {
      if (!company.mainCategory) return;
      if (!catMap[company.mainCategory]) {
        catMap[company.mainCategory] = {
          name: company.mainCategory,
          count: 0,
        };
      }
      catMap[company.mainCategory].count++;
    });
    return Object.values(catMap).sort((a, b) => b.count - a.count);
  }, []);

  const sectorIcons = {
    'default': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* Header */}
      <div className="pt-24 lg:pt-28 pb-8 section-surface">
        <div className="wadi-pattern opacity-[0.45]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <h1 className="page-title">القطاعات</h1>
          <p className="page-subtitle">
            استعرض الشركات حسب القطاعات الرئيسية في منظومة وادي جدة.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 pb-16">
        {/* Main Categories */}
        <div className="mb-10">
          <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--color-primary)' }}>
            التصنيفات الرئيسية
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mainCategories.map((cat, i) => (
              <div
                key={i}
                className="interactive-card card premium-card p-5 flex items-center gap-4 animate-fade-up hover-lift overflow-hidden"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div
                  className="icon-tile shrink-0"
                  style={{ color: 'var(--color-primary)' }}
                >
                  <span className="text-lg font-bold">{cat.count}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--color-primary)' }}>
                    {cat.name}
                  </h3>
                  <span className="text-xs" style={{ color: 'rgba(31, 42, 74, 0.5)' }}>
                    {cat.count} {cat.count === 1 ? 'شركة' : 'شركة'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sector Cards */}
        <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--color-primary)' }}>
          القطاعات التفصيلية
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sectors.map((sector, i) => (
            <div
              key={i}
              className="facility-card card p-3 flex flex-col gap-3 animate-fade-up hover-lift overflow-hidden group"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-[var(--color-secondary)] via-[var(--color-tertiary)] to-[var(--color-primary)] opacity-80" />
              <div className="facility-card__image relative z-10">
                <img src={sectorImages[i % sectorImages.length]} alt={sector.name} loading="lazy" />
              </div>

              <div className="facility-card__panel flex flex-1 flex-col p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="icon-tile shrink-0 transition-transform group-hover:scale-105" style={{ color: 'var(--color-secondary)' }}>
                      {sectorIcons.default}
                    </span>
                    <div>
                      <h3 className="facility-card__title font-bold text-base mb-1" style={{ color: 'var(--color-primary)' }}>
                        {sector.name}
                      </h3>
                      <p className="facility-card__text text-xs" style={{ color: 'rgba(31, 42, 74, 0.5)' }}>
                        {sector.count} {sector.count === 1 ? 'شركة' : 'شركات'} في هذا القطاع
                      </p>
                    </div>
                  </div>
                  <span className="facility-card__title text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                    {sector.count}
                  </span>
                </div>

                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-bg)' }}>
                  <span
                    className="block h-full rounded-full animated-bar"
                    style={{
                      width: `${Math.min(100, 24 + sector.count * 12)}%`,
                      background: 'linear-gradient(90deg, var(--color-secondary), var(--color-tertiary))',
                      animationDelay: `${i * 0.05}s`,
                    }}
                  />
                </div>

                {sector.tags.length > 0 && (
                  <div className="my-4 flex flex-wrap gap-1.5">
                    {sector.tags.map((tag, ti) => (
                      <span key={ti} className="premium-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  to={`/directory?sector=${encodeURIComponent(sector.name)}`}
                  className="facility-card__link mt-auto text-sm font-bold"
                  style={{ color: 'var(--color-secondary)' }}
                >
                  استعرض الشركات ←
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* All Companies Link */}
        <div className="mt-10 text-center">
          <Link
            to="/directory"
            className="btn btn-secondary px-8"
          >
            عرض جميع الشركات
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
