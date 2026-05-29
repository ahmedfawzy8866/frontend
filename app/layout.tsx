import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { I18nProvider } from "@/lib/I18nContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sierra Estates | سييرا إستيتس",
  description:
    "The First Exclusive Destination for New Cairo Properties. Rent & Resale. Best-in-Class Design. AI-Driven Excellence.",
  keywords: [
    "Sierra Estates",
    "New Cairo",
    "real estate",
    "luxury",
    "Madinaty",
    "El Shorouk",
    "عقارات",
    "القاهرة الجديدة",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=Cairo:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0A1628] text-[#F4F0E8] antialiased">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" disableTransitionOnChange>
          <I18nProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#0E1D35",
                  color: "#F4F0E8",
                  border: "1px solid rgba(201, 162, 77, 0.15)",
                },
              }}
            />
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
