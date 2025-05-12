import mongoose from "mongoose";
import Product from "../models/Products.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      genres,
      pages,
      format,
      author,
      edition,
      price,
      quantity,
      imageUrl,
    } = req.body;
    const newProduct = new Product({
      title,
      description,
      category,
      genres,
      pages,
      format,
      author,
      edition,
      price,
      quantity,
      imageUrl,
    });
    if (req.files && req.files.image) {
      const fileName = `${Date.now().toString()}-${req.files.image.name}`;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      const uploadPath = path.join(__dirname, "..", "uploads", fileName);

      await req.files.image.mv(uploadPath);

      newProduct.imageUrl = `/uploads/${fileName}`;
    }
    await newProduct.save();

    res.json({ _id: newProduct._id, message: "Книга успішно створена" });
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Некоректний ідентифікатор" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Книга не знайдена" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { category, genre, price } = req.query; // Отримуємо фільтри з запиту

    // Формуємо умови для пошуку
    let filter = {};

    if (category) {
      filter.category = { $in: category.split(",") }; // Якщо категорія, фільтруємо за масивом
    }

    if (genre) {
      filter.genres = { $in: genre.split(",") }; // Якщо жанр, фільтруємо за масивом
    }

    if (price) {
      const [minPrice, maxPrice] = price.split(",").map(Number);
      filter.price = { $gte: minPrice, $lte: maxPrice }; // Фільтруємо за ціною
    }

    // Отримуємо продукти з фільтрацією
    const products = await Product.find(filter);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не вдалося отримати продукти" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      category,
      genres,
      pages,
      format,
      author,
      edition,
      price,
      quantity,
    } = req.body;

    // Знайти існуючий продукт
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Продукт не знайдено" });
    }

    // Оновлення даних продукту
    product.title = title || product.title;
    product.description = description || product.description;
    product.category = category || product.category;
    product.genres = genres || product.genres;
    product.pages = pages || product.pages;
    product.format = format || product.format;
    product.author = author || product.author;
    product.edition = edition || product.edition;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;

    // Якщо є нове зображення
    if (req.files && req.files.image) {
      const imageFile = req.files.image;

      // Генеруємо унікальне ім'я файлу
      const fileName = `${Date.now()}-${imageFile.name}`;

      // Шлях для збереження файлу
      const uploadPath = path.join(path.resolve(), "uploads", fileName);

      // Збереження файлу на сервері
      await imageFile.mv(uploadPath);

      // Оновлення шляху до зображення
      product.imageUrl = `/uploads/${fileName}`;
    }

    // Збереження змін у базі даних
    await product.save();

    res.json({ message: "Продукт успішно оновлено", product });
  } catch (error) {
    console.error("Помилка оновлення продукту:", error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await Product.deleteOne({ _id: productId });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product", error });
  }
};
