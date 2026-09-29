import jwt from "jsonwebtoken";
import type { CookieOptions, Response } from "express";
import type { Payload } from "../../types/payload.types";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none",
  path: "/",
  maxAge: 3600 * 24 * 7 * 1000,
};

export default function tokenCreate(payload: Payload, res: Response) {
  const secret = process.env.ACCESS_TOKEN_SECRET!;
  const token = jwt.sign(payload, secret, {
    expiresIn: "24h",
  });

  res.cookie("token", token, cookieOptions);
}
