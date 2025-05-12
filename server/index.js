import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import path from "path";

import authRoute from "./routs/auth.js";
import productsRoute from "./routs/products.js";
import cartRoute from "./routs/cart.js";
import orderRoute from "./routs/orders.js";
import paymentRoute from "./routs/payment.js";
import emailRoute from "./routs/email.js";
import Counter from "./models/Counter.js";

const app = express();
dotenv.config();

//Змінні
const PORT = process.env.PORT || 3001;
const DB_NAME = process.env.DB_NAME;

//MiddleWare
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Роути
app.use("/api/auth", authRoute);
app.use("/api/products", productsRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/email", emailRoute);

const initializeCounter = async () => {
  const existingCounter = await Counter.findOne({ id: "orderId" });
  if (!existingCounter) {
    await Counter.create({ id: "orderId", seq: 0 });
  } else {
    console.log("Counter already exists.");
  }
};

//Підключення та старт серверу
async function start() {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`);

    await initializeCounter();

    app.listen(PORT, () =>
      console.log(`Server has been started on port: ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
}
start();
