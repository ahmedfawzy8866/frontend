/**
 * Sierra AI — SCRAPER INBOX MODEL
 * ═══════════════════════════════════════════════════════════════════
 *
 * ده الـ "Excel Sheet" اللي بيعيش في Firestore.
 * كل Document = صف واحد في الشيت.
 *
 * Collection name: scraper_inbox
 *
 * ─── الفصل بين البوتات ────────────────────────────────────────────
 *
 *   BOT A — Scraper Bot  (بيصب داتا فقط، مش بيتكلم حد)
 *   ────────────────────────────────────────────────
 *   المصادر:
 *     - مجموعات الواتساب  → source: 'whatsapp'
 *     - Property Finder   → source: 'property_finder'
 *     - OLX               → source: 'olx'
 *     - إدخال يدوي       → source: 'manual'
 *
 *   يعمل إيه؟
 *     1. يجمع الرسايل/الليستنجز
 *     2. يكتب صف جديد في scraper_inbox
 *     3. يضع status = 'PENDING'
 *     4. يوقف — مش بيتكلم مع أي حد
 *
 *   BOT B — Client Bot  (بيقرأ من Firestore، بيتكلم مع العملاء)
 *   ──────────────────────────────────────────────────────────────
 *   يعمل إيه؟
 *     1. يقرأ الصفوف اللي status = 'PARSED' من scraper_inbox
 *     2. يتواصل مع الملاك / العملاء على Telegram / WhatsApp
 *     3. يحدّث status لـ 'CONTACTED' أو 'PUSHED'
 *     4. مش بيسكرب أي حاجة
 *
 * ─── الأكسيل (الأعمدة) ───────────────────────────────────────────
 *
 *   A   | id              | المعرف الأوتوماتيك
 *   B   | scraped_at      | وقت الاستخراج
 *   C   | source          | المصدر (whatsapp / property_finder / olx / manual)
 *   D   | source_group    | اسم المجموعة أو القناة
 *   E   | raw_text        | النص الخام من الرسالة
 *   F   | compound        | اسم الكمباوند
 *   G   | unit_type       | نوع الوحدة
 *   H   | bedrooms        | عدد الغرف
 *   I   | bathrooms       | عدد الحمامات
 *   J   | area_sqm        | المساحة بالمتر المربع
 *   K   | floor           | الدور
 *   L   | finishing       | التشطيب
 *   M   | price_egp       | السعر بالجنيه
 *   N   | price_per_sqm   | سعر المتر
 *   O   | contact_phone   | رقم التواصل
 *   P   | contact_name    | اسم الشخص
 *   Q   | owner_type      | مالك / وسيط
 *   R   | status          | حالة الصف
 *   S   | parsed_at       | وقت التحليل
 *   T   | pushed_to_id    | ID الوحدة في units collection
 *   U   | duplicate_of    | ID الصف المكرر منه
 *   V   | notes           | ملاحظات يدوية
 *
 * ═══════════════════════════════════════════════════════════════════
 */

import { Timestamp, FieldValue } from 'firebase/firestore';

// ─── Source Types ────────────────────────────────────────────────────

export type ScraperSource =
  | 'whatsapp'        // سكرابر مجموعات الواتساب
  | 'property_finder' // Property Finder API
  | 'olx'             // OLX Egypt
  | 'manual';         // إدخال يدوي من المستشار

// ─── Status Flow ─────────────────────────────────────────────────────
//
//   PENDING → PARSING → PARSED → PUSHED      ✅ تم الرفع للـ units
//                             → DUPLICATE    🔁 موجود بالفعل
//                             → REJECTED     ❌ مش عقار
//           → PARSE_ERROR                    ⚠️ الـ AI مقدرش يحلل
//   PARSED → CONTACTED                       📞 BOT B بيتواصل
//

export type ScraperRowStatus =
  | 'PENDING'      // بيستنا التحليل
  | 'PARSING'      // الـ AI بيحلله دلوقتي
  | 'PARSED'       // اتحلل — جاهز للـ BOT B
  | 'CONTACTED'    // BOT B بعت رسالة للمالك/الوسيط
  | 'PUSHED'       // اتنقل لـ units collection
  | 'DUPLICATE'    // موجود قبل كده
  | 'PARSE_ERROR'  // الـ AI مقدرش يحلله
  | 'REJECTED';    // مش عقار / مش مفيد

// ─── Owner Type ──────────────────────────────────────────────────────

export type OwnerType = 'owner' | 'broker' | 'unknown';

// ─── Finishing Values ─────────────────────────────────────────────────

export type FinishingType =
  | 'fully-finished'  // تشطيب كامل
  | 'semi-finished'   // نص تشطيب
  | 'core-shell'      // خام / كور شيل
  | 'super-lux'       // سوبر لوكس
  | 'unknown';

// ─── Main Interface (= Excel Row = Firestore Document) ───────────────

export interface ScraperInboxRow {
  // ── الأعمدة الأساسية (كلها required للعرض في الشيت) ──────────────

  /** A — المعرف (Firestore auto-ID) */
  id?: string;

  /** B — وقت وصول الرسالة للسكرابر */
  scraped_at: Timestamp | FieldValue | string;

  /** C — المصدر */
  source: ScraperSource;

  /** D — اسم المجموعة (مثلاً: "وسطاء القاهرة الجديدة") أو اسم القناة */
  source_group: string;

  /** E — النص الخام كامل من الرسالة */
  raw_text: string;

  // ── الأعمدة المستخرجة بالـ AI ─────────────────────────────────────

  /** F — اسم الكمباوند (Mivida / Hyde Park / ...) */
  compound?: string | null;

  /** G — نوع الوحدة */
  unit_type?: 'apartment' | 'villa' | 'townhouse' | 'duplex' | 'penthouse' | 'studio' | 'chalet' | null;

  /** H — عدد الغرف */
  bedrooms?: number | null;

  /** I — عدد الحمامات */
  bathrooms?: number | null;

  /** J — المساحة بالمتر المربع */
  area_sqm?: number | null;

  /** K — الدور */
  floor?: number | null;

  /** L — نوع التشطيب */
  finishing?: FinishingType | null;

  /** M — السعر بالجنيه المصري */
  price_egp?: number | null;

  /** N — سعر المتر (محسوب: price_egp / area_sqm) */
  price_per_sqm?: number | null;

  /** O — رقم التواصل */
  contact_phone?: string | null;

  /** P — اسم الشخص (المالك أو الوسيط) */
  contact_name?: string | null;

  /** Q — مالك مباشر أو وسيط */
  owner_type?: OwnerType;

  // ── حالة الصف ────────────────────────────────────────────────────

  /** R — الحالة الحالية للصف */
  status: ScraperRowStatus;

  /** S — وقت تحليل الـ AI */
  parsed_at?: Timestamp | FieldValue | null;

  /** T — ID الوحدة في units collection لو اتضافت */
  pushed_to_id?: string | null;

  /** U — ID الصف المكرر منه */
  duplicate_of?: string | null;

  /** V — ملاحظات يدوية من المستشار */
  notes?: string;

  // ── ميتاداتا إضافية ─────────────────────────────────────────────

  /** نتيجة الـ AI parser كاملة (للمراجعة) */
  ai_analysis?: {
    confidence: number;         // 0-100
    is_listing: boolean;        // هل دي إعلان عقار؟
    urgency_score?: number;     // مدى إلحاح البيع
    sentiment?: 'positive' | 'neutral' | 'aggressive' | 'desperate';
    keywords?: string[];
    parser_version?: string;
  };

  /** إضافة من إيه بوت */
  added_by_bot?: 'scraper_whatsapp' | 'scraper_pf' | 'scraper_olx' | 'manual_advisor';
}

// ─── Collection Name ─────────────────────────────────────────────────

export const SCRAPER_INBOX_COLLECTION = 'scraper_inbox';

// ─── Excel Column Map (للتصدير) ───────────────────────────────────────
//     كل entry = اسم العمود في الأكسيل + الـ key في الـ interface

export const EXCEL_COLUMNS: Array<{
  col: string;    // حرف عمود الأكسيل
  header: string; // اسم العمود بالعربي
  key: keyof ScraperInboxRow;
  width: number;  // عرض العمود بالحروف
}> = [
  { col: 'A', header: 'المعرف',           key: 'id',             width: 28 },
  { col: 'B', header: 'وقت الاستخراج',    key: 'scraped_at',     width: 22 },
  { col: 'C', header: 'المصدر',            key: 'source',         width: 18 },
  { col: 'D', header: 'المجموعة / القناة', key: 'source_group',   width: 30 },
  { col: 'E', header: 'النص الخام',        key: 'raw_text',       width: 60 },
  { col: 'F', header: 'الكمباوند',         key: 'compound',       width: 18 },
  { col: 'G', header: 'نوع الوحدة',        key: 'unit_type',      width: 15 },
  { col: 'H', header: 'الغرف',             key: 'bedrooms',       width: 10 },
  { col: 'I', header: 'الحمامات',          key: 'bathrooms',      width: 12 },
  { col: 'J', header: 'المساحة م²',        key: 'area_sqm',       width: 14 },
  { col: 'K', header: 'الدور',             key: 'floor',          width: 10 },
  { col: 'L', header: 'التشطيب',           key: 'finishing',      width: 16 },
  { col: 'M', header: 'السعر جنيه',        key: 'price_egp',      width: 18 },
  { col: 'N', header: 'سعر المتر',         key: 'price_per_sqm',  width: 14 },
  { col: 'O', header: 'رقم التواصل',       key: 'contact_phone',  width: 18 },
  { col: 'P', header: 'اسم الشخص',         key: 'contact_name',   width: 22 },
  { col: 'Q', header: 'مالك / وسيط',       key: 'owner_type',     width: 14 },
  { col: 'R', header: 'الحالة',            key: 'status',         width: 14 },
  { col: 'S', header: 'وقت التحليل',       key: 'parsed_at',      width: 22 },
  { col: 'T', header: 'ID في الوحدات',     key: 'pushed_to_id',   width: 28 },
  { col: 'U', header: 'مكرر من',           key: 'duplicate_of',   width: 28 },
  { col: 'V', header: 'ملاحظات',           key: 'notes',          width: 40 },
];

// ─── Status Colors (للعرض في الـ Dashboard) ──────────────────────────

export const STATUS_COLORS: Record<ScraperRowStatus, string> = {
  PENDING:      '#F59E0B', // أصفر — بيستنا
  PARSING:      '#3B82F6', // أزرق — بيتحلل
  PARSED:       '#10B981', // أخضر — جاهز
  CONTACTED:    '#6366F1', // بنفسجي — BOT B بعت رسالة
  PUSHED:       '#059669', // أخضر غامق — اتنقل للـ units
  DUPLICATE:    '#9CA3AF', // رمادي — مكرر
  PARSE_ERROR:  '#F97316', // برتقالي — خطأ في التحليل
  REJECTED:     '#EF4444', // أحمر — مش مفيد
};

// ─── Helper: Create empty row for manual entry ────────────────────────

export function createEmptyRow(
  source: ScraperSource = 'manual',
  source_group = '',
): Omit<ScraperInboxRow, 'id'> {
  return {
    scraped_at:    new Date().toISOString(),
    source,
    source_group,
    raw_text:      '',
    compound:      null,
    unit_type:     null,
    bedrooms:      null,
    bathrooms:     null,
    area_sqm:      null,
    floor:         null,
    finishing:     null,
    price_egp:     null,
    price_per_sqm: null,
    contact_phone: null,
    contact_name:  null,
    owner_type:    'unknown',
    status:        'PENDING',
    parsed_at:     null,
    pushed_to_id:  null,
    duplicate_of:  null,
    notes:         '',
    added_by_bot:  'manual_advisor',
  };
}
