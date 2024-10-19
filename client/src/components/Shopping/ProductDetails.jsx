import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addReview, getReviews } from "@/store/shop/review-slice";
import toast from "react-hot-toast";
import { PuffLoader } from "react-spinners";

const ProductDetails = ({ open, setOpen, productDetails, handleCartItem }) => {
  const retingScale = [1, 2, 3, 4, 5];
  const [reviewText, setReviewText] = useState("");
  const [starValue, setStarValue] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { reviewtList } = useSelector((state) => state.shopReviews);
  const { isLoading } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const handleAddReview = () => {
    dispatch(
      addReview({
        userId: user._id,
        userName: user.fullname,
        productId: productDetails?._id,
        reviewMessage: reviewText,
        reviewValue: starValue,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getReviews(productDetails?._id));
        toast.success(data.payload?.message);
        setReviewText("");
        setStarValue(0);
      }
    });
  };
  const handleDialogChange = () => {
    setOpen(false);
    setReviewText("");
    setStarValue(0);
  };
  useEffect(() => {
    if (productDetails?._id !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const totleReviews = reviewtList?.length;
  const avgReviews =
    reviewtList.length > 0
      ? reviewtList.reduce(
          (sum, reviewItem) => sum + reviewItem.reviewValue,
          0
        ) / totleReviews
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTitle>
        <span className="sr-only">product details dailog</span>
      </DialogTitle>
      <DialogContent className="grid grid-cols-1 sm:grid-cols-2 overflow-hidden overflow-y-scroll sm:max-w-[70vw] w-screen  h-screen gap-8 p-12  ">
        <div className="relative  rounded-lg">
          <img
            loading="lazy"
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className=" object-cover"
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <PuffLoader color="#3671d6" size="40px" />
            </div>
          )}
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground my-4 text-lg max-h-20 overflow-hidden overflow-y-scroll">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <span
              className={`${
                productDetails?.salePrice > 0 ? "line-through" : ""
              } text-2xl font-semibold text-primary`}
            >
              ${productDetails?.price}
            </span>
            <span
              className={`${
                productDetails?.salePrice > 0 ? "block" : "hidden"
              } text-2xl font-bold text-muted-foreground`}
            >
              ${productDetails?.salePrice}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-2">
              {retingScale.map((star) => (
                <Button
                  variant="outline"
                  className={`p-2 rounded-full cursor-default  hover:bg-white ${
                    star <= avgReviews.toFixed(1)
                      ? "text-yellow-300 hover:text-yellow-300"
                      : ""
                  }`}
                  key={star}
                >
                  <StarIcon
                    className={`size-6 ${
                      star <= avgReviews.toFixed(1)
                        ? "fill-yellow-300"
                        : "fill-black"
                    }`}
                  />
                </Button>
              ))}
            </div>
            <span className="text-muted-foreground">
              ({avgReviews.toFixed(1)})
            </span>
          </div>
          <div className="my-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full cursor-not-allowed opacity-40">
                Out of stock
              </Button>
            ) : (
              <Button
                onClick={() =>
                  handleCartItem(productDetails?._id, productDetails.totalStock)
                }
                className="w-full"
              >
                Add to cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-hidden">
            <h2 className="text-xl font-bold mb-4">
              Reviews({reviewtList?.length || 0})
            </h2>
            <div className="grid gap-6 max-h-20 overflow-hidden overflow-y-scroll">
              {reviewtList &&
                reviewtList?.length > 0 &&
                reviewtList.map((reviewItem) => (
                  <div className="flex gap-4">
                    <Avatar className="size-10 border">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3>{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {retingScale.map((star) => (
                          <Button
                            variant="outline"
                            className={`p-2 rounded-full cursor-default   hover:bg-white ${
                              star <= reviewItem?.reviewValue
                                ? "text-yellow-300 hover:text-yellow-300"
                                : ""
                            }`}
                            key={star}
                          >
                            <StarIcon
                              className={`size-6 ${
                                star <= reviewItem?.reviewValue
                                  ? "fill-yellow-300"
                                  : "fill-black"
                              }`}
                            />
                          </Button>
                        ))}
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem?.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-1 flex flex-col gap-2 border p-4 rounded">
              <div className="flex gap-2 items-center">
                {retingScale.map((star) => (
                  <Button
                    variant="outline"
                    className={`p-2 rounded-full transition-colors ${
                      star <= starValue
                        ? "text-yellow-300 hover:text-primary-foreground hover:bg-yellow-300"
                        : "hover:text-primary-foreground hover:bg-primary"
                    }`}
                    key={star}
                    onClick={() => setStarValue(star)}
                  >
                    <StarIcon
                      className={`size-6 ${
                        star <= starValue ? "fill-yellow-300" : "fill-black"
                      }`}
                    />
                  </Button>
                ))}
              </div>
              <Input
                onChange={(e) => setReviewText(e.target.value)}
                value={reviewText}
                placeholder="write a review..."
              />
              <Button onClick={handleAddReview}>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
