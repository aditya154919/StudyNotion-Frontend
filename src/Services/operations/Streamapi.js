import { apiConnector } from "../apiconnector";
import {STREAM} from "../api"
import  { toast } from "react-hot-toast";


const {
  CREATESTREAM_API,
  GETSTREAMDATA_API,
  GETTOKEN_API,
  GETENROLLEDSTUDENTROOM,
  SENDNOTIFICATION_API,
  ENDSTREAM_API,
  UPLOADRECORDING_API
} = STREAM
export const createStreamRoom = async (payload, token) => {
  let response = null;
  const toastId = toast.loading("Loading...");
  try {
    const result = await apiConnector({
      method: "POST",
      url: CREATESTREAM_API,
      body: payload,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!result.data.success) {
      throw new Error("streamRoom not created");
    }
    response = result.data;
    toast.success("Room created");
    console.log("Room created success", result.data);
  } catch (error) {
    console.log("ERROR jh", error.message);
  }
  toast.dismiss(toastId);
  return response;
};

export const getStreamData = async(streamId,token) =>{
  let response = null;
  
  try {
    const res = await apiConnector({
      method:"POST",
      url:GETSTREAMDATA_API,
      body:{streamId:streamId},
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    if(!res.data.success){
      throw new Error("Data not fetched")
    }
    console.log("data",res.data)
    response = res.data;
    
  } catch (error) {
    console.log("Error",error.message)
  }
  return response
}

export const getToken = async(roomId,name)=>{
  let response = null;
  try {
    const res = await apiConnector({
      method:"POST",
      url:GETTOKEN_API,
      body:{roomId:roomId,name:name},

    })
    if(!res.data.success){
      throw new Error("Data not fetched")
    }
    response = res.data.token
  } catch (error) {
    console.log("Error...",error.message)
  }
  return response
}

export const getLiveRoom = async(token)=>{
  let response = null;
  try {
    const res = await apiConnector({
    method:"POST",
    url:GETENROLLEDSTUDENTROOM,
    headers:{
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.data.success) {
      throw new Error("streamRoom not found",res.data.message);
      console.log("Error hai",res.data.message)
    }
    response = res.data.data;
    console.log("Room found success", res.data.data);
  } catch (error) {
    console.log("Error...",error)
  }
  return response;
}

export const sentNotification = async(roomId,token,courseId)=>{
  let response = null;
  try {
    const res = await apiConnector({
      method:"POST",
      url:SENDNOTIFICATION_API,
      body:{roomId:roomId,courseId:courseId},
      headers:{
        Authorization: `Bearer ${token}`
      }
    })

    if(!res.data.success){
      throw new Error(res.data.message)
    }
    response = res.data.data
    console.log("Res",res.data.data)
  } catch (error) {
    console.log("Error...",error)
  }
  return response
}

export const endStream = async(roomId,token)=>{
  const toastId = toast.loading("Loading...")
  try {
    const res = await apiConnector({
      method:"POST",
      url:ENDSTREAM_API,
      body:{roomId:roomId},
      headers:{
        Authorization:`Bearer ${token}`
      }
    })

    if(!res.data.success){
      throw new Error(res.data.message)
    }
  } catch (error) {
    console.log("Error...",error)
  }
  toast.dismiss();
}

export const uploadRecording = async (
  FormData,token
) => {
 
 const res =  await apiConnector({
    method: "POST",
    url: UPLOADRECORDING_API,
    body: FormData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if(!res.data.success){
    throw new Error("error",res.data.message)
  }
};
