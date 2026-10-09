import express from "express";
import {
  changeUserRole,
  deleteUser,
  getAllUsers,
  getUserById,
} from "./user.controllers";
import { verifyToken } from "../../middlewares/auth.middleware";
import { verifyAdmin } from "../../middlewares/role.middleware";
const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getAllUsers);
router.get("/:id", verifyToken, verifyAdmin, getUserById);
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);
router.patch("/role/:id", verifyToken, verifyAdmin, changeUserRole);

export default router;
