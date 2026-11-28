import Link from "next/link";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/routing";

export function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations();
  return (
    <footer className="bg-olive-dark text-paper px-5 py-12 md:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold">{t("footer.name")}</p>
          <p className="text-[0.85rem] text-paper/75">{t("footer.rights")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-5 text-[0.88rem] text-paper/80">
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-orange">
            <Mail size={15} aria-hidden /> {site.email}
          </a>
          <a href={`tel:${site.phone}`} className="inline-flex items-center gap-2 hover:text-orange" dir="ltr">
            <Phone size={15} aria-hidden /> {site.phoneDisplay}
          </a>
          {site.socials.map((social) => (
            <a key={social.key} href={social.href} target="_blank" rel="noreferrer noopener" className="hover:text-orange">
              {social.label}
            </a>
          ))}
          <Link href={`/${locale}#top`} className="inline-flex items-center gap-1.5 hover:text-orange">
            <ArrowUp size={15} aria-hidden /> {t("footer.to_top")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
