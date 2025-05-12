import { Router } from "express";

import {
  addProduct,
  getProductById,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.js";

const router = new Router();

//Додати книгу
router.post("/add", addProduct);

//Отримання книги по id
router.get("/:id", getProductById);

//Отримання всіх книг
router.get("/", getProduct);

//Редагування книги
router.put("/:id", updateProduct);

//Видалення книги
router.delete("/:id", deleteProduct);

export default router;
