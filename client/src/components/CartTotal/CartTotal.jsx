import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectCartTotalQuantity,
  selectCartTotalPrice,
  fetchCart,
} from "../../redux/features/cartSlice";
import "./CartTotal.css";

export const CartTotal = () => {
  const dispatch = useDispatch();
  const totalBookCount = useSelector(selectCartTotalQuantity);
  const cartTotal = useSelector(selectCartTotalPrice);
  const status = useSelector((state) => state.cart.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCart());
    }
  }, [status, dispatch]);

  // Перевірка статусу перед рендером
  if (status === "loading") {
    return <p>Завантаження...</p>;
  }

  return (
    <div className="carttotal">
      <h2>Підсумок вашого кошику:</h2>
      <div className="carttotal-items">
        <p>
          Кількість книг: <strong>{totalBookCount}</strong>
        </p>
        <p>Вартість доставки залежить від тарифів перевезника.</p>
        <p>
          Загальна сума до сплати: <strong>{cartTotal}₴</strong>
        </p>
      </div>
    </div>
  );
};
