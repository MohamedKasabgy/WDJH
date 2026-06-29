import { useState, useMemo } from 'react';
import { companies } from '../data/companies';
import { getUniqueValues, getStageLabel, safeValue } from '../utils/companyUtils';
import EcosystemCharts from '../components/EcosystemCharts';
import CompanyModal from '../components/CompanyModal';

export default function Overview() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  const { kpis, topSector, featuredCompany } = useMemo(() => {
    const totalCompanies = 22;
    const sectors = getUniqueValues(companies, 'sector');
    const stages = getUniqueValues(companies, 'stage');

    // Find top sector
    const sectorCounts = {};
    companies.forEach(c => {
      if (c.sector) sectorCounts[c.sector] = (sectorCounts[c.sector] || 0) + 1;
    });
    const topSectorEntry = Object.entries(sectorCounts).sort((a, b) => b[1] - a[1])[0];
    const topSectorName = topSectorEntry ? topSectorEntry[0] : 'غير متوفر';

    // Featured company (first one with full data)
    const featured = companies.find(c => c.name && c.description) || companies[0];

    return {
      kpis: [
        {
          label: 'إجمالي الشركات',
          value: totalCompanies,
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 21V8a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v13" />
              <path d="M6 21V3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
            </svg>
          ),
        },
        {
          label: 'عدد القطاعات',
          value: sectors.length,
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          ),
        },
        {
          label: 'عدد المراحل',
          value: stages.length,
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          ),
        },
        {
          label: 'أكثر قطاع نشاطًا',
          value: topSectorName,
          isText: true,
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          ),
        },
      ],
      topSector: topSectorName,
      featuredCompany: featured,
    };
  }, []);
  const featuredDisplayName = featuredCompany?.name || featuredCompany?.nameEn || 'شركة';
  const featuredInitials = featuredDisplayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('');
  const featuredFounderInitial = (featuredCompany?.founder || featuredDisplayName || '?')[0];

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* Header */}
      <div className="pt-24 lg:pt-28 pb-8 section-surface">
        <div className="wadi-pattern opacity-50" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <span className="section-kicker block mb-2">تحليل المنظومة</span>
          <h1 className="page-title">النظام البيئي للابتكار</h1>
          <p className="page-subtitle">
            نظرة شاملة على الشركات والقطاعات داخل منظومة مجمع وادي جدة.
          </p>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-8">
            {kpis.map((kpi, i) => (
              <div
                key={i}
                className="overview-kpi-card card premium-card animate-fade-up hover-lift group overflow-hidden"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  borderTop: '3px solid var(--color-secondary)',
                }}
              >
                <span className="absolute -left-8 -top-8 w-24 h-24 rounded-full bg-[var(--color-tertiary-light)] opacity-0 blur-lg group-hover:opacity-100 transition-opacity" />
                <div
                  className="overview-kpi-card__icon icon-tile relative transition-transform group-hover:scale-105"
                  style={{ color: i % 2 === 0 ? 'var(--color-secondary)' : 'var(--color-primary)' }}
                >
                  {kpi.icon}
                </div>
                <div className="relative min-w-0 text-center">
                  {kpi.isText ? (
                    <span className="overview-kpi-card__value overview-kpi-card__value--text text-sm font-bold block line-clamp-2" style={{ color: 'var(--color-primary)' }}>
                      {kpi.value}
                    </span>
                  ) : (
                    <span className="overview-kpi-card__value stat-number text-3xl lg:text-4xl font-black block leading-none" style={{ color: 'var(--color-primary)' }}>
                      {kpi.value}
                    </span>
                  )}
                  <span className="mt-2 block text-xs lg:text-sm font-medium" style={{ color: 'rgba(31, 42, 74, 0.62)' }}>
                    {kpi.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Charts Column */}
          <div className="lg:col-span-2">
            <EcosystemCharts companies={companies} />
          </div>

          {/* Side Panel */}
          <div className="flex flex-col gap-5 animate-fade-up" style={{ animationDelay: '300ms' }}>
            {/* Featured Company */}
            <div className="interactive-card card premium-card p-5 lg:p-6 hover-lift border-t-4 overflow-hidden" style={{ borderTopColor: 'var(--color-tertiary)' }}>
              <div className="wadi-pattern opacity-20" />
              <div className="flex items-center justify-between mb-4 relative">
                <h3 className="font-bold text-sm" style={{ color: 'var(--color-primary)' }}>
                  ملف من المنظومة
                </h3>
                <span className="badge badge-sky text-[10px]">مختار من البيانات</span>
              </div>

              {featuredCompany && (
                <div className="flex flex-col gap-4">
                  <div
                    className="relative w-16 h-16 rounded-lg flex items-center justify-center mx-auto overflow-hidden"
                    style={{ background: 'var(--color-soft)', border: '1px solid rgba(154, 197, 219, 0.42)' }}
                  >
                    {featuredCompany.logo ? (
                      <img
                        src={featuredCompany.logo}
                        alt={featuredDisplayName}
                        className="relative z-10 max-h-12 max-w-12 object-contain"
                      />
                    ) : (
                      <>
                        <span className="absolute inset-1 petal-mark opacity-70" />
                        <span className="relative text-2xl font-bold" style={{ color: 'var(--color-secondary)' }}>
                          {featuredInitials || featuredDisplayName[0]}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <h4 className="font-bold text-base" style={{ color: 'var(--color-primary)' }}>
                      {featuredCompany.name || featuredCompany.nameEn}
                    </h4>
                    {featuredCompany.nameEn && featuredCompany.name && (
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(31, 42, 74, 0.4)' }}>
                        {featuredCompany.nameEn}
                      </p>
                    )}
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {featuredCompany.sector && (
                      <span className="badge badge-navy text-xs">{featuredCompany.sector}</span>
                    )}
                    {featuredCompany.stage && (
                      <span className="badge badge-sky text-xs">{getStageLabel(featuredCompany.stage)}</span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs leading-relaxed text-center" style={{ color: 'rgba(31, 42, 74, 0.6)' }}>
                    {safeValue(featuredCompany.description, 'لا يوجد وصف متاح.')}
                  </p>

                  {(featuredCompany.founder || featuredCompany.founderImage) && (
                    <div className="flex items-center gap-3 rounded-lg p-3 text-right" style={{ background: 'rgba(238,241,255,0.7)', border: '1px solid rgba(154,197,219,0.22)' }}>
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                        {featuredCompany.founderImage ? (
                          <img src={featuredCompany.founderImage} alt={featuredCompany.founder || 'صورة المؤسس'} className="h-full w-full object-cover" />
                        ) : (
                          <span className="flex h-full w-full items-center justify-center text-base font-bold text-white">
                            {featuredFounderInitial}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-semibold" style={{ color: 'rgba(31,42,74,0.48)' }}>المؤسس</span>
                        <p className="truncate text-xs font-bold" style={{ color: 'var(--color-primary)' }}>{safeValue(featuredCompany.founder)}</p>
                        {featuredCompany.founderRole && (
                          <p className="truncate text-[11px]" style={{ color: 'rgba(31,42,74,0.5)' }}>{featuredCompany.founderRole}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col gap-2 pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
                    <button
                      onClick={() => setSelectedCompany(featuredCompany)}
                      className="btn btn-primary text-xs"
                    >
                      عرض التفاصيل
                    </button>
                    {featuredCompany.website && (
                      <a
                        href={featuredCompany.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost text-xs"
                      >
                        زيارة الموقع
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="interactive-card card premium-card p-5 lg:p-6 overflow-hidden">
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-[var(--color-secondary)] via-[var(--color-tertiary)] to-[var(--color-primary)]" />
              <h3 className="font-bold text-sm mb-4" style={{ color: 'var(--color-primary)' }}>
                إحصائيات سريعة
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'الشركات الناشئة', count: companies.filter(c => c.type === 'شركة ناشئة').length },
                  { label: 'شركات الخدمات', count: companies.filter(c => c.type === 'شركة خدمات').length },
                  { label: 'مرحلة البذرة', count: companies.filter(c => c.stage === 'Seed').length },
                  { label: 'ما قبل البذرة', count: companies.filter(c => c.stage === 'Pre-Seed').length },
                  { label: 'مرحلة النمو', count: companies.filter(c => c.stage === 'Growth').length },
                ].map((stat, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto] items-center gap-3">
                    <span className="text-xs" style={{ color: 'rgba(31, 42, 74, 0.6)' }}>{stat.label}</span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>{stat.count}</span>
                    <span className="col-span-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-bg)' }}>
                      <span
                        className="block h-full rounded-full animated-bar"
                        style={{
                          width: `${Math.max(8, (stat.count / companies.length) * 100)}%`,
                          background: i % 2 === 0 ? 'var(--color-secondary)' : 'var(--color-tertiary)',
                          animationDelay: `${i * 0.07}s`,
                        }}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Modal */}
      {selectedCompany && (
        <CompanyModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </div>
  );
}
