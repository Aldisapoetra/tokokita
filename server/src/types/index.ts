import { Product, User } from "../generate/prisma/client";

export type ProductWithoutId = Omit<Product, "id">;
export type UserWithoutPassword = Omit<User, "password">;
