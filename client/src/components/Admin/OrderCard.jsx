import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import AdminOrderDetails from "./OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrder,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import { DialogTitle } from "@radix-ui/react-dialog";

const AdminOrderCard = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const dispatch = useDispatch();
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);

  const handleViewDetails = (orderId) => {
    dispatch(getOrderDetails(orderId));
  };
  useEffect(() => {
    if (orderDetails !== null) setOpenDetails(true);
  }, [orderDetails]);

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList?.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow key={orderItem?._id}>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          orderItem?.orderStatus === "pending"
                            ? "bg-red-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-500"
                            : orderItem?.orderStatus === "inProcess"
                            ? "bg-yellow-500"
                            : orderItem?.orderStatus === "delivered"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "confirm"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "inShipping"
                            ? "bg-yellow-500"
                            : ""
                        } px-2 py-1`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>₨.{orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          orderItem?.paymentStatus === "unpaid"
                            ? "bg-red-500"
                            : "bg-green-500"
                        } px-2 py-1`}
                      >
                        {orderItem?.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetails}
                        onOpenChange={() => {
                          setOpenDetails(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <DialogTitle className="sr-only">
                          order details
                        </DialogTitle>
                        <Button
                          onClick={() => handleViewDetails(orderItem?._id)}
                        >
                          View Details
                        </Button>
                        <AdminOrderDetails
                          setOpenDetails={setOpenDetails}
                          orderDetails={orderDetails}
                        />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrderCard;
