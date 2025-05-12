import { Router } from "express";
import { paymentMethod, liqpayCallback } from "../controllers/payment.js";

const router = new Router();

router.post("/create-payment", paymentMethod);

router.post("/callback", liqpayCallback);

export default router;
