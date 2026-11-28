"use client";

import { useTranslations } from "next-intl";

/** Route-level error boundary: a failed section shows a message and a retry. */
export default function RouteError({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations("err");
  return (
    <section className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="text-[length:var(--text-step-2)] font-semibold">{t("title")}</h1>
      <p className="mt-3 text-ink-soft">{t("desc")}</p>
      <button type="button" onClick={reset} className="mt-6 rounded-sm bg-olive px-5 py-2.5 text-alabaster">
        {t("retry")}
      </button>
    </section>
  );
}
