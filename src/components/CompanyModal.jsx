import { useEffect, useCallback } from 'react';
import { safeValue, getStageLabel, getTypeLabel } from '../utils/companyUtils';

export default function CompanyModal({ company, onClose }) {
  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!company) return null;

  const displayName = company.name || company.nameEn || 'شركة بدون اسم';
  const displayNameEn = company.name && company.nameEn ? company.nameEn : '';
  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('');
  const founderInitial = (company.founder || displayName || '?')[0];

  const handleCopyContact = () => {
    if (company.contact) {
      navigator.clipboard.writeText(company.contact).catch(() => {});
    }
  };

  const handleVisitWebsite = () => {
    if (company.website) {
      window.open(company.website, '_blank', 'noopener,noreferrer');
    }
  };

  const detailItems = [
    { label: 'القطاع', value: company.sector },
    { label: 'التصنيف الرئيسي', value: company.mainCategory },
    { label: 'المرحلة', value: getStageLabel(company.stage) },
    { label: 'عمر الشركة', value: company.companyAge },
    { label: 'المؤسس', value: company.founder },
    { label: 'الدور', value: company.founderRole },
    { label: 'الموقع', value: company.location },
    { label: 'التواصل', value: company.contact },
  ].filter(item => item.value);

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      style={{ zIndex: 100 }}
    >
      <div 
        className="modal-panel relative shadow-2xl overflow-hidden" 
        style={{ maxWidth: '600px' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-4 w-9 h-9 flex items-center justify-center rounded-lg transition-colors z-10 hover:bg-[var(--color-secondary-light)]"
          style={{ background: 'rgba(247, 243, 241, 0.9)', color: 'var(--color-primary)' }}
          aria-label="إغلاق"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </button>

        <div className="relative p-6 lg:p-8">
          <div className="wadi-pattern opacity-20" />
          <div className="absolute left-8 top-10 w-24 h-24 petal-mark opacity-30 pointer-events-none" />
          {/* Header */}
          <div className="relative flex items-start gap-4 mb-6">
            <div
                className="relative w-14 h-14 rounded-lg flex items-center justify-center shrink-0 overflow-hidden shadow-sm"
              style={{ background: 'linear-gradient(135deg, var(--color-soft), #fff)', border: '1px solid var(--color-border)' }}
            >
              {company.logo ? (
                <img src={company.logo} alt={displayName} className="relative z-10 max-h-11 max-w-11 object-contain" />
              ) : (
                <>
                  <span className="absolute w-12 h-12 petal-mark opacity-75" />
                  <span className="relative text-xl font-bold" style={{ color: 'var(--color-secondary)' }}>
                    {initials || displayName[0]}
                  </span>
                </>
              )}
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <h2 className="font-bold text-xl" style={{ color: 'var(--color-neutral)' }}>
                {displayName}
              </h2>
              {displayNameEn && (
                <p className="text-sm mt-0.5" style={{ color: 'rgba(31, 42, 74, 0.5)' }}>
                  {displayNameEn}
                </p>
              )}
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {company.type && (
              <span className="badge badge-navy">{getTypeLabel(company.type)}</span>
            )}
            {company.sector && (
              <span className="badge badge-sky">{company.sector}</span>
            )}
            {company.stage && (
              <span className="badge badge-burgundy">{getStageLabel(company.stage)}</span>
            )}
          </div>

          {(company.founder || company.founderImage) && (
            <div
              className="relative mb-6 flex items-center gap-4 rounded-lg p-4 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(238,241,255,0.9), rgba(255,255,255,0.92))',
                border: '1px solid rgba(154, 197, 219, 0.26)',
              }}
            >
              <div
                className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg shadow-sm"
                style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
              >
                {company.founderImage ? (
                  <img
                    src={company.founderImage}
                    alt={company.founder || 'صورة المؤسس'}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-xl font-bold text-white">
                    {founderInitial}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold" style={{ color: 'rgba(31, 42, 74, 0.5)' }}>
                  المؤسس
                </span>
                <h3 className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
                  {safeValue(company.founder)}
                </h3>
                {company.founderRole && (
                  <p className="text-xs mt-1" style={{ color: 'rgba(31, 42, 74, 0.58)' }}>
                    {company.founderRole}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {detailItems.map((item, i) => (
              <div
                key={i}
                className="p-3 rounded-lg"
                style={{ background: 'linear-gradient(180deg, var(--color-bg), #fff)', border: '1px solid rgba(230,231,232,0.8)' }}
              >
                <span className="text-[11px] font-medium block mb-0.5" style={{ color: 'rgba(31, 42, 74, 0.5)' }}>
                  {item.label}
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                  {safeValue(item.value)}
                </span>
              </div>
            ))}
          </div>

          {/* Description */}
          {company.description && (
            <div className="mb-6">
              <h4 className="text-xs font-semibold mb-2" style={{ color: 'rgba(31, 42, 74, 0.5)' }}>
                نبذة عن الشركة
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(31, 42, 74, 0.7)' }}>
                {company.description}
              </p>
            </div>
          )}

          {/* Tags */}
          {company.tags && company.tags.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-semibold mb-2" style={{ color: 'rgba(31, 42, 74, 0.5)' }}>
                الوسوم
              </h4>
              <div className="flex flex-wrap gap-2">
                {company.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-full font-medium"
                    style={{
                      background: 'var(--color-soft)',
                      color: 'var(--color-neutral)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
            {company.website && (
              <button onClick={handleVisitWebsite} className="btn btn-primary flex-1 text-sm">
                زيارة الموقع
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" x2="21" y1="14" y2="3" />
                </svg>
              </button>
            )}
            {company.contact && (
              <button onClick={handleCopyContact} className="btn btn-secondary flex-1 text-sm">
                نسخ بيانات التواصل
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              </button>
            )}
            <button onClick={onClose} className="btn btn-ghost flex-1 text-sm">
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
