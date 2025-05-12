import { Router } from "express";

import {
  getCart,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../controllers/cart.js";
import { checkAuth } from "../utills/checkAuth.js";

const router = new Router();

router.get("/getCart", checkAuth, getCart);

router.post("/addToCart", checkAuth, addToCart);

router.delete("/removeFromCart/:productId", checkAuth, removeFromCart);

router.patch("/increment/:productId", checkAuth, incrementQuantity);

router.patch("/decrement/:productId", checkAuth, decrementQuantity);

export default router;
