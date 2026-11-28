import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function SectionCard({
  href,
  title,
  blurb,
  image,
  priority,
  className,
}: {
  href: string;
  title: string;
  blurb: string;
  image: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-md border border-hairline bg-paper outline-offset-4",
        className,
      )}
    >
      <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden bg-olive/10">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col border-t-2 border-orange p-5 text-ink">
        <h3 className="text-[length:var(--text-step-1)] font-semibold">{title}</h3>
        <p className="mt-1 text-[0.88rem] text-ink-soft">{blurb}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-brass-ink">
          <ArrowRight size={15} className="rtl:-scale-x-100" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
