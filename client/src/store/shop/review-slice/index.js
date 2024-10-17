import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  isLoading: false,
  reviewtList: [],
};

export const addReview = createAsyncThunk(
  "/review/addReview",
  async ({ userId, userName, productId, reviewMessage, reviewValue }, {rejectWithValue}) => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/shop/review/add-review?`,
        { userId, userName, productId, reviewMessage, reviewValue }
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
export const getReviews = createAsyncThunk(
  "/review/getReviews",
  async (productId) => {
    const result = await axios.get(
      `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/api/shop/review/get-review/${productId}`
    );
    return result?.data;
  }
);

const ShopReviewSlice = createSlice({
  name: "shopReviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReview.fulfilled, (state) => {
        (state.isLoading = false);
      })
      .addCase(addReview.rejected, (state, action) => {
        (state.isLoading = false), toast.error(action?.payload?.message);
      })
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        (state.isLoading = false), (state.reviewtList = action.payload.data);
      })
      .addCase(getReviews.rejected, (state) => {
        (state.isLoading = false), (state.reviewtList = []);
      });
  },
});

export default ShopReviewSlice.reducer;
