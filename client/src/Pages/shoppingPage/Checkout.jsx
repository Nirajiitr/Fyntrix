import React, { useState } from "react";
import accountImg from "../../assets/account-img.jpg";
import ShoppingAddress from "@/components/Shopping/Address";
import { useDispatch, useSelector } from "react-redux";
import CartContent from "@/components/Shopping/CartContent";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/store/shop/order-slice";
import toast from "react-hot-toast";
const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { approvalURl } = useSelector((state) => state.shopOrder);
  const { user } = useSelector((state) => state.auth);
  const [selectAddress, setSelectedAddress] = useState(null);
  const [paymentInitiate, setPaymentInitiate]= useState(false)
  const dispatch = useDispatch()
  const totalPrice =
    cartItems && cartItems?.items?.length > 0
      ? cartItems?.items?.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const handleChechOut = () => {
    if(selectAddress===null){
      return toast.error("Please select one address to proceed.")
    }
    const orderData = {
      userId: user?._id,
      cardId : cartItems?._id,
      cartItems: cartItems?.items?.map((singleItem) => ({
        productId: singleItem?.productId,
        title: singleItem?.title,
        image: singleItem?.image,
        price:
          singleItem?.salePrice > 0 ? singleItem.salePrice : singleItem?.price,
        quantity: singleItem?.quantity,
      })),
      addressInfo: {
        addressId: selectAddress?._id,
        address: selectAddress?.address,
        city: selectAddress?.city,
        pincode: selectAddress?.pincode ,
        phone:selectAddress?.phone,
        notes: selectAddress?.notes,
      },
      orderStatus: "pending",
      paymentStatus: "unpaid",
      totalAmount: totalPrice,
      orderDate: new Date(),
      userEmail: user?.email,
    };
   dispatch(createOrder(orderData)).then(data=>{
     if(data?.payload?.success){
      setPaymentInitiate(true)
     }else{
      setPaymentInitiate(false)
     }
   })
  };
  if(approvalURl){
    window.location.href = approvalURl;
  }
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          className="h-full w-full object-cover object-center"
          src={accountImg}
          alt=" banner image"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <ShoppingAddress setSelectedAddress={setSelectedAddress} />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems?.items?.length > 0
            ? cartItems?.items.map((item) => (
                <CartContent key={item?.productId} cartItem={item} />
              ))
            : null}
          <div className="mt-8 rounded shadow p-2 flex items-start justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold ">${totalPrice}</span>
          </div>
          <div className="mt-4 w-full">
            <Button disabled = {!(cartItems?.items?.length>0)} onClick={handleChechOut} className="w-full">
             
              Checkout with card
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
