import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Input from "@/components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import { useUser } from "../../context/userContext"; // Import the context

const Login = ({ onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const navigate = useNavigate();
  
  // Use the UserContext
  const { login, isLoading } = useUser();

  // Function to get user-friendly error messages
  const getUserFriendlyError = (error) => {
    // Log the actual error for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.error("Actual error:", error);
    }

    // Check for specific error types we want to handle
    if (error.response?.status === 401) {
      return "Invalid email or password. Please try again.";
    }
    
    if (error.response?.status === 429) {
      return "Too many login attempts. Please try again later.";
    }
    
    if (error.code === "ERR_NETWORK") {
      return "Connection error. Please check your internet and try again.";
    }

    // For any other server errors, show a generic message
    return "Unable to sign in right now. Please try again later.";
  };

  // Validate individual fields
  const validateField = useCallback((name, value) => {
    const errors = {};
    
    switch (name) {
      case "email":
        if (!value) {
          errors.email = "Email is required";
        } else if (!validateEmail(value)) {
          errors.email = "Please enter a valid email address";
        }
        break;
      case "password":
        if (!value) {
          errors.password = "Password is required";
        } else if (value.length < 6) {
          errors.password = "Password must be at least 8 characters";
        }
        break;
      default:
        break;
    }
    
    return errors;
  }, []);

  // Handle input changes with validation
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field-specific error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: "" }));
    }
    
    // Real-time validation
    const errors = validateField(field, value);
    setFieldErrors(prev => ({ ...prev, ...errors }));
    
    // Clear general error when user starts correcting
    if (error) setError(null);
  }, [fieldErrors, error, validateField]);

  // Validate entire form
  const validateForm = useCallback(() => {
    const emailErrors = validateField("email", formData.email);
    const passwordErrors = validateField("password", formData.password);
    
    const allErrors = { ...emailErrors, ...passwordErrors };
    setFieldErrors(allErrors);
    
    return Object.keys(allErrors).length === 0;
  }, [formData, validateField]);

  // Handle form submission - with error filtering
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setError(null);

    try {
      // Use the login function from UserContext
      await login({
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      });

      // Check if there's a redirect URL stored
      const redirectUrl = localStorage.getItem("redirectAfterLogin");
      if (redirectUrl) {
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectUrl);
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      // Use our custom error handler instead of showing server errors
      const userFriendlyMessage = getUserFriendlyError(error);
      setError(userFriendlyMessage);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" && !isLoading) {
      handleLogin(e);
    }
  }, [isLoading]);

  // Toggle password visibility
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>

      <form onSubmit={handleLogin} noValidate>
        <div className="space-y-4">
          <div>
            <Input
              value={formData.email}
              onChange={({ target }) => handleInputChange("email", target.value)}
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              disabled={isLoading}
              autoComplete="email"
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
            />
            {fieldErrors.email && (
              <p id="email-error" className="text-red-500 text-xs mt-1">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <Input
                value={formData.password}
                onChange={({ target }) => handleInputChange("password", target.value)}
                label="Password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                disabled={isLoading}
                autoComplete="current-password"
                onKeyDown={handleKeyDown}
                aria-invalid={!!fieldErrors.password}
                aria-describedby={fieldErrors.password ? "password-error" : undefined}
              />
              {/* <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                disabled={isLoading}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button> */}
            </div>
            {fieldErrors.password && (
              <p id="password-error" className="text-red-500 text-xs mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>
        </div>

        {/* User-friendly error message only */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="mt-6 space-y-4">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || Object.keys(fieldErrors).some(key => fieldErrors[key])}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="text-center">
            {/* <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-500 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              disabled={isLoading}
            >
              Forgot your password?
            </button> */}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="font-medium text-primary hover:text-primary/80 underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;