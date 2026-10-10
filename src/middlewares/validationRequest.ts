// src/middlewares/validateRequest.ts
import { type NextFunction, type Request, type Response } from "express";
import { type ZodSchema, ZodError } from "zod";

export const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: `Bad Request. ${error?.issues[0]?.message}`,
        });
      }
      next(error);
    }
  };
};
