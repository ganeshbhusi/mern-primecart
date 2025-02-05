import mongoose from "mongoose";
import Razorpay from "razorpay";
import Products from "../models/products.model.js";

export const getProducts = async (req, res) => {
  try {
    const list = await Products.find({});
    res.status(200).json({ status: true, data: list });
  } catch (err) {
    console.log("get product error: ", err);
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
    console.log("update product error: ", err);
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

export const createOrder = async (req, res) => {
  console.log("@gb - create order: ", req.body);
  try {
    const instance = new Razorpay({
      key_id: "rzp_test_WhDZN6iBSjUj3H",
      key_secret: "Ovr854ZyqVJMYrM7Bcmh6iW9",
    });

    const options = {
      amount: req.body.price, // amount in smallest currency unit
      currency: "INR",
      receipt: "receipt_order_74394",
    };

    const order = await instance.orders.create(options);
    console.log("order: ", order);

    if (!order)
      return res
        .status(500)
        .send({ success: false, message: "Some error occured" });

    // res.json(order);
    res
      .status(201)
      .send({
        success: true,
        data: order,
        message: "Order created successfully",
      });
  } catch (error) {
    console.log("create order error: ", error);
    res.status(500).send(error);
  }
};

export const orderSuccess = async (req, res) => {
  console.log("body: ", req.body);
  res.status(200).json({ success: true, message: "Success" });
};
