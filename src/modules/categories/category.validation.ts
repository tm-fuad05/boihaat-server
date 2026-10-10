import z from "zod";

export const idSchema = z.string().uuid();

export const createCategorySchema = z.object({
  name: z.string().min(1, "Category name is required!"),
  slug: z.string().min(1, "Category slug is required!"),
});

export const updateCategorySchema = createCategorySchema.partial();
