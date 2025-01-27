import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { connectDB } from "./config/db.js";
import productsRoutes from "./routes/products.route.js";

dotenv.config();
const PORT = process.env.SERVER_PORT || 3606;
const app = express();
app.use(cors());
app.use(express.json()); //allows us to accept json in body in res.body

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.get("/", (req, res) => {
  res.send("I' ready!!");
});

app.use("/api/products", productsRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port :${PORT}`);
});
