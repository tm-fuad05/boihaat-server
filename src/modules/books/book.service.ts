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
      id: bookId as string,
    },
    include: {
      category: true,
    },
  });
  return book;
}

interface createBookInput {
  title: string;
  price: number;
  stock: number;
  categoryId: string;
}

async function addBookInDB(payload: createBookInput) {
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

async function editBookInDB(payload: createBookInput, bookId: string) {
  const updatedDoc = await prisma.book.update({
    where: {
      id: bookId as string,
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
      id: bookId as string,
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
