import z from "zod";

const createCategorySchema = z.object({
  name: z
    .string({ error: "Category name is required" })
    .min(2, { error: "Category name must be at least 2 characters" }),
  slug: z
    .string({ error: "Category slug is required" })
    .min(2, { error: "Category slug must be at least 2 characters" }),
});

const updateCategorySchema = createCategorySchema.partial();

export const CategoryValidation = {
  createCategorySchema,
  updateCategorySchema,
};
