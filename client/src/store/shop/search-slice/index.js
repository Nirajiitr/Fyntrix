import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  searchProductList: [],
};

export const getSearchProducts = createAsyncThunk(
  "/search/getSearchProducts",
  async ({keyword}) => {
   
    const result = await axios.post(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/api/shop/search/products/${keyword}`
    );
    return result?.data;
  }
);


const ShopSearchSlice = createSlice({
  name: "shopSearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchProducts.fulfilled, (state, action) => {
        (state.isLoading = false), (state.searchProductList = action.payload.data);
      })
      .addCase(getSearchProducts.rejected, (state) => {
        (state.isLoading = false), (state.searchProductList = []);
      });
     
  },
});

export default ShopSearchSlice.reducer;
