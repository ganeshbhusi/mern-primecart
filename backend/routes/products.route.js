import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
// put for many & one also
// patch for one
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
