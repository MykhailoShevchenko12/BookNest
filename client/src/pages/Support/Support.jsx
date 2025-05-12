import React, { useState } from "react";
import { toast } from "sonner";
import axios from "../../utills/axios";

import "./Support.css";
import { Accordion } from "../../components/Q&A/Accordion";

export const Support = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handlSubmit = async () => {
    if (!email || !message) {
      toast.warning("Будь ласка, заповніть всі поля");
      return;
    }

    if (!email || !email.includes("@")) {
      toast.warning("Будь ласка, введіть коректну адресу електронної пошти.");
      return;
    }

    try {
      await axios.post("/email/appeal", {
        userEmail: email,
        message,
      });
      setEmail("");
      setMessage("");
      toast.success("Ваше звернення надіслано!");
    } catch (error) {
      console.error(error);
      toast.error("Сталася помилка при надсиланні звернення.");
    }
  };

  return (
    <div className="main-container">
      <div className="support-main">
        <div className="support-container">
          <h2>Служба підтримки</h2>
          <p>
            Ми завжди раді допомогти! Якщо у вас виникли питання або проблеми з
            вашим замовленням, звертайтесь до нас.
          </p>
          <div className="accordion-faq">
            <Accordion
              title="Доставка та оплата"
              answer={
                <div className="delivery-and-payment">
                  <p>
                    {" "}
                    Ми доставляємо книги по всій Україні за допомогою
                    перевірених служб доставки, таких як Нова Пошта.
                  </p>{" "}
                  <p>
                    Стандартний термін доставки —{" "}
                    <strong>1–3 робочих дні</strong> після підтвердження
                    замовлення.
                  </p>{" "}
                  <p>
                    Вартість доставки: <strong>Від 69 грн</strong> — залежить
                    від регіону та ваги замовлення.
                  </p>{" "}
                  <p>
                    Оплата: <strong>Онлайн-оплата</strong> банківською карткою.{" "}
                    <strong>Накладений платіж</strong> при отриманні (з
                    додатковою комісією згідно тарифів перевізника).
                  </p>
                </div>
              }
            />
            <Accordion
              title="Повернення замовлення"
              answer={
                <div className="delivery-and-payment">
                  <p>
                    {" "}
                    Якщо ви отримали не той товар, або він має пошкодження — ми
                    гарантуємо безкоштовну заміну або повернення коштів.
                  </p>{" "}
                  <p>
                    Повернення можливе{" "}
                    <strong>протягом 14 днів з моменту отримання</strong>,
                    згідно з Законом України «Про захист прав споживачів».
                  </p>{" "}
                  <p>Умови повернення:</p>
                  <li>Книга не була у вжитку та збережено товарний вигляд.</li>
                  <li>Маєте чек або інше підтвердження покупки.</li>
                  <p>
                    Щоб оформити повернення — напишіть нам на пошту або у форму
                    звернення. Ми відповімо протягом одного робочого дня.
                  </p>
                </div>
              }
            />
            <Accordion
              title="Політика конфіденційності"
              answer={
                <div className="delivery-and-payment">
                  <p>
                    {" "}
                    Ваші персональні дані —{" "}
                    <strong>під надійним захистом</strong>.
                  </p>{" "}
                  <p>
                    Ми не передаємо ваші контактні дані третім особам, окрім
                    випадків, передбачених законодавством України.
                  </p>{" "}
                  <p>Збираємо лише ту інформацію, яка необхідна для:</p>
                  <li>оформлення та доставки замовлень;</li>
                  <li>зворотного зв’язку;</li>
                  <li>
                    надсилання рекомендацій (<strong>за вашою згодою</strong>).
                  </li>
                  <p>
                    Ви маєте право будь-коли переглянути, змінити або видалити
                    свої персональні дані, звернувшись до служби підтримки.
                  </p>
                </div>
              }
            />
            <Accordion title="Контактна інформація" answer="0660054160" />
          </div>
          <div className="support-form">
            <h3>Якщо у вас є запитання ви можете надіслати його нам!</h3>
            <div className="support-form-question">
              <input
                type="email"
                className="support-email-input"
                placeholder="Введіть свою поштову скриньку"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p>Введіть тему звернення:</p>
              <textarea
                type="text"
                className="question-text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={handlSubmit}>Відправити</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
