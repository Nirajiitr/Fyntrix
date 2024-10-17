import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

export const getAllOrder = createAsyncThunk("/order/getAllOrder", async () => {
  const result = await axios.get(
    `${import.meta.env.VITE_SERVER_BASE_URL}/api/admin/order/list/`
  );
  return result?.data;
});
export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (orderId) => {
    const result = await axios.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/api/admin/order/detail/${orderId}`
    );
    return result?.data;
  }
);
export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ orderId, orderStatus }) => {
    const result = await axios.put(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/api/admin/order/update/${orderId}`,
      { orderStatus }
    );
    return result?.data;
  }
);

const AdminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        (state.isLoading = false), (state.orderList = action.payload.data);
      })
      .addCase(getAllOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        (state.isLoading = false), (state.orderDetails = action.payload.data);
      })
      .addCase(getOrderDetails.rejected, (state) => {
        (state.isLoading = false), (state.orderDetails = null);
      });
  },
});
export const { resetOrderDetails } = AdminOrderSlice.actions;
export default AdminOrderSlice.reducer;
