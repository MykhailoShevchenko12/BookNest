import React, { useEffect } from "react";
import "./ProductListPage.css";
import { useDispatch, useSelector } from "react-redux";
import { BookItem } from "../../components/BookItem/BookItem";
import { Link, useLocation } from "react-router-dom";
import {
  fetchProducts,
  setCurrentPage,
  setFilteredProducts,
} from "../../redux/features/productSlice";

export const ProductListPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    products,
    filteredProducts,
    currentPage,
    loading,
    error,
    itemsPerPage,
  } = useSelector((state) => state.product);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page");
    const category = queryParams.get("category");
    const genre = queryParams.get("genre");

    if (page) {
      dispatch(setCurrentPage(Number(page)));
    }

    dispatch(fetchProducts({ category, genre }));
  }, [dispatch, location.search]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    const genre = queryParams.get("genre");

    if (category || genre) {
      const filtered = products.filter((product) => {
        const matchesCategory = category ? product.category === category : true;
        const matchesGenre = genre ? product.genre === genre : true;
        return matchesCategory && matchesGenre;
      });
      dispatch(setFilteredProducts(filtered));
    } else {
      dispatch(setFilteredProducts(products));
    }
  }, [location.search, products, dispatch]);

  // Пагінація
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
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
    <div className="category-page">
      <div className="header-category">
        <div className="category-main">
          <span>Відкрийте для себе книги, які хочеться читати</span>
        </div>
      </div>
      <div className="productListContainer productList">
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
  );
};
