import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSearchProducts } from "@/store/shop/search-slice";
import ShoppingProductCard from "@/components/Shopping/ProductCard";
import ShoppingHeader from "@/components/Shopping/Header";
import { getProductDetails } from "@/store/shop/product-slice";
import { addItemsToCart, getCartItems } from "@/store/shop/cart-slice";
import toast from "react-hot-toast";
import ProductDetails from "@/components/Shopping/ProductDetails";

const SearchResults = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const { searchProductList, isLoading } = useSelector(
    (state) => state.shopSearch
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const [openProductDetail, setOpenProductDetail] = useState(false);

  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(getProductDetails(getCurrentProductId));
    setOpenProductDetail(true);
  };

  const handleCartItem = (getCurrentProductId, totalStock) => {
    let getCurrentCartItems = cartItems.items || [];
    if (getCurrentCartItems.length) {
      const indexOfCurrentItem = getCurrentCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCurrentCartItems[indexOfCurrentItem].quantity;
        if (totalStock < 5) {
          if (getQuantity + 1 > totalStock) {
            toast.error(
              `Only ${getQuantity} quantity can be added for this moment`
            );
            return;
          }
        } else if (getQuantity + 1 > 5) {
          toast.error("max 5 quantity can be added for same product");
          return;
        }
      }
    }
    dispatch(
      addItemsToCart({
        userId: user._id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload?.message);
        setOpenProductDetail(false);
        dispatch(getCartItems(user?._id));
      }
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    setSearchQuery(query);

    if (query) {
      dispatch(getSearchProducts({ keyword: query }));
    }
  }, [location.search, dispatch]);
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <PuffLoader color="#3671d6" size="40px" />
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col bg-white overflow-hidden">
        <ShoppingHeader />
      </div>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">
          Search Results for "{searchQuery}"
        </h1>
        {searchProductList && searchProductList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchProductList.map((product) => (
              <ShoppingProductCard
                key={product._id}
                product={product}
                handleGetProductDetails={handleGetProductDetails}
                handleCartItem={handleCartItem}
              />
            ))}
          </div>
        ) : (
          <p>No products found for "{searchQuery}".</p>
        )}
        <ProductDetails
          open={openProductDetail}
          setOpen={setOpenProductDetail}
          productDetails={productDetails}
          handleCartItem={handleCartItem}
        />
      </div>
    </>
  );
};

export default SearchResults;
