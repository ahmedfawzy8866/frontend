import { getLead, listLeads, resetLead, saveLead } from './lead-memory.js';

const arabicPattern = /[\u0600-\u06FF]/;

const copy = {
  ar: {
    welcome:
      'أهلاً بك في Sierra AI Realty. أنا مساعدك العقاري، وسأساعدك في تأهيل الطلب وتجهيز أفضل ترشيحات عقارية فاخرة لك.\n\nلنبدأ باسمك الكامل؟',
    askName: 'ما اسمك الكامل؟',
    askPurpose: 'ممتاز. هل تبحث عن شراء، إيجار، أم استثمار؟',
    askPropertyType: 'ما نوع العقار الذي تفضله؟ مثل: شقة، فيلا، تاون هاوس، بنتهاوس، شاليه.',
    askLocation: 'ما المنطقة أو المدينة التي تفضلها؟',
    askBudget: 'ما الميزانية التقريبية المتاحة لك؟ يمكنك كتابتها مثل: 5 مليون أو 250000.',
    askBedrooms: 'كم عدد الغرف المطلوب تقريبًا؟ مثل: ستوديو، 2، 3، 4.',
    askTimeline: 'متى تنوي اتخاذ القرار؟ مثل: فورًا، خلال شهر، خلال 3 أشهر.',
    askPhone: 'إذا أحببت، اكتب رقم الهاتف للتواصل السريع. وإذا لا تريد الآن، اكتب تخطي.',
    summaryIntro: 'هذا ملخص طلبك الحالي:',
    summaryMissing: 'ما زالت لدي بعض البيانات الناقصة وسأكمل معك خطوة بخطوة.',
    completed:
      'ممتاز. أصبحت لدي صورة واضحة عن طلبك.\n\nسأركز على ترشيحات {propertyType} في {location} بميزانية {budget} وعدد غرف {bedrooms}، وهدف {purpose} خلال {timeline}.\n\nإذا أردت، أقدر أكمل معك بإحدى الخطوتين:\n1. ترشيح نوع العقارات المناسبة لك\n2. تجهيزك للتحويل إلى مستشار بشري',
    fallback:
      'وصلتني رسالتك. سأكمل معك خطوة خطوة لتأهيل الطلب العقاري. اكتب /summary لرؤية البيانات الحالية أو /reset للبدء من جديد.',
    leadSummaryLine: '- {label}: {value}',
    labels: {
      name: 'الاسم',
      purpose: 'الهدف',
      propertyType: 'نوع العقار',
      location: 'المنطقة',
      budget: 'الميزانية',
      bedrooms: 'الغرف',
      timeline: 'موعد القرار',
      phone: 'الهاتف'
    },
    skipped: 'تم التخطي.',
    resetDone: 'تم تصفير المحادثة. نبدأ من جديد.\n\nما اسمك الكامل؟',
    help:
      'الأوامر المتاحة:\n/start لبدء التأهيل\n/summary لعرض البيانات الحالية\n/reset لإعادة البدء\n/human لطلب تحويلك لمستشار بشري\nيمكنك أيضًا الكتابة بالعربي أو English.',
    human:
      'تم تسجيل رغبتك في التحويل لمستشار بشري. قبل ذلك، سأعرض ملخصك الحالي لتسريع المتابعة.',
    nonText:
      'استلمت الملف أو الصورة. إذا كانت تخص عقارًا معيّنًا، اكتب لي أيضًا ما الذي تريد معرفته عنها، وسأكمل معك.'
  },
  en: {
    welcome:
      'Welcome to Sierra AI Realty. I am your real estate assistant, and I will help qualify your request and prepare luxury property recommendations.\n\nLet us start with your full name.',
    askName: 'What is your full name?',
    askPurpose: 'Great. Are you looking to buy, rent, or invest?',
    askPropertyType: 'What property type do you prefer? For example: apartment, villa, townhouse, penthouse, chalet.',
    askLocation: 'Which area or city do you prefer?',
    askBudget: 'What is your approximate budget? You can write it like: 5 million or 250000.',
    askBedrooms: 'How many bedrooms do you need? For example: studio, 2, 3, 4.',
    askTimeline: 'When are you planning to make a decision? For example: immediately, within 1 month, within 3 months.',
    askPhone: 'If you want faster follow-up, send your phone number. Otherwise write skip.',
    summaryIntro: 'Here is your current request summary:',
    summaryMissing: 'A few details are still missing and I will collect them step by step.',
    completed:
      'Perfect. I now have a clear profile for your request.\n\nI will focus on {propertyType} options in {location} around a budget of {budget}, with {bedrooms} bedrooms, for {purpose}, within {timeline}.\n\nIf you want, I can now continue with one of these:\n1. Suggest the best-fit property direction\n2. Prepare a handoff to a human advisor',
    fallback:
      'I received your message. I will continue qualifying your request step by step. Send /summary to review your data or /reset to start over.',
    leadSummaryLine: '- {label}: {value}',
    labels: {
      name: 'Name',
      purpose: 'Purpose',
      propertyType: 'Property type',
      location: 'Location',
      budget: 'Budget',
      bedrooms: 'Bedrooms',
      timeline: 'Decision time',
      phone: 'Phone'
    },
    skipped: 'Skipped.',
    resetDone: 'Conversation reset. Let us begin again.\n\nWhat is your full name?',
    help:
      'Available commands:\n/start to begin qualification\n/summary to view current details\n/reset to start over\n/human to request a human advisor\nYou can write in Arabic or English.',
    human:
      'Your request for a human advisor has been noted. I will show your current summary first so the follow-up is faster.',
    nonText:
      'I received the file or photo. If it is related to a property, send a short text about what you want to know and I will continue with you.'
  }
};

function detectLanguage(text, fallback = 'ar') {
  if (!text) {
    return fallback;
  }

  const normalized = text.trim().toLowerCase();

  if (normalized === '/english' || normalized === 'english' || normalized === 'en') {
    return 'en';
  }

  if (normalized === '/arabic' || normalized === 'arabic' || normalized === 'ar' || arabicPattern.test(text)) {
    return 'ar';
  }

  return fallback;
}

function render(template, values) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value ?? '-'),
    template
  );
}

function normalizeText(text) {
  return String(text || '').trim();
}

function parsePurpose(text) {
  const value = normalizeText(text).toLowerCase();

  if (!value) {
    return null;
  }

  if (value.includes('buy') || value.includes('purchase') || value.includes('شراء') || value.includes('تمليك')) {
    return { ar: 'شراء', en: 'buy' };
  }

  if (value.includes('rent') || value.includes('lease') || value.includes('إيجار') || value.includes('ايجار')) {
    return { ar: 'إيجار', en: 'rent' };
  }

  if (value.includes('invest') || value.includes('استثمار')) {
    return { ar: 'استثمار', en: 'investment' };
  }

  return null;
}

function parsePropertyType(text) {
  const value = normalizeText(text).toLowerCase();

  if (!value) {
    return null;
  }

  const options = [
    { match: ['villa', 'فيلا'], ar: 'فيلا', en: 'villa' },
    { match: ['townhouse', 'تاون', 'تاون هاوس'], ar: 'تاون هاوس', en: 'townhouse' },
    { match: ['penthouse', 'بنتهاوس', 'بنت هاوس'], ar: 'بنتهاوس', en: 'penthouse' },
    { match: ['chalet', 'شاليه'], ar: 'شاليه', en: 'chalet' },
    { match: ['apartment', 'flat', 'شقة'], ar: 'شقة', en: 'apartment' },
    { match: ['duplex', 'دوبلكس'], ar: 'دوبلكس', en: 'duplex' }
  ];

  const found = options.find(option => option.match.some(term => value.includes(term)));
  return found ? { ar: found.ar, en: found.en } : { ar: text.trim(), en: text.trim() };
}

function parseBedrooms(text) {
  const value = normalizeText(text).toLowerCase();

  if (!value) {
    return null;
  }

  if (value.includes('studio') || value.includes('ستوديو')) {
    return { ar: 'ستوديو', en: 'studio' };
  }

  const match = value.match(/\b(\d{1,2})\b/);

  if (!match) {
    return null;
  }

  return {
    ar: `${match[1]} غرف`,
    en: `${match[1]} bedrooms`
  };
}

function parseBudget(text) {
  const value = normalizeText(text);

  if (!value) {
    return null;
  }

  const compact = value.replace(/,/g, '').toLowerCase();
  const numberMatch = compact.match(/(\d+(\.\d+)?)/);

  if (!numberMatch) {
    return { ar: value, en: value };
  }

  const amount = Number(numberMatch[1]);

  if (Number.isNaN(amount)) {
    return { ar: value, en: value };
  }

  const isMillion = compact.includes('m') || compact.includes('million') || compact.includes('مليون');
  const isThousand = compact.includes('k') || compact.includes('thousand') || compact.includes('الف') || compact.includes('ألف');
  const normalizedAmount = isMillion ? amount * 1000000 : isThousand ? amount * 1000 : amount;

  return {
    raw: value,
    numeric: normalizedAmount,
    ar: value,
    en: value
  };
}

function parseTimeline(text) {
  const value = normalizeText(text).toLowerCase();

  if (!value) {
    return null;
  }

  if (value.includes('now') || value.includes('immediate') || value.includes('فور') || value.includes('حال')) {
    return { ar: 'فورًا', en: 'immediately' };
  }

  if (value.includes('month') || value.includes('شهر')) {
    return { ar: text.trim(), en: text.trim() };
  }

  if (value.includes('3') || value.includes('ثلاث')) {
    return { ar: text.trim(), en: text.trim() };
  }

  return { ar: text.trim(), en: text.trim() };
}

function parsePhone(text) {
  const value = normalizeText(text);

  if (!value) {
    return null;
  }

  if (/^(skip|تخطي|تخطى|no)$/i.test(value)) {
    return { skipped: true };
  }

  const normalized = value.replace(/[^\d+]/g, '');

  if (normalized.length < 8) {
    return null;
  }

  return { value: normalized };
}

function localizeField(field, language) {
  if (field == null) {
    return '-';
  }

  if (typeof field === 'string') {
    return field;
  }

  return field[language] || field.ar || field.en || '-';
}

function getMissingStage(lead) {
  const { profile, name } = lead;

  if (!name) {
    return 'collect_name';
  }

  if (!profile.purpose) {
    return 'collect_purpose';
  }

  if (!profile.propertyType) {
    return 'collect_property_type';
  }

  if (!profile.location) {
    return 'collect_location';
  }

  if (!profile.budget) {
    return 'collect_budget';
  }

  if (!profile.bedrooms) {
    return 'collect_bedrooms';
  }

  if (!profile.timeline) {
    return 'collect_timeline';
  }

  if (!profile.phone) {
    return 'collect_phone';
  }

  return 'completed';
}

function buildSummary(lead, language) {
  const text = copy[language];
  const lines = [text.summaryIntro];
  const values = {
    name: lead.name || '-',
    purpose: localizeField(lead.profile.purpose, language),
    propertyType: localizeField(lead.profile.propertyType, language),
    location: lead.profile.location || '-',
    budget: localizeField(lead.profile.budget, language),
    bedrooms: localizeField(lead.profile.bedrooms, language),
    timeline: localizeField(lead.profile.timeline, language),
    phone: lead.profile.phone || '-'
  };

  for (const [key, label] of Object.entries(text.labels)) {
    lines.push(render(text.leadSummaryLine, { label, value: values[key] }));
  }

  return lines.join('\n');
}

function getNextPrompt(stage, language) {
  const text = copy[language];

  switch (stage) {
    case 'collect_name':
      return text.askName;
    case 'collect_purpose':
      return text.askPurpose;
    case 'collect_property_type':
      return text.askPropertyType;
    case 'collect_location':
      return text.askLocation;
    case 'collect_budget':
      return text.askBudget;
    case 'collect_bedrooms':
      return text.askBedrooms;
    case 'collect_timeline':
      return text.askTimeline;
    case 'collect_phone':
      return text.askPhone;
    default:
      return text.fallback;
  }
}

async function applyStageAnswer(lead, text) {
  const input = normalizeText(text);

  switch (lead.stage) {
    case 'collect_name':
      if (input) {
        lead.name = input;
      }
      break;
    case 'collect_purpose':
      lead.profile.purpose = parsePurpose(input);
      break;
    case 'collect_property_type':
      lead.profile.propertyType = parsePropertyType(input);
      break;
    case 'collect_location':
      if (input) {
        lead.profile.location = input;
      }
      break;
    case 'collect_budget':
      lead.profile.budget = parseBudget(input);
      break;
    case 'collect_bedrooms':
      lead.profile.bedrooms = parseBedrooms(input);
      break;
    case 'collect_timeline':
      lead.profile.timeline = parseTimeline(input);
      break;
    case 'collect_phone': {
      const phone = parsePhone(input);
      if (phone?.skipped) {
        lead.profile.phone = 'Skipped';
      } else if (phone?.value) {
        lead.profile.phone = phone.value;
      }
      break;
    }
    default:
      break;
  }

  lead.lastMessageText = input;
  lead.lastMessageAt = new Date().toISOString();
  lead.stage = getMissingStage(lead);

  if (lead.stage === 'completed' && lead.status === 'active') {
    lead.status = 'qualified';
  }

  await saveLead(lead);
}

export async function buildTelegramLeadReply(update) {
  const defaultLanguage = detectLanguage(update.text, 'ar');
  const lead = await getLead(update.chatId, {
    channel: 'telegram',
    source: 'telegram',
    preferredLanguage: defaultLanguage,
    firstName: update.firstName,
    username: update.username
  });

  lead.channel = 'telegram';
  lead.source = 'telegram';

  if (update.firstName && !lead.firstName) {
    lead.firstName = update.firstName;
  }

  if (update.username && !lead.username) {
    lead.username = update.username;
  }

  const detectedLanguage = detectLanguage(update.text, lead.preferredLanguage || 'ar');
  lead.preferredLanguage = detectedLanguage;

  const text = copy[lead.preferredLanguage];
  const messageText = normalizeText(update.text);

  if (!messageText) {
    await saveLead(lead);
    return text.nonText;
  }

  if (messageText === '/start') {
    const freshLead = await resetLead(update.chatId, {
      channel: 'telegram',
      source: 'telegram',
      preferredLanguage: detectedLanguage,
      firstName: update.firstName,
      username: update.username
    });
    return copy[freshLead.preferredLanguage].welcome;
  }

  if (messageText === '/reset') {
    await resetLead(update.chatId, {
      channel: 'telegram',
      source: 'telegram',
      preferredLanguage: detectedLanguage,
      firstName: update.firstName,
      username: update.username
    });
    return text.resetDone;
  }

  if (messageText === '/help') {
    await saveLead(lead);
    return text.help;
  }

  if (messageText === '/summary') {
    await saveLead(lead);
    return `${buildSummary(lead, lead.preferredLanguage)}\n\n${getNextPrompt(getMissingStage(lead), lead.preferredLanguage)}`;
  }

  if (messageText === '/human') {
    lead.status = 'handoff_requested';
    await saveLead(lead);
    return `${text.human}\n\n${buildSummary(lead, lead.preferredLanguage)}`;
  }

  await applyStageAnswer(lead, messageText);

  if (lead.stage === 'completed') {
    return `${buildSummary(lead, lead.preferredLanguage)}\n\n${render(copy[lead.preferredLanguage].completed, {
      propertyType: localizeField(lead.profile.propertyType, lead.preferredLanguage),
      location: lead.profile.location || '-',
      budget: localizeField(lead.profile.budget, lead.preferredLanguage),
      bedrooms: localizeField(lead.profile.bedrooms, lead.preferredLanguage),
      purpose: localizeField(lead.profile.purpose, lead.preferredLanguage),
      timeline: localizeField(lead.profile.timeline, lead.preferredLanguage)
    })}`;
  }

  return getNextPrompt(lead.stage, lead.preferredLanguage);
}

export async function getLeadSnapshots() {
  return listLeads();
}
