import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BookList.css";
import edit_icon from "../../assets/editIcon.png";
import remove_icon from "../../assets/removeIcon.png";

const BookList = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:3002/api/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch(`http://localhost:3002/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };
  return (
    <div className="list-product">
      <h1>Перелік всіх книг</h1>
      <div className="listproduct-format-main">
        <div className="listproduct-format-main-book">Книги</div>
        <div className="listproduct-format-main-title">Назва</div>
        <div className="listproduct-format-main-category">Категорія</div>
        <div className="listproduct-format-main-price">Ціна</div>
        <div className="listproduct-format-main-edit">Редагувати</div>
        <div className="listproduct-format-main-remove">Видалити</div>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product) => (
          <div
            key={product._id}
            className="listproduct-format-main listproduct-format"
          >
            <img
              src={`http://localhost:3002${product.imageUrl}`}
              alt=""
              className="listproduct-product-icon"
            />
            <div className="listproduct-format-title">{product.title}</div>
            <div className="listproduct-format-category">
              {product.category}
            </div>
            <div className="listproduct-format-price">₴{product.price}</div>
            <Link to={`/editbook/${product._id}`}>
              <img className="listproduct-edit-icon" src={edit_icon} alt="" />
            </Link>
            <img
              onClick={() => {
                removeProduct(product._id);
              }}
              className="listproduct-remove-icon"
              src={remove_icon}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
