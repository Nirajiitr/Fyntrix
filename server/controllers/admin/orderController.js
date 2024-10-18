import { Order } from "../../models/orderModel.js";

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find({});
    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "you have not bought anything yet!",
      });
    }
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Server error occurred while creating the order",
    });
  }
};
const getOrderDetail = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "order not fount!",
      });
    }
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Server error occurred while creating the order",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const orderUpdate = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );
    if (!orderUpdate) {
      return res.status(404).json({
        success: false,
        message: "order not fount!",
      });
    }

    res.status(200).json({
      success: true,
      message: "updated Successfully",
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Server error occurred while creating the order",
    });
  }
};
export { getAllOrder, getOrderDetail, updateOrderStatus };
