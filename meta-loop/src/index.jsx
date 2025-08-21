import express from "express";
import { sheetsRoutes } from "./routes/sheets";

const app = express();

sheetsRoutes(app);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});
