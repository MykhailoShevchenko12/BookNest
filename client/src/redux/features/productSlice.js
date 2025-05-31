import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utills/axios";

const initialState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 60,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params) => {
    try {
      let url = "http://localhost:3002/api/products";
      if (params.category) {
        url = `${url}?category=${params.category}`;
      }
      if (params.genre) {
        url = `${url}&genre=${params.genre}`;
      }
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error("Не вдалося завантажити продукти");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.filteredProducts = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { setCurrentPage, setFilteredProducts } = productSlice.actions;
export default productSlice.reducer;
