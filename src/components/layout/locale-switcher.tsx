"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabel, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const rest = pathname.replace(/^\/(ar|en)/, "");
  return (
    <div className="flex items-center gap-1 text-[0.85rem]">
      {locales.map((next) => {
        const target = `/${next}${rest}`;
        return (
          <Link
            key={next}
            href={target}
            hrefLang={next}
            aria-current={next === locale ? "true" : undefined}
            className={cn(
              "rounded-xs px-2 py-1 transition-colors",
              next === locale ? "bg-olive text-alabaster" : "text-ink-soft hover:text-olive",
            )}
          >
            {localeLabel[next]}
          </Link>
        );
      })}
    </div>
  );
}
