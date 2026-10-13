import express from "express";
import { UserController } from "./user.controller";
import { verifyToken } from "../../middlewares/auth.middleware";
import { verifyAdmin } from "../../middlewares/role.middleware";
import { validateRequest } from "../../middlewares/validationRequest";
import { UserValidation } from "./user.validation";
const router = express.Router();

router.get("/", verifyToken, verifyAdmin, UserController.getAllUsers);
router.get("/:id", verifyToken, verifyAdmin, UserController.getUserById);
router.delete("/:id", verifyToken, verifyAdmin, UserController.deleteUser);
router.patch(
  "/role/:id",
  verifyToken,
  verifyAdmin,
  validateRequest(UserValidation.changeUserRoleSchema),
  UserController.changeUserRole,
);

export const UserRouter = router;
