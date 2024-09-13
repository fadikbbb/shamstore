const Category = require("../models/category");
const Product = require("../models/product");
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.send({ status: "success", count: categories.length, data: categories });
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};
exports.createCategory = async (req, res) => {
  const body = req.body;
  try {
    if (!body)
      return res
        .status(400)
        .send({ status: "fail", message: "category fields are required" });
    const categoryExists = await Category.findOne({ name: body.name });
    if (categoryExists)
      return res
        .status(400)
        .send({ status: "fail", message: "category already exists" });
    const category = await Category.create(body);
    res.send({
      status: "success",
      message: "category created",
      data: category,
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};
exports.getCategoryByIdWithProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const products=await Product.find({categoryId:id}).select("-categoryId -createdAt -updatedAt -__v ");
    const category = await Category.findById(id).select("-createdAt -updatedAt -__v ");
    if (!category)
      return res
        .status(400)
        .send({ status: "fail", message: "category fields are required" });
    res.send({
      status: "success",
      data: {category,products},
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category)
      return res
        .status(400)
        .send({ status: "fail", message: "category fields are required" });
    res.send({
      status: "success",
      message: "category deleted",
      data: category,
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};
exports.updateCategory = async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(id, body);
    if (!category)
      return res
        .status(400)
        .send({ status: "fail", message: "category fields are required" });
    res.send({
      status: "success",
      message: "category updated",
      data: category,
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};
