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
        "mb-10 overflow-hidden rounded-lg border-b-4 border-orange bg-[radial-gradient(ellipse_at_90%_0%,rgba(255,143,58,0.18),transparent_40%),linear-gradient(160deg,#4a5439_0%,#343d2e_70%)] px-5 py-9 text-paper shadow-[0_18px_40px_rgba(45,49,37,0.12)] md:px-12 md:py-14",
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
