import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const sendOrderEmail = async (email, orderId) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // або інший
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Магазин BOOKNEST",
      text: `Замовлення №${orderId} було прийняте. 
      Найближчим часом менеджер з вами зв'яжеться для підтвердження замовлення. 
      Дякуємо за покупку!`,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Помилка при надсиланні email:", err);
  }
};

export const emailSend = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Магазин BOOKNEST: Рекомендовані книги для вас 📚!",
      text: "Привіт! Дякуємо, що підписалися. Скоро ви отримаєте наші найкращі книжкові рекомендації!",
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Лист успішно відправлено!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Помилка при надсиланні листа" });
  }
};

export const emailAppeal = async (req, res) => {
  const { userEmail, message } = req.body;

  if (!userEmail || !message) {
    return res
      .status(400)
      .json({ message: "Email та повідомлення обов'язкові" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: userEmail,
      to: process.env.EMAIL_USER,
      subject: `Звернення від користувача ${userEmail}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Звернення успішно надіслане!" });
  } catch (err) {
    console.error("Помилка при надсиланні:", err);
    res.status(500).json({ message: "Помилка при надсиланні листа" });
  }
};
