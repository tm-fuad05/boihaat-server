import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./modules/auth/auth.routes";

export const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routers
app.use("/api/v1/auth", authRouter);

app.get("/", (_, res: Response) => {
  res.send({
    success: true,
    message: "Server is Running....",
  });
});
