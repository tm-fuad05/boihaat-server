import type { Request, Response } from "express";
import { BookService } from "./book.service";

// GET All books
export async function getAllBooks(req: Request, res: Response) {
  try {
    const books = await BookService.getBooksFromDB();

    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error: any) {
    console.error("GET Book Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// GET Specific Book
export async function getBookById(req: Request, res: Response) {
  try {
    const bookId = req.params.id;

    if (!bookId) {
      return res.status(400).json({
        success: false,
        message: "Bad Request. Book ID is required!",
      });
    }

    const book = await BookService.getBookByIdFromDB(bookId as string);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error: any) {
    console.error("GET Specific Book Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Add Book
export async function addBook(req: Request, res: Response) {
  try {
    const { title, price, stock, categoryId } = req.body;

    const addNewBook = await BookService.addBookInDB({
      title,
      price,
      stock,
      categoryId,
    });

    res.status(201).json({
      success: true,
      message: `Book: '${addNewBook.title}' is added successfully.`,
      data: addNewBook,
    });
  } catch (error: any) {
    console.error("POST Book Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Edit Book
export async function editBook(req: Request, res: Response) {
  try {
    const bookId = req.params.id;

    if (!bookId) {
      return res.status(400).json({
        success: false,
        message: "Bad request. Book ID is required!",
      });
    }

    const existingBook = await BookService.getBookByIdFromDB(bookId as string);

    if (!existingBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found!",
      });
    }

    const { title, price, stock, categoryId } = req.body;

    const updatedDoc = await BookService.editBookInDB(
      { title, price, stock, categoryId },
      bookId as string,
    );

    res.status(200).json({
      success: true,
      message: "Book updated successfully.",
      data: updatedDoc,
    });
  } catch (error: any) {
    console.error("PATCH Book Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Delete Book
export async function deleteBook(req: Request, res: Response) {
  try {
    const bookId = req.params.id;

    if (!bookId) {
      return res.status(400).json({
        success: false,
        message: "Bad request. Book ID is required!",
      });
    }

    const existingBook = await BookService.getBookByIdFromDB(bookId as string);

    if (!existingBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found!",
      });
    }

    const deletedBook = await BookService.deleteBookFromDB(bookId as string);

    res.status(200).json({
      success: true,
      message: `Book: '${deletedBook.title}' deleted successfully.`,
    });
  } catch (error: any) {
    console.error("DELETE Book Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export const BookController = {
  addBook,
  deleteBook,
  editBook,
  getAllBooks,
  getBookById,
};
