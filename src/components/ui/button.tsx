import Link from "next/link";
import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-[0.95rem] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2";

const variants = {
  primary: "bg-orange text-olive-dark hover:bg-orange-dark",
  outline: "border border-hairline text-ink hover:border-olive hover:text-olive",
  brass: "bg-olive-dark text-paper hover:bg-olive",
  light: "border border-paper/45 text-paper hover:bg-paper/10",
  paper: "bg-paper text-olive-dark hover:bg-sand",
} as const;

type Variant = keyof typeof variants;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  const classes = cn(base, variants[variant], className);
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer noopener">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
