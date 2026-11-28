"use client";

import { useEffect } from "react";

/** Dev-only render profiler. Run with NEXT_PUBLIC_SCAN=1 npm run dev. The env check is inlined
 *  at build time, so production builds drop the import and ship none of this. */
export function ReactScan() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_SCAN !== "1") return;
    void import("react-scan").then(({ scan }) => scan({ enabled: true }));
  }, []);
  return null;
}
