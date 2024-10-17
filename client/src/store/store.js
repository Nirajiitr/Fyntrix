import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth-slice"
import adminProductsSlice from "./admin/product-slice"
import shopProductsSlice from "./shop/product-slice"
import shopSearchSlice from "./shop/search-slice"
import shopCartSlice from "./shop/cart-slice"
import shopAddressSlice from "./shop/address-slice"
import shopOrderSlice from "./shop/order-slice"
import adminOrderSlice from "./admin/order-slice"
import shopReviewsSlice from "./shop/review-slice"

const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts: adminProductsSlice,
        shopProducts : shopProductsSlice,
        shopSearch : shopSearchSlice,
        shopCart : shopCartSlice,
        shopAddress : shopAddressSlice,
        shopOrder : shopOrderSlice,
        adminOrder :adminOrderSlice ,
        shopReviews :shopReviewsSlice ,
    }
})

export default store