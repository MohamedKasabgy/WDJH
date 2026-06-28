import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import StatsCards from '../components/StatsCards';
import BeneficiaryCards from '../components/BeneficiaryCards';
import { companies } from '../data/companies';

export default function Home() {
  // Get 3 featured companies (first 3 with descriptions)
  const featuredCompanies = companies
    .filter(c => c.description && c.description.length > 20)
    .slice(0, 3);

  return (
    <div>
      <Hero />
      <StatsCards companies={companies} />
      <BeneficiaryCards />

      {/* Featured Companies Preview */}
      <section className="section relative overflow-hidden" style={{ background: 'var(--color-bg)' }}>
        <div className="wadi-pattern opacity-40" />
        <div className="absolute inset-0 pointer-events-none opacity-70" style={{ background: 'radial-gradient(circle at 14% 20%, var(--color-sand-light), transparent 28%)' }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                شركات مميزة
              </h2>
              <p className="text-sm mt-1" style={{ color: 'rgba(31, 42, 74, 0.55)' }}>
                نبذة عن بعض الشركات في المنظومة
              </p>
            </div>
            <Link
              to="/directory"
              className="btn btn-secondary text-sm"
            >
              عرض المزيد
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredCompanies.map((company, i) => {
              const displayName = company.name || company.nameEn || 'شركة';
              const initials = displayName
                .split(/\s+/)
                .filter(Boolean)
                .slice(0, 2)
                .map(part => part[0])
                .join('');

              return (
                <div
                  key={company.id}
                  className="interactive-card card premium-card p-5 flex flex-col gap-4 animate-fade-up hover-lift overflow-hidden"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-[var(--color-secondary)] via-[var(--color-tertiary)] to-[var(--color-primary)]" />
                  <div className="flex items-start gap-4">
                    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white shadow-sm" style={{ border: '1px solid rgba(154, 197, 219, 0.34)' }}>
                      {company.logo ? (
                        <img src={company.logo} alt={displayName} className="max-h-12 max-w-12 object-contain" loading="lazy" />
                      ) : (
                        <>
                          <span className="absolute inset-1 petal-mark opacity-75" />
                          <span className="relative text-lg font-bold" style={{ color: 'var(--color-primary)' }}>
                            {initials || displayName[0]}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="interactive-title font-bold text-sm" style={{ color: 'var(--color-primary)' }}>
                            {displayName}
                          </h3>
                          {company.nameEn && company.name && (
                            <p className="interactive-muted text-[11px] mt-0.5" style={{ color: 'rgba(31, 42, 74, 0.4)' }}>
                              {company.nameEn}
                            </p>
                          )}
                        </div>
                        {company.sector && <span className="badge badge-sky text-[10px] shrink-0">{company.sector}</span>}
                      </div>
                    </div>
                  </div>
                  <p className="interactive-text text-xs leading-relaxed line-clamp-3 flex-1" style={{ color: 'rgba(31, 42, 74, 0.6)' }}>
                    {company.description}
                  </p>
                  <Link
                    to="/directory"
                    className="interactive-link text-xs font-semibold flex items-center gap-1 mt-auto"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    عرض التفاصيل
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
