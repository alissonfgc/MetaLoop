// meta-loop/src/routes/sheets.ts
import express, { Request, Response } from "express";
import fetch from "node-fetch";

const BASE = process.env.SHEETS_WEBAPP_URL as string;

const pass = async (res: Response, url: string) => {
  const r = await fetch(url, { method: "GET" });
  const data = await r.json();
  return res.status(200).json(data);
};

export const sheetsRoutes = (app: express.Express) => {
  app.get("/api/sheets/ping", (req: Request, res: Response) =>
    pass(res, `${BASE}?action=ping`)
  );

  app.get("/api/sheets/materias", (req: Request, res: Response) =>
    pass(res, `${BASE}?action=materias`)
  );

  app.get("/api/sheets/assuntos", (req: Request, res: Response) => {
    const materia_id = String(req.query.materia_id || "");
    const url = materia_id
      ? `${BASE}?action=assuntos&materia_id=${encodeURIComponent(materia_id)}`
      : `${BASE}?action=assuntos`;
    return pass(res, url);
  });
};
