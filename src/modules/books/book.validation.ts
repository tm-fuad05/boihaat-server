import z from "zod";

const createBookSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  price: z.coerce
    .number({ error: "Price is required!" })
    .positive("Price must be a positive number and can't be zero!"),
  stock: z.coerce
    .number({ error: "Stock is required!" })
    .nonnegative({ error: "Stock must be a non-negative number!" }),
  categoryId: z
    .uuid({
      error: "Invalid Category ID format! Must be a valid UUID.",
    })
    .min(1, { error: "Category ID is required" }),
});

const updateBookSchema = createBookSchema.partial();

export const BookValidation = {
  createBookSchema,
  updateBookSchema,
};
