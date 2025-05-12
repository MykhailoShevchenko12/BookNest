import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utills/axios";

// Async thunk: отримати всі замовлення
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const res = await axios.post("/order/list");
  return res.data.orders;
});

// Async thunk: оновити статус замовлення
export const updateOrderStatus = createAsyncThunk(
  "order/status",
  async ({ orderId, status }) => {
    await axios.patch(`/order/status/${orderId}`, { orderId, status });
    return { orderId, status };
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { orderId, status } = action.payload;
        const order = state.orders.find((o) => o._id === orderId);
        if (order) {
          order.status = status;
        }
      });
  },
});

export default ordersSlice.reducer;
