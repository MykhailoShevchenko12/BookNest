import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./LoginPage.css";
import { checkIsAuth, loginUser } from "../../redux/features/authSlice";
import { fetchCart } from "../../redux/features/cartSlice";
import { toast } from "sonner";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      toast.success(status);
    }
    if (isAuth) {
      dispatch(fetchCart());
      navigate("/");
    }
  }, [status, isAuth, navigate, dispatch]);

  const handlSubmit = () => {
    try {
      dispatch(loginUser({ username, password }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="main-container">
      <div className="login-main">
        <h1>
          Авторизуйтесь, щоб переглянути свої замовлення, улюблені книги та
          рекомендації!👤
        </h1>
        <div className="login-inputs">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введіть свій username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введіть пароль"
          />
        </div>
        <div className="login-buttons">
          <button onClick={handlSubmit}>Увійти</button>
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "#222" }}
          >
            Потрібно зареєструватися?
          </Link>
        </div>
        <div className="login-text">
          <ul>
            Увійдіть до свого акаунту, щоб продовжити мандри у світ літератури
            та скористатися всіма перевагами нашого магазину:
            <li>🛒 Легке керування замовленнями.</li>
            <li>💖 Збереження улюблених книжкових добірок.</li>
            <li>🎁 Спеціальні пропозиції та знижки для постійних клієнтів.</li>
          </ul>
          <ul>
            Ми зобов’язуємось:
            <li>
              Захищати вашу інформацію за допомогою сучасних технологій безпеки.
            </li>
            <li>
              Не передавати ваші дані третім особам без вашої згоди, окрім
              випадків, передбачених законом.
            </li>
            <li>
              Надавати вам можливість оновлювати або видаляти свої дані на
              запит.
            </li>
          </ul>
          <p>
            🎉 Новий користувач? Створіть акаунт за кілька хвилин і відкрийте
            для себе безмежний книжковий світ:{" "}
            <Link to="/register">Зареєструватися</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};
