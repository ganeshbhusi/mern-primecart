import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dno: {
      type: String,
      required: true,
    },
    street: {
      type: Number,
      required: true,
    },
    city: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.String,
    },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model("Address", addressSchema);

export default Address;

/*
Mongoose will automatically convert singular to plural,
so advised to give singular names
*/
