import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const newUser = await AuthService.register(name, email, password);
      return res.status(201).json({
        success: true,
        message: "Registrasi berhasil!",
        user_id: newUser.id,
      });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.login(email, password);
      return res
        .status(200)
        .json({ success: true, message: "Login berhasil!", ...user });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  async deleteAccount(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.deleteAcoount(email, password);
      return res.status(200).json({ result });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
};
