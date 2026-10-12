import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { verifyToken } from "./middlewares/auth.middleware";
import { AuthRouter } from "./modules/auth/auth.route";
import { UserRouter } from "./modules/users/user.route";
import { CategoryRouter } from "./modules/categories/category.route";
import { BookRouter } from "./modules/books/book.route";

export const app: Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routers
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/categories", CategoryRouter);
app.use("/api/v1/books", BookRouter);

app.get("/", verifyToken, (_, res: Response) => {
  res.send({
    success: true,
    message: "Server is Running....",
  });
});
