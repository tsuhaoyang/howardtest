"use client";

import { useEffect } from "react";
import { usePatternStore } from "@/store/pattern-store";

interface PatternContextTrackerProps {
  slug: string;
}

export function PatternContextTracker({ slug }: PatternContextTrackerProps) {
  const setActivePattern = usePatternStore((s) => s.setActivePattern);

  useEffect(() => {
    setActivePattern(slug);
    return () => setActivePattern(null);
  }, [slug, setActivePattern]);

  return null;
}
