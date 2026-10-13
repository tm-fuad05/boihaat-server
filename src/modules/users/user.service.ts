import { prisma } from "../../config/prisma";

async function getUsersFromDB() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      orders: true,
      profile: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return users;
}

async function getUserByIdFromDB(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      orders: true,
      profile: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
}

async function getUserByEmailFromDB(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}

async function deleteUserFromDB(userId: string) {
  const deletedUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  return deletedUser;
}

async function changeUserRoleFromDB(userId: string, role: "ADMIN" | "USER") {
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: role,
    },
  });
  return updatedUser;
}

export const UserService = {
  getUsersFromDB,
  getUserByIdFromDB,
  deleteUserFromDB,
  changeUserRoleFromDB,
  getUserByEmailFromDB,
};
