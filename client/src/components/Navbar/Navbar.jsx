import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";

import { checkIsAuth, logout } from "../../redux/features/authSlice";
import {
  selectCartTotalQuantity,
  fetchCart,
  clearCart,
} from "../../redux/features/cartSlice";
import "./Navbar.css";
import main_logo from "../../images/logo.png";
import search_icon from "../../images/search.png";
import cart_icon from "../../images/buy.png";
import login1_icon from "../../images/login1.png";
import login2_icon from "../../images/login2.png";

export const Navbar = () => {
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const cartStatus = useSelector((state) => state.cart.status);
  const [isOpen, setOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const catalogRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const avatarRef = useRef(null);

  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(clearCart());
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate("/");
    toast.success("Ви вийшли!");
  };

  const handleClickOutside = (event) => {
    if (
      catalogRef.current &&
      !catalogRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (cartStatus === "idle") {
      // тільки коли статус кошика idle
      dispatch(fetchCart()); // завантаження кошика
    }
  }, [dispatch, cartStatus]);

  useEffect(() => {
    setMenuOpen(false);
  }, [isAuth]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);

  return (
    <div className="main-container">
      <div className="header">
        <div className="main-logo">
          <Link to="/">
            <img src={main_logo} alt="Logo" />
          </Link>
        </div>
        <div className="nav-pannel">
          <img src={search_icon} alt="seach" className="search-icon" />
          <div className="nav-links">
            <ul>
              <button
                className="catalog-btn"
                onClick={() => setOpen(!isOpen)}
                ref={buttonRef}
              >
                Каталог
              </button>
              <nav
                ref={catalogRef}
                className={`catalog ${isOpen ? "active" : ""}`}
              >
                <ul className="catalog-list">
                  <div className="list">
                    <Link className="categoryLink" to="/products/fiction">
                      Художня література
                    </Link>
                    <p>
                      <Link to="/products/fiction/novel">Роман</Link>
                      <Link to="/products/fiction/drama">Драма</Link>
                      <Link to="/products/fiction/comedy">Комедія</Link>
                      <Link to="/products/fiction/prose">Проза</Link>
                      <Link to="/products/fiction/poetry">Поезія</Link>
                      <Link to="/products/fiction/poem">Поема</Link>
                      <Link to="/products/fiction/fantasy">Фентезі</Link>
                      <Link to="/products/fiction/fantastic">Фантастика</Link>
                      <Link to="/products/fiction/play">П'єса</Link>
                      <Link to="/products/fiction/tragedy">Трагедія</Link>
                      <Link to="/products/fiction/thriller">Трилер</Link>
                      <Link to="/products/fiction/detective">Детективи</Link>
                      <Link to="/products/fiction/action">Бойовик</Link>
                    </p>
                  </div>
                </ul>
                <ul className="catalog-list">
                  <div className="list">
                    <Link className="categoryLink" to="/products/bussiness">
                      Фінанси та Економіка
                    </Link>
                    <p>
                      <Link to="/products/bussiness/accounting">
                        Бухгалтерія
                      </Link>
                      <Link to="/products/bussiness/economics">Економіка</Link>
                      <Link to="/products/bussiness/enterprise">
                        Підприємство
                      </Link>
                      <Link to="/products/bussiness/marketing">Маркетинг</Link>
                      <Link to="/products/bussiness/advertising">Реклама</Link>
                      <Link to="/products/bussiness/management">
                        Менеджмент
                      </Link>
                      <Link to="/products/bussiness/softskills">
                        SoftSkills
                      </Link>
                      <Link to="/products/bussiness/investments">
                        Інвестиції
                      </Link>
                      <Link to="/products/bussiness/trading">Трейдинг</Link>
                    </p>
                    <Link
                      className="categoryLink"
                      to="/products/computer-literature"
                    >
                      Комп'ютерна література
                    </Link>
                    <p>
                      <Link to="/products/computer-literature/technologies">
                        Технології
                      </Link>
                    </p>
                  </div>
                </ul>
                <ul className="catalog-list">
                  <div className="list">
                    <Link
                      className="categoryLink"
                      to="/products/self-development"
                    >
                      Саморозвиток
                    </Link>
                    <p>
                      <Link to="/products/self-development/nutrition">
                        Харчування
                      </Link>
                      <Link to="/products/self-development/sport">Спорт</Link>
                      <Link to="/products/self-development/meditation">
                        Медитація
                      </Link>
                      <Link to="/products/self-development/motivation">
                        Мотивація
                      </Link>
                      <Link to="/products/self-development/softskills">
                        SoftSkills
                      </Link>
                      <Link to="/products/self-development/money">Гроші</Link>
                    </p>
                    <div className="categoryLink">
                      <Link to="/products/law">Право</Link>
                      <Link to="/products/medicine">Медицина</Link>
                      <Link to="/products/science">Наука</Link>
                      <Link to="/products/history">Історія</Link>
                    </div>
                  </div>
                </ul>
                <ul className="catalog-list">
                  <div className="list">
                    <Link className="categoryLink" to="/products/psychology">
                      Психологія
                    </Link>
                    <p>
                      <Link to="/products/psychology/relationships">
                        Взаємовідносини
                      </Link>
                      <Link to="/products/psychology/child-psychology">
                        Дитяча психологія
                      </Link>
                      <Link to="/products/psychology/society">Суспільство</Link>
                      <Link to="/products/psychology/mental-health">
                        Психічне здоров'я
                      </Link>
                      <Link to="/products/psychology/applied-psychology">
                        Прикладна психологія
                      </Link>
                      <Link to="/products/psychology/psychotherapy">
                        Психотерапія
                      </Link>
                    </p>
                    <div className="categoryLink">
                      <Link to="/products/politics">Політика</Link>
                      <Link to="/products/leisure">Дозвілля</Link>
                      <Link to="/products/religion">Релігія</Link>
                      <Link to="/products/encyclopedias">Енциклопедії</Link>
                    </div>
                  </div>
                </ul>
                <ul className="catalog-list">
                  <div className="list">
                    <Link className="categoryLink" to="/products/philosophy">
                      Філософія
                    </Link>
                    <p>
                      <Link to="/products/philosophy/society">Суспільство</Link>
                      <Link to="/products/philosophy/state">Держава</Link>
                      <Link to="/products/philosophy/culture-studies">
                        Культурологія
                      </Link>
                    </p>
                  </div>
                </ul>
                <Link to="/products" className="allProductLink">
                  Всі книги →
                </Link>
              </nav>
              <Link to={"/about"}>Про нас</Link>
              <Link to={"/support"}>Q&A</Link>
            </ul>
          </div>
        </div>
        <div className="user-cart-login">
          <div className="user-cart">
            <Link to={"/cart"}>
              <img src={cart_icon} alt="cart" className="user-icons" />
            </Link>
            <div className="cart-count">{totalQuantity}</div>
          </div>
          <div className="user-login">
            {isAuth ? (
              <>
                <img
                  src={login1_icon}
                  alt="user"
                  className="user-icons"
                  onClick={() => setMenuOpen(!isMenuOpen)}
                  ref={avatarRef}
                  style={{ cursor: "pointer" }}
                />
                {isMenuOpen && (
                  <div className="user-menu" ref={menuRef}>
                    <Link
                      to="/myorders"
                      className="user-menu-item"
                      onClick={() => setMenuOpen(false)}
                    >
                      <p>Мої замовлення</p>
                    </Link>
                    <button
                      className="user-menu-item logout-btn"
                      onClick={logoutHandler}
                    >
                      <p>Вийти</p>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link to={"/login"}>
                  <img src={login2_icon} alt="user" className="user-icons" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
