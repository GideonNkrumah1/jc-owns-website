import "server-only";
import { db } from "@/db";
import { analyticsEvents } from "@/db/schema";

/** Records a conversion event server-side (used from server actions/API routes). Never throws. */
export async function logServerEvent(
  type: string,
  meta: Record<string, unknown> = {},
  path?: string
) {
  try {
    await db.insert(analyticsEvents).values({ type, meta, path: path ?? null });
  } catch (err) {
    console.error("Failed to log analytics event", type, err);
  }
}
