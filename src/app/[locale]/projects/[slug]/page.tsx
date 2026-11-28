import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { projects, getProject } from "@/features/projects/data";
import { Section } from "@/components/ui/section";
import { ProjectGallery } from "@/components/projects/project-gallery";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title[locale as "ar" | "en"],
    description: project.description[locale as "ar" | "en"],
    alternates: { canonical: `/${locale}/projects/${slug}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();
  const t = await getTranslations();
  const l = locale as "ar" | "en";

  return (
    <Section>
      <Link href={`/${locale}/projects`} className="text-[0.85rem] text-olive hover:underline">
        {t("nav.projects")}
      </Link>
      <h1 className="mt-4 text-[length:var(--text-step-3)] font-semibold">{project.title[l]}</h1>
      <p className="mt-2 text-[0.9rem] text-ink-soft">
        {project.client} · {project.tools.join(" · ")}
      </p>
      <p className="mt-5 max-w-3xl text-[length:var(--text-step-0)] text-ink-soft">{project.description[l]}</p>

      <div className="mt-8">
        <ProjectGallery
          images={project.gallery.length ? project.gallery : [project.cover]}
          alt={project.title[l]}
          labels={{
            close: t("projects.close"),
            previous: t("walk.prev"),
            next: t("walk.next"),
            expand: t("projects.expand"),
            thumbnails: t("projects.thumbnails"),
          }}
        />
      </div>

      {(() => {
        const position = projects.findIndex((item) => item.slug === project.slug);
        const prev = projects[(position - 1 + projects.length) % projects.length];
        const next = projects[(position + 1) % projects.length];
        return (
          <nav aria-label={t("nav.projects")} className="mt-12 flex items-center justify-between gap-4 border-t border-hairline pt-6">
            <Link href={`/${locale}/projects/${prev.slug}`} className="group max-w-[45%] text-[0.85rem] text-olive hover:underline">
              <span className="block text-[0.72rem] uppercase tracking-[0.14em] text-ink-soft">{t("walk.prev")}</span>
              <span className="block truncate">{prev.title[l]}</span>
            </Link>
            <Link href={`/${locale}/projects/${next.slug}`} className="group max-w-[45%] text-end text-[0.85rem] text-olive hover:underline">
              <span className="block text-[0.72rem] uppercase tracking-[0.14em] text-ink-soft">{t("walk.next")}</span>
              <span className="block truncate">{next.title[l]}</span>
            </Link>
          </nav>
        );
      })()}
    </Section>
  );
}
