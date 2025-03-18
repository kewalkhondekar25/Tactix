import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

import webhookRouter from "./router/webhook.router"

app.use("/api/v1/hooks", webhookRouter);

export default app;