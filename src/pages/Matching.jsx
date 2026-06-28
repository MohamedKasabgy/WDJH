import { useState, useMemo } from 'react';
import { companies } from '../data/companies';
import { scoreCompanyMatch, getMatchLabel, getMatchedReasons, getStageLabel, safeValue, getCompanySearchText, normalizeText } from '../utils/companyUtils';
import CompanyModal from '../components/CompanyModal';

const suggestedQueries = [
  'ذكاء اصطناعي',
  'صحة',
  'البيانات',
  'التقنية المالية',
  'سيارات',
  'تعليم',
];

const reasonChipRules = [
  { label: 'الذكاء الاصطناعي', terms: ['ذكاء', 'اصطناعي', 'ai', 'automation', 'agents'] },
  { label: 'الصحة', terms: ['صحة', 'طبي', 'medical', 'health', 'biotech'] },
  { label: 'البيانات', terms: ['بيانات', 'data', 'analytics', 'تحليل'] },
  { label: 'التقنية المالية', terms: ['مالية', 'fintech', 'payments', 'محاسبة', 'مدفوعات'] },
];

function getPremiumReasonChips(company, query, reasons) {
  const text = `${getCompanySearchText(company)} ${normalizeText(query)} ${normalizeText(reasons.join(' '))}`;
  const chips = reasonChipRules
    .filter(rule => rule.terms.some(term => text.includes(normalizeText(term))))
    .map(rule => rule.label);

  return chips.length > 0 ? chips.slice(0, 4) : reasons.slice(0, 3);
}

export default function Matching() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const matches = useMemo(() => {
    if (!query.trim()) return [];

    const scored = companies.map(company => ({
      company,
      score: scoreCompanyMatch(company, query),
      reasons: getMatchedReasons(company, query),
    }));

    return scored
      .filter(m => m.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, [query, submitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSubmitted(true);
  };

  const hasQuery = query.trim().length > 0;

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* Header */}
      <div className="pt-24 lg:pt-28 pb-10 section-surface">
        <div className="wadi-pattern opacity-50" />
        <div className="contour-field" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute right-[12%] top-36 w-2 h-2 rounded-full bg-[var(--color-tertiary)] opacity-70 animate-soft-float" />
          <span className="absolute left-[18%] top-44 w-2.5 h-2.5 rounded-full bg-[var(--color-secondary)] opacity-35 animate-soft-float" style={{ animationDelay: '1.2s' }} />
          <span className="absolute left-[28%] bottom-12 w-16 h-16 petal-mark opacity-25 animate-soft-float" style={{ animationDelay: '0.8s' }} />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 animate-fade-up glass-panel"
            style={{ color: 'var(--color-secondary)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" x2="12" y1="22.08" y2="12" />
            </svg>
            <span className="text-xs font-semibold">المطابقة الذكية المدعومة بالذكاء الاصطناعي</span>
          </div>

          <h1 className="page-title">اكتب احتياجك وسنقترح لك الشركات المناسبة</h1>
          <p className="page-subtitle">
            نظامنا المتقدم يحلل متطلباتك ليربطك بالشركات والمراكز البحثية الأكثر توافقًا مع أهدافك في وادي جدة.
          </p>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative mt-8 z-10 animate-fade-up" style={{ animationDelay: '100ms' }}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-tertiary)] via-white to-[var(--color-secondary)] rounded-lg blur opacity-35 group-hover:opacity-55 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative bg-white rounded-lg shadow-[0_30px_90px_rgba(23,33,63,0.18)] overflow-hidden ring-1 ring-black/5 flex flex-col">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <span className="absolute right-10 top-8 w-2 h-2 rounded-full bg-[var(--color-tertiary)] opacity-55 animate-float" />
                  <span className="absolute left-28 top-12 w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)] opacity-45 animate-float-slow" />
                  <span className="absolute left-16 bottom-20 w-2 h-2 rounded-full bg-[var(--color-primary)] opacity-20 animate-float" />
                  <svg className="absolute left-4 top-4 w-40 h-28 opacity-25" viewBox="0 0 160 112" fill="none">
                    <path d="M12 68C42 18 86 14 112 42C132 64 122 86 148 96" stroke="var(--color-tertiary)" strokeWidth="1.2" className="trace-line" />
                    <path d="M24 94C56 76 74 84 96 54C112 32 128 28 146 30" stroke="var(--color-secondary)" strokeWidth="1" className="trace-line" style={{ animationDelay: '0.8s' }} />
                  </svg>
                </div>
                <div className="absolute left-5 top-5 w-10 h-10 rounded-lg grid place-items-center pointer-events-none shadow-sm" style={{ background: 'var(--color-secondary-light)', color: 'var(--color-secondary)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
                  </svg>
                </div>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="مثال: أبحث عن حلول في الذكاء الاصطناعي لتحليل البيانات الطبية..."
                  className="relative w-full text-right resize-none focus:outline-none p-5 pl-16 text-[var(--color-primary)] bg-transparent"
                  style={{
                    minHeight: '120px',
                    fontSize: '15px',
                    lineHeight: '1.7',
                  }}
                />
                
                <div className="relative px-4 py-3 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center" style={{ background: 'linear-gradient(90deg, var(--color-bg), #fff)' }}>
                  <div className="flex items-center gap-2 text-[var(--color-secondary)] opacity-70">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
                      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
                    </svg>
                    <span className="text-xs font-medium">الذكاء الاصطناعي يحلل طلبك</span>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary text-sm px-6 py-2 hover-lift w-full sm:w-auto"
                    disabled={!hasQuery}
                    style={{ opacity: hasQuery ? 1 : 0.5 }}
                  >
                    اكتشف
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Suggestions */}
          {!hasQuery && (
            <div className="mt-6">
              <p className="text-xs mb-3" style={{ color: 'rgba(31, 42, 74, 0.4)' }}>
                اقتراحات:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedQueries.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(q)}
                    className="premium-chip transition-colors hover:opacity-80"
                    style={{
                      background: 'var(--color-tertiary-light)',
                      color: 'var(--color-neutral)',
                      borderColor: 'rgba(154, 197, 219, 0.35)',
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 lg:px-8 pb-24 lg:pb-28">
        {!hasQuery && !submitted && (
          <div className="interactive-card card premium-card p-10 text-center max-w-lg mx-auto overflow-hidden">
            <div className="contour-field" />
            <div
              className="relative w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4"
              style={{ background: 'var(--color-tertiary-light)', color: 'var(--color-secondary)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3 className="font-bold text-base mb-2" style={{ color: 'var(--color-primary)' }}>
              اكتب وصفًا مختصرًا لاحتياجك
            </h3>
            <p className="text-sm" style={{ color: 'rgba(31, 42, 74, 0.55)' }}>
              مثال: أبحث عن شركة في الذكاء الاصطناعي أو الصحة أو السيارات أو المالية أو التعليم.
            </p>
          </div>
        )}

        {submitted && hasQuery && matches.length === 0 && (
          <div className="interactive-card card premium-card p-10 text-center max-w-lg mx-auto overflow-hidden">
            <div className="contour-field" />
            <div
              className="relative w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4"
              style={{ background: 'var(--color-tertiary-light)', color: 'var(--color-tertiary)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <h3 className="font-bold text-base mb-2" style={{ color: 'var(--color-primary)' }}>
              لم نجد نتائج واضحة
            </h3>
            <p className="text-sm" style={{ color: 'rgba(31, 42, 74, 0.55)' }}>
              جرّب كلمات مثل: صحة، ذكاء اصطناعي، سيارات، مالية، تعليم.
            </p>
          </div>
        )}

        {submitted && hasQuery && matches.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <h2 className="font-bold text-lg" style={{ color: 'var(--color-primary)' }}>
                النتائج المقترحة
              </h2>
              <span
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: 'var(--color-soft)', color: 'var(--color-neutral)' }}
              >
                {matches.length} شركة
              </span>
            </div>

            <div className="grid-cards">
              {matches.map(({ company, score, reasons }, i) => {
                const matchLabel = getMatchLabel(score);
                const displayName = company.name || company.nameEn || 'شركة';
                const reasonChips = getPremiumReasonChips(company, query, reasons);

                return (
                  <div
                    key={company.id}
                    className="interactive-card card premium-card p-5 flex flex-col gap-4 animate-fade-up hover-lift group overflow-hidden"
                    style={{ 
                      animationDelay: `${i * 0.08}s`,
                    }}
                  >
                    <span
                      className="absolute inset-x-0 top-0 h-1"
                      style={{
                        background: matchLabel.text === 'مطابقة عالية'
                          ? 'linear-gradient(90deg, var(--color-secondary), var(--color-secondary-dark))'
                          : matchLabel.text === 'مطابقة متوسطة'
                            ? 'linear-gradient(90deg, var(--color-tertiary), var(--color-primary))'
                            : 'linear-gradient(90deg, var(--color-primary), var(--color-tertiary))',
                      }}
                    />
                    <span className="absolute -left-10 top-14 w-28 h-28 rounded-full bg-[var(--color-secondary-light)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-80" />
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm group-hover:text-[var(--color-secondary)] transition-colors" style={{ color: 'var(--color-primary)' }}>
                          {displayName}
                        </h3>
                        {company.nameEn && company.name && (
                          <p className="text-[11px] mt-0.5" style={{ color: 'rgba(31, 42, 74, 0.4)' }}>
                            {company.nameEn}
                          </p>
                        )}
                      </div>
                      <span className={`badge ${matchLabel.className} text-[10px] shrink-0 font-semibold shadow-sm`}>
                        {matchLabel.text}
                      </span>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {company.sector && (
                        <span className="badge badge-navy text-[10px]">{company.sector}</span>
                      )}
                      {company.stage && (
                        <span className="badge badge-sky text-[10px]">{getStageLabel(company.stage)}</span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs leading-relaxed line-clamp-3 flex-1" style={{ color: 'rgba(31, 42, 74, 0.6)' }}>
                      {safeValue(company.description, 'لا يوجد وصف متاح.')}
                    </p>

                    {/* Match Reasons */}
                    {reasonChips.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap p-2 rounded-lg" style={{ background: 'linear-gradient(180deg, var(--color-soft), #fff)', border: '1px solid rgba(154, 197, 219, 0.24)' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                        <span className="text-[10px] font-medium" style={{ color: 'var(--color-primary)' }}>
                          المطابقة:
                        </span>
                        {reasonChips.map((reason, ri) => (
                          <span
                            key={ri}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                            style={{
                              color: 'var(--color-secondary)',
                              background: 'var(--color-secondary-light)',
                            }}
                          >
                            {reason}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action */}
                    <button
                      onClick={() => setSelectedCompany(company)}
                      className="btn w-full text-xs mt-auto py-2 transition-all group-hover:bg-[var(--color-primary)] group-hover:text-white"
                      style={{ 
                        background: 'transparent', 
                        color: 'var(--color-primary)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      عرض التفاصيل
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
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
