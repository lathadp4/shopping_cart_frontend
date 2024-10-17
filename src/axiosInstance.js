import Axios from "axios";
import { serverPath } from "./pages/Constants/Constants";

const axiosInstance = () => {
  const headers = {};

  const instance = Axios.create({
    baseURL: serverPath,
    headers,
  });

  // Request interceptor to add the access token
  instance.interceptors.request.use((req) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
  });

  // Response interceptor for error handling
  instance.interceptors.response.use(
    (response) => response, // Directly return the response for success
    (error) => {
      const status = error?.response?.status;
      const message = error?.response?.data?.message || "An error occurred";

      // Handle different status codes
      switch (status) {
        case 401:
          alert("Unauthorized access. Please log in again.");
          break;
        case 403:
          alert("Forbidden. You don't have permission to access this resource.");
          break;
        case 500:
          alert(message);
          break;
        default:
          alert(message); // For any other error
          break;
      }

      // Reject the promise with the error
      // return Promise.reject(error);
    }
  );

  return instance;
};

export default axiosInstance;
