import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";
import { BASE_URL } from "../utils/constants";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
});

// here we can add the token to the request headers
axiosInstance.interceptors.request.use(
  (req: InternalAxiosRequestConfig) => {
    return req;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

// here we can handle the response and the error
axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    return res;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
