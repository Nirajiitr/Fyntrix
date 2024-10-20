import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import CartContent from "./CartContent";
import { useNavigate } from "react-router-dom";

const CartWrapper = ({ cartItems, setOpenCart }) => {
  const navigate = useNavigate();
  const totalPrice =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;
  return (
    <SheetContent className="sm:max-w-md ">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4 overflow-y-scroll h-1/2">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (
              <CartContent key={item?.productId} cartItem={item} />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <span className="font-bold">Total</span>
        <span className="font-bold ml-2">₨.{totalPrice}</span>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCart(false);
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </SheetContent>
  );
};

export default CartWrapper;
