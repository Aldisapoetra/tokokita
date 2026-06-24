import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { Product } from "../../generate/prisma/client";
import { ProductWithoutId } from "../../types";
import prisma from "../../lib/prisma";

export const ProductController = {
  async getProducts(req: Request, res: Response) {
    try {
      const products = await ProductService.getProducts();
      res.status(200).json({ success: true, products });
    } catch (error: any) {
      console.log(error.message);
      res
        .status(400)
        .json({ success: false, message: "Gagal mengambil produk" });
    }
  },

  async getProductById(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error("Product id is required");
      }

      const product = await ProductService.getProductById(id);

      if (!product) {
        throw new Error("Product not found");
      }
      res.status(200).json({ success: true, product });
    } catch (error: any) {
      console.log(error.message);
      res
        .status(400)
        .json({ success: false, message: "Gagal mengambil produk" });
    }
  },

  async createProduct(req: Request, res: Response) {
    try {
      const { name, price, description, stock, imageUrl } = req.body;
      const data = <ProductWithoutId>{
        name,
        price,
        description,
        stock,
        imageUrl,
      };
      const newProduct = await ProductService.createProduct(data);
      res.status(201).json({
        success: true,
        message: "Produk berhasil dibuat",
        product: newProduct,
      });
    } catch (error: any) {
      console.log(error.message);
      res
        .status(400)
        .json({ success: false, message: "Gagal menambahkan produk" });
    }
  },

  async updateProduct(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      if (!id) throw new Error("Product ID is required");
      const { name, price, description, stock, imageUrl } = req.body;
      const data = <ProductWithoutId>{
        name,
        price,
        description,
        stock,
        imageUrl,
      };
      const productUpdated = await ProductService.updateProduct(id, data);

      res
        .status(200)
        .json({ success: true, message: "Product berhasil diupdate" });
    } catch (error: any) {
      console.log(error.message);
      res
        .status(400)
        .json({ success: false, message: "Gagal mengupdate produk" });
    }
  },

  async deleteProduct(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      await ProductService.deleteProduct(id);
      res
        .status(200)
        .json({ success: true, message: "Produk berhasil dihapus" });
    } catch (error: any) {
      console.log(error.message);
      res
        .status(400)
        .json({ success: false, message: "Gagal menghapus produk" });
    }
  },
};
