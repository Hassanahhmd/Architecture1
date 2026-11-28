import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "./routing";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});
