import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { verifyToken } from "./middlewares/auth.middleware";
import authRouter from "./modules/auth/auth.routes";
import userRouter from "./modules/users/user.routes";
import categoryRouter from "./modules/categories/category.routes";

export const app: Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);

app.get("/", verifyToken, (_, res: Response) => {
  res.send({
    success: true,
    message: "Server is Running....",
  });
});
