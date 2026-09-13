import { NextRequest, NextResponse } from "next/server";
import { logServerEvent } from "@/lib/analytics-server";

const ALLOWED_TYPES = new Set([
  "whatsapp_click",
  "product_view",
  "product_enquiry",
  "contact_form_submit",
  "category_view",
  "page_view",
]);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const type = typeof body?.type === "string" ? body.type : null;
    if (!type || !ALLOWED_TYPES.has(type)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const meta = typeof body?.meta === "object" && body?.meta !== null ? body.meta : {};
    const path = typeof body?.path === "string" ? body.path.slice(0, 500) : undefined;

    // Fire-and-forget: never let analytics slow down or break the response.
    await logServerEvent(type, meta, path);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
