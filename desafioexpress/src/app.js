
import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const PORT = 8080;
const pm = new ProductManager();

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/products/?", async (req, res) => {
  const products = await pm.getProducts();
  const limit = req.query.limit;
  const newProducts = products.products.slice(0, limit);
  res.send(newProducts);
});

app.get("/products/:id", async (req, res) => {
  const productId = await pm.getProductById(req.params.id);
  productId ? res.send(productId) : res.send({error: "not found"});
});

app.listen(PORT, () => {
  console.log(`Server run on PORT: ${PORT}`);
});