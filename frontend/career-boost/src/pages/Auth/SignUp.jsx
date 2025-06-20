import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Input from "@/components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";

const SignUp = ({ onSwitchToLogin }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold text-black">Create an Account</h3>
        <p className="text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>
      </div>

      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John"
            type="text"
          />

          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Create a password (min 8 characters)"
            type="password"
          />
        </div>

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <Button type="submit" className="w-full">
          Sign up
        </Button>

        <p className="text-[13px] text-slate-800 mt-3">
          Already an account?{" "}
          <span
            className="font-medium text-primary underline cursor-pointer"
            onClick={onSwitchToLogin}
          >
            Login
          </span>
        </p>
      </form>
    </div>
    // <div className="w-full max-w-md mx-auto">
    //   <div className="text-center mb-6">
    //     <h2 className="text-2xl font-bold text-gray-900">Create account</h2>
    //     <p className="text-gray-600 mt-2">Join us and get started today</p>
    //   </div>

    //   <div className="space-y-4">
    //     <div className="grid grid-cols-2 gap-4">
    //       <div>
    //         <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
    //           First name
    //         </label>
    //         <input
    //           id="firstName"
    //           name="firstName"
    //           type="text"
    //           required
    //           value={formData.firstName}
    //           onChange={handleChange}
    //           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    //           placeholder="John"
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
    //           Last name
    //         </label>
    //         <input
    //           id="lastName"
    //           name="lastName"
    //           type="text"
    //           required
    //           value={formData.lastName}
    //           onChange={handleChange}
    //           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    //           placeholder="Doe"
    //         />
    //       </div>
    //     </div>

    //     <div>
    //       <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
    //         Email address
    //       </label>
    //       <input
    //         id="email"
    //         name="email"
    //         type="email"
    //         required
    //         value={formData.email}
    //         onChange={handleChange}
    //         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    //         placeholder="john@example.com"
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
    //         Password
    //       </label>
    //       <input
    //         id="password"
    //         name="password"
    //         type="password"
    //         required
    //         value={formData.password}
    //         onChange={handleChange}
    //         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    //         placeholder="Create a password"
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
    //         Confirm password
    //       </label>
    //       <input
    //         id="confirmPassword"
    //         name="confirmPassword"
    //         type="password"
    //         required
    //         value={formData.confirmPassword}
    //         onChange={handleChange}
    //         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    //         placeholder="Confirm your password"
    //       />
    //     </div>

    //     <div className="flex items-center">
    //       <input
    //         id="agreeToTerms"
    //         name="agreeToTerms"
    //         type="checkbox"
    //         checked={formData.agreeToTerms}
    //         onChange={handleChange}
    //         className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    //       />
    //       <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
    //         I agree to the{" "}
    //         <button type="button" className="text-blue-600 hover:text-blue-500">
    //           Terms and Conditions
    //         </button>
    //       </label>
    //     </div>

    //     <Button onClick={handleSubmit} className="w-full">
    //       Create Account
    //     </Button>
    //   </div>

    //   <div className="mt-6 text-center">
    //     <p className="text-sm text-gray-600">
    //       Already have an account?{" "}
    //       <button
    //         type="button"
    //         onClick={onSwitchToLogin}
    //         className="text-blue-600 hover:text-blue-500 font-medium"
    //       >
    //         Sign in
    //       </button>
    //     </p>
    //   </div>
    // </div>
  );
};

export default SignUp;
