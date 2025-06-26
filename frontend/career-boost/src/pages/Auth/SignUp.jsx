import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Input from "@/components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { useUser } from "../../context/userContext"; 
import uploadImage from "../../utils/uploadImage";

const SignUp = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    profilePic: null,
  });
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();
  
  // Use the UserContext with register method
  const { register, isLoading } = useUser();

  // Validate individual fields
  const validateField = useCallback((name, value) => {
    const errors = {};
    
    switch (name) {
      case "fullName":
        if (!value || value.trim().length === 0) {
          errors.fullName = "Full name is required";
        } else if (value.trim().length < 2) {
          errors.fullName = "Full name must be at least 2 characters";
        }
        break;
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
        } else if (value.length < 8) {
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

  // Handle profile picture change
  const handleProfilePicChange = useCallback((image) => {
    setFormData(prev => ({ ...prev, profilePic: image }));
    // Clear general error when user makes changes
    if (error) setError(null);
  }, [error]);

  // Validate entire form
  const validateForm = useCallback(() => {
    const nameErrors = validateField("fullName", formData.fullName);
    const emailErrors = validateField("email", formData.email);
    const passwordErrors = validateField("password", formData.password);
    
    const allErrors = { ...nameErrors, ...emailErrors, ...passwordErrors };
    setFieldErrors(allErrors);
    
    return Object.keys(allErrors).length === 0;
  }, [formData, validateField]);

  // Handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      let profileImageUrl = "";

      // Upload image if present
      if (formData.profilePic) {
        try {
          const imgUploadRes = await uploadImage(formData.profilePic);
          profileImageUrl = imgUploadRes.imageUrl || "";
        } catch (uploadError) {
          console.error("Image upload error:", uploadError);
          setError("Failed to upload profile image. Please try again.");
          setIsUploading(false);
          return;
        }
      }

      setIsUploading(false);

      // Use the register function from UserContext
      await register({
        name: formData.fullName.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        profileImageUrl,
      });

      // Navigate to dashboard on successful registration
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Registration error:", error);
      setIsUploading(false);
      
      // Handle specific error cases
      if (error.response?.status === 409) {
        setError("An account with this email already exists.");
      } else if (error.response?.status === 429) {
        setError("Too many registration attempts. Please try again later.");
      } else if (error.code === "ERR_NETWORK") {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError(error.message || "Something went wrong. Please try again.");
      }
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" && !isLoading && !isUploading) {
      handleSignUp(e);
    }
  }, [isLoading, isUploading]);

  const isSubmitDisabled = isLoading || 
    isUploading || 
    Object.keys(fieldErrors).some(key => fieldErrors[key]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create an Account</h2>
        <p className="text-gray-600 mt-2">
          Join us today by entering your details below.
        </p>
      </div>

      <form onSubmit={handleSignUp} noValidate>
        <div className="mb-4">
          <ProfilePhotoSelector 
            image={formData.profilePic} 
            setImage={handleProfilePicChange}
            disabled={isLoading || isUploading}
          />
        </div>

        <div className="space-y-4">
          <div>
            <Input
              value={formData.fullName}
              onChange={({ target }) => handleInputChange("fullName", target.value)}
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
              disabled={isLoading || isUploading}
              autoComplete="name"
              aria-invalid={!!fieldErrors.fullName}
              aria-describedby={fieldErrors.fullName ? "name-error" : undefined}
            />
            {fieldErrors.fullName && (
              <p id="name-error" className="text-red-500 text-xs mt-1">
                {fieldErrors.fullName}
              </p>
            )}
          </div>

          <div>
            <Input
              value={formData.email}
              onChange={({ target }) => handleInputChange("email", target.value)}
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              disabled={isLoading || isUploading}
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
            <Input
              value={formData.password}
              onChange={({ target }) => handleInputChange("password", target.value)}
              label="Password"
              placeholder="Create a password (min 8 characters)"
              type="password"
              disabled={isLoading || isUploading}
              autoComplete="new-password"
              onKeyDown={handleKeyDown}
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? "password-error" : undefined}
            />
            {fieldErrors.password && (
              <p id="password-error" className="text-red-500 text-xs mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>
        </div>

        {/* General error message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="mt-6">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitDisabled}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading image...
              </>
            ) : isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-medium text-primary hover:text-primary/80 underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              disabled={isLoading || isUploading}
            >
              Sign in
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;