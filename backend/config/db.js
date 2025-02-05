import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // console.log(process.env.MONGO_URI);
    const conn = await mongoose.connect(
      "mongodb+srv://ganeshpaul999:ZLX0wOVW1f2UsSaL@cluster0.d1d75.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB Connected: ", conn.connection.host);
  } catch (err) {
    console.log("MongoDB Connection error: ", err);
    process.exit(1);
  }
};
