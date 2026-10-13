import express from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validationRequest";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(AuthValidation.registerSchema),
  AuthController.register,
);
router.post(
  "/login",
  validateRequest(AuthValidation.loginSchema),
  AuthController.login,
);
router.post("/logout", AuthController.logout);

export const AuthRouter = router;
