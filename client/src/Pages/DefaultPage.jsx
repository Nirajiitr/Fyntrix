import React, { Fragment, useEffect } from "react";

import ShoppingProductCard from "@/components/Shopping/ProductCard";
import ShoppingHeader from "@/components/Shopping/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "@/store/admin/product-slice";
import { FadeLoader } from "react-spinners";

const DefaultPage = () => {
  const { productList, isLoading } = useSelector(
    (state) => state.adminProducts
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="flex flex-col bg-white ">
        <ShoppingHeader pageLocation="default" />
      </div>
      <div className="no-scrollbar overflow-y-scroll container mx-auto px-4 py-12">
        {productList && productList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList.map((product) => (
              <ShoppingProductCard
                key={product._id}
                product={product}
                location="default"
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <FadeLoader color="#3671d6" size="60px" />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default DefaultPage;
