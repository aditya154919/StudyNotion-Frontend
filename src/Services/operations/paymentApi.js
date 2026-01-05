import toast from "react-hot-toast";
import { PAYMENTAPI } from "../api";
import { apiConnector } from "../apiconnector";
import  Img from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading} from "../../slices/Courseslice"


const {CREATEORDER_API,VERIFYPAYMENT_API,SENDMAILPAYMENT_API}= PAYMENTAPI

function loadScript(src){
  return new Promise((resolve)=>{
    const script = document.createElement("script");
    script.src = src;

    script.onload=()=>{
        resolve(true)
    }
    script.onerror=()=>{
        resolve(false)
    }
    document.body.appendChild(script)
  })
}

export const buyCourse = async(token,courses,userDetails,navigate,dispatch)=>{
    const toastId = toast.loading("Loading...");
    
    try {
        //load script
        // console.log("thik hu",token,"huh");
        console.log("course",courses)
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
            // console.log("helkc")
            toast.error("Razorpay SDK failed to load")
            return;
        }
        // //initiate the order
        const orderResponse = await apiConnector({
            method:"POST",
            url:CREATEORDER_API,
            body:courses,
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        // console.log(" huhvjv")
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
            // console.log(orderResponse.data.message);
        }
        //    console.log(orderResponse.data)

         const option = {
            key:"rzp_test_Rmn6CDzCI0s7ZL",
            currency:"INR",
            amount:`${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"StudyNotion",
            decription:"Thank You for Purchasing Course",
            image:Img,
            prefill:{
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler: function(response){
                console.log("go to send mail")
                sendPaymentSuccessEmail(response,orderResponse.data.data.amount,token)
                //verify 
                console.log("go to verify")
                 verifyPayment({...response,courses},token,navigate,dispatch)
            }
            
        }
        const paymentObject = new window.Razorpay(option);
             paymentObject.open();
  
        // console.log("option",option)
    } catch (error) {
        // console.log("Error",error.response.data.message)
         console.log("PAYMENT API ERROR.....", error.response.data.message);
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
}

async function sendPaymentSuccessEmail(response, amount, token) {
    // console.log("send mail")
    try{
        await apiConnector({
            method:"POST",
            url:SENDMAILPAYMENT_API,
            body:{
                orderId:response.razorpay_order_id,
                paymentId:response.razorpay_payment_id,
                amount
            },
            headers:{
                Authorization:`Bearer ${token}`
            }

        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    // console.log("verify")
    try{
        const response  = await apiConnector({
          method:"POST",
          url:VERIFYPAYMENT_API,
          body:bodyData,
          headers:{
            Authorization:`Bearer ${token}`
          }

        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successfull");
        navigate("/dashboard/enrolled-courses");
        // dispatch(resetCart());
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}