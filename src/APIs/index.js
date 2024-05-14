import axios from "axios";
import { BASE_URL } from "../utils/constants";

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
});

// here we can add the token to the request headers
AxiosInstance.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    Promise.reject(err);
  }
);

// here we can handle the response and the error
AxiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    Promise.reject(err);
  }
);

export default AxiosInstance;
