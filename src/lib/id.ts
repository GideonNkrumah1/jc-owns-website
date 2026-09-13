import { randomUUID } from "crypto";

/** Generates a unique id for new database rows. */
export function createId(): string {
  return randomUUID();
}
