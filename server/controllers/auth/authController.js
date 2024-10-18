import { User } from "../../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const register = async (req, res) => {
  const { fullname, password, confirmPassword, email } = req.body;
  if (!fullname || !password || !confirmPassword || !email) {
    return res
      .status(400)
      .json({ success: false, message: "all field are reqired" });
  }
  if (confirmPassword !== password) {
    return res.status(400).json({
      success: false,
      message: "password and confirm password are different",
    });
  }
  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exist!" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User({
      fullname,
      email,
      password: hashPassword,
    });
    await newUser.save();
    const { password: _, ...userData } = newUser._doc;
    res.status(201).json({
      userData,
      message: "account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    return res
      .status(400)
      .json({ success: false, message: "all field are reqired" });
  }
  try {
    const isUser = await User.findOne({ email });
    if (!isUser) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist!" });
    }
    const isPassword = await bcrypt.compare(password, isUser.password);
    if (!isPassword) {
      return res
        .status(400)
        .json({ success: false, message: "wrong password!" });
    }

    const Token = jwt.sign(
      { _id: isUser._id, fullname: isUser.fullname, email: isUser.email, role: isUser.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    const { password: _, ...userData } = isUser._doc;
    res
      
      .json({
        userData,
        message: "login successfully",
        success: true,
        Token 
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};



export { register, login };
