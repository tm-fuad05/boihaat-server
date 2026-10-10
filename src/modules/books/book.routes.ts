import express from "express";
import { verifyToken } from "../../middlewares/auth.middleware";
import { verifyAdmin } from "../../middlewares/role.middleware";
import {
  addBook,
  deleteBook,
  editBook,
  getAllBooks,
  getBookById,
} from "./book.controllers";
import { validateRequest } from "../../middlewares/validationRequest";
import { createBookSchema, updateBookSchema } from "./book.validation";

const router = express.Router();

router.get("/", getAllBooks);
router.post(
  "/",
  verifyToken,
  verifyAdmin,
  validateRequest(createBookSchema),
  addBook,
);
router.get("/:id", getBookById);
router.patch(
  "/:id",
  verifyToken,
  verifyAdmin,
  validateRequest(updateBookSchema),
  editBook,
);
router.delete("/:id", verifyToken, verifyAdmin, deleteBook);

export default router;
