import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden section-surface"
      style={{ paddingTop: '142px', paddingBottom: '96px' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="wadi-pattern" />
        <div className="contour-field" />
        <div className="curved-stroke right-[5%] top-28 rotate-12 opacity-70" />
        <div className="curved-stroke left-[7%] bottom-20 -rotate-12 opacity-60" />
        <div className="absolute top-[14%] right-[8%] w-72 h-72 rounded-full blur-3xl opacity-25 animate-soft-float" style={{ background: 'var(--color-tertiary)' }} />
        <div className="absolute top-[25%] left-[8%] w-80 h-80 rounded-full blur-3xl opacity-[0.15] animate-soft-float" style={{ background: 'var(--color-secondary)' }} />
        <div className="absolute bottom-[12%] right-[42%] w-56 h-56 rounded-full blur-3xl opacity-20 animate-slow-drift" style={{ background: 'var(--color-primary)' }} />
        <span className="absolute top-32 left-[21%] w-3 h-3 rounded-full animate-float" style={{ background: 'var(--color-secondary)', opacity: 0.42 }} />
        <span className="absolute bottom-36 right-[22%] w-2 h-2 rounded-full animate-float-slow" style={{ background: 'var(--color-tertiary)', opacity: 0.72 }} />
        <span className="absolute top-52 right-[32%] w-4 h-4 rotate-45 animate-float" style={{ background: 'var(--color-primary)', opacity: 0.18, borderRadius: '4px' }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1fr_0.92fr] gap-12 lg:gap-16 items-center">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 animate-fade-up glass-panel"
              style={{ color: 'var(--color-secondary)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
              </svg>
              <span className="text-sm font-semibold">دليل الابتكار والأعمال</span>
            </div>

            <h1 className="font-bold leading-[1.08] mb-6 animate-fade-up stagger-2" style={{ color: 'var(--color-neutral)', fontSize: 'clamp(42px, 6vw, 82px)', letterSpacing: 0 }}>
              مستكشف
              <span className="block text-gradient mt-1 pb-4">مجمع وادي جدة</span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed mb-8 max-w-2xl animate-fade-up stagger-3" style={{ color: 'rgba(31, 42, 74, 0.72)' }}>
              منصة أنيقة لاكتشاف الشركات الناشئة والقطاعات وفرص التعاون داخل منظومة مجمع وادي جدة للابتكار.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-fade-up stagger-4">
              <Link to="/directory" className="btn btn-primary px-8 py-3.5 text-base shadow-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                استكشف الشركات
              </Link>
              <Link
                to="/matching"
                className="btn btn-secondary px-8 py-3.5 text-base"
                style={{ background: 'rgba(255,255,255,0.72)', color: 'var(--color-primary)', borderColor: 'rgba(31, 42, 74, 0.16)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" x2="12" y1="22.08" y2="12" />
                </svg>
                جرّب المطابقة الذكية
              </Link>
            </div>
          </div>

          <div className="relative min-h-[420px] lg:min-h-[520px] animate-fade-up stagger-5">
            <div className="absolute inset-4 rounded-lg blur-3xl opacity-45 animate-pulse-glow" style={{ background: 'radial-gradient(circle, rgba(154,197,219,0.75), rgba(117,3,28,0.16) 45%, transparent 70%)' }} />
            <div
              className="wjih-image-surface wjih-parallax relative h-full min-h-[420px] rounded-lg overflow-hidden border border-white/70 shadow-[0_34px_90px_rgba(23,33,63,0.22)]"
              style={{ '--wjih-image': `url('${import.meta.env.BASE_URL}assets/wjihub/reception-main.webp')` }}
            >
              <div className="absolute inset-0 opacity-35">
                <div className="wadi-pattern" />
              </div>
              <div className="absolute -right-12 top-10 w-48 h-48 rounded-lg rotate-12 opacity-20" style={{ background: 'var(--color-tertiary)' }} />
              <div className="absolute -left-8 bottom-12 w-40 h-40 rounded-lg -rotate-12 opacity-[0.15]" style={{ background: 'var(--color-secondary)' }} />

              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <defs>
                  <radialGradient id="heroNodeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#9AC5DB" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#9AC5DB" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="heroLine" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9AC5DB" stopOpacity="0.85" />
                    <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#75031C" stopOpacity="0.65" />
                  </linearGradient>
                </defs>

                <g fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1">
                  <circle cx="260" cy="260" r="168" />
                  <circle cx="260" cy="260" r="112" />
                  <ellipse cx="260" cy="260" rx="190" ry="86" transform="rotate(-24 260 260)" />
                  <ellipse cx="260" cy="260" rx="184" ry="92" transform="rotate(32 260 260)" />
                </g>

                <g fill="none" stroke="url(#heroLine)" strokeWidth="1.4" strokeLinecap="round" opacity="0.82">
                  <path className="trace-line" d="M90 306C158 190 244 150 322 198C384 236 412 306 456 248" />
                  <path className="trace-line" style={{ animationDelay: '0.55s' }} d="M128 170C206 228 258 320 356 310C404 305 432 276 468 294" />
                  <path className="trace-line" style={{ animationDelay: '1.1s' }} d="M76 384C160 358 204 406 276 360C338 320 348 246 430 160" />
                  <path className="trace-line" style={{ animationDelay: '1.55s' }} d="M164 84C196 154 280 142 314 210C348 278 314 352 376 430" />
                </g>

                <g>
                  {[
                    [128, 170, 5, '#FFFFFF'],
                    [212, 222, 4, '#9AC5DB'],
                    [260, 260, 7, '#FFFFFF'],
                    [322, 198, 5, '#9AC5DB'],
                    [356, 310, 5, '#FFFFFF'],
                    [430, 160, 4, '#75031C'],
                    [456, 248, 4, '#FFFFFF'],
                    [276, 360, 5, '#9AC5DB'],
                    [376, 430, 4, '#FFFFFF'],
                  ].map(([cx, cy, r, fill], index) => (
                    <g key={`${cx}-${cy}`}>
                      <circle cx={cx} cy={cy} r={r * 4.2} fill="url(#heroNodeGlow)" opacity="0.28" className="animate-pulse-glow" style={{ animationDelay: `${index * 0.22}s` }} />
                      <circle cx={cx} cy={cy} r={r} fill={fill} opacity="0.96" />
                    </g>
                  ))}
                </g>
              </svg>

              <div className="absolute bottom-0 right-0 left-0 z-10 p-7 lg:p-9">
                <div className="max-w-md">
                  <span className="badge badge-sky mb-3">تحليل المنظومة</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">شبكة فرص مترابطة</h3>
                  <p className="text-sm leading-relaxed text-white/75 mb-5">
                    قطاعات وشركات وبيانات مترابطة تساعدك على قراءة المشهد بسرعة واختيار الشريك الأنسب.
                  </p>
                  <Link to="/overview" className="btn btn-inverted px-6 py-3 text-sm">
                    عرض النظام البيئي
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
