import React, { useCallback, useEffect, useState } from "react";
import bannerImgFirst from "../../assets/home-slide-1.webp";
import bannerImgSecond from "../../assets/home-slide-2.jpeg";
import BagIcon from "../../assets/bag-svgrepo-com.svg";
import BabyIcon from "../../assets/baby-svgrepo-com.svg";
import DressIcon from "../../assets/dress-svgrepo-com.svg";
import ShirtIcon from "../../assets/shirt-and-tie-svgrepo-com.svg";
import ShoeIcon from "../../assets/shoe-classy-svgrepo-com.svg";
import GildanIcon from "../../assets/SVGBrand.com_gildan.svg";
import HugoBossIcon from "../../assets/SVGBrand.com_hugo_boss.svg";
import JomaIcon from "../../assets/SVGBrand.com_joma.svg";
import LuxotticaIcon from "../../assets/SVGBrand.com_luxottica.svg";
import LyleAndScottIcon from "../../assets/SVGBrand.com_lyle_26_scott.svg";
import NewBalanceIcon from "../../assets/SVGBrand.com_new_balance.svg";
import ReebokIcon from "../../assets/SVGBrand.com_reebok.svg";
import SalvatoreFerragamoIcon from "../../assets/SVGBrand.com_salvatore_ferragamo_spa.svg";

import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFilterProduct,
  getProductDetails,
} from "@/store/shop/product-slice";
import ShoppingProductCard from "@/components/Shopping/ProductCard";
import { useNavigate } from "react-router-dom";
import { addItemsToCart, getCartItems } from "@/store/shop/cart-slice";
import ProductDetails from "@/components/Shopping/ProductDetails";
import toast from "react-hot-toast";
import BannerSlider from "@/components/Shopping/BannerSlider";

const categores = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: DressIcon },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: BagIcon },
  { id: "footwear", label: "Footwear", icon: ShoeIcon },
];
const brands = [
  { id: "reebok", label: "Reebok", icon: ReebokIcon },
  { id: "new_balance", label: "New Balance", icon: NewBalanceIcon },
  { id: "hugo_boss", label: "Hugo Boss", icon: HugoBossIcon },
  { id: "luxottica", label: "Luxottica", icon: LuxotticaIcon },
  { id: "gildan", label: "Gildan", icon: GildanIcon },
  { id: "salvage", label: "Salvage", icon: SalvatoreFerragamoIcon },
  { id: "lyle_and_scott", label: "Lyle & Scott", icon: LyleAndScottIcon },
  { id: "joma", label: "Joma", icon: JomaIcon },
];


const ShoppingHome = () => {
  const [openProductDetail, setOpenProductDetail] = useState(false);
  const slides = [bannerImgFirst, bannerImgSecond];
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      getAllFilterProduct({ filterParams: {}, sortParams: "price-lowtohigh" })
    );
  }, [dispatch]);

  const handleNavigateToListingPage = useCallback(
    (currentItem, section) => {
      sessionStorage.removeItem("filter");
      sessionStorage.setItem(
        "filter",
        JSON.stringify({ [section]: [currentItem.id] })
      );
      navigate("/shop/listing");
    },
    [navigate]
  );

  const handleGetProductDetails = useCallback(
    (getCurrentProductId) => {
      dispatch(getProductDetails(getCurrentProductId));
      setOpenProductDetail(true);
    },
    [dispatch]
  );

  const handleCartItem = useCallback(
    (getCurrentProductId) => {
      dispatch(
        addItemsToCart({
          userId: user._id,
          productId: getCurrentProductId,
          quantity: 1,
        })
      )
        .then((data) => {
          if (data?.payload?.success) {
            toast.success(data.payload.message);
            setOpenProductDetail(false);
            dispatch(getCartItems(user._id));
          }
        })
        .catch(() => {
          toast.error("Failed to add item to cart.");
        });
    },
    [dispatch, user._id]
  );

  return (
    <div className="flex flex-col min-h-screen">
      <BannerSlider slides={slides} />

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 ">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categores.map((item) => (
              <Card
                onClick={() => handleNavigateToListingPage(item, "category")}
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                 
                  <img src={item.icon} alt={item.label} className="size-20 mb-4 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 ">
            Shop by brand
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brands.map((item) => (
              <Card
                onClick={() => handleNavigateToListingPage(item, "brand")}
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                <img src={item.icon} alt={item.label} className="size-20 mb-4 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 ">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductCard
                    key={productItem._id}
                    product={productItem}
                    handleGetProductDetails={handleGetProductDetails}
                    handleCartItem={handleCartItem}
                  />
                ))
              : null}
          </div>
        </div>
        <ProductDetails
          open={openProductDetail}
          setOpen={setOpenProductDetail}
          productDetails={productDetails}
          handleCartItem={handleCartItem}
        />
      </section>
    </div>
  );
};

export default ShoppingHome;
