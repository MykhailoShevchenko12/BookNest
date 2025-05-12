import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utills/axios";

const initialState = {
  products: [],
  loading: false,
};

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (params) => {
    try {
      const { data } = await axios.post("/products/add", params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
