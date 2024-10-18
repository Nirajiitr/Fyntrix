import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/Form";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder, updateOrderStatus } from "@/store/admin/order-slice";
import toast from "react-hot-toast";

const AdminOrderDetails = ({ orderDetails, setOpenDetails }) => {
  const initialFormData = {
    status: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleUpdateStatus = (e) => {
    e.preventDefault();
    dispatch(
      updateOrderStatus({
        orderId: orderDetails?._id,
        orderStatus: formData.status,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setFormData(initialFormData);
        setOpenDetails(false);
        dispatch(getAllOrder());
        toast.success(data?.payload?.message);
      }
    });
  };
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Status</p>
            <Label>{orderDetails?.orderStatus}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <Separator />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Order Details</div>
              <div className="grid gap-3">
                {orderDetails?.cartItems && orderDetails.cartItems?.length > 0
                  ? orderDetails.cartItems.map((item) => (
                      <li className="flex items-center justify-between">
                        <span>Title: {item?.title}</span>
                        <span>Quantity: {item?.quantity}</span>
                        <span>Price: ${item?.price}</span>
                      </li>
                    ))
                  : null}
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Shipping Info</div>
              <div className="grid gap-0.5 text-muted-foreground">
                <span>{user.fullname}</span>
                <span>Address: {orderDetails?.addressInfo?.address}</span>
                <span>City: {orderDetails?.addressInfo?.city}</span>
                <span>Pincode: {orderDetails?.addressInfo?.pincode}</span>
                <span>Phone: {orderDetails?.addressInfo?.phone}</span>
                <span>Notes: {orderDetails?.addressInfo?.notes}</span>
              </div>
            </div>
          </div>
          <div>
            {
              <CommonForm
                formControls={[
                  {
                    label: "Order Status",
                    name: "status",
                    componentType: "select",
                    options: [
                      { id: "pending", label: "Pending" },
                      { id: "inProcess", label: "In Process" },
                      { id: "inShipping", label: "In Shipping" },
                      { id: "rejected", label: "Rejected" },
                      { id: "delivered", label: "Delivered" },
                    ],
                  },
                ]}
                formData={formData}
                setFormData={setFormData}
                buttonText={"Update Order Status"}
                onSubmit={handleUpdateStatus}
              />
            }
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetails;
