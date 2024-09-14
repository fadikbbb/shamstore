const mongoose = require("mongoose");
const Product = require("../models/product");
const Category = require("../models/category");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.send({ status: "success", count: products.length, data: products });
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const product = req.body; // Directly expecting an array of products in the request body
  //check category if not found
  try {
    const isCategory = await Category.findOne({ name: product.category });
    if (!isCategory) {
      console.log(product.category);
      return res.status(400).send({
        status: "fail",
        message: `Category ${product.category} not found`,
      });
    }

    if (
      !product.category ||
      !product.description ||
      !product.image ||
      !product.title ||
      !product.price ||
      !product.quantity
    )
      return res.status(400).send({
        status: "fail",
        message: "product fields is required",
      });
    const category = await Category.findOne({ name: product.category });
    if (!category)
      return res.status(400).send({
        status: "fail",
        message: `Category "${product.category}" not found`,
      });
    product.categoryId = category._id;
    await Product.create(product);
    res
      .status(201)
      .send({ status: "success", message: "Products created", data: product });
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  // Validate the ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ status: "fail", message: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .send({ status: "fail", message: "product not found" });

    return res.status(200).send({ status: "success", data: product });
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  // Validate the ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ status: "fail", message: "Invalid product ID" });
  }

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product)
      return res
        .status(404)
        .send({ status: "fail", message: "product not found" });

    return res
      .status(200)
      .send({ status: "success", message: "product deleted" });
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  // Validate the ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ status: "fail", message: "Invalid product ID" });
  }

  try {
    const product = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!product)
      return res
        .status(404)
        .send({ status: "fail", message: "product not found" });

    return res
      .status(200)
      .send({ status: "success", message: "product updated", data: product });
  } catch (error) {
    // Handling validation errors
    if (error.name === "ValidationError") {
      return res.status(400).send({ status: "fail", message: error.message });
    }
    res.status(500).send({ status: "fail", message: error.message });
  }
};
