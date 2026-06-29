import { useState } from 'react';
import { companies } from '../data/companies';
import { getUniqueValues } from '../utils/companyUtils';
import ServiceModal from '../components/ServiceModal';

const services = [
  {
    title: 'مساحات عمل مشتركة',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M12 6h.01" />
        <path d="M12 10h.01" />
        <path d="M12 14h.01" />
        <path d="M16 10h.01" />
        <path d="M16 14h.01" />
        <path d="M8 10h.01" />
        <path d="M8 14h.01" />
      </svg>
    ),
  },
  {
    title: 'مكاتب خاصة',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 21V8a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v13" />
        <path d="M6 21V3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
      </svg>
    ),
  },
  {
    title: 'قاعات اجتماعات',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'مساحات فعاليات وورش عمل',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h20" />
        <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
        <path d="m7 21 5-5 5 5" />
      </svg>
    ),
  },
  {
    title: 'إنترنت عالي السرعة',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 1 10 10" />
        <path d="M12 6a6 6 0 0 1 6 6" />
        <path d="M12 10a2 2 0 0 1 2 2" />
        <path d="M6 12h.01" />
        <path d="M2.5 15H2" />
      </svg>
    ),
  },
  {
    title: 'دعم تقني وفني',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    title: 'نظام أمني شامل',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'دخول على مدار الساعة',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'مجتمع ريادي',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      </svg>
    ),
  },
  {
    title: 'التصوير والطباعة',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9V3h12v6" />
        <path d="M6 15H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
        <path d="M6 21h12v-4H6z" />
      </svg>
    ),
  },
  {
    title: 'خزائن شخصية',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="M12 12h.01" />
        <path d="M8 12h.01" />
        <path d="M16 12h.01" />
      </svg>
    ),
  },
  {
    title: 'منطقة قهوة',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
        <line x1="6" x2="6" y1="2" y2="4" />
        <line x1="10" x2="10" y1="2" y2="4" />
        <line x1="14" x2="14" y1="2" y2="4" />
      </svg>
    ),
  },
];

const facilityVisuals = {
  'مساحات عمل مشتركة': {
    image: `${import.meta.env.BASE_URL}assets/wjihub/open-workspace.webp`,
    description: 'مساحات مرنة مصممة للعمل اليومي والتواصل بين رواد الأعمال.',
    details: 'توفر مساحات العمل المشتركة بيئة يومية مهيأة للتركيز والتعاون، مع سهولة الوصول إلى مرافق المجمع والخدمات المساندة وفرص التعارف داخل المجتمع الريادي.',
    benefits: ['بيئة عمل محفزة', 'فرص تواصل', 'سهولة الوصول للخدمات'],
    suitableFor: ['المؤسسون الأفراد', 'الفرق الصغيرة', 'العاملون عن بعد'],
  },
  'مكاتب خاصة': {
    image: `${import.meta.env.BASE_URL}assets/wjihub/reception-alt.webp`,
    description: 'بيئة هادئة ومجهزة للفرق التي تحتاج خصوصية واستقرارًا.',
    details: 'تمنح المكاتب الخاصة الفرق مساحة ثابتة ومنظمة داخل بيئة ريادية، بما يساعدها على إدارة أعمالها اليومية مع الحفاظ على الخصوصية والقرب من مجتمع الابتكار.',
    benefits: ['مساحة ثابتة', 'خصوصية أعلى', 'قرب من مجتمع الأعمال'],
    suitableFor: ['الشركات الناشئة', 'فرق المنتجات', 'الشركات في مرحلة النمو'],
  },
  'قاعات اجتماعات': {
    image: `${import.meta.env.BASE_URL}assets/wjihub/workspace-quote-wall.webp`,
    description: 'قاعات عملية لعقد الاجتماعات والعروض وورش التفكير.',
    details: 'قاعات مصممة لاستضافة الاجتماعات الرسمية، جلسات العصف الذهني، عروض المستثمرين، وورش التفكير ضمن بيئة منظمة ومهنية.',
    benefits: ['تجربة مهنية', 'تجهيزات مناسبة', 'بيئة منظمة'],
    suitableFor: ['اجتماعات الفرق', 'عروض المستثمرين', 'ورش العمل'],
  },
  'مساحات فعاليات وورش عمل': {
    image: `${import.meta.env.BASE_URL}assets/wjihub/reception-main.webp`,
    description: 'مساحات مناسبة للفعاليات واللقاءات وبناء المجتمع الريادي.',
    details: 'تدعم مساحات الفعاليات تنظيم اللقاءات الريادية، البرامج التدريبية، ورش العمل، وجلسات المجتمع التي تعزز تبادل الخبرات بين رواد الأعمال.',
    benefits: ['تنظيم مرن', 'حضور مجتمعي', 'تجربة ملائمة للورش'],
    suitableFor: ['الفعاليات الريادية', 'البرامج التدريبية', 'لقاءات المجتمع'],
  },
  'إنترنت عالي السرعة': {
    image: `${import.meta.env.BASE_URL}assets/wjihub/open-workspace.webp`,
    description: 'اتصال موثوق يدعم سير العمل والتجارب الرقمية بسلاسة.',
    details: 'اتصال سريع ومستقر يساعد الفرق على تشغيل أدواتها السحابية، الاجتماعات المرئية، التجارب الرقمية، والعمليات اليومية دون تعطل غير ضروري.',
    benefits: ['اتصال مستقر', 'دعم العمل السحابي', 'تجربة رقمية سلسة'],
    suitableFor: ['فرق التقنية', 'الشركات الرقمية', 'فرق التشغيل'],
  },
  'دعم تقني وفني': {
    image: `${import.meta.env.BASE_URL}assets/wjihub/workspace-quote-wall.webp`,
    description: 'دعم مستمر يساعد الفرق على التركيز على النمو والتطوير.',
    details: 'يوفر الدعم التقني والفني مساندة عملية للتعامل مع الاحتياجات التشغيلية داخل المجمع، بما يحافظ على استمرارية العمل ويرفع كفاءة التجربة اليومية.',
    benefits: ['حلول أسرع', 'استمرارية تشغيل', 'دعم يومي منظم'],
    suitableFor: ['الشركات المحتضنة', 'الفرق التشغيلية', 'منظمو الفعاليات'],
  },
  'نظام أمني شامل': {
    image: `${import.meta.env.BASE_URL}assets/wjihub/reception-main.webp`,
    description: 'بيئة آمنة ومنظمة تضمن راحة الشركات والزوار.',
    details: 'يعزز النظام الأمني الشامل الثقة داخل بيئة العمل من خلال تنظيم الدخول، حماية المرافق، وتوفير تجربة آمنة للشركات والزوار.',
    benefits: ['راحة واطمئنان', 'تنظيم الدخول', 'حماية المرافق'],
    suitableFor: ['الشركات المقيمة', 'الزوار', 'منظمو اللقاءات'],
  },
  'دخول على مدار الساعة': {
    image: `${import.meta.env.BASE_URL}assets/wjihub/reception-alt.webp`,
    description: 'مرونة في الوصول تناسب إيقاع العمل الريادي المتغير.',
    details: 'يتيح الدخول على مدار الساعة مرونة أكبر للفرق التي تعمل وفق جداول مختلفة أو تحتاج إلى متابعة أعمالها خارج أوقات العمل التقليدية.',
    benefits: ['مرونة عالية', 'استجابة لإيقاع الفرق', 'استمرارية العمل'],
    suitableFor: ['فرق التقنية', 'المؤسسون', 'فرق الإطلاق والتشغيل'],
  },
  'مجتمع ريادي': {
    image: `${import.meta.env.BASE_URL}assets/wjihub/open-workspace.webp`,
    description: 'شبكة من المؤسسين والمبتكرين والجهات الداعمة داخل مكان واحد.',
    details: 'يساعد المجتمع الريادي على بناء علاقات عملية بين المؤسسين والمبتكرين والشركاء، ويفتح فرصًا للتعاون والتعلم وتبادل الخبرات.',
    benefits: ['فرص تعارف', 'تبادل خبرات', 'تعاون وشراكات'],
    suitableFor: ['رواد الأعمال', 'المبتكرون', 'الشركاء الداعمون'],
  },
  'التصوير والطباعة': {
    image: `${import.meta.env.BASE_URL}assets/wjihub/workspace-quote-wall.webp`,
    description: 'خدمات مساندة للمواد والعروض والاحتياجات التشغيلية اليومية.',
    details: 'تساند خدمات التصوير والطباعة احتياجات الفرق اليومية، من تجهيز المستندات والمواد التعريفية إلى دعم العروض والاجتماعات.',
    benefits: ['خدمات يومية', 'تجهيز مواد', 'دعم للاجتماعات'],
    suitableFor: ['فرق الأعمال', 'منظمو الورش', 'فرق التسويق'],
  },
  'خزائن شخصية': {
    image: `${import.meta.env.BASE_URL}assets/wjihub/reception-alt.webp`,
    description: 'تفاصيل عملية تحفظ أغراض المستخدمين داخل بيئة العمل.',
    details: 'توفر الخزائن الشخصية مساحة حفظ عملية للمستخدمين، بما يجعل تجربة العمل اليومية أكثر ترتيبًا وراحة داخل المجمع.',
    benefits: ['حفظ الأغراض', 'راحة يومية', 'تنظيم أفضل'],
    suitableFor: ['المستخدمون اليوميون', 'أصحاب العضويات', 'فرق العمل المشتركة'],
  },
  'منطقة قهوة': {
    image: `${import.meta.env.BASE_URL}assets/wjihub/reception-main.webp`,
    description: 'مساحة غير رسمية للقاءات السريعة وبناء العلاقات.',
    details: 'تمنح منطقة القهوة مساحة اجتماعية خفيفة للقاءات السريعة، المحادثات العفوية، وبناء العلاقات بين أعضاء المجتمع.',
    benefits: ['لقاءات غير رسمية', 'بناء علاقات', 'استراحة مريحة'],
    suitableFor: ['أعضاء المجتمع', 'الزوار', 'فرق العمل'],
  },
};

export default function About() {
  const [selectedService, setSelectedService] = useState(null);
  const totalCompanies = 22;
  const startupCount = companies.filter(c => c.type === 'شركة ناشئة').length;
  const categoryCount = getUniqueValues(companies, 'mainCategory').length;

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* Header */}
      <div className="pt-24 lg:pt-28 pb-12 section-surface">
        <div className="contour-field" />
        {/* Petal Pattern Decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, var(--color-secondary-light) 0%, transparent 50%)' }}>
          <svg className="absolute top-0 right-0 w-64 h-64 text-[var(--color-secondary)] opacity-10" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C70 20 100 20 100 50 C100 80 70 80 50 100 C30 80 0 80 0 50 C0 20 30 20 50 0 Z" />
          </svg>
          <svg className="absolute -bottom-10 -left-10 w-48 h-48 text-[var(--color-tertiary)] opacity-20" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C70 20 100 20 100 50 C100 80 70 80 50 100 C30 80 0 80 0 50 C0 20 30 20 50 0 Z" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center animate-fade-up">
          <h1 className="page-title text-4xl lg:text-5xl mb-4">عن مجمع وادي جدة للابتكار</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            بيئة ريادية متكاملة لدعم نمو الشركات الناشئة في مدينة جدة.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 pb-16">
        {/* About Content */}
        <div className="about-hero-panel p-6 lg:p-10 mb-10 relative overflow-hidden animate-fade-up" style={{ animationDelay: '100ms' }}>
          {/* Subtle bg pattern */}
          <div className="absolute inset-0 pattern-dots opacity-30" />
          
          <div className="relative z-10 grid items-stretch gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div
              className="wjih-image-surface relative min-h-[260px] overflow-hidden rounded-lg border border-white/60 shadow-[0_24px_60px_rgba(23,33,63,0.16)]"
              style={{ '--wjih-image': `url('${import.meta.env.BASE_URL}assets/wjihub/open-workspace.webp')` }}
            >
              <div className="absolute bottom-0 right-0 left-0 z-10 p-5">
                <span className="badge badge-sky mb-3">WJIH</span>
                <h3 className="text-xl font-bold text-white">مساحات عمل وهوية مؤسسية</h3>
                <p className="mt-2 text-xs leading-6 text-white/75">
                  مساحة مصممة لاحتضان الشركات الناشئة والمبتكرين ضمن بيئة عمل متكاملة.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <span className="section-kicker mb-2">مجمع وادي جدة للابتكار</span>
              <p className="text-base lg:text-lg leading-relaxed mb-8 font-medium" style={{ color: 'var(--color-primary)' }}>
                بيئة ريادية توفر لرواد الأعمال والمبتكرين الاستفادة من مجموعة مختلفة من الخدمات، وتتيح فرصة للتعرف على البرامج والأنشطة الريادية التي تسهم في تسريع نمو الشركات الناشئة بمدينة جدة.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="about-stat-tile p-5 rounded-lg flex flex-col items-center justify-center border border-white/50 shadow-sm glass-panel">
                  <span className="text-3xl lg:text-4xl font-bold block mb-2 text-gradient">{totalCompanies}</span>
                  <span className="text-sm font-semibold" style={{ color: 'rgba(31, 42, 74, 0.7)' }}>إجمالي الشركات</span>
                </div>
                <div className="about-stat-tile p-5 rounded-lg flex flex-col items-center justify-center border border-white/50 shadow-sm glass-panel">
                  <span className="text-3xl lg:text-4xl font-bold block mb-2 text-gradient">{startupCount}</span>
                  <span className="text-sm font-semibold" style={{ color: 'rgba(31, 42, 74, 0.7)' }}>شركة ناشئة</span>
                </div>
                <div className="about-stat-tile p-5 rounded-lg flex flex-col items-center justify-center border border-white/50 shadow-sm glass-panel">
                  <span className="text-3xl lg:text-4xl font-bold block mb-2 text-gradient">{categoryCount}</span>
                  <span className="text-sm font-semibold" style={{ color: 'rgba(31, 42, 74, 0.7)' }}>قطاعات رئيسية</span>
                </div>
                <div className="about-stat-tile p-5 rounded-lg flex flex-col items-center justify-center border border-white/50 shadow-sm glass-panel">
                  <span className="text-3xl lg:text-4xl font-bold block mb-2 text-gradient">{services.length}</span>
                  <span className="text-sm font-semibold" style={{ color: 'rgba(31, 42, 74, 0.7)' }}>خدمة متاحة</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community & Partnerships */}
        <section className="mb-10 grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div
            className="wjih-image-surface wjih-parallax relative min-h-[360px] overflow-hidden rounded-lg border border-white/60 shadow-[0_28px_70px_rgba(23,33,63,0.18)] animate-fade-up"
            style={{ '--wjih-image': `url('${import.meta.env.BASE_URL}assets/wjihub/workspace-quote-wall.webp')` }}
          >
            <div className="absolute inset-0 z-10 flex items-end p-6 lg:p-8">
              <div className="max-w-xl">
                <span className="badge badge-sky mb-3">عن المجتمع والشراكات</span>
                <h2 className="mb-3 text-2xl font-bold text-white lg:text-3xl">
                  منظومة تجمع الشركات الناشئة والمبتكرين والشركاء
                </h2>
                <p className="text-sm leading-7 text-white/78">
                  تعمل مجمع وادي جدة على بناء منظومة ريادية متكاملة تربط الشركات الناشئة بالمبتكرين والجهات الداعمة والشراكات النوعية، بما يخلق بيئة عملية للنمو وتبادل الخبرات.
                </p>
              </div>
            </div>
          </div>

          <div className="interactive-card card premium-card overflow-hidden p-6 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-[var(--color-secondary)] via-[var(--color-tertiary)] to-[var(--color-primary)]" />
            <div className="relative z-10">
              <div className="mb-5 flex items-center gap-4">
                <span className="flex h-14 w-20 items-center justify-center rounded-lg border border-[rgba(31,42,74,0.1)] bg-white shadow-sm">
                  <img src={`${import.meta.env.BASE_URL}assets/wjihub/cic-logo.webp`} alt="CIC" className="max-h-9 max-w-16 object-contain" />
                </span>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>
                    تعاون يعزز بيئة الابتكار
                  </h3>
                  <p className="text-xs font-semibold" style={{ color: 'rgba(31,42,74,0.5)' }}>
                    CIC ضمن منظومة الشراكات والمجتمع
                  </p>
                </div>
              </div>
              <p className="text-sm leading-7" style={{ color: 'rgba(31,42,74,0.68)' }}>
                يبرز التعاون مع CIC ضمن الجهود الهادفة إلى تعزيز بيئة الابتكار وربط رواد الأعمال بالفرص والمساحات والخدمات المناسبة لنموهم، دون أن يحل محل هوية مجمع وادي جدة الرئيسية.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <span className="premium-chip justify-center">شراكات نوعية</span>
                <span className="premium-chip justify-center">بيئة نمو</span>
                <span className="premium-chip justify-center">فرص مجتمعية</span>
                <span className="premium-chip justify-center">مساحات عمل</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
              خدمات المجمع
            </h2>
            <p className="text-sm mt-2" style={{ color: 'rgba(31, 42, 74, 0.55)' }}>
              مجموعة متكاملة من الخدمات لدعم الشركات الناشئة
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {services.map((service, i) => (
              <div
                key={i}
                className="facility-card facility-card--icon card animate-fade-up hover-lift group overflow-hidden"
                style={{ animationDelay: `${200 + (i * 50)}ms` }}
              >
                <div className="facility-card__panel p-4 text-right">
                  <span className="icon-tile shrink-0" style={{ color: 'var(--color-secondary)' }}>
                    {service.icon}
                  </span>
                  <div className="flex-1">
                    <h3 className="facility-card__title text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
                      {service.title}
                    </h3>
                    <p className="facility-card__text mt-2 text-xs leading-6" style={{ color: 'rgba(31,42,74,0.62)' }}>
                      {facilityVisuals[service.title]?.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedService({ ...service, ...facilityVisuals[service.title] })}
                    className="facility-card__link mt-3 inline-flex w-fit cursor-pointer border-0 bg-transparent p-0 text-xs font-bold"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    اعرف المزيد ←
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="interactive-card mt-10 card premium-card p-6 lg:p-8 overflow-hidden">
          <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
            تواصل معنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--color-secondary-light)', color: 'var(--color-secondary)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <span className="text-xs block" style={{ color: 'rgba(31, 42, 74, 0.5)' }}>الهاتف</span>
                <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>0550268326</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--color-secondary-light)', color: 'var(--color-secondary)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div>
                <span className="text-xs block" style={{ color: 'rgba(31, 42, 74, 0.5)' }}>البريد الإلكتروني</span>
                <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>Wjih@wadi-jeddah.com.sa</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}
