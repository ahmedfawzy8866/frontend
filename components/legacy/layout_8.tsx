import type { Metadata } from 'next';
import { Playfair_Display, Inter, Noto_Sans_Arabic } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '../lib/AuthContext';
import { I18nProvider } from '../lib/I18nContext';
import { Toaster } from 'react-hot-toast';
import './globals.css';

// FIX: Replaced Cinzel (which overrode --font-serif) with Playfair_Display
// which matches the globals.css --font-serif: "Playfair Display" declaration
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',   // matches globals.css --font-serif usage
  display: 'swap',
});

// FIX: Inter replaces Josefin_Sans and uses --font-sans
// globals.css uses var(--font-apple) for body but --font-sans for .font-sans
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sierra AI Realty | سييرا بلو العقارية',
  description:
    "Cinematic Luxury Real Estate — Premium properties across Egypt's most exclusive communities | عقارات فاخرة في أرقى المجتمعات المصرية",
  keywords: ['real estate', 'luxury', 'Egypt', 'عقارات', 'فاخرة', 'مصر', 'Sierra AI'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} ${notoArabic.variable}`}
    >
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" disableTransitionOnChange>
          <I18nProvider>
            <AuthProvider>
              {/* FIX: mouse-glow now has matching CSS in globals.css */}
              <div className="mouse-glow" aria-hidden="true" />
              <Toaster position="top-right" />
              {children}
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
