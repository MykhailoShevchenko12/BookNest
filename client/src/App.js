import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "sonner";

import { Layout } from "./components/Layout";
import { Footer } from "./components/Footer/Footer";
import { MainPage } from "./pages/MainPage/MainPage";
import { Cart } from "./pages/Cart/Cart";
import { getMe } from "./redux/features/authSlice";

import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { ProductListPage } from "./pages/ProductListPage/ProductListPage";
import { OrderPage } from "./pages/OrderPage/OrderPage";
import { MyOrdersPage } from "./pages/MyOrdersPage/MyOrdersPage";
import { Categories } from "./pages/Categories/Categories";
import { Genres } from "./pages/Genres/Genres";
import { SearchPage } from "./pages/SearchPage/SearchPage";
import { About } from "./pages/About/About";
import { Contacts } from "./pages/Contacts/Contacts";
import { Support } from "./pages/Support/Support";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/products/:category" element={<Categories />} />
          <Route path="/products/:category/:genres" element={<Genres />} />

          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/myorders" element={<MyOrdersPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </Layout>
      <Footer />
      <Toaster position="bottom-center" richColors />
    </div>
  );
}

export default App;
