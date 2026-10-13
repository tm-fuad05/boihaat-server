import z from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "Name is required" })
    .min(3, { error: "Name must be at least 3 characters" }),
  email: z
    .email({ error: "Please enter a valid email address" })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, { error: "Password is required" })
    .min(6, { error: "Password must be at least 6 characters" })
    .max(20)
    .regex(/[A-Z]/, {
      error: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      error: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { error: "Password must contain at least one number" }),
});

const loginSchema = z.object({
  email: z.email({ error: "Invalid email" }).trim().toLowerCase(),
  password: z.string().min(1, { error: "Password is required" }),
});

export const AuthValidation = {
  registerSchema,
  loginSchema,
};
