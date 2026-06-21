import "dotenv/config";
import app from "./app.ts";
import prisma from "./lib/prisma.ts";
import type { Product } from "./types/index.ts";
import router from "./modules/auth/auth.routes.ts";
import { authRoutes } from "./modules/auth/index";

const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
