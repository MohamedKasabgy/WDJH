import { useCallback, useEffect } from 'react';

export default function ServiceModal({ service, onClose }) {
  const handleOverlayClick = useCallback((event) => {
    if (event.target === event.currentTarget) onClose();
  }, [onClose]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!service) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} style={{ zIndex: 100 }}>
      <div className="modal-panel relative shadow-2xl overflow-hidden" style={{ maxWidth: '620px' }}>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 left-4 z-10 flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-[var(--color-secondary-light)]"
          style={{ background: 'rgba(247, 243, 241, 0.9)', color: 'var(--color-primary)' }}
          aria-label="إغلاق"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </button>

        <div className="relative p-6 lg:p-8">
          <div className="wadi-pattern opacity-20" />
          <div className="absolute left-8 top-10 h-24 w-24 petal-mark opacity-30 pointer-events-none" />

          <div className="relative mb-6 flex items-start gap-4">
            <div
              className="icon-tile h-14 w-14 shrink-0"
              style={{ color: 'var(--color-secondary)' }}
            >
              {service.icon}
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <span className="section-kicker mb-1 block">خدمات المجمع</span>
              <h2 className="text-xl font-bold" style={{ color: 'var(--color-neutral)' }}>
                {service.title}
              </h2>
              <p className="mt-2 text-sm leading-7" style={{ color: 'rgba(31, 42, 74, 0.66)' }}>
                {service.description}
              </p>
            </div>
          </div>

          <div className="mb-6 rounded-lg p-4" style={{ background: 'linear-gradient(180deg, var(--color-bg), #fff)', border: '1px solid rgba(230,231,232,0.85)' }}>
            <h3 className="mb-2 text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
              التفاصيل
            </h3>
            <p className="text-sm leading-7" style={{ color: 'rgba(31, 42, 74, 0.68)' }}>
              {service.details}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg p-4" style={{ background: 'rgba(247,243,241,0.76)', border: '1px solid rgba(154,197,219,0.24)' }}>
              <h3 className="mb-3 text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
                ما الذي يحصل عليه المستفيد؟
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.benefits.map((benefit) => (
                  <span key={benefit} className="premium-chip">
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg p-4" style={{ background: 'rgba(238,241,255,0.76)', border: '1px solid rgba(154,197,219,0.24)' }}>
              <h3 className="mb-3 text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
                مناسب لـ
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.suitableFor.map((item) => (
                  <span key={item} className="premium-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end border-t border-[var(--color-border)] pt-4">
            <button type="button" onClick={onClose} className="btn btn-primary text-sm">
              حسناً
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
