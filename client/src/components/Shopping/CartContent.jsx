import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItems, updateCartItems } from "@/store/shop/cart-slice";
import toast from "react-hot-toast";

const CartContent = ({ cartItem }) => {
  
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleDeleteCart = (productId) => {
    dispatch(deleteCartItems({ userId: user?._id, productId })).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload?.message);
      }
    });
  };
  const handleUpdateQuantity =(cartItem, actionType)=>{
    
   dispatch(updateCartItems({userId: user?._id, productId: cartItem?.productId, quantity: 
    actionType === "plus" ? cartItem?.quantity + 1 : cartItem?.quantity - 1 
   }))
  }
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center mt-1 gap-2 ">
          <Button disabled = {cartItem.quantity === 1} onClick={()=>{handleUpdateQuantity(cartItem, "minus")}} variant="outline" size="icon" className="size-8 rounded-full">
            <Minus className="size-4" />
            <span className="sr-only">decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button  disabled = {cartItem.quantity === 5} onClick={()=>{handleUpdateQuantity(cartItem, "plus")}} variant="outline" size="icon" className="size-8 rounded-full">
            <Plus className="size-4" />
            <span className="sr-only">increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold text-primary">
          ₨.
          {(cartItem?.salePrice > 0 ? cartItem.salePrice : cartItem?.price) *
            cartItem?.quantity}
        </p>
        <Trash
          onClick={() => handleDeleteCart(cartItem?.productId)}
          className="cursor-pointer mt-1 size-5"
        />
      </div>
    </div>
  );
};

export default CartContent;
