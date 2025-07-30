// Update your utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://namaste-jobs-backend.onrender.com",
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (error.message === "Network Error") {
      return Promise.reject({ 
        message: "Server is unavailable. Please try again later." 
      });
    }
    
    // Handle timeout errors
    if (error.code === "ECONNABORTED") {
      return Promise.reject({ 
        message: "Request timed out. Please try again." 
      });
    }
    
    // Return server error message
    return Promise.reject(error.response?.data || { 
      message: "An unexpected error occurred" 
    });
  }
);

export default api;
