import Cart from "../models/Cart.js";
import Product from "../models/Products.js";
import User from "../models/User.js";

const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.userId }).populate(
    "items.product"
  );
  res.json(cart || { items: [] });
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const user = await User.findById(req.userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res
        .status(404)
        .json({ message: "Користувача або книгу не знайдено" });
    }

    let cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      // створити новий кошик
      cart = new Cart({
        userId: req.userId,
        username: user.username,
        items: [{ product: product._id, title: product.title, quantity }],
      });
    } else {
      // перевірити, чи вже є ця книга
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          product: product._id,
          title: product.title,
          quantity,
        });
      }
    }

    await cart.save();
    res.json({ items: cart.items });
  } catch (err) {
    console.error("Помилка при додаванні в кошик:", err);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const cart = await Cart.findOne({ userId: req.userId });

  if (cart) {
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    await cart.save();
    res.json(cart);
  } else {
    res.status(404).json({ message: "Cart not found" });
  }
};

const incrementQuantity = async (req, res) => {
  const { productId } = req.params;
  const cart = await Cart.findOne({ userId: req.userId });

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find((item) => item.product.toString() === productId);

  if (item) {
    item.quantity += 1;
    await cart.save();
    await cart.populate("items.product");
    res.json({ items: cart.items });
  } else {
    res.status(404).json({ message: "Product not found in cart" });
  }
};

const decrementQuantity = async (req, res) => {
  const { productId } = req.params;
  const cart = await Cart.findOne({ userId: req.userId });

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find((item) => item.product.toString() === productId);

  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      await cart.save();
      await cart.populate("items.product");
      res.json({ items: cart.items });
    } else {
      // Якщо кількість 1, можна видалити товар (або нічого не робити)
      res.status(400).json({ message: "Minimum quantity is 1" });
    }
  } else {
    res.status(404).json({ message: "Product not found in cart" });
  }
};

export {
  getCart,
  addToCart,
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
};
