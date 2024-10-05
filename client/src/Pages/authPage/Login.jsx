import CommonForm from "@/components/common/Form";
import { loginFormControls} from "@/config";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link} from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(formData))
  };
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
      Login to Fyntrix - Your Shopping Awaits
      </h1>
      {
         <CommonForm formControls={loginFormControls} formData={formData} setFormData={setFormData} buttonText={"Sign Up"} onSubmit={handleSubmit} />
      }
      <div className="mt-2">
    <Link to="/auth/register" className=' font-medium text-primary hover:underline'>Don't have an account</Link>
    </div>
    </div>
  );
};

export default Login;
