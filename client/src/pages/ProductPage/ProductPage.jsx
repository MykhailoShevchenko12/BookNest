import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import axios from "../../utills/axios";
import "./ProductPage.css";
import { addToCart } from "../../redux/features/cartSlice";

export const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError("Не вдалося завантажити дані про книгу.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {}, [cartItems, navigate]);

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>{error}</div>;

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="main-container">
      <div className="productPage">
        <div className="productPage-block1">
          {product.imageUrl ? (
            <img
              src={`http://localhost:3002${product.imageUrl}`}
              alt={product.title}
              className="productImage"
            />
          ) : (
            <div className="noImage">Зображення відсутнє</div>
          )}
        </div>
        <div className="productText">
          <h1>
            {product.title} <hr />
          </h1>
          <div className="description">
            <span>Опис</span>
            <p>{product.description}</p>
          </div>
          <div className="specifications">
            <span>Характеристики</span>
            <div className="specificationsContent">
              <span>Категорія:</span>
              <div className="specificationItem"> {product.category}</div>
            </div>
            <div className="specificationsContent">
              <span>Жанр:</span>
              <div className="specificationItem"> {product.genres}</div>
            </div>
            <div className="specificationsContent">
              <span>Кількість сторінок:</span>
              <div className="specificationItem"> {product.pages}</div>
            </div>
            <div className="specificationsContent">
              <span>Формат:</span>
              <div className="specificationItem"> {product.format}</div>
            </div>
            <div className="specificationsContent">
              <span>Автор:</span>
              <div className="specificationItem"> {product.author}</div>
            </div>
            <div className="specificationsContent">
              <span>Видання:</span>
              <div className="specificationItem"> {product.edition}</div>
            </div>
          </div>
        </div>
        <div className="productButtons">
          <button
            onClick={() =>
              dispatch(addToCart({ productId: product._id, quantity: 1 }))
            }
            className="addToCart"
          >
            Додати до кошику
          </button>
          <button onClick={handleGoBack} className="returnToCatalog">
            Повернутись назад
          </button>
          <p> {product.price} ₴</p>
        </div>
      </div>
    </div>
  );
};
