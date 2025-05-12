import React from "react";
import "./Slidebar.css";
import { Link } from "react-router-dom";

import add_book_icon from "../../assets/plus-icon-2048x2048-z6v59bd6.png";
import list_book from "../../assets/listimg.png";
import orders_icon from "../../assets/orders.png";

const Slidebar = () => {
  return (
    <div className="slidebar">
      <Link
        to={"/addbook"}
        style={{ textDecoration: "none" }}
        className="slidebar-item"
      >
        <img src={add_book_icon} alt="" />
        <p>Додати книгу</p>
      </Link>
      <Link
        to={"/listbook"}
        style={{ textDecoration: "none" }}
        className="slidebar-item"
      >
        <img src={list_book} alt="" />
        <p>Налаштування каталогу</p>
      </Link>
      <Link
        to={"/orders"}
        style={{ textDecoration: "none" }}
        className="slidebar-item"
      >
        <img src={orders_icon} alt="" />
        <p>Обробка замовлень</p>
      </Link>
    </div>
  );
};

export default Slidebar;
