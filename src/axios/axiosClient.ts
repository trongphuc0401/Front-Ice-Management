import axios from "axios";
import { setupInterceptorAxios } from "../config/interceptorAxios";

const instanceConfig = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
  httpAgent: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosClient = setupInterceptorAxios(instanceConfig);
export default axiosClient;
