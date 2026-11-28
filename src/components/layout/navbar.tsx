"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { buildWhatsAppUrl } from "@/config/site";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/routing";
import { LocaleSwitcher } from "./locale-switcher";

export function Navbar({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const pathname = usePathname() || "";
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(false));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  const links = [
    { href: `/${locale}`, label: t("nav.home"), key: "home" },
    { href: `/${locale}/projects`, label: t("nav.projects"), key: "projects" },
    { href: `/${locale}/tour`, label: t("nav.tour"), key: "tour" },
    { href: `/${locale}/lab`, label: t("nav.lab"), key: "lab" },
    { href: `/${locale}/estimator`, label: t("nav.estimator"), key: "estimator" },
    { href: `/${locale}/reels`, label: t("nav.reels"), key: "reels" },
    { href: `/${locale}/about`, label: t("nav.about"), key: "about" },
  ];

  const wa = buildWhatsAppUrl(
    locale === "ar" ? "مرحبًا م. حسن، عايز أستشيرك في مشروع." : "Hi Hassan, I'd like to discuss a project.",
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        solid ? "border-hairline bg-alabaster/95" : "border-transparent bg-alabaster/70",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-10">
        <Link href={`/${locale}`} className="flex items-baseline gap-2">
          <span className="font-semibold tracking-tight">{t("nav.name")}</span>
          <span className="hidden text-[0.78rem] text-ink-soft xl:inline">{t("nav.role")}</span>
        </Link>

        <nav aria-label={t("nav.home")} className="hidden items-center gap-4 text-[0.84rem] xl:gap-5 xl:text-[0.9rem] lg:flex">
          {links.map((link) => {
            const active = link.key === "home" ? pathname === link.href : pathname.startsWith(link.href);
            const item = (
              <Link
                key={link.key}
                href={link.href}
                prefetch
                aria-current={active ? "page" : undefined}
                className={cn("whitespace-nowrap transition-colors hover:text-olive", active ? "text-olive" : "text-ink-soft")}
              >
                {link.label}
              </Link>
            );
            if (link.key !== "lab") return item;
            // Lab opens a small menu with its four tools; hover or keyboard focus
            // reveals it, and the link itself still navigates for touch users.
            return (
              <div key={link.key} className="nav-menu-wrap relative">
                {item}
                <div className="nav-menu absolute top-full start-0 z-40 pt-2">
                  <ul className="w-48 rounded-md border border-hairline bg-alabaster p-1.5 text-[0.84rem] shadow-sm">
                    {[
                      { href: `/${locale}/lab/quiz`, label: t("lab.tab_quiz") },
                      { href: `/${locale}/lab/lighting`, label: t("lab.tab_light") },
                      { href: `/${locale}/lab/panorama`, label: t("lab.tab_360") },
                      { href: `/${locale}/lab/materials`, label: t("lab.tab_mat") },
                    ].map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          prefetch
                          className={cn(
                            "block rounded-xs px-2.5 py-1.5 transition-colors hover:bg-sand",
                            pathname === child.href ? "text-olive" : "text-ink-soft",
                          )}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher locale={locale} />
          <a
            href={wa}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden items-center gap-2 rounded-sm bg-olive px-3.5 py-2 text-[0.85rem] text-alabaster md:inline-flex"
          >
            <MessageCircle size={16} aria-hidden />
            {t("contact.btn_whatsapp")}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={t("nav.home")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-hairline lg:hidden"
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-hairline bg-paper px-5 pb-5 lg:hidden">
        <nav className="flex flex-col gap-1 pt-2">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="rounded-sm px-2 py-2.5 text-[0.95rem] text-ink-soft hover:bg-sand hover:text-olive"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={wa}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-2 inline-flex items-center gap-2 rounded-sm bg-olive px-3.5 py-2.5 text-[0.9rem] text-alabaster"
          >
            <MessageCircle size={16} aria-hidden />
            {t("contact.btn_whatsapp")}
          </a>
        </nav>
      </div>
    </header>
  );
}
