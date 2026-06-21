import "dotenv/config";
import { User } from "../../generate/prisma/client";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const AuthService = {
  // Registration new account
  async register(name: string, email: string, password: string): Promise<User> {
    // Check existing email
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new Error("Email sudah terdaftar");
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "CUSTOMER",
      },
    });
  },

  // Login user
  async login(
    email: string,
    password: string,
  ): Promise<{ user: Omit<User, "password">; token: string }> {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error("Email atau password salah");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Email atau password salah");
    }

    // Pembuatan token
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const token = await jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1d",
    });

    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  },

  async deleteAcoount(email: string, password: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error("user not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("password salah");
    }

    const deletedAccount = await prisma.user.delete({ where: { email } });

    return deletedAccount;
  },
};
