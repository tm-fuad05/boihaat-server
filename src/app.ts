import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

export const app: Express = express();

app.use(cors());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Server is Running....",
  });
});
