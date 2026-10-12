import { prisma } from "../../config/prisma";

async function getCategoriesFromDB() {
  const categories = await prisma.category.findMany({
    include: {
      books: true,
    },
  });
  return categories;
}

export const CategoryService = {
  getCategoriesFromDB,
};
