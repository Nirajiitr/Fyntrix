import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

const ImgUpload = ({
  imgFile,
  setImgFile,
  uploadedImgUrl,
  setUploadedImgUrl,
  setImgLoading,
  imgLoading,
  isEditing,
}) => {
  const inputRef = useRef(null);
  const handleImgChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setImgFile(selectedFile);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImgFile(droppedFile);
  };
  const handleRemoveImg = () => {
    setImgFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const uploadImgToCloudinary = async () => {
    try {
      setImgLoading(true);
      const data = new FormData();
      data.append("my_file", imgFile);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/admin/products/upload-img`,
        data
      );
      if (response.data.success) setUploadedImgUrl(response.data?.result?.url);
      setImgLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "image uploading error");
      setImgLoading(false);
    }
  };
  useEffect(() => {
    if (imgFile !== null) uploadImgToCloudinary();
  }, [imgFile]);
  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded p-4"
      >
        <Input
          id="imgUpload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImgChange}
          disabled={isEditing}
        />
        {!imgFile ? (
          <label
            htmlFor="imgUpload"
            className={`${
              isEditing ? "cursor-not-allowed opacity-20" : "cursor-pointer"
            } flex flex-col items-center justify-center h-32  `}
          >
            <UploadCloudIcon className="w-10 h10 text-muted-foreground mb-2" />
            <span>Drag & Drop or Click to upload image</span>
          </label>
        ) : imgLoading ? (
          <Skeleton className=" h-10 bg-gray-200" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imgFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImg}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImgUpload;
