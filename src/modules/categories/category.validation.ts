import z from "zod";

const createCategorySchema = z.object({
  name: z.string().min(1, "Category name is required!"),
  slug: z.string().min(1, "Category slug is required!"),
});

const updateCategorySchema = createCategorySchema.partial();

export const CategoryValidation = {
  createCategorySchema,
  updateCategorySchema,
};
