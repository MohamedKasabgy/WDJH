import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { companies } from '../data/companies';
import { getCompanySearchText, normalizeText } from '../utils/companyUtils';
import SearchFilters from '../components/SearchFilters';
import CompanyCard from '../components/CompanyCard';
import CompanyModal from '../components/CompanyModal';

export default function Directory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sectorParam = searchParams.get('sector');

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    sector: sectorParam || null,
    category: null,
    stage: null,
    type: null,
  });
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Update filters when URL param changes
  useMemo(() => {
    if (sectorParam) {
      setFilters(prev => ({ ...prev, sector: sectorParam }));
    }
  }, [sectorParam]);

  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      // Search query
      if (searchQuery) {
        const searchText = getCompanySearchText(company);
        const query = normalizeText(searchQuery);
        if (!searchText.includes(query)) {
          return false;
        }
      }

      // Filters
      if (filters.sector && company.sector !== filters.sector) return false;
      if (filters.category && company.mainCategory !== filters.category) return false;
      if (filters.stage && company.stage !== filters.stage) return false;
      if (filters.type && company.type !== filters.type) return false;

      return true;
    });
  }, [searchQuery, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    // Clear sector param from URL if user clears sector filter
    if (key === 'sector' && !value && sectorParam) {
      setSearchParams({});
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setFilters({ sector: null, category: null, stage: null, type: null });
    setSearchParams({});
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* Header */}
      <div className="pt-24 lg:pt-28 pb-8 section-surface">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <h1 className="page-title">دليل الشركات والكيانات</h1>
          <p className="page-subtitle">
            استكشف منظومة الابتكار في وادي جدة وتعرّف على الشركات حسب القطاع والمرحلة.
          </p>

          <SearchFilters
            companies={companies}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            resultCount={filteredCompanies.length}
          />
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 lg:px-8 pb-16 relative">
        {filteredCompanies.length > 0 ? (
          <div className="grid-cards">
            {filteredCompanies.map(company => (
              <CompanyCard
                key={company.id}
                company={company}
                onViewDetails={setSelectedCompany}
              />
            ))}
          </div>
        ) : (
          <div className="card premium-card p-12 text-center overflow-hidden">
            <div className="contour-field" />
            <div
              className="relative w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4"
              style={{ background: 'var(--color-tertiary-light)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--color-primary)' }}>
              لا توجد نتائج مطابقة
            </h3>
            <p className="text-sm" style={{ color: 'rgba(31, 42, 74, 0.55)' }}>
              جرّب تغيير البحث أو مسح الفلاتر.
            </p>
            <button
              onClick={handleClearFilters}
              className="btn btn-secondary mt-4"
            >
              مسح الفلاتر
            </button>
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
