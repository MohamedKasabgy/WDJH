import { useMemo } from 'react';

// CSS-based Donut Chart
function DonutChart({ data, title }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulativePercent = 0;

  const colors = ['#1F2A4A', '#75031C', '#9AC5DB', '#17213F', '#8f0422', '#C8E0ED'];

  return (
    <div className="interactive-card card premium-card p-5 lg:p-6 overflow-hidden">
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
    <div className="interactive-card card premium-card p-5 lg:p-6 overflow-hidden">
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
    <div className="interactive-card card premium-card p-5 lg:p-6 overflow-hidden">
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

      {/* Ecosystem Map */}
      <div className="animate-fade-up h-full" style={{ animationDelay: '400ms' }}>
        <div className="interactive-card card premium-card p-5 lg:p-6 h-full flex flex-col overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-[var(--color-tertiary)] via-[var(--color-secondary)] to-[var(--color-primary)]" />
          <h3 className="font-bold text-base mb-4" style={{ color: 'var(--color-primary)' }}>
            خريطة المنظومة
          </h3>
          <div
            className="ecosystem-map-grid rounded-lg overflow-hidden relative flex-1 group hover-lift"
            style={{
              backgroundColor: 'var(--color-neutral)',
              minHeight: '310px',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(31,42,74,0.72)] via-[rgba(23,33,63,0.92)] to-[rgba(117,3,28,0.5)]" />
            <div className="absolute inset-0 opacity-75 transition-opacity duration-700 group-hover:opacity-100">
              <svg width="100%" height="100%" viewBox="0 0 520 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <defs>
                  <radialGradient id="ecosystemGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--color-tertiary)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="var(--color-tertiary)" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="ecosystemLine" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-tertiary)" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="white" stopOpacity="0.24" />
                    <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.58" />
                  </linearGradient>
                </defs>

                <g fill="none" stroke="rgba(238,241,255,0.11)" strokeWidth="1">
                  <circle cx="260" cy="170" r="122" />
                  <ellipse cx="260" cy="170" rx="190" ry="88" transform="rotate(-18 260 170)" />
                  <ellipse cx="260" cy="170" rx="178" ry="82" transform="rotate(28 260 170)" />
                </g>

                <g fill="none" stroke="url(#ecosystemLine)" strokeLinecap="round" strokeWidth="1.35">
                  <path className="trace-line" d="M260 170C218 132 174 104 118 88" />
                  <path className="trace-line" style={{ animationDelay: '0.4s' }} d="M260 170C308 122 358 90 426 82" />
                  <path className="trace-line" style={{ animationDelay: '0.8s' }} d="M260 170C206 200 164 236 116 268" />
                  <path className="trace-line" style={{ animationDelay: '1.2s' }} d="M260 170C314 204 370 238 428 262" />
                  <path className="trace-line" style={{ animationDelay: '1.6s' }} d="M118 88C210 70 340 70 426 82" opacity="0.48" />
                  <path className="trace-line" style={{ animationDelay: '2s' }} d="M116 268C226 304 330 304 428 262" opacity="0.45" />
                </g>

                <g>
                  {[
                    [118, 88, 'var(--color-tertiary)', '0s'],
                    [426, 82, 'var(--color-secondary)', '0.6s'],
                    [116, 268, 'white', '1.1s'],
                    [428, 262, 'var(--color-tertiary)', '1.7s'],
                    [260, 170, 'white', '0.3s'],
                    [214, 136, 'var(--color-tertiary)', '0.9s'],
                    [310, 206, 'var(--color-secondary)', '1.4s'],
                    [184, 220, 'white', '1.9s'],
                    [352, 134, 'white', '2.3s'],
                  ].map(([cx, cy, fill, delay]) => (
                    <g key={`${cx}-${cy}`}>
                      <circle cx={cx} cy={cy} r="18" fill="url(#ecosystemGlow)" opacity="0.32" className="animate-pulse-glow" style={{ animationDelay: delay }} />
                      <circle cx={cx} cy={cy} r={cx === 260 ? 7 : 4} fill={fill} opacity="0.96" />
                    </g>
                  ))}
                </g>
              </svg>
            </div>

            <div className="absolute right-1/2 top-1/2 z-20 -translate-y-1/2 translate-x-1/2">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-lg border border-white/20 bg-white/[0.12] p-3 shadow-[0_0_42px_rgba(154,197,219,0.38)] backdrop-blur-md"
                style={{ boxShadow: '0 0 0 1px rgba(154,197,219,0.18), 0 0 44px rgba(154,197,219,0.34)' }}
              >
                <img
                  src="/logo-white.png"
                  alt="الشعار الرسمي"
                  className="max-h-14 max-w-16 object-contain"
                />
              </div>
            </div>

            {[
              { label: 'الذكاء الاصطناعي', position: 'right-[8%] top-[16%]', color: 'var(--color-tertiary)', delay: '0s' },
              { label: 'التقنية الحيوية والصحة', position: 'left-[7%] top-[18%]', color: 'var(--color-secondary)', delay: '0.8s' },
              { label: 'المدن الذكية والتنقل', position: 'right-[7%] bottom-[19%]', color: 'white', delay: '1.2s' },
              { label: 'شركات الخدمات', position: 'left-[8%] bottom-[18%]', color: 'var(--color-tertiary)', delay: '1.6s' },
            ].map(item => (
              <div
                key={item.label}
                className={`map-label-float absolute z-20 ${item.position} max-w-[132px] rounded-lg border border-white/[0.14] bg-white/10 px-3 py-2 text-xs font-semibold leading-5 text-white shadow-[0_12px_28px_rgba(0,0,0,0.16)] backdrop-blur-md`}
                style={{ animationDelay: item.delay }}
              >
                <span className="mb-1 block h-1.5 w-8 rounded-full" style={{ background: item.color }} />
                {item.label}
              </div>
            ))}

            <span className="absolute right-[20%] top-[34%] h-2 w-2 rounded-full bg-[var(--color-tertiary)] animate-pulse-glow" />
            <span className="absolute left-[24%] top-[38%] h-2 w-2 rounded-full bg-white animate-pulse-glow" style={{ animationDelay: '0.9s' }} />
            <span className="absolute right-[30%] bottom-[24%] h-2 w-2 rounded-full bg-white animate-pulse-glow" style={{ animationDelay: '1.4s' }} />
            <span className="absolute left-[31%] bottom-[28%] h-2 w-2 rounded-full bg-[var(--color-secondary)] animate-pulse-glow" style={{ animationDelay: '2s' }} />

            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[rgba(23,33,63,0.95)] via-[rgba(23,33,63,0.6)] to-transparent px-5 pb-5 pt-16">
              <p className="max-w-sm text-xs leading-6 text-white/[0.72]">
                تصور تفاعلي يوضح ترابط القطاعات والشركات داخل منظومة الابتكار.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
