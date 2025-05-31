import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { registerUser, checkIsAuth } from "../../redux/features/authSlice";
import "./RegisterPage.css";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { status } = useSelector((state) => state.auth);

  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status && status !== "") {
      toast.success(status);
    }
    if (isAuth) {
      navigate("/");
    }
  }, [status, isAuth, navigate]);

  const handlSubmit = () => {
    try {
      dispatch(registerUser({ username, password, email }));
      setPassword("");
      setUsername("");
      setEmail("");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="register-main">
        <h1>Ласкаво просимо до нашого інтернет-магазину!🛍️</h1>
        <h2>
          Зареєструйтесь сьогодні та відкрийте для себе світ вигідних покупок:
        </h2>
        <div className="register-inputs">
          <p>Створення облікового запису</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введіть своє ім'я"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введіть свою поштову скриньку"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Придумайте пароль"
          />
        </div>
        <div className="register-buttons">
          <button onClick={handlSubmit}>Створити</button>
          <Link to="/login" style={{ textDecoration: "none", color: "#222" }}>
            Вже є обліковий запис?
          </Link>
        </div>
        <div className="register-text">
          <p>
            Шановний користувачу, реєструючись на нашому сайті, ви надаєте згоду
            на обробку ваших персональних даних згідно з чинним законодавством.
          </p>
          <ul>
            Ваші дані можуть використовуватися для таких цілей:
            <li>
              Забезпечення функціонування вашого акаунту та доступу до послуг.
            </li>
            <li>
              Надання актуальної інформації про замовлення, знижки та
              пропозиції.
            </li>
            <li>Поліпшення роботи нашого сервісу шляхом аналізу даних.</li>
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
            📌 Детальніше ознайомитися з нашою Політикою конфіденційності ви
            можете за посиланням:
            <Link className="privacyPolicy">Політика конфіденційності.</Link>
          </p>
        </div>
      </div>
    </form>
  );
};
