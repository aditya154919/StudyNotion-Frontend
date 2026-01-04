
import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
});

export const apiConnector = ({
  method,
  url,
  body = null,
  headers = {},
  params = {},
}) => {
  return axiosInstance({
    method,
    url,
    data: body,
    headers,
    params,
  });
};
