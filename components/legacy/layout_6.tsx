import type { Metadata } from 'next';
import { Cinzel, Josefin_Sans, Noto_Sans_Arabic, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '../lib/AuthContext';
import { I18nProvider } from '../lib/I18nContext';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-serif-cinzel',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  style: ['normal', 'italic'],
});

const josefin = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
});

export const metadata: Metadata = {
  title: 'Sierra AI Realty | سييرا بلو العقارية',
  description: 'Cinematic Luxury Real Estate — Premium properties across Egypt\'s most exclusive communities | عقارات فاخرة في أرقى المجتمعات المصرية',
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
      className={`${josefin.variable} ${cinzel.variable} ${playfair.variable} ${notoArabic.variable}`}
    >
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" disableTransitionOnChange>
          <I18nProvider>
            <AuthProvider>
              <div className="mouse-glow" />
              <Toaster position="top-right" />
              {children}
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
