import app from "./app.ts";
import type { Product } from "./types/index.ts";

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

app.post("/api/products", (req, res) => {
  const newProduct: Product = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
  };

  products.push(newProduct);
});

const products = [
  { id: 1, name: "Sepatu Running", price: 500000 },
  { id: 2, name: "Kaos Polos", price: 0 },
];

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
