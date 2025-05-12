import React from "react";

import "./BookItem.css";

export const BookItem = ({ imageUrl, title }) => {
  return (
    <div className="item">
      <div className="item-box">
        <img src={`http://localhost:3002${imageUrl}`} alt="" />
        <p>{title}</p>
      </div>
    </div>
  );
};
