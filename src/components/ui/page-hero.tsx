import { cn } from "@/lib/cn";

export function PageHero({
  tag,
  title,
  subtitle,
  children,
  className,
  light = false,
}: {
  tag?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  /** Light home-hero treatment with inner padding; opt-in so other pages keep their current look. */
  light?: boolean;
}) {
  return (
    <header
      className={cn(
        "mb-10 overflow-hidden rounded-lg md:px-12 md:py-14",
        light
          ? "border border-hairline border-b-4 border-b-orange bg-gradient-to-br from-sand via-alabaster to-olive/10 px-6 py-9 text-ink panel-light"
          : "border-b-4 border-orange panel-olive",
        className,
      )}
    >
      {tag ? (
        <p className="mb-4 inline-block rounded-full bg-orange px-3 py-1 text-[0.76rem] font-medium tracking-[0.16em] text-olive-dark uppercase">
          {tag}
        </p>
      ) : null}
      <h1 className={cn("max-w-3xl text-[length:var(--text-step-3)] font-semibold", light ? "text-olive-dark" : "text-paper")}>{title}</h1>
      {subtitle ? <p className={cn("mt-4 max-w-2xl text-[length:var(--text-step-0)] ", light ? "text-ink-soft" : "text-paper/85")}>{subtitle}</p> : null}
      {children}
    </header>
  );
}
