import { Router } from "express";
import { register, login, getMe } from "../controllers/auth.js";
import { checkAuth } from "../utills/checkAuth.js";

const router = new Router();

//Реєстрація користувача
//http://localhost:3002/api/auth/register
router.post("/register", register);

//Авторизація користувача
//http://localhost:3002/api/auth/login
router.post("/login", login);

//GetMe
//http://localhost:3002/api/auth/me
router.get("/me", checkAuth, getMe);

export default router;
