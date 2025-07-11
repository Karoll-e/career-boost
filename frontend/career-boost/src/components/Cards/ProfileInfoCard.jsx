import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/dashboard");
  };

  return (
    user && (
      <div className="flex items-center">
        <img
          src={user.profileImageUrl}
          alt=""
          className="size-10 bg-gray-300 rounded-full mr-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleProfileClick}
        />
        <div>
          <div 
            className="text-[15px] text-black font-bold leading-3 cursor-pointer hover:text-gray-400 transition-colors"
            onClick={handleProfileClick}
          >
            {user.name || ""}
          </div>
          <button
            className="overflow-hidden text-ellipsis text-gray-400 text-sm font-semibold truncate"
          >
            {user.email || ""}
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfoCard;