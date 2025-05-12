import Order from "../models/Orders.js";
import User from "../models/User.js";
import Products from "../models/Products.js";
import { sendOrderEmail } from "./email.js";
import getNextOrderId from "../utills/genNextOrderId.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;

    const orderId = await getNextOrderId();

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Оплата при отриманні товару",
      payment: false,
      date: Date.now(),
      orderId,
      status: "Очікує підтвердження",
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    console.log("ORDER ITEMS:", items);

    for (const item of items) {
      const product = await Products.findById(item.product._id);

      if (product) {
        // Перевіряємо, чи достатньо книг на складі
        if (product.quantity >= item.quantity) {
          product.quantity -= item.quantity;
          await product.save();
        } else {
          return res.status(400).json({
            success: false,
            message: `Недостатньо книг "${product.title}" в наявності`,
          });
        }
      }
    }

    await User.findByIdAndUpdate(userId, { cartData: {} });
    await sendOrderEmail(address.email, orderId);

    res.json({
      success: true,
      message: "Зроблено замовлення",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//All orders data for admin panel
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    for (let order of orders) {
      for (let item of order.items) {
        const product = await Products.findById(item.product._id);
        if (product) {
          item.quantityInStock = product.quantity; // Додаємо кількість книги
        }
      }
    }

    res.json({
      success: true,
      orders,
    });
  } catch {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//User order data for client
export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId });

    // Перевіряємо, чи є замовлення
    if (!orders || orders.length === 0) {
      return res.json({
        success: false,
        message: "Ви ще не зробили жодного замовлення.",
      });
    }

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//update order status from admin panel
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params; // Отримуємо orderId з параметрів URL
    const { status } = req.body; // Статус передається в тілі запиту

    await Order.findByIdAndUpdate(orderId, { status });

    res.json({
      success: true,
      message: "Статус оновлено",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
