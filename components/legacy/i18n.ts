import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';

export const locales = ['ar', 'en'] as const;
// FIX: was 'ar' — conflicted with I18nContext.tsx useState('en')
// Both server and client must agree on the default locale to avoid hydration mismatch
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(locales, requested) ? requested : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
