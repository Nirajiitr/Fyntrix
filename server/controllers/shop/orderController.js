import stripe from "../../config/stripe.js";
import { Cart } from "../../models/cartModel.js";
import { Order } from "../../models/orderModel.js";
import { Product } from "../../models/productModel.js";

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentStatus,
      totalAmount,
      orderDate,
      userEmail,
      cardId,
    } = req.body;

    if (
      !userId ||
      !cartItems ||
      cartItems.length === 0 ||
      !addressInfo ||
      !totalAmount ||
      !userEmail
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required order details",
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_BASE_URL}/payment/process?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_BASE_URL}/shop/payment/cancel`,
      customer_email: userEmail,
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: item.price * 100,
          product_data: {
            name: item.title,
            images: [item.image],
          },
        },
        quantity: item.quantity || 1,
      })),
    });

    const newOrder = new Order({
      userId,
      cartItems,
      cardId,
      addressInfo,
      orderStatus: orderStatus || "pending",
      paymentStatus: paymentStatus || "unpaid",
      totalAmount,
      orderDate: orderDate || new Date(),
      paymentId: session.id,
    });
    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      approvalURl: session.url,
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Server error occurred while creating the order",
    });
  }
};
const capturePayment = async (req, res) => {
  try {
    const { sessionId, orderId } = req.body;

    if (!sessionId || !orderId) {
      return res.status(404).json({
        success: false,
        message: "SessionId or OrderId not found",
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    if (session.payment_status !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed or failed",
      });
    }

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(400).json({
        success: false,
        message: "order not fount!",
      });
    }
    order.paymentStatus = "paid";
    order.orderStatus = "confirm";

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${product.title}`,
        });
      }
      product.totalStock -= item.quantity;

      await product.save();
    }

    const cardId = order.cardId;
    await Cart.findByIdAndDelete(cardId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "order confirm",
      data: order,
    });
  } catch (error) {
    console.error("Error capturing payment:", error);
    res.status(500).json({
      success: false,
      message: "Server error occurred while capturing payment",
    });
  }
};
const getAllBougthProduct = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
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
export { createOrder, capturePayment, getAllBougthProduct, getOrderDetail };
