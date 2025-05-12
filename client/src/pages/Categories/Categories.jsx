import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";

import "../ProductListPage/ProductListPage.css";
import { BookItem } from "../../components/BookItem/BookItem";

export const Categories = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 50;

  const location = useLocation();
  const { category } = useParams(); // Отримуємо категорію з URL

  const categoryMapping = useMemo(
    () => ({
      fiction: "Художня література",
      business: "Фінанси та Економіка",
      bussiness: "Фінанси та Економіка",
      technology: "Комп'ютерна література", // змінено на українську версію
      "self-development": "Саморозвиток",
      "computer-literature": "Комп'ютерна література",
      psychology: "Психологія",
      law: "Право",
      medicine: "Медицина",
      science: "Наука",
      history: "Історія",
      politics: "Політика",
      leisure: "Дозвілля",
      religion: "Релігія",
      encyclopedias: "Енциклопедії", // змінено на українську версію
      philosophy: "Філософія",
    }),
    []
  );

  useEffect(() => {
    const page = new URLSearchParams(location.search).get("page");

    if (page) {
      setCurrentPage(Number(page));
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = "http://localhost:3002/api/products"; // Запит до сервера
        const response = await axios.get(url);
        const fetchedProducts = response.data;

        // Маппінг категорій URL до категорій бази даних

        const mappedCategory =
          categoryMapping[category.toLowerCase()] ?? category;

        // Фільтруємо продукти по категорії, яка передана в URL
        // Фільтруємо продукти по категорії, яка передана в URL
        const filtered = fetchedProducts.filter((product) => {
          if (Array.isArray(product.category) && product.category.length > 0) {
            // Розбиваємо рядок у першому елементі масиву на масив категорій
            const categories = product.category[0]
              .split(",") // Розбиваємо по комі
              .map((cat) => cat.trim().toLowerCase()); // Прибираємо пробіли та зводимо до нижнього регістру

            return categories.includes(mappedCategory.toLowerCase());
          }
          return false;
        });

        setFilteredProducts(filtered);
      } catch (error) {
        console.error("Помилка:", error);
        setError("Не вдалося завантажити продукти");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search, category, categoryMapping]); // Масив залежностей, щоб перезапускати fetch при зміні категорії

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", pageNumber);
    window.history.pushState(null, "", `?${searchParams.toString()}`);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="main-container">
      <div className="header-category">
        <div className="category-main">
          <span>{categoryMapping[category.toLowerCase()] || category}</span>
        </div>
      </div>
      <div className="productListContainer">
        <div>
          {filteredProducts.length === 0 ? (
            <div>Немає продуктів для відображення.</div>
          ) : (
            <div className="productList">
              {currentItems.map((product, i) => (
                <Link
                  key={i}
                  to={`/product/${product._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <BookItem
                    key={i}
                    id={product._id}
                    imageUrl={product.imageUrl}
                    title={product.title}
                  />
                </Link>
              ))}
            </div>
          )}
          <div className="productListPages">
            {totalPages > 1 &&
              Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    className={`productListPagesButtons ${
                      currentPage === pageNumber ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
