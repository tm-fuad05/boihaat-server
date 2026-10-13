import { prisma } from "../../config/prisma";

async function getCategoriesFromDB() {
  const categories = await prisma.category.findMany({
    include: {
      books: true,
    },
  });
  return categories;
}

async function getCategoryByIdFromDB(categoryId: string) {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    include: {
      books: true,
    },
  });
  return category;
}

async function getCategoryBySlugFromDB(slug: string) {
  const existingCategory = await prisma.category.findUnique({
    where: {
      slug,
    },
  });
  return existingCategory;
}

interface CategoryInput {
  name: string;
  slug: string;
}

async function addCategoryInDB(payload: CategoryInput) {
  const createNewCategory = await prisma.category.create({
    data: payload,
  });
  return createNewCategory;
}

async function editCategoryFromDB(
  payload: Partial<CategoryInput>,
  categoryId: string,
) {
  const updatedDoc = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: payload,
  });
  return updatedDoc;
}

async function deleteCategoryFromDB(categoryId: string) {
  const deletedCategory = await prisma.category.delete({
    where: { id: categoryId },
  });

  return deletedCategory;
}

export const CategoryService = {
  getCategoriesFromDB,
  getCategoryByIdFromDB,
  getCategoryBySlugFromDB,
  addCategoryInDB,
  editCategoryFromDB,
  deleteCategoryFromDB,
};
