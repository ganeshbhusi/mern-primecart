import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 99,
  },
}, {
  timestamps: true,
});

const Products = mongoose.model('Products', productsSchema);

export default Products;

/*
Mongoose will automatically convert singular to plural,
so advised to give singular names
*/