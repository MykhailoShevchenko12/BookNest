import React from "react";
import "./Admin.css";
import { Routes, Route } from "react-router-dom";

import Slidebar from "../../components/Slidebar/Slidebar";
import AddBook from "../../components/AddBook/AddBook";
import BookList from "../../components/BookList/BookList";
import EditBook from "../../components/EditBook/EditBook";
import { Orders } from "../../components/Orders/Orders";

const Admin = () => {
  return (
    <div className="admin">
      <Slidebar />
      <Routes>
        <Route index element={<AddBook />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/listbook" element={<BookList />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/editbook/:id" element={<EditBook />} />
      </Routes>
    </div>
  );
};

export default Admin;
