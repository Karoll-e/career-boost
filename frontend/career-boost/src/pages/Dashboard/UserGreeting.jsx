import React from "react";

const UserGreeting = ({ name }) => (
  <div className="">
    <div className="text-4xl sm:text-5xl md:text-5xl font-bold">
      Hola,{" "}
      <span className="bg-[radial-gradient(circle,#FF9324_0%,#FCD760_100%)] bg-[length:200%_200%] bg-clip-text text-transparent animate-text-shine capitalize">
        {name}
      </span>
    </div>
    <div className="text-sm mt-2 text-[17px] md:text-lg text-gray-600">
      What do you want to create today?
    </div>
  </div>
);

export default UserGreeting;