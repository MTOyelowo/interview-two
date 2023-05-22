import React from "react";
import UserListItem from "./UserListItem";

const Users = ({ users, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className="grid sm:grid-cols-2 md:grid-cols-3 mt-2 gap-4 items-center justify-center">
      {users.map((user) => (
        <UserListItem key={user._id} user={user} />
      ))}
    </ul>
  );
};

export default Users;
