import z from "zod";

const createBookSchema = z.object({
  title: z
    .string({ error: "Title is required" })
    .trim()
    .min(2, "Title must be at least 2 characters"),
  price: z.coerce
    .number({ error: "Price is required" })
    .positive("Price must be a positive number and can't be zero"),
  stock: z.coerce
    .number({ error: "Stock is required" })
    .nonnegative({ error: "Stock must be a non-negative number" }),
  categoryId: z.string({ error: "CategoryId is required" }).uuid({
    error: "Invalid Category ID format! Must be a valid UUID",
  }),
});

const updateBookSchema = createBookSchema.partial();

export const BookValidation = {
  createBookSchema,
  updateBookSchema,
};
