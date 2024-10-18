import { Address } from "../../models/addressModel.js";

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;
    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "all field are required!",
      });
    }
    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newAddress.save();
    res
      .status(201)
      .json({ success: true, data: newAddress, message: "address added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error occurred while adding address",
    });
  }
};
const getAllAdress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id required!",
      });
    }
    const address = await Address.find({ userId });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error occurred while finding address",
    });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const { formData } = req.body;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data!",
      });
    }

    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      formData,
      { new: true }
    );
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: address,
      message: "updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error occurred while updating address",
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data!",
      });
    }
    const address = await Address.findOneAndDelete({ _id: addressId, userId });
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error occurred while deleting address",
    });
  }
};

export { addAddress, deleteAddress, updateAddress, getAllAdress };
