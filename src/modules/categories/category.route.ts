import express from "express";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
  getCategoryById,
} from "./category.controller";
import { verifyToken } from "../../middlewares/auth.middleware";
import { verifyAdmin } from "../../middlewares/role.middleware";
import { validateRequest } from "../../middlewares/validationRequest";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./category.validation";

const router = express.Router();

router.get("/", getAllCategories);
router.post(
  "/",
  verifyToken,
  verifyAdmin,
  validateRequest(createCategorySchema),
  addCategory,
);
router.get("/:id", getCategoryById);
router.patch(
  "/:id",
  verifyToken,
  verifyAdmin,
  validateRequest(updateCategorySchema),
  editCategory,
);
router.delete("/:id", verifyToken, verifyAdmin, deleteCategory);

export default router;
