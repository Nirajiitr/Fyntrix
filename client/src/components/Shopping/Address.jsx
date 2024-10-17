import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/Form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  getAllAdress,
  updateAddress,
} from "@/store/shop/address-slice";
import toast from "react-hot-toast";
import AddressCard from "./AddressCard";

const ShoppingAddress = ({setSelectedAddress}) => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    pincode: "",
    phone: "",
    notes: "",
  });
  const [currenteditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  useEffect(() => {
    dispatch(getAllAdress(user?._id));
  }, [dispatch]);
  const handleAddress = (e) => {
    e.preventDefault();
    if(addressList.length>=3 && currenteditedId === null){
      return toast.error("You can add max 3 addresses")
    }
     if(currenteditedId !==null){
      dispatch(
        updateAddress({
          userId: user?._id,
          addressId: currenteditedId,
          formData,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          toast.success(data.payload?.message);
          setCurrentEditedId(null)
          dispatch(getAllAdress(user?._id));
          setFormData({
            address: "",
            city: "",
            pincode: "",
            phone: "",
            notes: "",
          });
        }
      });
     }else{
      dispatch(addAddress({ ...formData, userId: user?._id })).then((data) => {
        if (data?.payload?.success) {
          toast.success(data.payload?.message);
          dispatch(getAllAdress(user?._id));
          setFormData({
            address: "",
            city: "",
            pincode: "",
            phone: "",
            notes: "",
          });
        }
      });
     }

   
  };
  const handleDeleteAddress = (getCurrentAddres) => {
    dispatch(
      deleteAddress({ userId: user?._id, addressId: getCurrentAddres?._id })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload?.message);
        dispatch(getAllAdress(user?._id));
      }
    });
  };
  const handleEditAddress = (getCurrentAddres) => {
    setCurrentEditedId(getCurrentAddres?._id);
    setFormData({
      ...formData,
      address: getCurrentAddres?.address,
      city: getCurrentAddres?.city,
      pincode: getCurrentAddres?.pincode,
      phone: getCurrentAddres?.phone,
      notes: getCurrentAddres?.notes,
    });
   
  };
  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((addressInfo) => (
              <AddressCard
                key={addressInfo?._id}
                addressInfo={addressInfo}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
                setSelectedAddress = {setSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>{currenteditedId !==null ?   "Edit Address" : "Add new Address"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currenteditedId !==null ?   "Edit" : "Add"}
          onSubmit={handleAddress}
        />
      </CardContent>
    </Card>
  );
};

export default ShoppingAddress;
