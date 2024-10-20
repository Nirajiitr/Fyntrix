import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  isLoading: false,
  addressList: [],
  selectedAddress: sessionStorage.getItem("selectedAddress")
    ? JSON.parse(sessionStorage.getItem("selectedAddress"))
    : null,
};

export const addAddress = createAsyncThunk(
  "/address/addAddress",
  async (
    { userId, address, pincode, city, state, country, phone},
    { rejectWithValue }
  ) => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/shop/address/add-address`,
        { userId, address, pincode, city, state, country, phone},
      );
      return result?.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Something went wrong" });
    }
  }
);
export const getAllAdress = createAsyncThunk(
  "/address/getAllAdress",
  async (userId) => {
    const result = await axios.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/api/shop/address/get-address/${userId}`
    );
    return result?.data;
  }
);
export const updateAddress = createAsyncThunk(
  "/address/updateAddress",
  async ({ userId, addressId, formData }, { rejectWithValue }) => {
    try {
      const result = await axios.put(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/api/shop/address/update-address/${userId}/${addressId}`,
        { formData }
      );
      return result?.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Something went wrong" });
    }
  }
);
export const deleteAddress = createAsyncThunk(
  "/address/deleteAddress",
  async ({ userId, addressId }) => {
    const result = await axios.delete(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/api/shop/address/delete-address/${userId}/${addressId}`
    );
    return result?.data;
  }
);

const ShopAddressSlice = createSlice({
  name: "shopAddress",
  initialState,
  reducers: {
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
      sessionStorage.setItem("selectedAddress", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addAddress.rejected, (state, action) => {
        (state.isLoading = false), toast.error(action?.payload?.message);
      })
      .addCase(getAllAdress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAdress.fulfilled, (state, action) => {
        (state.isLoading = false), (state.addressList = action.payload.data);
      })
      .addCase(getAllAdress.rejected, (state) => {
        (state.isLoading = false), (state.addressList = []);
      })
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        (state.isLoading = false), toast.error(action?.payload?.message);
      });
  },
});
export const { setSelectedAddress } = ShopAddressSlice.actions;
export default ShopAddressSlice.reducer;
