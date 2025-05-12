import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";

import "../ProductListPage/ProductListPage.css";
import { BookItem } from "../../components/BookItem/BookItem";

export const Genres = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 50;

  const location = useLocation();
  const { genres } = useParams(); // Отримуємо жанр з URL

  const genresMapping = useMemo(
    () => ({
      novel: "роман",
      drama: "драма",
      comedy: "комедія",
      prose: "проза",
      poetry: "поезія",
      poem: "поема",
      fantasy: "фентезі",
      fantastic: "фантастика",
      play: "п'єса",
      tragedy: "трагедія",
      thriller: "трилер",
      detective: "детективи",
      action: "бойовик",
      accounting: "бухгалтерія",
      economics: "економіка",
      enterprise: "підприємство",
      marketing: "маркетинг",
      advertising: "реклама",
      management: "менеджмент",
      softSkills: "softskills",
      investments: "інвестиції",
      trading: "трейдинг",
      technologies: "технології",
      nutrition: "харчування",
      sport: "спорт",
      meditation: "медитація",
      motivation: "мотивація",
      money: "гроші",
      relationships: "взаємовідносини",
      "child-psychology": "дитяча психологія",
      society: "суспільство",
      "mental-health": "психічне здоров'я",
      "applied-psychology": "прикладна психологія",
      psychotherapy: "психотерапія",
      state: "держава",
      "culture-studies": "культурологія",
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

        // Маппінг жанрів URL до жанрів бази даних

        const mappedGenres = genresMapping[genres?.toLowerCase()] || genres;

        // Фільтруємо продукти за жанром
        const filtered = fetchedProducts.filter((product) => {
          if (product.genres && Array.isArray(product.genres)) {
            // Розбиваємо жанри по комах і обрізаємо пробіли
            const bookGenres = product.genres
              .map((gen) => gen.split(",").map((g) => g.trim().toLowerCase())) // Розбиваємо по комах і обрізаємо пробіли
              .flat();

            // Перевіряємо, чи є хоча б один жанр, що співпадає з вибраним
            const isMatch = bookGenres.some(
              (genre) => genre.includes(mappedGenres.trim().toLowerCase()) // Перевіряємо на наявність жанру
            );

            return isMatch;
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
  }, [location.search, genres, genresMapping]);

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
          <span>{genresMapping[genres?.toLowerCase()] || genres}</span>
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
