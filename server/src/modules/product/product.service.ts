import { Product } from "../../generate/prisma/client";
import prisma from "../../lib/prisma";
import { ProductWithoutId } from "../../types";

export const ProductService = {
  // Get all products
  async getProducts() {
    const products = await prisma.product.findMany();
    console.log(products.length);
    return products;
  },

  // Get product by id
  async getProductById(id: string): Promise<Product> {
    const numericId = Number(id);
    if (isNaN(numericId)) throw new Error("Id harus angka valid");

    const product = await prisma.product.findUnique({
      where: { id: numericId },
    });

    if (!product) throw new Error("Produk tidak ditemukan");

    return product;
  },

  // Add new product
  async createProduct(data: ProductWithoutId): Promise<Product> {
    const { name, price, description, stock, imageUrl } = data;
    if (price < 0 || isNaN(price)) throw new Error("Harga harus angka positif");

    if (
      !name ||
      price === undefined ||
      !description ||
      stock === undefined ||
      !imageUrl
    ) {
      throw new Error("Lengkapi semua kolom");
    }
    return prisma.product.create({
      data: {
        name,
        price,
        description,
        stock,
        imageUrl,
      },
    });
  },

  async updateProduct(id: string, data: ProductWithoutId): Promise<Product> {
    const numericId = Number(id);
    if (isNaN(numericId)) throw new Error("Id harus angka valid");
    const product = await prisma.product.findUnique({
      where: { id: numericId },
    });

    if (!product) throw new Error("Produk tidak ditemukan");

    const productUpdated = await prisma.product.update({
      where: { id: numericId },
      data,
    });

    return productUpdated;
  },

  async deleteProduct(id: string) {
    const numericId = Number(id);
    if (isNaN(numericId)) throw new Error("Id harus angka valid");
    const product = await prisma.product.findUnique({
      where: { id: numericId },
    });
    if (!product) throw new Error("Produk tidak ditemukan");

    await prisma.product.delete({ where: { id: numericId } });
  },
};
