"use client";

import { useEffect } from "react";

/* Boots the page motion once, after hydration. The page never unmounts, so there is no teardown. */
export function Motion() {
  useEffect(() => {
    import("@/motion/site").then((m) => m.start());
  }, []);
  return null;
}
