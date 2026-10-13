import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma";

interface RegisterInput {
  name: string;
  password: string;
  email: string;
}

async function registerUser(payload: RegisterInput) {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
    },
  });

  return newUser;
}

// async function loginUser(payload: LoginInput) {
//   // ১. Auth সার্ভিসের ভেতর ইউজার আনুন (পাসওয়ার্ডসহ)
//   const user = await prisma.user.findUnique({
//     where: { email: payload.email },
//   });

//   if (!user) {
//     return { isSuccess: false, message: "Invalid credentials" };
//   }

//   const isMatched = await bcrypt.compare(payload.password, user.password);

//   if (!isMatched) {
//     return { isSuccess: false, message: "Password didn't match! Try again." };
//   }

//   const safeUser = {
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//   };

//   return { isSuccess: true, user: safeUser };
// }

export const AuthService = {
  registerUser,
};
