import z from "zod";

const changeUserRoleSchema = z.object({
  role: z.enum(["ADMIN", "USER"], {
    error: "Role must be either ADMIN or USER",
  }),
});

export const UserValidation = {
  changeUserRoleSchema,
};
