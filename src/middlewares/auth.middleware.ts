import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload, type VerifyErrors } from "jsonwebtoken";
import type { Payload } from "../types/payload.types";
import { prisma } from "../config/prisma";
import { cookieOptions } from "../modules/auth/tokenCreate";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const secret = process.env.ACCESS_TOKEN_SECRET!;
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Login and try again!",
      });
    }

    jwt.verify(
      token,
      secret,
      async (
        err: VerifyErrors | null,
        decoded: JwtPayload | string | undefined,
      ) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized access. Login and try again!",
          });
        }
        const payload = decoded as Payload;

        const existingUser = await prisma.user.findUnique({
          where: {
            id: payload.id,
          },
        });

        if (!existingUser) {
          res.clearCookie("token", cookieOptions);
          return res.status(401).json({
            success: false,
            message: "Unauthorized access. User does not exist!",
          });
        }

        req.userInfo = {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
        };

        next();
      },
    );
  } catch (error: any) {
    console.error("Authentication Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
