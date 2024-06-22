
const productService = require("../Services/productService");

const createProduct = async (req, res) => {
  
  try {
    const product = await productService.createProduct(req.body);
  
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.deleteProduct(productId);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.updateProduct(productId, req.body);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const findProductById = async (req, res) => {
  const productId = req.params.id;
  
  try {
    const product = await productService.findProductById(productId);
    return res.status(201).send(product);
  } catch (error) {

    return res.status(500).send({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  const productId = req.params.id;
  try {
    const products = await productService.getAllProducts(req.query);
    return res.status(201).send(products);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const createMultiPleProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.createMultiPleProduct(req.body);
    return res.status(201).send({ message: "Products Created Successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  findProductById,
  getAllProducts,
  createMultiPleProduct,
};