import dotenv from "dotenv";
import crypto from "crypto";

import Counter from "../models/Counter.js";
import Orders from "../models/Orders.js";
import Products from "../models/Products.js";
import { finalizeOrder } from "./orders.js";

dotenv.config();

const public_key = process.env.public_key;
const privat_key = process.env.privat_key;

const getNextOrderId = async () => {
  const counter = await Counter.findOneAndUpdate(
    { id: "orderId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq.toString();
};

function base64(str) {
  return Buffer.from(str).toString("base64");
}

function sha1(str) {
  return crypto.createHash("sha1").update(str).digest();
}

function str_to_sign(str) {
  return base64(sha1(str));
}

const paymentMethod = async (req, res) => {
  try {
    const { amount, description, items, address, userId } = req.body;

    if (!userId) {
      return res.status(400).send("Необхідно передати userId");
    }

    for (const item of items) {
      const product = await Products.findById(item.product._id);
      if (!product) {
        return res
          .status(400)
          .json({ message: `Книга з ID ${item.product._id} не знайдена` });
      }
      if (product.quantity < item.quantity) {
        return res.status(400).json({
          message: `Недостатньо книг "${item.product.title}" на складі.`,
        });
      }
    }

    const orderId = await getNextOrderId();

    const newOrder = new Orders({
      items,
      address,
      amount,
      userId,
      orderId,
      date: new Date(),
      paymentMethod: "Оплатити карткою",
      status: "Очікує підтвердження",
    });

    await newOrder.save();

    const data = {
      public_key,
      version: "3",
      action: "pay",
      amount,
      currency: "UAH",
      description: description,
      order_id: orderId,
      sandbox: 1,
      result_url: "http://localhost:3000/myorders",
      server_url:
        "https://6ce2-194-156-251-227.ngrok-free.app/api/payment/callback",
    };

    const jsonData = JSON.stringify(data);
    const base64Data = base64(jsonData);
    const signature = str_to_sign(privat_key + base64Data + privat_key);

    res.json({ data: base64Data, signature });
  } catch (error) {
    console.error("Payment method error:", error);
    res.status(500).send("Помилка при створенні платежу");
  }
};

const liqpayCallback = async (req, res) => {
  try {
    const { data, signature } = req.body;

    const expectedSignature = str_to_sign(
      process.env.privat_key + data + process.env.privat_key
    );

    if (signature !== expectedSignature) {
      console.warn("Підпис НЕ співпадає!");
      return res.status(400).send("Невірний підпис");
    }

    const decodedData = JSON.parse(
      Buffer.from(data, "base64").toString("utf8")
    );

    if (decodedData.status === "success" || decodedData.status === "sandbox") {
      const orderId = decodedData.order_id;

      const order = await Orders.findOne({ orderId });

      if (!order) {
        return res.status(404).json({ message: "Замовлення не знайдено" });
      }

      order.payment = "Оплачено";
      await order.save();

      await finalizeOrder(order);

      return res
        .status(200)
        .json({ message: "Замовлення оплачено та оновлено" });
    } else {
      return res.status(400).json({ message: "Оплата неуспішна" });
    }
  } catch (error) {
    console.error("Callback error:", error);
    res.status(500).send("Помилка на сервері");
  }
};

export { paymentMethod, liqpayCallback };
