import { safeValue, getStageLabel, getTypeLabel } from '../utils/companyUtils';

export default function CompanyCard({ company, onViewDetails }) {
  const displayName = company.name || company.nameEn || 'شركة بدون اسم';
  const displayNameEn = company.name && company.nameEn ? company.nameEn : '';
  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('');

  return (
    <div
      className="card premium-card p-5 lg:p-6 flex flex-col gap-4 animate-fade-up hover-lift group overflow-hidden"
    >
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-[var(--color-secondary)] via-[var(--color-tertiary)] to-[var(--color-primary)]" />
      <span className="absolute -left-12 top-10 w-32 h-32 rounded-full bg-[var(--color-tertiary-light)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-80" />
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="relative w-14 h-14 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 overflow-hidden shadow-sm" style={{ background: 'linear-gradient(135deg, var(--color-soft), #fff)', border: '1px solid rgba(154, 197, 219, 0.42)' }}>
          {company.logo ? (
            <img
              src={company.logo}
              alt={displayName}
              className="relative z-10 max-h-11 max-w-11 object-contain"
              loading="lazy"
            />
          ) : (
            <>
              <span className="absolute inset-1 petal-mark opacity-75" />
              <span className="absolute inset-0 bg-gradient-to-br from-white/55 to-transparent" />
              <span className="relative text-base font-bold" style={{ color: 'var(--color-primary)' }}>
                {initials || displayName[0]}
              </span>
            </>
          )}
        </div>
        
        <div className="flex-1 min-w-0 flex justify-between items-start gap-3">
          <div>
            <h3 className="font-bold text-base leading-tight group-hover:text-[var(--color-secondary)] transition-colors" style={{ color: 'var(--color-neutral)' }}>
              {displayName}
            </h3>
            {displayNameEn && (
              <p className="text-xs mt-0.5" style={{ color: 'rgba(31, 42, 74, 0.45)' }}>
                {displayNameEn}
              </p>
            )}
          </div>
          {company.stage && (
            <span className="badge badge-sky shrink-0 text-[10px] px-2.5 py-1 shadow-sm">
              {getStageLabel(company.stage)}
            </span>
          )}
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {company.sector && (
          <span className="badge badge-navy text-xs">{company.sector}</span>
        )}
        {company.mainCategory && company.mainCategory !== company.sector && (
          <span className="badge badge-burgundy text-xs">{company.mainCategory}</span>
        )}
        {company.type && (
          <span className="badge badge-sky text-xs">{getTypeLabel(company.type)}</span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed line-clamp-3 flex-1" style={{ color: 'rgba(31, 42, 74, 0.68)' }}>
        {safeValue(company.description, 'لا يوجد وصف متاح.')}
      </p>

      {/* Tags */}
      {company.tags && company.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {company.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
            className="premium-chip"
          >
            {tag}
          </span>
          ))}
          {company.tags.length > 3 && (
            <span
              className="text-[11px] px-2 py-1 rounded-full font-medium"
              style={{ color: 'rgba(31, 42, 74, 0.4)' }}
            >
              +{company.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Action */}
      <button
        onClick={() => onViewDetails(company)}
        className="btn w-full mt-auto text-sm py-2.5 transition-all group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:border-[var(--color-primary)]"
        style={{ 
          background: 'rgba(255,255,255,0.84)', 
          color: 'var(--color-primary)',
          border: '1px solid rgba(31, 42, 74, 0.14)',
        }}
      >
        عرض التفاصيل
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
