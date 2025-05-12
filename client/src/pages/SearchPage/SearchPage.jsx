import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import "./SearchPage.css";
import { BookItem } from "../../components/BookItem/BookItem";

export const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3002/api/products");
        const data = await res.json();

        const filtered = data.filter((book) => {
          const titleMatch = book.title
            .toLowerCase()
            .includes(query.toLowerCase());
          const authorMatch = book.author
            ?.toLowerCase()
            .includes(query.toLowerCase());
          return titleMatch || authorMatch;
        });

        setSearchResults(filtered);
      } catch (err) {
        console.error(err);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  return (
    <div className="main-container">
      <div className="search-results-container">
        <h2>Результати пошуку для: "{query}"</h2>
        {searchResults.length === 0 ? (
          <p>Нічого не знайдено.</p>
        ) : (
          <div className="search-results">
            {searchResults.map((book) => (
              <Link
                key={book._id}
                to={`/product/${book._id}`}
                style={{ textDecoration: "none" }}
              >
                <BookItem
                  id={book._id}
                  imageUrl={book.imageUrl}
                  title={book.title}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
