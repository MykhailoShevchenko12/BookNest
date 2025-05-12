import React, { useState } from "react";
import "./Orders.css";
import axios from "axios";
import { useEffect } from "react";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchOrderId, setSearchOrderId] = useState("");

  const fetchAllOrders = async () => {
    try {
      const respons = await axios.post(
        "http://localhost:3002/api/order/list",
        {},
        {}
      );

      if (respons.data.success) {
        const sortedOrders = respons.data.orders.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setOrders(sortedOrders);
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const newStatus = event.target.value;
      const response = await axios.patch(
        `http://localhost:3002/api/order/status/${orderId}`,
        { status: newStatus }
      );
      if (response.data.success) {
        fetchAllOrders();
        setFilterStatus("");
      } else {
        console.log("Помилка при оновленні статусу");
      }
    } catch (error) {
      console.log("Помилка:", error);
    }
  };

  const searchHandler = (event) => {
    setSearchOrderId(event.target.value);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus ? order.status === filterStatus : true;

    // Якщо searchOrderId порожній, то не фільтруємо за номером
    const matchesOrderId = searchOrderId
      ? order.orderId.toString().toLowerCase() === searchOrderId.toLowerCase()
      : true;

    return matchesStatus && matchesOrderId;
  });

  return (
    <div className="orders">
      <h1>Список замовлень</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Пошук за номером замовлення..."
          value={searchOrderId}
          onChange={searchHandler}
        />
      </div>

      <div className="order-pages">
        <button
          onClick={() => setFilterStatus("")}
          className={`orders-page-btn ${filterStatus === "" ? "active" : ""}`}
        >
          Всі
        </button>
        <button
          onClick={() => setFilterStatus("Очікує підтвердження")}
          className={`orders-page-btn ${
            filterStatus === "Очікує підтвердження" ? "active" : ""
          }`}
        >
          Очікує підтвердження
        </button>
        <button
          onClick={() => setFilterStatus("Комплектується")}
          className={`orders-page-btn ${
            filterStatus === "Комплектується" ? "active" : ""
          }`}
        >
          Комплектується
        </button>
        <button
          onClick={() => setFilterStatus("Відправленно")}
          className={`orders-page-btn ${
            filterStatus === "Відправленно" ? "active" : ""
          }`}
        >
          Відправленно
        </button>
        <button
          onClick={() => setFilterStatus("Доставленно")}
          className={`orders-page-btn ${
            filterStatus === "Доставленно" ? "active" : ""
          }`}
        >
          Доставлено
        </button>
        <button
          onClick={() => setFilterStatus("Отримано")}
          className={`orders-page-btn ${
            filterStatus === "Отримано" ? "active" : ""
          }`}
        >
          Отримано
        </button>
      </div>
      <div className="orders-container">
        {filteredOrders.map((order, index) => (
          <div key={index}>
            <div className="orders-item">
              <div className="orders-item-info">
                <h2>Замовлення № - {order.orderId}</h2>
                <div className="orders-item-info-block">
                  <span>Книги:</span>
                  <div className="block-items">
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return (
                          <p key={index}>
                            {item.title + " : " + item.quantity + "."}
                          </p>
                        );
                      } else {
                        return (
                          <p key={index}>
                            {item.title + " : " + item.quantity + ";"}
                          </p>
                        );
                      }
                    })}
                  </div>
                  <div className="orders-item-info-block">
                    <span>Отримувач:</span>
                    <div className="block-items">
                      <p>
                        Ім'я:{" "}
                        {order.address.lastName +
                          " " +
                          order.address.firstName +
                          " " +
                          order.address.middleName}
                      </p>
                      <div>
                        <p>Місто: {order.address.city + ","}</p>
                        <p>
                          Місце отримання: {order.address.deliveryType + ","}
                        </p>
                        <p>Номер: № {order.address.deliveryNumber + ","}</p>
                      </div>
                      <p>Номер телефону: {order.address.phoneNumber}</p>
                      <p>Поштова скринька: {order.address.email}</p>
                    </div>
                  </div>
                  <div className="orders-item-info-block">
                    <span>Деталі замовлення:</span>
                    <div className="block-items">
                      <p>
                        Кількість книг у замовленні:{" "}
                        {order.items.reduce(
                          (acc, item) => acc + item.quantity,
                          0
                        )}
                      </p>
                      <p>Спосіб оплати: {order.paymentMethod + ","}</p>
                      <p>
                        Статус оплати:{" "}
                        {order.paymentMethod === "Оплата при отриманні товару"
                          ? "Неоплачено"
                          : order.status}
                      </p>
                      <p>
                        Дата оформлення замовлення:{" "}
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                      <div>
                        {order.items.map((item, index) => {
                          return (
                            <div key={index}>
                              <p>
                                Залишок на складі:{" "}
                                {item.quantityInStock ?? "Не вказано"}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="orders-item-info-block">
                    <h2>Сума замовлення: {order.amount} ₴</h2>
                  </div>
                </div>
              </div>
              <div className="orders-item-status">
                <p>Статус замовлення:</p>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status || "Очікує підтвердження"}
                >
                  <option value="Очікує підтвердження">
                    Очікує підтвердження
                  </option>
                  <option value="Комплектується">Комплектується</option>
                  <option value="Відправленно">Відправленно</option>
                  <option value="Доставленно">Доставленно</option>
                  <option value="Отримано">Отримано</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
