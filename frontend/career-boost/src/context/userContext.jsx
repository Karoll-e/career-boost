import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

// Create the context
export const UserContext = createContext(null);

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Auth states enum for better state management
const AUTH_STATES = {
  LOADING: 'loading',
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
  ERROR: 'error'
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authState, setAuthState] = useState(AUTH_STATES.LOADING);
  const [error, setError] = useState(null);

  // Utility functions
  const getStoredToken = useCallback(() => {
    try {
      return localStorage.getItem("token");
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return null;
    }
  }, []);

  const getStoredUser = useCallback(() => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      return null;
    }
  }, []);

  const setStoredUser = useCallback((userData) => {
    try {
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  }, []);

  // Fetch user profile from API
  const fetchUserProfile = useCallback(async () => {
    try {
      setAuthState(AUTH_STATES.LOADING);
      setError(null);
      
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
      const userData = response.data;
      
      setUser(userData);
      setStoredUser(userData);
      setAuthState(AUTH_STATES.AUTHENTICATED);
      
      return userData;
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setError(error.response?.data?.message || "Failed to load user profile");
      setAuthState(AUTH_STATES.ERROR);
      
      // Clear invalid data
      clearUser();
      throw error;
    }
  }, [setStoredUser]);

  // Initialize user on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = getStoredToken();
      
      if (!token) {
        setAuthState(AUTH_STATES.UNAUTHENTICATED);
        return;
      }

      // Try to use cached user data first
      const cachedUser = getStoredUser();
      if (cachedUser) {
        setUser(cachedUser);
        setAuthState(AUTH_STATES.AUTHENTICATED);
        
        // Optionally refresh user data in background
        try {
          await fetchUserProfile();
        } catch (error) {
          // If refresh fails but we have cached data, continue with cached data
          console.warn("Failed to refresh user data, using cached data");
        }
      } else {
        // No cached data, fetch from API
        try {
          await fetchUserProfile();
        } catch (error) {
          // If fetch fails and no cached data, user is unauthenticated
          setAuthState(AUTH_STATES.UNAUTHENTICATED);
        }
      }
    };

    initializeAuth();
  }, [getStoredToken, getStoredUser, fetchUserProfile]);

  // Update user data (used after login/profile updates)
  const updateUser = useCallback((userData) => {
    if (!userData) {
      console.error("updateUser called with invalid data");
      return;
    }

    setUser(userData);
    setAuthState(AUTH_STATES.AUTHENTICATED);
    setError(null);

    // Store token if provided
    if (userData.token) {
      try {
        localStorage.setItem("token", userData.token);
      } catch (error) {
        console.error("Error storing token:", error);
      }
    }

    // Store user data (without token for security)
    const userDataToStore = { ...userData };
    delete userDataToStore.token; // Don't store token in user object
    setStoredUser(userDataToStore);
  }, [setStoredUser]);

  // Clear user data (logout)
  const clearUser = useCallback(() => {
    setUser(null);
    setAuthState(AUTH_STATES.UNAUTHENTICATED);
    setError(null);

    // Clear stored data
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error clearing stored data:", error);
    }
  }, []);

  // Login function
  const login = useCallback(async (credentials) => {
    try {
      setAuthState(AUTH_STATES.LOADING);
      setError(null);

      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, credentials);
      const userData = response.data;

      updateUser(userData);
      return userData;
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      setAuthState(AUTH_STATES.ERROR);
      throw error;
    }
  }, [updateUser]);

  // Register function
  const register = useCallback(async (registrationData) => {
    try {
      setAuthState(AUTH_STATES.LOADING);
      setError(null);

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, registrationData);
      const userData = response.data;

      // If registration returns user data with token, automatically log them in
      if (userData.token) {
        updateUser(userData);
      } else {
        // If registration doesn't auto-login, just set state back to unauthenticated
        setAuthState(AUTH_STATES.UNAUTHENTICATED);
      }

      return userData;
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
      setAuthState(AUTH_STATES.ERROR);
      throw error;
    }
  }, [updateUser]);

  // Logout function
  const logout = useCallback(async () => {
    try {
      // Optional: Call logout endpoint
      await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
    } catch (error) {
      console.error("Logout API call failed:", error);
      // Continue with local logout even if API call fails
    } finally {
      clearUser();
      // Use window.location for navigation (works without Router context)
      window.location.href = "/";
    }
  }, [clearUser]);

  // Refresh user data
  const refreshUser = useCallback(async () => {
    try {
      return await fetchUserProfile();
    } catch (error) {
      console.error("Failed to refresh user:", error);
      throw error;
    }
  }, [fetchUserProfile]);

  // Computed values
  const isAuthenticated = authState === AUTH_STATES.AUTHENTICATED;
  const isLoading = authState === AUTH_STATES.LOADING;
  const isError = authState === AUTH_STATES.ERROR;

  const contextValue = {
    // User data
    user,
    
    // Auth state
    isAuthenticated,
    isLoading,
    isError,
    authState,
    error,
    
    // Actions
    login,
    register,
    logout,
    updateUser,
    clearUser,
    refreshUser,
    
    // Utility functions
    hasRole: useCallback((role) => {
      return user?.roles?.includes(role) || user?.role === role;
    }, [user]),
    
    hasPermission: useCallback((permission) => {
      return user?.permissions?.includes(permission);
    }, [user]),
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;