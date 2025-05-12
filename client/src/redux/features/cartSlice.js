import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import axios from "../../utills/axios";

// Async thunks
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await axios.get("/cart/getCart");
  return res.data;
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }) => {
    const res = await axios.post("/cart/addToCart", { productId, quantity });
    return res.data;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId) => {
    const res = await axios.delete(`/cart/removeFromCart/${productId}`);
    return res.data;
  }
);

export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;

// Селектор для отримання товарів з кошика
const selectCartItems = (state) => state.cart.items;

// Селектор для обчислення загальної вартості товарів
export const selectCartTotalPrice = createSelector(
  [selectCartItems],
  (items) => {
    const total = items.reduce((total, item) => {
      // Перевіряємо, чи є ціна і кількість
      if (
        item &&
        item.product &&
        typeof item.product.price === "number" &&
        typeof item.quantity === "number"
      ) {
        return total + item.product.price * item.quantity;
      }
      return total;
    }, 0);
    return total;
  }
);

export const incrementQuantity = createAsyncThunk(
  "cart/incrementQuantity",
  async (productId) => {
    const res = await axios.patch(`/cart/increment/${productId}`);
    return res.data;
  }
);

export const decrementQuantity = createAsyncThunk(
  "cart/decrementQuantity",
  async (productId) => {
    const res = await axios.patch(`/cart/decrement/${productId}`);
    return res.data;
  }
);

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    status: "idle",
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        if (action.payload && Array.isArray(action.payload.items)) {
          state.items = action.payload.items;
          state.totalQuantity = action.payload.items.reduce(
            (total, item) => total + item.quantity,
            0
          );
        } else {
          state.items = [];
          state.totalQuantity = 0;
        }
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        if (action.payload && Array.isArray(action.payload.items)) {
          state.items = action.payload.items;
          state.totalQuantity = action.payload.items.reduce(
            (total, item) => total + item.quantity,
            0
          );
        } else {
          state.items = [];
          state.totalQuantity = 0;
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalQuantity = action.payload.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      })
      .addCase(incrementQuantity.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalQuantity = action.payload.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      })
      .addCase(decrementQuantity.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalQuantity = action.payload.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
