import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURl: null,
  isLoading: false,
  orderId: null,
  orderList : [],
  orderDetails : null
};

export const createOrder = createAsyncThunk(
  "/order/createOrder",
  async (orderData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/api/shop/order/create-order`,
      orderData
    );
    return result?.data;
  }
);
export const savePayment = createAsyncThunk(
  "/order/savePayment",
  async ({ sessionId, orderId }) => {
   
    const result = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/api/shop/order/save-payment`,
       { sessionId, orderId }
    );
    return result?.data;
  }
);
export const getAllBougthProduct = createAsyncThunk(
  "/order/getAllBougthProduct",
  async (userId) => {
   
    const result = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}/api/shop/order/list/${userId}`,
       
    );
    return result?.data;
  }
);
export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (orderId ) => {
   
    const result = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}/api/shop/order/detail/${orderId}`,
      
    );
    return result?.data;
  }
);

const ShopOrderSlice = createSlice({
  name: "shopOrder",
  initialState,
  reducers: {
    resetOrderDetails : (state)=>{
      state.orderDetails = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.approvalURl = action.payload.approvalURl),
          (state.orderId = action.payload.orderId);
          sessionStorage.setItem("orderId", JSON.stringify(action.payload.orderId))
      })
      .addCase(createOrder.rejected, (state) => {
        (state.isLoading = false),
          (state.approvalURl = null),
          (state.orderId = null);
      })
      .addCase(getAllBougthProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBougthProduct.fulfilled, (state, action) => {
        (state.isLoading = false), state.orderList =action.payload.data
      })
      .addCase(getAllBougthProduct.rejected, (state) => {
        (state.isLoading = false); state.orderList = []
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        (state.isLoading = false), state.orderDetails =action.payload.data
      })
      .addCase(getOrderDetails.rejected, (state) => {
        (state.isLoading = false), state.orderDetails = null
      });
  },
});
 export const {resetOrderDetails} = ShopOrderSlice.actions
export default ShopOrderSlice.reducer;
