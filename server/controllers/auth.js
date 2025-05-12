import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Реєстрація користувача
//http://localhost:3002/api/auth/register
export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    //Username
    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.json({
        message: "Цей користувач вже існує.",
      });
    }

    if (!username) {
      return res.json({
        message: "Будь ласка вигадайте ім`я користувача.",
      });
    }

    //Password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    if (!password) {
      return res.json({
        message: "Будь ласка вигадайте пароль.",
      });
    }

    //Email
    const isEmailUsed = await User.findOne({ email });

    if (isEmailUsed) {
      return res.json({
        message: "Користувач з цією поштою вже існує.",
      });
    }

    if (!email) {
      return res.json({
        message: "Будь ласка вкажіть електронну пошту.",
      });
    }

    //Створюємо нового користувача, токен та зберігаємо його.
    const newUser = new User({
      username,
      password: hash,
      email,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    await newUser.save();

    res.json({
      token,
      newUser,
      message: "Реєстрація пройшла успішно.",
    });
  } catch (error) {
    res.json({
      message: "Помилка при створенні користувача.",
    });
  }
};
//Авторизація користувача
//http://localhost:3002/api/auth/login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        message: "Такого користувача не існує.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({
        message: "Неправельний пароль.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      token,
      user,
      message: "Ви увійшли.",
    });
  } catch (error) {
    res.json({
      message: "Помилка при авторизації.",
    });
  }
};
//GetMe
//http://localhost:3002/api/auth/me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({
        message: "Такого користувача не існує.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.json({
      message: "Немає доступу.",
    });
  }
};
