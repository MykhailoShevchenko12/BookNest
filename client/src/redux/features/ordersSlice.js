// src/redux/slices/ordersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utills/axios";

// Async thunk для оформлення замовлення
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async ({ items, amount, address }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/order/place", {
        items,
        amount,
        address,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "order/userorders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/order/userorders");
      return data.orders;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// Оновлення статусу замовлення
export const updateOrderStatus = createAsyncThunk(
  "order/status",
  async ({ orderId, status }, thunkAPI) => {
    try {
      const response = await axios.patch(`/order/status/${orderId}`, {
        status,
      });
      console.log("Оновлене замовлення:", response.data);
      return response.data; // отримуємо новий статус із бази
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetOrderState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error =
          action.payload?.message || "Не вдалося оформити замовлення";
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error =
          action.payload?.message || "Не вдалося отримати замовлення";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        console.log("Оновлене замовлення:", updatedOrder); // Логування

        const index = state.orders.findIndex(
          (order) => order._id === updatedOrder._id
        );

        if (index !== -1) {
          // Оновлюємо статус конкретного замовлення в масиві orders
          state.orders[index] = updatedOrder;
        } else {
          console.error("Замовлення не знайдено для оновлення");
        }
      });
  },
});

export const { resetOrderState } = ordersSlice.actions;
export default ordersSlice.reducer;
