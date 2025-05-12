import { Router } from "express";
import { checkAuth } from "../utills/checkAuth.js";
import {
  allOrders,
  placeOrder,
  updateOrderStatus,
  userOrders,
} from "../controllers/orders.js";

const router = new Router();

//Admin features
router.post("/list", allOrders);
router.patch("/status/:orderId", updateOrderStatus);

//Payment features
router.post("/place", checkAuth, placeOrder);
/*router.post('/privat', checkAuth, placeOrderPrivat)*/

router.get("/userorders", checkAuth, userOrders);

export default router;
