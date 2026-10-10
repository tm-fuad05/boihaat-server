import express, { response, type Request, type Response } from "express";
import { prisma } from "../../config/prisma";

// GET all categories
export async function getAllCategories(req: Request, res: Response) {
  try {
    const categories = await prisma.category.findMany({
      include: {
        books: true,
      },
    });

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
export async function getCategoryById(req: Request, res: Response) {
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      return res.status(404).json({
        success: false,
        message: "Category ID not found!",
      });
    }

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId as string,
      },
      include: {
        books: true,
      },
    });
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
export async function addCategory(req: Request, res: Response) {
  try {
    const { name, slug } = req.body;
    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: "Bad Request. Name and slug are required!",
      });
    }

    const existingCategory = await prisma.category.findUnique({
      where: {
        slug,
      },
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "This category is already exists!",
      });
    }

    const createNewCategory = await prisma.category.create({
      data: { name, slug },
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

export async function editCategory(req: Request, res: Response) {
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      return res.status(404).json({
        success: false,
        message: "Category ID not found!",
      });
    }

    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId as string },
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Categroy not found!",
      });
    }

    const updatedCategory = req.body;

    if (!updatedCategory) {
      return res.status(400).json({
        success: false,
        message: "Bad Request. Name or slug are required!",
      });
    }

    const updatedDoc = await prisma.category.update({
      where: {
        id: categoryId as string,
      },
      data: {
        name: updatedCategory.name,
        slug: updatedCategory.slug,
      },
    });

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

export async function deleteCategory(req: Request, res: Response) {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.status(404).json({
        success: false,
        message: "Category ID not found!",
      });
    }

    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId as string },
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Categroy not found!",
      });
    }

    const deletedCategory = await prisma.category.delete({
      where: { id: categoryId as string },
    });

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
