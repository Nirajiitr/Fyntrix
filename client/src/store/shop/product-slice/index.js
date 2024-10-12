import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    isLoading: false,
    productList: [],
  };
  
  export const getAllFilterProduct = createAsyncThunk(
    "/products/getAllFilterProduct",
    async ({filterParams, sortParams}) => {
      const query = new URLSearchParams({
        ...filterParams, sortBy : sortParams
      })
      const result = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/shop/products/get-product?${query}`
       
      );
      return result?.data;
    }
  );


const ShopProductsSlice = createSlice({
    name: 'shopProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getAllFilterProduct.pending, (state)=>{
        state.isLoading = true
      }).addCase(getAllFilterProduct.fulfilled, (state, action)=>{
        state.isLoading = false,
         state.productList = action.payload.data
         
      }).addCase(getAllFilterProduct.rejected, (state)=>{
        state.isLoading = false,
        state.productList = []
      })
    },
  });
  
  export default ShopProductsSlice.reducer