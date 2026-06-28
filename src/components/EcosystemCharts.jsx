import { useMemo } from 'react';

// CSS-based Donut Chart
function DonutChart({ data, title }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulativePercent = 0;

  const colors = ['#1F2A4A', '#75031C', '#9AC5DB', '#17213F', '#8f0422', '#C8E0ED'];

  return (
    <div className="card premium-card p-5 lg:p-6 overflow-hidden">
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-[var(--color-secondary)] via-[var(--color-tertiary)] to-[var(--color-primary)]" />
      <div className="contour-field opacity-20" />
      <h3 className="font-bold text-base mb-4" style={{ color: 'var(--color-primary)' }}>
        {title}
      </h3>
      <div className="relative flex flex-col sm:flex-row items-center gap-6">
        {/* SVG Donut */}
        <div className="relative w-36 h-36 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="12"
            />
            {/* Segments */}
            {data.map((item, i) => {
              const percent = (item.value / total) * 100;
              const circumference = 2 * Math.PI * 40;
              const dashLength = (percent / 100) * circumference;
              const dashOffset = -(cumulativePercent / 100) * circumference;
              cumulativePercent += percent;

              return (
                <circle
                  key={i}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={colors[i % colors.length]}
                  strokeWidth="12"
                  strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="butt"
                  className="transition-all duration-700 animate-scale-in"
                  style={{ animationDelay: `${i * 0.08}s` }}
                />
              );
            })}
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>
              {total}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2 flex-1">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ background: colors[i % colors.length] }}
              />
              <span className="text-xs flex-1" style={{ color: 'rgba(31, 42, 74, 0.7)' }}>
                {item.label}
              </span>
              <span className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// CSS-based Bar Chart
function BarChart({ data, title }) {
  const maxValue = Math.max(...data.map(d => d.value));

  const colors = ['#1F2A4A', '#75031C', '#9AC5DB', '#17213F', '#8f0422', '#C8E0ED'];

  return (
    <div className="card premium-card p-5 lg:p-6 overflow-hidden">
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-[var(--color-primary)] via-[var(--color-tertiary)] to-[var(--color-secondary)]" />
      <h3 className="font-bold text-base mb-4" style={{ color: 'var(--color-primary)' }}>
        {title}
      </h3>
      <div className="flex flex-col gap-3">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs w-24 text-right shrink-0 truncate" style={{ color: 'rgba(31, 42, 74, 0.7)' }}>
              {item.label}
            </span>
            <div className="flex-1 h-6 rounded-full overflow-hidden" style={{ background: 'var(--color-bg)', boxShadow: 'inset 0 0 0 1px rgba(230,231,232,0.8)' }}>
              <div
                className="h-full rounded-full flex items-center justify-end px-2 animated-bar"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  background: `linear-gradient(90deg, ${colors[i % colors.length]}, ${i % 2 === 0 ? '#9AC5DB' : '#75031C'})`,
                  minWidth: item.value > 0 ? '30px' : '0',
                  animationDelay: `${i * 0.06}s`,
                }}
              >
                <span className="text-[10px] font-semibold text-white">{item.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Stage Distribution
function StageDistribution({ data, title }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  const stageColors = {
    'Pre-Seed': '#75031C',
    'Seed': '#1F2A4A',
    'Growth': '#9AC5DB',
    'Other': '#17213F',
  };

  return (
    <div className="card premium-card p-5 lg:p-6 overflow-hidden">
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-[var(--color-secondary)] to-[var(--color-primary)]" />
      <h3 className="font-bold text-base mb-4" style={{ color: 'var(--color-primary)' }}>
        {title}
      </h3>
      <div className="flex flex-col gap-3">
        {data.map((item, i) => {
          const percent = total > 0 ? Math.round((item.value / total) * 100) : 0;
          return (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>
                  {item.label}
                </span>
                <span className="text-xs" style={{ color: 'rgba(31, 42, 74, 0.5)' }}>
                  {item.value} ({percent}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-bg)', boxShadow: 'inset 0 0 0 1px rgba(230,231,232,0.75)' }}>
                <div
                  className="h-full rounded-full animated-bar"
                  style={{
                    width: `${percent}%`,
                    background: stageColors[item.label] || '#4a6fa5',
                    minWidth: item.value > 0 ? '4px' : '0',
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function EcosystemCharts({ companies }) {
  const { categoryData, sectorData, stageData } = useMemo(() => {
    // Category distribution
    const categoryMap = {};
    const sectorMap = {};
    const stageMap = { 'Pre-Seed': 0, 'Seed': 0, 'Growth': 0, 'Other': 0 };

    companies.forEach(company => {
      // Category
      if (company.mainCategory) {
        categoryMap[company.mainCategory] = (categoryMap[company.mainCategory] || 0) + 1;
      }
      // Sector
      if (company.sector) {
        sectorMap[company.sector] = (sectorMap[company.sector] || 0) + 1;
      }
      // Stage
      if (company.stage) {
        if (stageMap[company.stage] !== undefined) {
          stageMap[company.stage]++;
        } else {
          stageMap['Other']++;
        }
      } else {
        stageMap['Other']++;
      }
    });

    const categoryData = Object.entries(categoryMap)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);

    const sectorData = Object.entries(sectorMap)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);

    const stageData = Object.entries(stageMap)
      .map(([label, value]) => ({ label, value }));

    return { categoryData, sectorData, stageData };
  }, [companies]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
        <DonutChart data={categoryData} title="توزيع الشركات حسب التصنيف" />
      </div>
      <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
        <BarChart data={sectorData} title="توزيع الشركات حسب القطاع" />
      </div>
      <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
        <StageDistribution data={stageData} title="توزيع الشركات حسب المرحلة" />
      </div>

      {/* Interactive Map Placeholder */}
      <div className="animate-fade-up h-full" style={{ animationDelay: '400ms' }}>
        <div className="card premium-card p-5 lg:p-6 h-full flex flex-col overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-[var(--color-tertiary)] via-[var(--color-secondary)] to-[var(--color-primary)]" />
          <h3 className="font-bold text-base mb-4" style={{ color: 'var(--color-primary)' }}>
            خريطة المنظومة
          </h3>
          <div
            className="rounded-lg overflow-hidden relative flex-1 group hover-lift"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), #0f1525 58%, var(--color-secondary-dark))',
              minHeight: '200px',
            }}
          >
            {/* Decorative map-like elements */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
              <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-tertiary)" strokeWidth="0.5" opacity="0.3" />
                  </pattern>
                  <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--color-tertiary)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="var(--color-tertiary)" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#mapGrid)" />
                <g fill="white">
                  <circle cx="100" cy="80" r="3" opacity="0.8" />
                  <circle cx="100" cy="80" r="10" fill="url(#mapGlow)" opacity="0.5" className="animate-pulse-glow" />
                  
                  <circle cx="200" cy="120" r="4" fill="var(--color-tertiary)" />
                  <circle cx="200" cy="120" r="15" fill="url(#mapGlow)" opacity="0.6" className="animate-pulse-glow" style={{ animationDelay: '1s' }} />
                  
                  <circle cx="300" cy="70" r="3" opacity="0.8" />
                  <circle cx="150" cy="150" r="2.5" opacity="0.6" fill="var(--color-secondary)" />
                  <circle cx="250" cy="160" r="2" opacity="0.5" />
                  <circle cx="50" cy="130" r="2" opacity="0.5" />
                </g>
                <g stroke="var(--color-tertiary)" strokeWidth="0.5" opacity="0.4">
                  <line x1="100" y1="80" x2="200" y2="120" className="trace-line" />
                  <line x1="200" y1="120" x2="300" y2="70" />
                  <line x1="100" y1="80" x2="150" y2="150" />
                  <line x1="150" y1="150" x2="250" y2="160" />
                </g>
              </svg>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] to-transparent opacity-80" />
            
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[200px] p-6 text-center h-full">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-3 glass-panel shadow-lg border border-white/10"
                style={{ color: 'white' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <p className="text-sm font-bold text-white mb-1">
                نقاط تأثير مترابطة
              </p>
              <p className="text-xs max-w-xs text-white/60">
                قراءة بصرية لعلاقات القطاعات والشركات داخل منظومة الابتكار.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
