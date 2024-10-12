import ImgUpload from "@/components/Admin/ImgUpload";
import AdminProductCard from "@/components/Admin/ProductCard";
import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";

import {
  addNewProduct,
  deteteProduct,
  editProduct,
  getAllProduct,
} from "@/store/admin/product-slice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
const initialState = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};
const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [imgFile, setImgFile] = useState(null);
  const [uploadedImgUrl, setUploadedImgUrl] = useState("");
  const [imgLoading, setImgLoading] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);

  const handleSubmit = (e) => {
    e.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editProduct({
            formData,
            id: currentEditedId,
          })
        ).then((data) => {
          if (data.payload?.success) {
            dispatch(getAllProduct());
            setFormData(initialState);
            setOpenProductsDialog(false);
            setCurrentEditedId(null);
            toast.success(data.payload.message || "edited successfully");
          }
        })
      : dispatch(addNewProduct({ ...formData, image: uploadedImgUrl })).then(
          (data) => {
            if (data.payload.success) {
              dispatch(getAllProduct());
              setImgFile(null);
              setFormData(initialState);
              setOpenProductsDialog(false);
              toast.success(data.payload.message || "added successfully");
            }
          }
        );
  };
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  const handleDelete = (deleteProductId) => {
    dispatch(deteteProduct(deleteProductId)).then((data) => {
      if (data.payload.success) {
        toast.success(data.payload.message || "deleted successfully");
        dispatch(getAllProduct());
      }
    });
  };
  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenProductsDialog(true)}>
          Add new Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((product) => (
              <AdminProductCard
                setCurrentEditedId={setCurrentEditedId}
                setOpenProductsDialog={setOpenProductsDialog}
                setFormData={setFormData}
                key={product._id}
                product={product}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialState);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add nwe Products"}
            </SheetTitle>
          </SheetHeader>
          <ImgUpload
            imgFile={imgFile}
            setImgFile={setImgFile}
            uploadedImgUrl={uploadedImgUrl}
            setUploadedImgUrl={setUploadedImgUrl}
            setImgLoading={setImgLoading}
            imgLoading={imgLoading}
            isEditing={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={handleSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;
