import { apiConnector } from "../apiconnector";
import { STREAM } from "../api";
import { toast } from "react-hot-toast";

const errorMessage = (error, fallback) =>
  error.response?.data?.message || error.message || fallback;

export const createStreamRoom = async (payload, token) => {
  const toastId = toast.loading("Creating live class...");
  try {
    const response = await apiConnector({
      method: "POST",
      url: STREAM.CREATESTREAM_API,
      body: payload,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.data.success) {
      throw new Error(response.data.message || "Could not create live class");
    }
    toast.success("Live class scheduled");
    return response.data;
  } catch (error) {
    toast.error(errorMessage(error, "Could not create live class"));
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

export const getStreamData = async (streamId, token) => {
  try {
    const response = await apiConnector({
      method: "POST",
      url: STREAM.GETSTREAMDATA_API,
      body: { streamId },
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.data.success) {
      throw new Error(response.data.message || "Could not load live class");
    }
    return response.data;
  } catch (error) {
    if ([403, 410].includes(error.response?.status)) {
      return { accessRevoked: true };
    }
    throw error;
  }
};

export const getStreamStatus = async (streamId, token) => {
  try {
    const response = await apiConnector({
      method: "POST",
      url: STREAM.GETSTREAMSTATUS_API,
      body: { streamId },
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.data.success) {
      throw new Error(
        response.data.message || "Could not refresh live-class status",
      );
    }
    return response.data;
  } catch (error) {
    if ([403, 410].includes(error.response?.status)) {
      return { accessRevoked: true };
    }
    throw error;
  }
};

export const getToken = async (roomId, token) => {
  const response = await apiConnector({
    method: "POST",
    url: STREAM.GETTOKEN_API,
    body: { roomId },
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.data.success || !response.data.token) {
    throw new Error(response.data.message || "Could not connect to live class");
  }
  return response.data.token;
};

export const getLiveRoom = async (token) => {
  const response = await apiConnector({
    method: "POST",
    url: STREAM.GETENROLLEDSTUDENTROOM,
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.data.success) {
    throw new Error(response.data.message || "Could not load live classes");
  }
  return response.data.data || [];
};

export const startStream = async (streamId, token) => {
  const response = await apiConnector({
    method: "POST",
    url: STREAM.STARTSTREAM_API,
    body: { streamId },
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.data.success) {
    throw new Error(response.data.message || "Could not start live class");
  }
  return response.data;
};

export const joinStreamAttendance = async (streamId, token) => {
  const response = await apiConnector({
    method: "POST",
    url: STREAM.ATTENDANCEJOIN_API,
    body: { streamId },
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.data.success) {
    throw new Error(response.data.message || "Could not record attendance");
  }
  return response.data;
};

export const leaveStreamAttendance = async (streamId, token) => {
  const response = await apiConnector({
    method: "POST",
    url: STREAM.ATTENDANCELEAVE_API,
    body: { streamId },
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.data.success) {
    throw new Error(response.data.message || "Could not update attendance");
  }
  return response.data;
};

export const leaveStream = async (streamId, token, recordingFile) => {
  const body = new FormData();
  body.append("streamId", streamId);
  if (recordingFile) body.append("recording", recordingFile);

  const response = await apiConnector({
    method: "POST",
    url: STREAM.LEAVESTREAM_API,
    body,
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.data.success) {
    throw new Error(response.data.message || "Could not leave live class");
  }
  return response.data;
};

export const endStream = async (streamId, token, recordingFile) => {
  const body = new FormData();
  body.append("streamId", streamId);
  if (recordingFile) body.append("recording", recordingFile);

  const response = await apiConnector({
    method: "POST",
    url: STREAM.ENDSTREAM_API,
    body,
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.data.success) {
    throw new Error(response.data.message || "Could not end live class");
  }
  return response.data;
};
