import z from "zod";

const changeUserRoleSchema = z.object({
  role: z.enum(["ADMIN", "USER"], {
    message: "Role must be either ADMIN or USER",
  }),
});

export const UserValidation = {
  changeUserRoleSchema,
};
