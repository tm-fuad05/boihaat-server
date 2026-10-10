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

const router = express.Router();

router.get("/", getAllBooks);
router.post("/", verifyToken, verifyAdmin, addBook);
router.get("/:id", getBookById);
router.patch("/:id", verifyToken, verifyAdmin, editBook);
router.delete("/:id", verifyToken, verifyAdmin, deleteBook);

export default router;
