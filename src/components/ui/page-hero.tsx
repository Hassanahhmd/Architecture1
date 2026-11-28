import { cn } from "@/lib/cn";

export function PageHero({
  tag,
  title,
  subtitle,
  children,
  className,
}: {
  tag?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "mb-10 overflow-hidden rounded-lg border-b-4 border-orange panel-olive md:px-12 md:py-14",
        className,
      )}
    >
      {tag ? (
        <p className="mb-4 inline-block rounded-full bg-orange px-3 py-1 text-[0.76rem] font-medium tracking-[0.16em] text-olive-dark uppercase">
          {tag}
        </p>
      ) : null}
      <h1 className="max-w-3xl text-[length:var(--text-step-3)] font-semibold text-paper">{title}</h1>
      {subtitle ? <p className="mt-4 max-w-2xl text-[length:var(--text-step-0)] text-paper/85">{subtitle}</p> : null}
      {children}
    </header>
  );
}
