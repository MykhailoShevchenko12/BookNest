import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Cart.css";
import removeFromCart_icon from "../../images/removefromcart.png";
import { CartTotal } from "../../components/CartTotal/CartTotal";
import {
  fetchCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../redux/features/cartSlice";
import { resetOrderState } from "../../redux/features/ordersSlice";

export const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items); // отримуємо товари кошика з Redux
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart()); // Завантажуємо кошик при завантаженні компонента
  }, [dispatch]);

  const handleRemove = async (productId) => {
    await dispatch(removeFromCart(productId));
    dispatch(fetchCart()); // заново оновлюємо кошик
  };

  const handleProceedToOrder = async () => {
    await dispatch(resetOrderState());
    navigate("/order");
  };
  const handleGoBack = () => {
    navigate(-1);
  };

  if (!Array.isArray(cart) || cart.length === 0) {
    return (
      <div className="cart">
        <div className="cart-header">
          <h1>Ваш кошик порожній</h1>
          <Link
            to={"/products"}
            style={{
              textDecoration: "none",
              color: "#222",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            <p>Погляньте, що ми для вас приготували!</p>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="cart">
      <div className="cart-header">
        <h1>Ваш кошик 📖</h1>
      </div>
      <hr />
      <div className="cart-items">
        {cart.map((item, index) => (
          <div key={item.product._id || index}>
            <div className="cart-items cart-item">
              <img
                src={`http://localhost:3002${item.product.imageUrl}`}
                alt="Зображення"
                className="items-image"
              />
              <div className="cart-items-title">{item.product.title}</div>
              <div className="cart-items-quantity">
                <button
                  onClick={() => {
                    if (item.quantity === 1) {
                      handleRemove(item.product._id);
                    } else {
                      dispatch(decrementQuantity(item.product._id));
                    }
                  }}
                >
                  -
                </button>
                <p>{item.quantity}</p>
                <button
                  onClick={() => {
                    dispatch(incrementQuantity(item.product._id));
                  }}
                >
                  +
                </button>
              </div>
              <p>{item.product.price}₴</p>
              <img
                src={removeFromCart_icon}
                alt="Видалити з кошика"
                className="removefromcart-icon"
                onClick={() => handleRemove(item.product._id)}
              />
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div className="cart-total">
        <CartTotal />

        <div className="cart-buttons">
          <button onClick={handleProceedToOrder} className="cart-order">
            Перейти до оформлення замовлення
          </button>
          <button onClick={handleGoBack} className="cart-return-btn">
            Повернутись назад
          </button>
        </div>
      </div>
    </div>
  );
};
