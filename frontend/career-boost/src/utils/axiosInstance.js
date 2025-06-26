import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // Reduced from 80s to 30s - more reasonable timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Token management utilities
const getToken = () => localStorage.getItem("token");
const removeToken = () => localStorage.removeItem("token");

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    // Add request timestamp for debugging
    config.metadata = { startTime: Date.now() };
    
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Add response time logging for debugging
    if (response.config.metadata) {
      const duration = Date.now() - response.config.metadata.startTime;
      console.log(`API call to ${response.config.url} took ${duration}ms`);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle common errors globally
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Handle unauthorized - clear token and redirect
          removeToken();
          
          // Avoid infinite redirects by checking current path
          if (window.location.pathname !== "/" && window.location.pathname !== "/login") {
            // Store the attempted URL for redirect after login
            localStorage.setItem("redirectAfterLogin", window.location.pathname);
            window.location.href = "/";
          }
          break;
          
        case 403:
          console.error("Access forbidden. You don't have permission to access this resource.");
          // Optionally show a toast notification
          break;
          
        case 404:
          console.error("Resource not found:", originalRequest.url);
          break;
          
        case 422:
          // Validation errors - let component handle these
          console.warn("Validation error:", data.message || data.errors);
          break;
          
        case 429:
          console.error("Too many requests. Please slow down.");
          // Optionally implement retry logic with exponential backoff
          break;
          
        case 500:
        case 502:
        case 503:
        case 504:
          console.error("Server error. Please try again later.", {
            status,
            url: originalRequest.url,
            message: data?.message
          });
          break;
          
        default:
          console.error(`HTTP Error ${status}:`, data?.message || error.message);
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please check your internet connection and try again.");
    } else if (error.code === "ERR_NETWORK") {
      console.error("Network error. Please check your internet connection.");
    } else if (error.code === "ERR_CANCELED") {
      console.log("Request was canceled");
      // Don't log this as an error since it's intentional
      return Promise.reject(error);
    } else {
      console.error("Unexpected error:", error.message);
    }
    
    return Promise.reject(error);
  }
);

// Helper function to create requests with loading states
export const createApiCall = (apiCall) => {
  return async (...args) => {
    try {
      const response = await apiCall(...args);
      return { data: response.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: error.response?.data?.message || error.message || "An unexpected error occurred"
      };
    }
  };
};

// Retry utility for failed requests
export const retryRequest = async (requestFn, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await requestFn();
      return result;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      // Only retry on network errors or 5xx errors
      if (
        error.code === "ERR_NETWORK" ||
        error.code === "ECONNABORTED" ||
        (error.response && error.response.status >= 500)
      ) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      } else {
        throw error;
      }
    }
  }
};

export default axiosInstance;