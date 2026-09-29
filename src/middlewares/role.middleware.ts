import type { NextFunction, Request, Response } from "express";

export async function verifyAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { role } = req.userInfo!;

    if (role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden access",
      });
    }
    next();
  } catch (error: any) {
    console.error("Authorization Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
