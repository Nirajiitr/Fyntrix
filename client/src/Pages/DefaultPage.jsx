import React from "react";

import ShoppingProductCard from "@/components/Shopping/ProductCard";
import ShoppingHeader from "@/components/Shopping/Header";
import { sampleProductList } from "@/config/productSample";

const DefaultPage = () => {
 
  return (
    <>
      <div className="flex flex-col bg-white overflow-hidden">
        <ShoppingHeader pageLocation="default" />
      </div>
      <div className="container mx-auto px-4 py-12">
        
        {sampleProductList && sampleProductList.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sampleProductList.map((product) => (
              <ShoppingProductCard
                key={product._id}
                product={product}
               location = "default"
              />
            ))}
          </div>
        ) }
        
      </div>
    </>
  );
};

export default DefaultPage;
