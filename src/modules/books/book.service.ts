import { prisma } from "../../config/prisma";

async function getBooksFromDB() {
  const books = await prisma.book.findMany({
    include: {
      category: true,
    },
  });

  return books;
}

async function getBookByIdFromDB(bookId: string) {
  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
    include: {
      category: true,
    },
  });
  return book;
}

interface BookInput {
  title: string;
  price: number;
  stock: number;
  categoryId: string;
}

async function addBookInDB(payload: BookInput) {
  const addNewBook = await prisma.book.create({
    data: payload,
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  return addNewBook;
}

async function editBookInDB(payload: Partial<BookInput>, bookId: string) {
  const updatedDoc = await prisma.book.update({
    where: {
      id: bookId,
    },
    data: payload,
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return updatedDoc;
}

async function deleteBookFromDB(bookId: string) {
  const deletedBook = await prisma.book.delete({
    where: {
      id: bookId,
    },
  });
  return deletedBook;
}

export const BookService = {
  getBooksFromDB,
  getBookByIdFromDB,
  editBookInDB,
  deleteBookFromDB,
  addBookInDB,
};
