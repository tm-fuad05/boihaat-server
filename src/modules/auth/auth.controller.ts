import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma";
import tokenCreate, { cookieOptions } from "./tokenCreate";
import { UserService } from "../users/user.service";
import { AuthService } from "./auth.service";

async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "Email, name and password are required",
      });
    }

    const existingUser = await UserService.getUserByEmailFromDB(email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists!",
      });
    }

    const newUser = await AuthService.registerUser({ name, email, password });

    tokenCreate({ id: newUser.id, name, email, role: newUser.role }, res);

    return res.status(201).json({
      success: true,
      message: "Successfully Registered",
    });
  } catch (error: any) {
    console.error("Register Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const existingUser = await UserService.getUserByEmailFromDB(email);

    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatched = await bcrypt.compare(password, existingUser?.password);

    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "Password didn't match! Try again.",
      });
    }

    tokenCreate(
      {
        id: existingUser.id,
        name: existingUser.name,
        email,
        role: existingUser.role,
      },
      res,
    );

    return res.status(200).json({
      success: true,
      message: "Sucessfully logged in",
    });
  } catch (error: any) {
    console.error("Login Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function logout(req: Request, res: Response) {
  try {
    return res.clearCookie("token", cookieOptions).status(200).json({
      success: true,
      message: "Logged out",
    });
  } catch (error: any) {
    console.error("Logout Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export const AuthController = {
  register,
  login,
  logout,
};
