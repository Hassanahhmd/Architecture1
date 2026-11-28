"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";

/** Small floating shortcut to the 3D villa tour. Fixed to the physical left edge in both locales. */
export function TourFab({ locale }: { locale: Locale }) {
  const t = useTranslations("nav");
  const pathname = usePathname() || "";
  if (/\/tour\/?$/.test(pathname)) return null;
  return (
    <Link
      href={`/${locale}/tour`}
      aria-label={t("tourFab")}
      title={t("tourFab")}
      className="tour-fab fixed bottom-5 left-4 z-40 grid size-12 place-items-center rounded-full bg-olive shadow-lg ring-2 ring-alabaster transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
    >
      <span aria-hidden="true" className="tour-fab-ring absolute inset-0 rounded-full ring-2 ring-orange" />
      <Image
        src="/images/tour-fab.jpg"
        alt=""
        width={120}
        height={120}
        className="size-full rounded-full object-cover"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-0.5 -right-0.5 grid size-5 place-items-center rounded-full bg-olive text-alabaster ring-2 ring-alabaster"
      >
        <Box className="size-3" strokeWidth={2} />
      </span>
    </Link>
  );
}
