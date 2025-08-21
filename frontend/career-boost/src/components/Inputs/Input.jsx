import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <div className="input-box relative">
        <input
          htmlFor="password"
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full bg-gray-100 outline-none rounded-lg p-3 pr-12" // Added pr-12 for right padding
          value={value}
          onChange={(e) => onChange(e)}
        />
        {type === "password" && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {showPassword ? (
              <Eye
                size={22}
                className="text-primary cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            ) : (
              <EyeOff
                size={22}
                className="text-slate-400 cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
