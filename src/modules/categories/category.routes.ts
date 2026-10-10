import express from "express";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
  getCategoryById,
} from "./category.controllers";
import { verifyToken } from "../../middlewares/auth.middleware";
import { verifyAdmin } from "../../middlewares/role.middleware";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/", verifyToken, verifyAdmin, addCategory);
router.get("/:id", getCategoryById);
router.patch("/:id", verifyToken, verifyAdmin, editCategory);
router.delete("/:id", verifyToken, verifyAdmin, deleteCategory);

export default router;
