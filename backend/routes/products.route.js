import express from "express";
import {
  createOrder,
  createProduct,
  deleteProduct,
  getProducts,
  orderSuccess,
  updateProduct,
} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
// put for many & one also
// patch for one
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/payment", createOrder);
router.post("/payment/success", orderSuccess);

export default router;
