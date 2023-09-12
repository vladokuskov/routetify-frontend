import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

const app: express.Application = express();

app.use(helmet());
app.use(cors({ origin: process.env.ORIGIN }));

export default app;
