import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
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
    imageUrl: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", productsSchema);

export default Products;

/*
Mongoose will automatically convert singular to plural,
so advised to give singular names
*/
