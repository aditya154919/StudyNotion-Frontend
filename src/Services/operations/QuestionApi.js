import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector.js";
import { QUESTION } from "../api";
import { setQuestion } from "../../slices/Question.js";

const {
  ADDQUESTIONAPI,
  UPDATEQUESTIONAPI,
  PUBLISHQUESTIONAPI,
  INSTRUCTOEQUESTIONAPI,
  DELETEQUESTIONAPI,
  GETTAGSAPI
} = QUESTION;

export const addQuestion = async (questionData, token) => {
  let response = null;
  const toastId = toast.loading("Loading...");
  try {
    const res = await apiConnector({
      method: "POST",
      url: ADDQUESTIONAPI,
      body: questionData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.data.success) {
      throw new Error("Error", res.data.message);
    }

    console.log("Data", res.data.data);
    response = res.data.data;
  } catch (error) {
    console.log("Error", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return response;
};

export const updateQuestion = async (data, token) => {
  let response = null;
  const toastId = toast.loading("Loading...");

  try {
    const res = await apiConnector({
      method: "POST",
      url: UPDATEQUESTIONAPI,
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.data.success) {
      throw new Error("Error", res.data.message);
    }

    console.log("Data", res.data.data);
    response = res.data;
  } catch (error) {
    console.log("Error", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return response;
};

export const publishQuestion = async (formData, token) => {
  let response = null;
  const toastId = toast.loading("Loading...");
  try {
    const res = await apiConnector({
      method: "POST",
      url: PUBLISHQUESTIONAPI,
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.data.success) {
      throw new Error("Error", res.data.message);
    }

    console.log("Data", res.data.data);
    response = res.data;
  } catch (error) {
    console.log("Error", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return response;
};

export const FetchInstructorQuestion = async (token) => {
  let response = null;
  const toastId = toast.loading("Loading...");
  try {
    const res = await apiConnector({
      method: "POST",
      url: INSTRUCTOEQUESTIONAPI,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Data", res.data.data);
    response = res.data.data;
    setQuestion(res.data.data);
  } catch (error) {
    console.log("Error", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return response;
};

export const deleteProblem = async (QuestionId, token) => {
  const toastId = toast.loading("Loading..");
  let response = null;
  try {
    const res = await apiConnector({
      method: "DELETE",
      url: DELETEQUESTIONAPI,
      body: {
        QuestionId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.data.success) {
      throw new Error("Error", res.data.message);
    }
    response = res.data;
  } catch (error) {
    console.log("Error", error);
    toast.error(error.response?.data?.message || "Something went wrong");
  }
  toast.dismiss(toastId);
  return response;
};

export const getTag = async()=>{
  let response = null;
  const toastId = toast.loading("Loading...");
  try {
    const res  = await apiConnector({
      method:"POST",
      url:GETTAGSAPI,
    });
    console.log("Data", res.data.data);
    response = res.data.data;
  } catch (error) {
    console.log("Error", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return response;
};
