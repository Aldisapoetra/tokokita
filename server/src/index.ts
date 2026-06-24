import "dotenv/config";
import app from "./app.ts";
import { authRoutes } from "./modules/auth/index";
import { productRoutes } from "./modules/product/index.ts";

const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
