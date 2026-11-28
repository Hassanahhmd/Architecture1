"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { categories, projects, type ProjectCategory } from "@/features/projects/data";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/routing";

type Filter = ProjectCategory | "all";

const labels: Record<Filter, string> = {
  all: "projects.filter_all",
  architectural: "projects.filter_arch",
  interior: "projects.filter_interior",
  retail: "projects.filter_retail",
  industrial: "projects.filter_industrial",
};

export function ProjectsGrid({ locale, initialFilter }: { locale: Locale; initialFilter: Filter }) {
  const t = useTranslations();
  const [filter, setFilter] = useState<Filter>(initialFilter);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("category");
    if (!param || !(categories as string[]).includes(param)) return;
    const id = requestAnimationFrame(() => setFilter(param as Filter));
    return () => cancelAnimationFrame(id);
  }, []);
  const list = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const selectFilter = (next: Filter) => {
    setFilter(next);
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", next);
    window.history.replaceState(null, "", url);
  };

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {(["all", ...categories] as Filter[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => selectFilter(key)}
            aria-pressed={filter === key}
            className={cn(
              "rounded-xs border px-3.5 py-2 text-[0.85rem] transition-colors",
              filter === key ? "border-olive bg-olive text-alabaster" : "border-hairline text-ink-soft hover:border-olive",
            )}
          >
            {t(labels[key])}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="rounded-md border border-dashed border-hairline bg-paper px-6 py-12 text-center text-ink-soft">
          {t("projects.filter_industrial")} — {t("projects.subtitle")}
        </p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((project, index) => (
            <li key={project.slug}>
              <article className="group overflow-hidden rounded-md border border-hairline bg-paper">
                <Link href={`/${locale}/projects/${project.slug}`} className="block w-full text-start">
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-sand">
                    <Image
                      src={project.cover}
                      alt={project.title[locale]}
                      fill
                      priority={index < 3}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <span className="absolute top-3 start-3 rounded-xs bg-ink/70 px-2 py-1 text-[0.72rem] text-alabaster">
                      {t(labels[project.category])}
                    </span>
                    <span className="absolute bottom-3 end-3 rounded-xs bg-alabaster/90 px-2 py-1 text-[0.72rem] text-ink">
                      {project.gallery.length}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-[1rem] font-medium leading-snug">{project.title[locale]}</h3>
                    <p className="mt-1 text-[0.82rem] text-ink-soft">{project.client}</p>
                    <p className="mt-2 text-[0.76rem] text-brass-ink">{project.tools.join(" · ")}</p>
                  </div>
                </Link>
                <div className="border-t border-hairline px-4 py-2.5">
                  <Link href={`/${locale}/projects/${project.slug}`} className="text-[0.82rem] text-olive hover:underline">
                    {t("projects.view_details")}
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

    </>
  );
}
