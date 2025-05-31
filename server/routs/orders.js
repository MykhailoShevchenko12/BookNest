import { Router } from "express";
import { checkAuth } from "../utills/checkAuth.js";
import {
  allOrders,
  placeOrder,
  updateOrderStatus,
  userOrders,
} from "../controllers/orders.js";

const router = new Router();

router.get("/list", allOrders);

router.patch("/status/:orderId", updateOrderStatus);

router.post("/place", checkAuth, placeOrder);

router.get("/userorders", checkAuth, userOrders);

export default router;
