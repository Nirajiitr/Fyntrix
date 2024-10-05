import CommonForm from "@/components/common/Form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((result) => {
      if (result?.payload?.userData) {
        navigate("/auth/login");
      }
    });
  };
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Join Fyntrix - Start Your Shopping Journey
      </h1>
      {
        <CommonForm
          formControls={registerFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Sign Up"}
          onSubmit={handleSubmit}
        />
      }
      <div className="mt-2">
        <Link
          to="/auth/login"
          className=" font-medium text-primary hover:underline"
        >
          Already have an account
        </Link>
      </div>
    </div>
  );
};

export default Register;
