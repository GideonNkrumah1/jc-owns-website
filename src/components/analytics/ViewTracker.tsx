"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsEventType } from "@/lib/analytics";

export function ViewTracker({
  type,
  meta,
}: {
  type: AnalyticsEventType;
  meta?: Record<string, unknown>;
}) {
  useEffect(() => {
    trackEvent(type, meta);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
