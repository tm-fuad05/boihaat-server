import express from "express";
import { CategoryController } from "./category.controller";
import { verifyToken } from "../../middlewares/auth.middleware";
import { verifyAdmin } from "../../middlewares/role.middleware";
import { validateRequest } from "../../middlewares/validationRequest";
import { CategoryValidation } from "./category.validation";

const router = express.Router();

router.get("/", CategoryController.getAllCategories);
router.post(
  "/",
  verifyToken,
  verifyAdmin,
  validateRequest(CategoryValidation.createCategorySchema),
  CategoryController.addCategory,
);
router.get("/:id", CategoryController.getCategoryById);
router.patch(
  "/:id",
  verifyToken,
  verifyAdmin,
  validateRequest(CategoryValidation.updateCategorySchema),
  CategoryController.editCategory,
);
router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  CategoryController.deleteCategory,
);

export const CategoryRouter = router;
