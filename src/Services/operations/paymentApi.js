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
        const courseIds = courses.map((course) =>
            typeof course === "string" ? course : course?._id || course?.courseId,
        );
        if (!courseIds.length || courseIds.some((courseId) => !courseId)) {
            throw new Error("Please select a valid course before checkout.");
        }

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
            throw new Error("Razorpay checkout could not be loaded. Please try again.");
        }
        const orderResponse = await apiConnector({
            method:"POST",
            url:CREATEORDER_API,
            body:courseIds,
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message || "Could not create a payment order.");
        }

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
                sendPaymentSuccessEmail(response,orderResponse.data.data.amount,token)
                 verifyPayment({...response,courses: courseIds},token,navigate,dispatch)
            }
            
        }
        const paymentObject = new window.Razorpay(option);
             paymentObject.open();
  
    } catch (error) {
        console.error("PAYMENT API ERROR:", error);
        toast.error(
            error.response?.data?.message ||
            error.message ||
            "Could not start checkout. Please try again.",
        );
    } finally {
        toast.dismiss(toastId);
    }
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
            throw new Error(response.data.message || "Payment verification failed.");
        }
        toast.success("Payment successful. Your course is ready.");
        navigate("/dashboard/enrolled-courses");
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error(
            error.response?.data?.message ||
            error.message ||
            "Payment was received, but verification could not be completed. Please contact support.",
        );
    } finally {
        toast.dismiss(toastId);
        dispatch(setPaymentLoading(false));
    }
}