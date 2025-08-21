// src/app/api/sheets/route.ts
import { NextRequest } from "next/server";

const BASE = process.env.SHEETS_WEBAPP_URL as string;

export async function GET(req: NextRequest) {
  if (!BASE) {
    return Response.json({ ok: false, error: "SHEETS_WEBAPP_URL ausente" }, { status: 500 });
  }

  // Repassa todos os query params para o Apps Script (action, materia_id, etc.)
  const { searchParams } = new URL(req.url);
  const qs = searchParams.toString();
  const url = qs ? `${BASE}?${qs}` : `${BASE}?action=ping`;

  const r = await fetch(url, { cache: "no-store" });
  const text = await r.text();

  // Mantém o content-type retornado pelo Apps Script
  return new Response(text, {
    status: r.status,
    headers: {
      "content-type": r.headers.get("content-type") || "application/json",
    },
  });
}
