import mongoose from "mongoose";
import Products from "../models/products.model.js";

export const getProducts = async (req, res) => {
  try {
    const list = await Products.find({});
    res.status(200).json({ status: true, data: list });
  } catch (err) {
    console.log("delete product error");
    res.status(500).json({ status: false, message: err.message });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // being sent by user
  if (!product?.name || !product?.price || !product?.quantity) {
    return res
      .status(400)
      .json({ status: false, message: "All fields are required!" });
  }

  const newProduct = new Products(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    console.log("@error product: ", err);
    res.status(500).json({ status: false, message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(404)
      .json({ status: true, message: "Product not found with id: " + id });
    return;
  }
  try {
    const updatedProduct = await Products.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ status: true, message: updatedProduct });
  } catch (err) {
    console.log("delete product error");
    res.status(500).json({ status: false, message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(404)
      .json({ status: true, message: "Product not found with id: " + id });
    return;
  }
  try {
    await Products.findByIdAndDelete(id);
    res.status(200).json({ status: true, message: "Deleted successfully" });
  } catch (err) {
    console.log("delete product error");
    res.status(500).json({ status: false, message: err.message });
  }
};
