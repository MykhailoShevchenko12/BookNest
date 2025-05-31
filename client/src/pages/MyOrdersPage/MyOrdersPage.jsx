import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchOrders } from "../../redux/features/ordersSlice";
import "./MyOrdersPage.css";

export const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) return <p>Завантаження замовлень...</p>;
  if (error) return <p>Помилка: {error}</p>;

  // 🛡 Перевірка, чи orders — це масив
  const isOrdersArray = Array.isArray(orders);

  return (
    <div className="myorders">
      <h2>Ваші замовлення</h2>

      {!isOrdersArray || orders.length === 0 ? (
        <p>Ви ще не зробили жодного замовлення.</p>
      ) : (
        [...orders].reverse().map((order) => (
          <div
            key={order._id}
            className={`myorders-items ${
              order.status === "Отримано" ? "order-received" : ""
            }`}
          >
            <div className="customer-info">
              <div className="recipient-info">
                <p>Номер замовлення: {order.orderId}</p>
                <p>
                  Дата створення замовлення:{" "}
                  {new Date(order.date).toLocaleDateString()}
                </p>
                <p>
                  Ім'я отримувача: {order.address?.lastName}{" "}
                  {order.address?.firstName} {order.address?.middleName}
                </p>
                <p>Номер телефону: {order.address?.phoneNumber}</p>
                <p>Місто отримувача: {order.address?.city}</p>
                <p>
                  Пункт видачі: {order.address?.deliveryType} №
                  {order.address?.deliveryNumber}
                </p>
              </div>
              <div className="customer-order-info">
                <p>Книги:</p>
                {Array.isArray(order.items) && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <p key={index}>
                      {item.title} ({item.quantity} шт.)
                    </p>
                  ))
                ) : (
                  <p>У замовленні немає книг.</p>
                )}
                <p>
                  Кількість книг у замовленні:{" "}
                  {Array.isArray(order.items)
                    ? order.items.reduce((acc, item) => acc + item.quantity, 0)
                    : 0}
                </p>
              </div>
              <div className="customer-order-status">
                <p>Статус замовлення:</p>
                <div>{order.status}</div>
                {order.paymentMethod === "Оплатити карткою" &&
                  order.payment && (
                    <>
                      <p>Статус оплати:</p>
                      <div>{order.payment}</div>
                    </>
                  )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
