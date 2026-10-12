import express from "express";
import { verifyToken } from "../../middlewares/auth.middleware";
import { verifyAdmin } from "../../middlewares/role.middleware";
import { BookController } from "./book.controller";
import { validateRequest } from "../../middlewares/validationRequest";
import { BookValidation } from "./book.validation";

const router = express.Router();

router.get("/", BookController.getAllBooks);
router.post(
  "/",
  verifyToken,
  verifyAdmin,
  validateRequest(BookValidation.createBookSchema),
  BookController.addBook,
);
router.get("/:id", BookController.getBookById);
router.patch(
  "/:id",
  verifyToken,
  verifyAdmin,
  validateRequest(BookValidation.updateBookSchema),
  BookController.editBook,
);
router.delete("/:id", verifyToken, verifyAdmin, BookController.deleteBook);

export const BookRouter = router;
