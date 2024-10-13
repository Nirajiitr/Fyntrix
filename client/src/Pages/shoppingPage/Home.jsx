import React, { useEffect, useState } from "react";
import bannerImgFirst from "../../assets/home-slide-1.webp";
import bannerImgSecond from "../../assets/home-slide-2.jpeg";
import { Button } from "@/components/ui/button";
import {
  BabyIcon,
  ChevronLeft,
  ChevronRight,
  CloudLightning,
  DramaIcon,
  Drum,
  Grid3x3,
  LoaderPinwheel,
  Origami,
  ShirtIcon,
  Target,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { getAllFilterProduct, getProductDetails } from "@/store/shop/product-slice";
import ShoppingProductCard from "@/components/Shopping/ProductCard";
import { useNavigate } from "react-router-dom";
import { addItemsToCart, getCartItems } from "@/store/shop/cart-slice";
import ProductDetails from "@/components/Shopping/ProductDetails";
import toast from "react-hot-toast";

const categores = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];
const brands = [
  { id: "nike", label: "Nike", icon: Grid3x3 },
  { id: "adidas", label: "Adidas", icon: LoaderPinwheel },
  { id: "puma", label: "Puma", icon: DramaIcon },
  { id: "levi", label: "Levi's", icon: Origami },
  { id: "zara", label: "Zara", icon: Drum },
  { id: "h&m", label: "H&M", icon: Target },
];
const ShoppingHome = () => {
  const [bannerSlide, setBannerSlide] = useState(0);
  const [openProductDetail, setOpenProductDetail] = useState(false)
  const slides = [bannerImgFirst, bannerImgSecond];
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    const timmer = setInterval(() => {
      setBannerSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timmer);
  }, []);
  useEffect(() => {
    dispatch(
      getAllFilterProduct({ filterParams: {}, sortParams: "price-lowtohigh" })
    );
  }, [dispatch]);
  const handleNavigateToListingPage =(currentItem, section)=>{
      sessionStorage.removeItem("filter")
      const currentFilter ={
        [section] : [currentItem.id]
      }
      sessionStorage.setItem("filter", JSON.stringify(currentFilter))
      navigate("/shop/listing")
  }
  
  const handleGetProductDetails =(getCurrentProductId)=>{
    dispatch(getProductDetails(getCurrentProductId))
    setOpenProductDetail(true)
  }
  
  const handleCartItem =(getCurrentProductId)=>{
      dispatch(addItemsToCart({userId : user._id , productId : getCurrentProductId, quantity : 1})).then(data=>{
      if(data?.payload?.success){
        toast.success(data.payload?.message)
        setOpenProductDetail(false)
        dispatch(getCartItems(user?._id))
      }
      })
     
  }
  return (
    <div className="flex flex-col min-h-screen ">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            className={`${
              index === bannerSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          onClick={() =>
            setBannerSlide((prev) => (prev - 1 + slides.length) % slides.length)
          }
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 "
        >
          <ChevronLeft className="size-8" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setBannerSlide((prev) => (prev + 1) % slides.length)}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 "
        >
          <ChevronRight className="size-8" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 ">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categores.map((item) => (
              <Card 
                onClick={()=>handleNavigateToListingPage(item, "category")}
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="size-12 mb-4 text-primary" />
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
              onClick={()=>handleNavigateToListingPage(item, "brand")}
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="size-12 mb-4 text-primary" />
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
                    handleGetProductDetails={handleGetProductDetails} handleCartItem={handleCartItem}
                  />
                ))
              : null}
          </div>
        </div>
        <ProductDetails open={openProductDetail} setOpen={setOpenProductDetail} productDetails={productDetails} handleCartItem={handleCartItem} />
      </section>
    </div>
  );
};

export default ShoppingHome;
