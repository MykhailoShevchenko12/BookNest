import Order from "../models/Orders.js";
import User from "../models/User.js";
import Products from "../models/Products.js";
import { sendOrderEmail } from "./email.js";
import getNextOrderId from "../utills/genNextOrderId.js";

export const finalizeOrder = async (order) => {
  for (const item of order.items) {
    const product = await Products.findById(item.product._id);

    if (!product) {
      throw new Error(`Товар "${item.product.title}" не знайдений на складі.`);
    }

    if (product.quantity < item.quantity) {
      throw new Error(
        `На складі недостатньо товару "${item.product.title}". В наявності: ${product.quantity}, замовлено: ${item.quantity}.`
      );
    }
  }

  // Якщо всі перевірки пройшли, списуємо кількість товарів
  for (const item of order.items) {
    const product = await Products.findById(item.product._id);
    product.quantity -= item.quantity;
    await product.save();
  }

  await User.findByIdAndUpdate(order.userId, { cartData: {} });
  await sendOrderEmail(order.address.email, order.orderId);
};

export const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;

    // Спочатку перевіряємо наявність товарів
    for (const item of items) {
      const product = await Products.findById(item.product._id);

      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Товар "${item.product.title}" не знайдений на складі.`,
        });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Недостатньо книг "${item.product.title}" на складі.`,
        });
      }
    }

    // Якщо всі перевірки пройшли, створюємо замовлення
    const orderId = await getNextOrderId();

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Оплата при отриманні товару",
      payment: "Неоплачено",
      date: Date.now(),
      orderId,
      status: "Очікує підтвердження",
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    // Тепер списуємо товар зі складу
    for (const item of items) {
      const product = await Products.findById(item.product._id);
      product.quantity -= item.quantity;
      await product.save();
    }

    await User.findByIdAndUpdate(userId, { cartData: {} });
    await sendOrderEmail(address.email, orderId);

    res.json({
      success: true,
      message: "Зроблено замовлення",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Виникла помилка при оформленні замовлення",
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
