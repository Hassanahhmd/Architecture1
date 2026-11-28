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
        "group relative block overflow-hidden rounded-md bg-olive/10 outline-offset-4",
        className,
      )}
    >
      <div className="relative aspect-4/3 w-full">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 text-alabaster">
        <h3 className="text-[length:var(--text-step-1)] font-semibold">{title}</h3>
        <p className="mt-1 text-[0.86rem] text-alabaster/80">{blurb}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-[0.82rem] text-brass">
          <ArrowRight size={15} className="rtl:-scale-x-100" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
