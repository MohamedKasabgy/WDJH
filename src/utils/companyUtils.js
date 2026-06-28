// Normalize Arabic text for better search matching
export function normalizeText(value) {
  if (!value || typeof value !== 'string') return '';
  return value
    .toLowerCase()
    .trim()
    .replace(/[إأآا]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '') // Remove Arabic diacritics
    .replace(/\s+/g, ' ');
}

// Get unique values from companies array by key
export function getUniqueValues(companies, key) {
  if (!Array.isArray(companies) || !key) return [];
  const values = new Set();
  companies.forEach(company => {
    if (company[key]) {
      values.add(company[key]);
    }
  });
  return Array.from(values).sort((a, b) => a.localeCompare(b, 'ar'));
}

// Get searchable text from a company
export function getCompanySearchText(company) {
  if (!company) return '';
  const fields = [
    company.name,
    company.nameEn,
    company.sector,
    company.mainCategory,
    company.description,
    company.founder,
    ...(company.tags || [])
  ];
  return normalizeText(fields.filter(Boolean).join(' '));
}

// Score a company match against a query
export function scoreCompanyMatch(company, query) {
  if (!query || !company) return 0;
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return 0;

  const queryWords = normalizedQuery.split(' ').filter(w => w.length > 1);
  if (queryWords.length === 0) return 0;

  let score = 0;

  // Keyword groups for semantic matching
  const keywordGroups = {
    'ذكاء اصطناعي': ['ai', 'artificial intelligence', 'data', 'automation', 'agents', 'analytics', 'ذكاء', 'اصطناعي', 'بيانات', 'أتمتة', 'تعلم آلي', 'machine learning'],
    'صحة': ['health', 'medical', 'biotech', 'biology', 'healthcare', 'صحة', 'طبي', 'حيوية', 'مستلزمات', 'صحي'],
    'تعليم': ['education', 'edtech', 'training', 'learning', 'تعليم', 'تدريب', 'طلاب', 'تعلم'],
    'سيارات وتنقل': ['mobility', 'transport', 'autotech', 'vehicles', 'cars', 'smart cities', 'سيارات', 'تنقل', 'مواقف', 'مركبات', 'مواصلات'],
    'مالية': ['fintech', 'accounting', 'payments', 'finance', 'مالية', 'محاسبة', 'مدفوعات', 'ديون', 'ضريبة', 'زكاة'],
    'مطاعم وغذاء': ['restaurant', 'pos', 'food', 'menu', 'مطاعم', 'مقاهي', 'غذائية', 'مأكولات'],
    'تسويق وإعلان': ['marketing', 'media', 'advertising', 'ads', 'تسويق', 'إعلان', 'إعلانات', 'ترويج'],
    'عقار': ['proptech', 'real estate', 'rent', 'عقار', 'عقارية', 'إيجار', 'تمليك'],
    'موارد بشرية وخدمات': ['hr', 'consulting', 'recruitment', 'services', 'موارد', 'استشارات', 'توظيف', 'ضريبة'],
    'سياحة': ['tourism', 'travel', 'hospitality', 'سياحة', 'سفر', 'فنادق'],
    'طاقة': ['energy', 'renewable', 'solar', 'طاقة', 'شمسية', 'متجددة']
  };

  // Find which keyword groups match the query
  const matchedGroups = [];
  for (const [groupName, keywords] of Object.entries(keywordGroups)) {
    if (keywords.some(kw => normalizedQuery.includes(normalizeText(kw)))) {
      matchedGroups.push(groupName);
    }
  }

  // Helper to check if text matches query or keyword groups
  const matchesQuery = (text) => {
    if (!text) return false;
    const normalized = normalizeText(text);
    // Direct match
    if (queryWords.some(w => normalized.includes(w))) return true;
    // Keyword group match
    if (matchedGroups.length > 0) {
      for (const groupName of matchedGroups) {
        const groupKeywords = keywordGroups[groupName];
        if (groupKeywords.some(kw => normalized.includes(normalizeText(kw)))) return true;
      }
    }
    return false;
  };

  // High weight: name match
  if (company.name && matchesQuery(company.name)) score += 10;
  if (company.nameEn && matchesQuery(company.nameEn)) score += 8;

  // High weight: sector/mainCategory
  if (company.sector && matchesQuery(company.sector)) score += 7;
  if (company.mainCategory && matchesQuery(company.mainCategory)) score += 6;

  // Medium-high: tags
  if (company.tags && Array.isArray(company.tags)) {
    for (const tag of company.tags) {
      if (matchesQuery(tag)) {
        score += 5;
        break;
      }
    }
  }

  // Medium: description
  if (company.description && matchesQuery(company.description)) score += 4;

  // Low: founder
  if (company.founder && matchesQuery(company.founder)) score += 2;

  // Stage matching
  if (company.stage && matchesQuery(company.stage)) score += 3;

  return score;
}

// Get Arabic label for stage
export function getStageLabel(stage) {
  const labels = {
    'Pre-Seed': 'ما قبل البذرة',
    'Seed': 'البذرة',
    'Growth': 'النمو',
    'Series A': 'الجولة أ',
    'Series B': 'الجولة ب',
    'Other': 'أخرى'
  };
  return labels[stage] || stage || 'غير محدد';
}

// Get Arabic label for type
export function getTypeLabel(type) {
  const labels = {
    'شركة ناشئة': 'شركة ناشئة',
    'شركة خدمات': 'شركة خدمات',
    'شركة منطقة': 'شركة منطقة'
  };
  return labels[type] || type || 'غير محدد';
}

// Safe value display
export function safeValue(value, fallback = 'غير متوفر') {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }
  return value;
}

// Get matched reasons for smart matching
export function getMatchedReasons(company, query) {
  if (!query || !company) return [];
  const normalizedQuery = normalizeText(query);
  const reasons = [];

  const keywordGroups = {
    'الذكاء الاصطناعي': ['ai', 'artificial intelligence', 'data', 'automation', 'agents', 'analytics', 'ذكاء', 'اصطناعي', 'بيانات', 'أتمتة'],
    'الصحة': ['health', 'medical', 'biotech', 'biology', 'healthcare', 'صحة', 'طبي', 'حيوية', 'مستلزمات'],
    'التعليم': ['education', 'edtech', 'training', 'learning', 'تعليم', 'تدريب', 'طلاب'],
    'السيارات والتنقل': ['mobility', 'transport', 'autotech', 'vehicles', 'cars', 'smart cities', 'سيارات', 'تنقل', 'مواقف', 'مركبات'],
    'المالية': ['fintech', 'accounting', 'payments', 'finance', 'مالية', 'محاسبة', 'مدفوعات', 'ديون', 'ضريبة', 'زكاة'],
    'المطاعم والغذاء': ['restaurant', 'pos', 'food', 'menu', 'مطاعم', 'مقاهي', 'غذائية'],
    'التسويق والإعلان': ['marketing', 'media', 'advertising', 'ads', 'تسويق', 'إعلان', 'إعلانات'],
    'العقار': ['proptech', 'real estate', 'rent', 'عقار', 'عقارية', 'إيجار'],
    'الموارد البشرية': ['hr', 'consulting', 'recruitment', 'services', 'موارد', 'استشارات', 'توظيف'],
    'السياحة': ['tourism', 'travel', 'hospitality', 'سياحة', 'سفر'],
    'الطاقة': ['energy', 'renewable', 'solar', 'طاقة', 'شمسية']
  };

  // Check which groups match
  for (const [groupName, keywords] of Object.entries(keywordGroups)) {
    const matchesQuery = keywords.some(kw => normalizedQuery.includes(normalizeText(kw)));
    if (!matchesQuery) continue;

    const searchText = getCompanySearchText(company);
    const matchesCompany = keywords.some(kw => searchText.includes(normalizeText(kw)));
    if (matchesCompany) {
      reasons.push(groupName);
    }
  }

  // Also check sector-based reasons
  const sectorKeywords = {
    'المركبات الكهربائية': ['سيارات', 'تنقل', 'مركبات'],
    'التقنية العقارية': ['عقار', 'عقارية', 'إيجار'],
    'تقنية المدفوعات للمطاعم والمقاهي': ['مطاعم', 'مقاهي', 'غذاء'],
    'الإعلان الرقمي الخارجي': ['إعلان', 'تسويق'],
    'التنقل الذكي': ['تنقل', 'سيارات', 'مواقف'],
    'السيارات / ما بعد البيع': ['سيارات', 'صيانة'],
    'تقنيات السيارات': ['سيارات', 'قطع غيار'],
    'التقنيات الحيوية': ['حيوية', 'صحة'],
    'صناعة المطهرات والمنظفات الطبيعية': ['صحة', 'حيوية'],
    'الصحة': ['صحة', 'طبي'],
    'التقنية المالية': ['مالية', 'محاسبة'],
    'الذكاء الاصطناعي': ['ذكاء', 'تقنية'],
    'التقنيات المحاسبية': ['محاسبة', 'مالية'],
    'الموارد البشرية والاستشارات الإدارية': ['موارد', 'استشارات'],
    'التعليم': ['تعليم', 'تدريب'],
    'الاستشارات المهنية': ['استشارات', 'محاسبة'],
    'الاستشارات الضريبية': ['ضريبة', 'استشارات'],
    'السياحة': ['سياحة', 'سفر'],
    'الأغذية والمشروبات': ['غذاء', 'مشروبات']
  };

  if (company.sector && sectorKeywords[company.sector]) {
    for (const kw of sectorKeywords[company.sector]) {
      if (normalizedQuery.includes(kw) && !reasons.some(r => r.includes(kw))) {
        if (!reasons.includes(company.sector)) {
          reasons.push(company.sector);
        }
        break;
      }
    }
  }

  // Limit to top 3 reasons
  return reasons.slice(0, 3);
}

// Get match relevance label
export function getMatchLabel(score) {
  if (score >= 8) return { text: 'مطابقة عالية', className: 'badge-burgundy' };
  if (score >= 4) return { text: 'مطابقة متوسطة', className: 'badge-sky' };
  return { text: 'قد تكون مناسبة', className: 'badge-navy' };
}
