import { Order } from "../../models/orderModel.js";
import { Review } from "../../models/productReview.js";

const addReview = async (req, res) => {
  try {
    const { userId, productId, userName, reviewMessage, reviewValue } =
      req.body;

    if (!userId || !productId || !userName || !reviewMessage || !reviewValue) {
      return res.status(400).json({
        success: false,
        message: "all field are required!",
      });
    }
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirm",
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "you need to purchase product to review it.",
      });
    }
    const isReview = await Review.findOne({ productId, userId });
    if (isReview) {
      return res.status(400).json({
        success: false,
        message: "you already reviewed this product!",
      });
    }
    const newReview = new Review({
      userId,
      productId,
      userName,
      reviewMessage,
      reviewValue,
    });
    await newReview.save();
    const reviews = await Review.find({ productId });

    res
      .status(201)
      .json({
        success: true,
        data: newReview,
        message: "thank you for your review!",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error occurred while adding review",
    });
  }
};
const getReview = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId required!",
      });
    }
    const reviews = await Review.find({ productId });
    if (!reviews) {
      return res.status(404).json({
        success: false,
        message: "review not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error occurred while finding review",
    });
  }
};

export { addReview, getReview };
