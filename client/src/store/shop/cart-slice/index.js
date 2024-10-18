import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  cartItems: [],
};

export const addItemsToCart = createAsyncThunk(
  "/cart/addItemsToCart",
  async ({ userId, productId, quantity }) => {
    const result = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/api/shop/cart/add-card`,
      { userId, productId, quantity }
    );
    return result?.data;
  }
);
export const getCartItems = createAsyncThunk(
  "/cart/getCartItems",
  async (userId) => {
    const result = await axios.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/api/shop/cart/get-cards/${userId}`
    );
    return result?.data;
  }
);
export const updateCartItems = createAsyncThunk(
  "/cart/updateCartItems",
  async ({ userId, productId, quantity }) => {
    const result = await axios.put(
      `${import.meta.env.VITE_SERVER_BASE_URL}/api/shop/cart/update-card`,
      { userId, productId, quantity }
    );
    return result?.data;
  }
);
export const deleteCartItems = createAsyncThunk(
  "/cart/deleteCartItems",
  async ({ userId, productId }) => {
    const result = await axios.delete(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/api/shop/cart/delete-card/${userId}/${productId}`
    );
    return result?.data;
  }
);

const ShopCartSlice = createSlice({
  name: "shopCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItemsToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addItemsToCart.fulfilled, (state, action) => {
        (state.isLoading = false), (state.cartItems = action.payload.data);
      })
      .addCase(addItemsToCart.rejected, (state) => {
        (state.isLoading = false), (state.cartItems = []);
      })
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        (state.isLoading = false), (state.cartItems = action.payload.data);
      })
      .addCase(getCartItems.rejected, (state) => {
        (state.isLoading = false), (state.cartItems = []);
      })
      .addCase(updateCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItems.fulfilled, (state, action) => {
        (state.isLoading = false), (state.cartItems = action.payload.data);
      })
      .addCase(updateCartItems.rejected, (state) => {
        (state.isLoading = false), (state.cartItems = []);
      })
      .addCase(deleteCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItems.fulfilled, (state, action) => {
        (state.isLoading = false), (state.cartItems = action.payload.data);
      })
      .addCase(deleteCartItems.rejected, (state) => {
        (state.isLoading = false), (state.cartItems = []);
      });
  },
});

export default ShopCartSlice.reducer;
