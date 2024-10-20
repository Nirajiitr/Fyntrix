import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAddress } from "@/store/shop/address-slice";

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
}) => {
  const dispatch = useDispatch();
  const { selectedAddress } = useSelector((state) => state.shopAddress);
  return (
    <Card
      className={`relative ${
        selectedAddress?._id === addressInfo?._id
          ? "bg-blue-100 border-blue-500"
          : "bg-white"
      }`}
    >
      <Checkbox
        checked={selectedAddress?._id === addressInfo?._id}
        onCheckedChange={() => dispatch(setSelectedAddress(addressInfo))}
        className="absolute top-2 right-2"
      />
      <CardContent className="grid gap-4 p-4">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>Pin Code: {addressInfo?.pincode}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>State: {addressInfo?.state}</Label>
        <Label>Country: {addressInfo?.country}</Label>
        <Label>Phone Number: {addressInfo?.phone}</Label>
       
      </CardContent>
      <CardFooter className="flex justify-between p-3">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
