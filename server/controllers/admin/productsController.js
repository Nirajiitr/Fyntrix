import { imagUploadUtil } from "../../config/cloudinary.js";
import { Product } from "../../models/productModel.js";

const handleImageUpload = async (req, res) => {
  try {
    const base64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + base64;
    const result = await imagUploadUtil(url);
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error occurred while uploading image",
      });
  }
};

const setProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    if(!image || !title || !description || !category || !brand || !price || !salePrice || !totalStock){
      return res.status(400).json({success: false, message: "all field are required"})
    }
    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error occurred while saving product",
    });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const productList = await Product.find({});
    res.status(200).json({ success: true, data: productList });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error occurred while finding products",
    });
  }
};
const editProduct = async (req, res) => {
  const { id } = req.params;
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
  } = req.body;
  try {
    let isProduct = await Product.findById(id);
    if (!isProduct) {
      return res
        .status(404)
        .json({ success: false, message: "product not found!" });
    }

    isProduct.image = image || isProduct.image;
    isProduct.title = title || isProduct.title;
    isProduct.description = description || isProduct.description;
    isProduct.category = category || isProduct.category;
    isProduct.brand = brand || isProduct.brand;
    isProduct.price = price === "" ? 0 : price || isProduct.price;
    isProduct.salePrice =
      salePrice === "" ? 0 : salePrice || isProduct.salePrice;
    isProduct.totalStock = totalStock || isProduct.totalStock;
    await isProduct.save();
    res
      .status(200)
      .json({ success: true, message: "Product edited successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error occurred while editing product",
    });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const isDeleteProduct = await Product.findByIdAndDelete(id);
    if (!isDeleteProduct) {
      return res
        .status(404)
        .json({ success: false, message: "product not found!" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error occurred while deleting product",
    });
  }
};

export {
  handleImageUpload,
  setProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
};
