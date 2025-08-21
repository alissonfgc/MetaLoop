"use client";

import { useEffect, useState } from "react";

type PingOK = {
  ok: true;
  service: string;
  actions: string[];
};

type PingErr = {
  ok: false;
  error: string;
};

// você pode usar essa página tanto para `action=ping` quanto para checar outros endpoints.
// pra evitar `any`, guardo o retorno como `unknown` e só formato pra string.
export default function DebugSheets() {
  const [data, setData] = useState<unknown>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_SHEETS_WEBAPP_URL;
        if (!base) {
          setData({ ok: false, error: "SHEETS_WEBAPP_URL ausente" });
          return;
        }

        // testando o ping
        const res = await fetch(`${base}?action=ping`, { cache: "no-store" });
        const text = await res.text();

        // tenta parsear em JSON; se não der, mostra texto cru
        try {
          const json = JSON.parse(text) as PingOK | PingErr | unknown;
          setData(json);
        } catch {
          setData(text);
        }
      } catch (err) {
        setData({ ok: false, error: String(err) });
      }
    };
    run();
  }, []);

  const pretty =
    typeof data === "string" ? data : JSON.stringify(data, null, 2);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Debug Sheets API</h1>
      <div className="rounded-xl border border-borderc bg-card p-4">
        <pre className="whitespace-pre-wrap text-sm">{pretty}</pre>
      </div>
    </div>
  );
}
