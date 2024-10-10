import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/api/admin/products/add-product`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);
export const getAllProduct = createAsyncThunk(
  "/products/getallproduct",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}/api/admin/products/get-product`
     
    );
    return result?.data;
  }
);
export const editProduct = createAsyncThunk(
  "/products/editproduct",
  async ({formData, id}) => {
   
    const result = await axios.put(
      `${import.meta.env.VITE_SERVER_BASE_URL}/api/admin/products/edit-product/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);
export const deteteProduct = createAsyncThunk(
  "/products/deleteproduct",
  async (id) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_SERVER_BASE_URL}/api/admin/products/detete-product/${id}`
     
    );
    return result?.data;
  }
);
const AdminProductsSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProduct.pending, (state)=>{
      state.isLoading = true
    }).addCase(getAllProduct.fulfilled, (state, action)=>{
      state.isLoading = false,
       state.productList = action.payload.data
       
    }).addCase(getAllProduct.rejected, (state)=>{
      state.isLoading = false,
      state.productList = []
    })
  },
});

export default AdminProductsSlice.reducer