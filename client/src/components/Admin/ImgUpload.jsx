import React, { useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";

const ImgUpload = ({
  imgFile,
  setImgFile,
  uploadedImgUrl,
  setUploadedImgUrl,
}) => {
  const inputRef = useRef(null);
  const handleImgChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setImgFile(selectedFile);
  };
  const handleDragOver = (e) => {
     e.preventDefault()
  };
  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files?.[0]
     if(droppedFile) setImgFile(droppedFile)
  };
const handleRemoveImg = ()=>{
    setImgFile(null)
    if(inputRef.current){
        inputRef.current.value = "";
    }
}
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
        />
        {!imgFile ? (
          <label
            htmlFor="imgUpload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer "
          >
            <UploadCloudIcon className="w-10 h10 text-muted-foreground mb-2" />
            <span>Drag & Drop or Click to upload image</span>
          </label>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
                <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imgFile.name}</p>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImg} >
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
