import z from "zod";

const createBookSchema = z.object({
  title: z.string({ message: "Title is required" }).trim().min(1),
  price: z.coerce
    .number({ message: "Price is required!" })
    .positive("Price must be a positive number and can't be zero!"),
  stock: z.coerce
    .number({ message: "Stock is required!" })
    .nonnegative("Stock must be a non-negative number!"),
  categoryId: z
    .string({ message: "Category ID is required" })
    .uuid("Invalid Category ID format! Must be a valid UUID."),
});

const updateBookSchema = createBookSchema.partial();

export const BookValidation = {
  createBookSchema,
  updateBookSchema,
};
