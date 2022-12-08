const express = require('express');
const productsRouter = express.Router();

const { getProducts, saveProducts, deleteProduct, updateProduct } = require('../controllers/products.js');

productsRouter.get("/", async (req, res) => {
  const response = await getProducts();
  res.status(200).json(response);
  // res.render('pages/productForm', { products: response });
});

productsRouter.post("/", (req, res) => {
  saveProducts(req.body);
  res.redirect("/");
});

productsRouter.delete("/:id", (req, res) => {
  const productId = req?.params?.id;
  deleteProduct(productId);
  res.send('Delete ok.');
});

productsRouter.put("/:id", (req, res) => {
  const productId = req?.params?.id;
  const newData = req.body;

  console.log(newData);

  updateProduct(productId, newData);
  res.send('Update ok.');
});

module.exports = productsRouter;