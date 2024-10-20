import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { useSelector } from "react-redux";

const ShoppingProductCard = ({
  product,
  handleGetProductDetails,
  handleCartItem,
  location,
}) => {
  const navigate = useNavigate();

  const redirectIfDefault = (pageLocation, action) => {
    if (pageLocation === "default") {
      navigate("/auth/login");
    } else {
      action();
    }
  };
  const { isLoading } = useSelector((state) => state.shopProducts);
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div
        className="cursor-pointer"
        onClick={() =>
          redirectIfDefault(location, () =>
            handleGetProductDetails(product?._id)
          )
        }
      >
        <div className="relative">
          <img
            loading="lazy"
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <PuffLoader color="#3671d6" size="40px" />
            </div>
          )}
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out of stock
            </Badge>
          ) : product.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold my-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className={` text-sm text-muted-foreground`}>
              {product?.category}
            </span>
            <span className={` text-sm text-muted-foreground`}>
              {product?.brand}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ₨.{product?.price}
            </span>
            <span
              className={`${
                product?.salePrice > 0 ? "block" : "hidden"
              } text-lg font-bold`}
            >
              ₨.{product?.salePrice}
            </span>
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full cursor-not-allowed opacity-40">
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={() =>
              redirectIfDefault(location, () =>
                handleCartItem(product?._id, product.totalStock)
              )
            }
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductCard;
