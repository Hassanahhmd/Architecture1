import { ReactScan } from "@/components/dev/react-scan";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, IBM_Plex_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing-config";
import { isLocale, localeDirection, locales, type Locale } from "@/i18n/routing";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { JsonLd } from "@/components/seo/json-ld";
import { LegacyAnchorRedirect } from "@/components/layout/legacy-anchor-redirect";
import "../globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600"],
  variable: "--font-arabic",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-display",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** GitHub Pages cannot send headers, so the policy is a meta tag. frame-ancestors and report-uri
 *  are ignored in a meta tag. Inline scripts and styles are needed by the Next.js export. */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://mir-s3-cdn-cf.behance.net https://kuula.co",
  "font-src 'self' data:",
  "frame-src 'self' https://www.tiktok.com",
  "connect-src 'self'",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

export const metadata: Metadata = {
  metadataBase: new URL("https://hassanahhmd.github.io/Architecture1"),
  openGraph: {
    type: "website",
    siteName: "Hassan Ahmed",
    images: [{ url: "https://hassanahhmd.github.io/Architecture1/og.png", width: 1200, height: 630, alt: "Hassan Ahmed, Architecture Engineer and 3D Visualization Specialist" }],
  },
  twitter: { card: "summary_large_image", images: ["https://hassanahhmd.github.io/Architecture1/og.png"] },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || !hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <html
      lang={locale}
      dir={localeDirection[locale as Locale]}
      className={locale === "ar" ? plexArabic.variable : `${jakarta.variable} ${cormorant.variable}`}
    >
      <head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
      </head>
      <body className="min-h-dvh bg-alabaster text-ink">
        <JsonLd locale={locale as Locale} />
        <NextIntlClientProvider locale={locale}>
          <ScrollProgress />
          <ReactScan />
          <LegacyAnchorRedirect locale={locale} />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:z-50 focus:rounded-sm focus:bg-olive focus:px-4 focus:py-2 focus:text-alabaster"
          >
            {t("skip")}
          </a>
          <Navbar locale={locale as Locale} />
          <main id="main">{children}</main>
          <Footer locale={locale as Locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
