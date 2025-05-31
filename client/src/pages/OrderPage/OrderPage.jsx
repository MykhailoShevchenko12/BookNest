import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import "./OrderPage.css";
import { CartTotal } from "../../components/CartTotal/CartTotal";
import { placeOrder, resetOrderState } from "../../redux/features/ordersSlice";
import {
  clearCart,
  selectCartTotalPrice,
} from "../../redux/features/cartSlice"; // якщо є така дія

export const OrderPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector(selectCartTotalPrice);
  const { loading, success, error } = useSelector((state) => state.orders);
  const userId = useSelector((state) => state.auth.user?._id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    email: "",
    phoneNumber: "",
    city: "",
    branch: "",
    postomat: "",
    paymentMethod: "Оплата при отриманні товару",
  });

  const [showBranchInput, setShowBranchInput] = useState(false);
  const [showPostomatInput, setShowPostomatInput] = useState(false);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBranchClick = () => {
    setShowBranchInput(!showBranchInput);
    setShowPostomatInput(false);
    setFormData((prev) => ({ ...prev, postomat: "" }));
  };

  const handlePostomatClick = () => {
    setShowPostomatInput(!showPostomatInput);
    setShowBranchInput(false);
    setFormData((prev) => ({ ...prev, branch: "" }));
  };

  const handlePaymentChange = (e) => {
    const selectedMethod =
      e.target.id === "payment-method-cash"
        ? "Оплата при отриманні товару"
        : "Оплатити карткою";
    setFormData((prev) => ({ ...prev, paymentMethod: selectedMethod }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("Необхідно увійти в систему для оформлення замовлення");
      return;
    }

    const address = {
      lastName: formData.lastName,
      firstName: formData.firstName,
      middleName: formData.middleName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      city: formData.city,
      deliveryType: showBranchInput
        ? "Нова Пошта: відділення"
        : "Нова Пошта: поштомат",
      deliveryNumber: showBranchInput ? formData.branch : formData.postomat,
    };

    if (formData.paymentMethod === "Оплата при отриманні товару") {
      dispatch(placeOrder({ items, amount: totalAmount, address, userId }));
    } else {
      try {
        const res = await fetch(
          "http://localhost:3002/api/payment/create-payment",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: totalAmount,
              description: "Оплата книг",
              items,
              address,
              userId,
            }),
          }
        );

        if (!res.ok) {
          const errorData = await res.json(); // отримати JSON
          throw new Error(errorData.message || "Помилка при створенні платежу");
        }

        const { data, signature } = await res.json();

        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://www.liqpay.ua/api/3/checkout";
        form.target = "_self";

        const inputData = document.createElement("input");
        inputData.type = "hidden";
        inputData.name = "data";
        inputData.value = data;

        const inputSignature = document.createElement("input");
        inputSignature.type = "hidden";
        inputSignature.name = "signature";
        inputSignature.value = signature;

        form.appendChild(inputData);
        form.appendChild(inputSignature);
        document.body.appendChild(form);
        form.submit();
      } catch (err) {
        toast.error(err.message || "Помилка при створенні платежу");
        console.error("Payment error:", err);
      }
    }
  };

  useEffect(() => {
    dispatch(resetOrderState());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success("Замовлення успішно оформлено!");
      dispatch(resetOrderState());
      dispatch(clearCart());
      navigate("/myorders");
    }
  }, [success, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <form className="order" onSubmit={handleSubmit}>
      <h2>Оформлення замовлення</h2>
      <div className="page-info">
        <div className="left-side">
          <div className="order-info">
            <p>Інформація про отримувача</p>
            <div className="user-info">
              <input
                type="text"
                placeholder="Прізвище"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                placeholder="Ім'я"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                placeholder="По Батькові"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
              />
            </div>
            <p>Контактна інформація</p>
            <div className="user-info">
              <input
                type="email"
                placeholder="Поштова скринька"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                placeholder="Номер телефону"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <p>Місто отримувача</p>
            <div className="delivery-info">
              <input
                type="text"
                placeholder="Назва міста"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <p>Доставка</p>
            <div className="post-info">
              <button type="button" onClick={handleBranchClick}>
                Нова Пошта: відділення
              </button>
              {showBranchInput && (
                <input
                  type="number"
                  name="branch"
                  placeholder="№ відділення"
                  value={formData.branch}
                  onChange={handleInputChange}
                  required
                />
              )}
              <button type="button" onClick={handlePostomatClick}>
                Нова Пошта: поштомат
              </button>
              {showPostomatInput && (
                <input
                  type="number"
                  name="postomat"
                  placeholder="№ поштомат"
                  value={formData.postomat}
                  onChange={handleInputChange}
                  required
                />
              )}
            </div>
            <p>Спосіб оплати</p>
            <div className="payment-method">
              <label htmlFor="payment-method-cash">
                <input
                  type="radio"
                  id="payment-method-cash"
                  name="payment-method"
                  checked={
                    formData.paymentMethod === "Оплата при отриманні товару"
                  }
                  onChange={handlePaymentChange}
                />
                <p>Оплата при отриманні товару</p>
              </label>
              <label htmlFor="payment-method-card">
                <input
                  type="radio"
                  id="payment-method-card"
                  name="payment-method"
                  checked={formData.paymentMethod === "Оплатити карткою"}
                  onChange={handlePaymentChange}
                />
                <p>Оплатити карткою</p>
              </label>
            </div>
          </div>
        </div>
        <div className="order-cart-total right-side">
          <CartTotal />
          <button type="submit" disabled={loading}>
            {loading ? "Оформлення..." : "Підтвердити замовлення"}
          </button>
        </div>
      </div>
      <div className="order-warning">
        <p>
          *Ваші особисті дані, включаючи ім'я, адресу, контактну інформацію та
          платіжні реквізити, збираються та обробляються виключно з метою
          виконання вашого замовлення...
        </p>
      </div>
    </form>
  );
};
