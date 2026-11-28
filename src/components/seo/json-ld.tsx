import { site } from "@/config/site";
import type { Locale } from "@/i18n/routing";

const base = "https://hassanahhmd.github.io/Architecture1";

/** Person and ProfessionalService structured data, built only from config/site.ts. */
export function JsonLd({ locale }: { locale: Locale }) {
  const sameAs = site.socials.map((s) => s.href);
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: site.name[locale],
      jobTitle: site.role[locale],
      email: `mailto:${site.email}`,
      telephone: site.phone,
      url: `${base}/${locale}/`,
      address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
      sameAs,
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: site.name[locale],
      description: site.role[locale],
      url: `${base}/${locale}/`,
      telephone: site.phone,
      email: site.email,
      areaServed: "EG",
      address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
      sameAs,
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
