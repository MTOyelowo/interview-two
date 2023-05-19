import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import profile from "../../assets/profile.png";
import { useLocation, useNavigate } from "react-router-dom";

function ViewSingleUser() {
  let { state } = useLocation();
  const userId = state.userId;

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { users } = useSelector((state) => state.users);

  const singleUser = users.find((user) => user._id === userId);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <div className="flex flex-col p-4 text-xs sm:text-md items-center justify-center rounded-2xl space-y-4">
      <div className="border-b w-full">
        <h1 className="text-center text-[#133746] font-semibold text-2xl">
          User Profile
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <img src={profile} alt="profile" className="w-40 h-40" />
        <div className="flex space-x-2">
          <div className="flex space-x-2 font-bold text-2xl">
            <p>{singleUser.firstName}</p>
            <p>{singleUser.lastName}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="flex space-x-2 text-base">
            <p>{singleUser.email}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="flex space-x-2">
            <p>{singleUser.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSingleUser;
