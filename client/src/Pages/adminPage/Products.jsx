import ImgUpload from "@/components/Admin/ImgUpload";
import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import React, { useState } from "react";
  const initialState = {
    image : null,
    title : "",
    description : "",
    category : "",
    brand : "",
    price : "",
    salePrice : "",
    totleStoke : "",
  }
const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialState)
  const [imgFile, setImgFile] = useState(null)
  const [uploadedImgUrl, setUploadedImgUrl] = useState("")
   const handleSubmit = ()=>{

   }
  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenProductsDialog(true)}>
          Add new Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => setOpenProductsDialog(false)}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add nwe Products</SheetTitle>
          </SheetHeader>
          <ImgUpload imgFile={imgFile} setImgFile={setImgFile} uploadedImgUrl={uploadedImgUrl} setUploadedImgUrl={setUploadedImgUrl} />
          <div className="py-6">
            <CommonForm onSubmit={handleSubmit} formData={formData} setFormData={setFormData} buttonText="Add" formControls={addProductFormElements} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;
