import { Router } from "express";

import { emailAppeal, emailSend } from "../controllers/email.js";

const router = new Router();

router.post("/send", emailSend);
router.post("/appeal", emailAppeal);

export default router;
