import { useMemo } from 'react';
import { getUniqueValues } from '../utils/companyUtils';

export default function SearchFilters({
  companies,
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
  onClearFilters,
  resultCount,
}) {
  const sectors = useMemo(() => getUniqueValues(companies, 'sector'), [companies]);
  const categories = useMemo(() => getUniqueValues(companies, 'mainCategory'), [companies]);
  const stages = useMemo(() => getUniqueValues(companies, 'stage'), [companies]);
  const types = useMemo(() => getUniqueValues(companies, 'type'), [companies]);

  const hasActiveFilters = filters.sector || filters.category || filters.stage || filters.type || searchQuery;

  return (
    <div className="directory-search-panel p-4 lg:p-5 flex flex-col gap-4 overflow-hidden">
      <div className="absolute left-4 top-4 w-20 h-20 petal-mark opacity-30 pointer-events-none" />
      <div className="absolute right-8 bottom-4 w-24 h-24 rounded-full blur-2xl opacity-40 pointer-events-none" style={{ background: 'var(--color-tertiary-light)' }} />
      {/* Search Bar */}
      <div className="relative z-10">
        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(31, 42, 74, 0.3)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ابحث باسم الشركة أو القطاع أو الوصف..."
          className="input pr-11 text-right"
          style={{ height: '52px', fontSize: '14px', borderColor: 'rgba(154, 197, 219, 0.38)' }}
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full transition-colors"
            style={{ background: 'var(--color-bg)', color: 'var(--color-secondary)' }}
            aria-label="مسح البحث"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Filters Row */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-[repeat(4,minmax(150px,1fr))_auto] items-center gap-3">
        <select
          value={filters.sector || ''}
          onChange={(e) => onFilterChange('sector', e.target.value || null)}
          className="input select text-right"
          style={{ width: '100%', fontSize: '13px', height: '42px' }}
        >
          <option value="">القطاع</option>
          {sectors.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <select
          value={filters.category || ''}
          onChange={(e) => onFilterChange('category', e.target.value || null)}
          className="input select text-right"
          style={{ width: '100%', fontSize: '13px', height: '42px' }}
        >
          <option value="">التصنيف</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          value={filters.stage || ''}
          onChange={(e) => onFilterChange('stage', e.target.value || null)}
          className="input select text-right"
          style={{ width: '100%', fontSize: '13px', height: '42px' }}
        >
          <option value="">المرحلة</option>
          {stages.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <select
          value={filters.type || ''}
          onChange={(e) => onFilterChange('type', e.target.value || null)}
          className="input select text-right"
          style={{ width: '100%', fontSize: '13px', height: '42px' }}
        >
          <option value="">نوع الشركة</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm font-medium flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg transition-colors h-[42px] sm:col-span-2 lg:col-span-4 xl:col-span-1"
            style={{ color: 'var(--color-secondary)', background: 'var(--color-secondary-light)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
            مسح الفلاتر
          </button>
        )}
      </div>

      {/* Result Count */}
      <div className="relative z-10 flex items-center gap-2 text-sm" style={{ color: 'rgba(31, 42, 74, 0.5)' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
        تم العثور على <strong style={{ color: 'var(--color-primary)' }}>{resultCount}</strong> شركة
      </div>
    </div>
  );
}
