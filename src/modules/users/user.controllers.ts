import { type Request, type Response } from "express";
import { prisma } from "../../config/prisma";

// All Users get
export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    console.error("GET Users Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Specific user get by ID
export async function getUserById(req: Request, res: Response) {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User ID not found",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    console.error("GET Users Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Delete user by ID
export async function deleteUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User ID not found",
      });
    }

    if (userId === req.userInfo!.id) {
      return res.status(400).json({
        success: false,
        message: "You can't delete your own account!",
      });
    }

    const deletedUser = await prisma.user.delete({
      where: {
        id: userId as string,
      },
    });

    res.status(200).json({
      success: true,
      message: `${deletedUser?.name} successfully deleted`,
    });
  } catch (error: any) {
    console.error("Delete User Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// User Role change
export async function changeUserRole(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    if (!role || (role !== "ADMIN" && role !== "USER")) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Role must be ADMIN or USER!",
      });
    }

    const roleName = role[0] + role.slice(1).toLowerCase();

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User ID not found",
      });
    }

    if (userId === req.userInfo!.id) {
      return res.status(400).json({
        success: false,
        message: "You can't change your own role!",
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId as string,
      },
      data: {
        role: role,
      },
    });

    res.status(200).json({
      success: true,
      message: `${updatedUser?.name} is now ${roleName}`,
    });
  } catch (error: any) {
    console.error("User Role Change Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
