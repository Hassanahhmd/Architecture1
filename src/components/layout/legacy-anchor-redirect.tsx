"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { legacyAnchors } from "@/lib/legacy-anchors";

/** Old shared links such as /#lab or /#estimator landed on one long page.
 *  On a locale home page, send them to the route that now holds the section. */
export function LegacyAnchorRedirect({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (pathname.replace(/\/$/, "") !== `/${locale}`) return;
    const target = legacyAnchors[window.location.hash.slice(1)];
    if (!target) return;
    router.replace(`/${locale}/${target.path}/${target.hash ? `#${target.hash}` : ""}`);
  }, [pathname, locale, router]);
  return null;
}
