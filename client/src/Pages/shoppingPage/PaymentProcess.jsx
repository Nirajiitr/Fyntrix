import { savePayment } from "@/store/shop/order-slice";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate} from "react-router-dom";


const PaymentProcess=()=> {
    const navigate = useNavigate();
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");
   const dispatch = useDispatch()
 
    useEffect(() => {
        if (sessionId) {
          const orderId = JSON.parse(sessionStorage.getItem("orderId"))
         
          dispatch(savePayment({ sessionId, orderId })).then(data=>{
            if(data?.payload?.success){
                sessionStorage.removeItem("orderId")
                 navigate("/shop/payment/success")
                 
            }else{
                navigate("/shop/payment/cancel")
            }
          })
          
        }
      }, [sessionId, dispatch]);
    
  return (
    <div>PaymentProcess....</div>
  )
}

export default PaymentProcess