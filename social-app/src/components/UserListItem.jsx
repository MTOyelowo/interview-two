import { Link } from "react-router-dom";
import profile from "../assets/profile.png";

const UserListItem = ({ user }) => {
  return (
    <div className="flex flex-col p-4 hover:scale-95 text-xs sm:text-md bg-blue-50 w-60 h-60 items-center justify-center rounded-2xl">
      <img src={profile} alt="profile" className="w-20 h-20" />
      <div className="flex space-x-2">
        <div className="flex space-x-2 font-bold text-base">
          <p>{user.firstName}</p>
          <p>{user.lastName}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <div className="flex space-x-2">
          <p>{user.email}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <div className="flex space-x-2">
          <p>{user.phone}</p>
        </div>
      </div>
      <div className="mt-5">
        <Link
          to="/single"
          state={{ userId: user._id }}
          className="bg-[#133746] p-2 rounded-full text-white"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default UserListItem;
