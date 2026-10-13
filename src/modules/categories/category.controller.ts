import type { Request, Response } from "express";
import { CategoryService } from "./category.service";

// GET all categories
async function getAllCategories(req: Request, res: Response) {
  try {
    const categories = await CategoryService.getCategoriesFromDB();

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error: any) {
    console.error("GET Categories Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// GET Specific Categories
async function getCategoryById(req: Request, res: Response) {
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      return res.status(404).json({
        success: false,
        message: "Category ID not found!",
      });
    }

    const category = await CategoryService.getCategoryByIdFromDB(
      categoryId as string,
    );
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error: any) {
    console.error("GET Specific Category Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Post Category
async function addCategory(req: Request, res: Response) {
  try {
    const { name, slug } = req.body;

    const existingCategory =
      await CategoryService.getCategoryBySlugFromDB(slug);

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "This category is already exists!",
      });
    }

    const createNewCategory = await CategoryService.addCategoryInDB({
      name,
      slug,
    });

    res.status(201).json({
      success: true,
      message: `Category: ${createNewCategory.name} added successfully.`,
    });
  } catch (error: any) {
    console.error("POST Category Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Edit Category
async function editCategory(req: Request, res: Response) {
  try {
    const categoryId = req.params.id;

    const existingCategory = await CategoryService.getCategoryByIdFromDB(
      categoryId as string,
    );

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found!",
      });
    }

    const { name, slug } = req.body;

    const updatedDoc = await CategoryService.editCategoryFromDB(
      { name, slug },
      categoryId as string,
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      data: updatedDoc,
    });
  } catch (error: any) {
    console.error("PATCH Category Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Delete Category
async function deleteCategory(req: Request, res: Response) {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.status(404).json({
        success: false,
        message: "Category ID not found!",
      });
    }

    const existingCategory = await CategoryService.getCategoryByIdFromDB(
      categoryId as string,
    );

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found!",
      });
    }

    const deletedCategory = await CategoryService.deleteCategoryFromDB(
      categoryId as string,
    );

    res.status(200).json({
      success: true,
      message: `Category: ${deletedCategory.name} deleted successfully.`,
    });
  } catch (error: any) {
    console.error("DELETE Category Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export const CategoryController = {
  getAllCategories,
  getCategoryById,
  addCategory,
  editCategory,
  deleteCategory,
};
