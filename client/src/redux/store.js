import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import productSlice from "./features/productSlice";
import cartSlice from "./features/cartSlice";
import ordersSlice from "./features/ordersSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    cart: cartSlice,
    orders: ordersSlice,
  },
});
