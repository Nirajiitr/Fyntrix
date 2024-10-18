import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const AdminProductCard = ({
  product,
  setCurrentEditedId,
  setOpenProductsDialog,
  setFormData,
  handleDelete,
}) => {
  const handleEditClick = () => {
    setCurrentEditedId(product?._id);
    setOpenProductsDialog(true);
    setFormData(product);
  };
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold my-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            <span
              className={`${
                product.salePrice > 0 ? "block" : "hidden"
              } text-lg font-bold`}
            >
              ${product?.salePrice}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleEditClick}>edit</Button>
          <Button onClick={() => handleDelete(product?._id)}>delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductCard;
