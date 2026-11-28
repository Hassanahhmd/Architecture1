"use client";

import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { getProject } from "@/features/projects/data";
import type { Locale } from "@/i18n/routing";
import { ProjectGallery } from "./project-gallery";

/** Quick view opened from the projects grid. Loaded on demand, so it adds nothing to the
 *  first-load JS of /projects. The URL carries ?project=slug; the prerendered
 *  /projects/<slug>/ page remains the full page and the no-JavaScript fallback. */
export default function ProjectModal({
  slug,
  locale,
  onClose,
}: {
  slug: string;
  locale: Locale;
  onClose: () => void;
}) {
  const t = useTranslations();
  const project = getProject(slug);
  if (!project) return null;
  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/70" />
        <Dialog.Content className="fixed inset-x-3 top-[4vh] bottom-[4vh] z-40 mx-auto flex max-w-4xl flex-col overflow-y-auto rounded-md bg-paper p-5 md:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-[1.15rem] font-medium">{project.title[locale]}</Dialog.Title>
              <Dialog.Description className="mt-1 text-[0.85rem] text-ink-soft">
                {project.client} · {project.tools.join(" · ")}
              </Dialog.Description>
            </div>
            <Dialog.Close className="rounded-sm border border-hairline p-2" aria-label={t("projects.close")}>
              <X size={18} aria-hidden />
            </Dialog.Close>
          </div>
          <p className="mt-4 text-[0.9rem] leading-relaxed">{project.description[locale]}</p>
          <div className="mt-5">
            <ProjectGallery
              images={project.gallery.length ? project.gallery : [project.cover]}
              alt={project.title[locale]}
              labels={{
                close: t("projects.close"),
                previous: t("walk.prev"),
                next: t("walk.next"),
                expand: t("projects.expand"),
                thumbnails: t("projects.thumbnails"),
              }}
            />
          </div>
          <Link
            href={`/${locale}/projects/${project.slug}`}
            className="mt-5 text-[0.85rem] font-medium text-olive hover:underline"
          >
            {t("projects.view_details")}
          </Link>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
