import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./state/usersSlice";
import UserListItem from "../../components/UserListItem";
import { ImSpinner10 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import Users from "../../components/Users";
import Pagination from "../../components/Pagination";

const ViewAllUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.users.users);
  const isLoading = useSelector((state) => state.users.isLoading);
  const isAuthenticated = useSelector((state) => state.auth.user !== null);

  const [showAlert, setShowAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const timerId = useRef(null);

  useEffect(() => {
    if (showAlert) {
      timerId.current = setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    }

    return () => {
      clearTimeout(timerId.current);
    };
  }, [showAlert]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    dispatch(fetchUsers());
  }, [dispatch, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div>
        <ImSpinner10 />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[90%] w-full mx-auto p-4 max-w-4xl overflow-y-auto">
      {!isLoading ? (
        <>
          <div className="border-b w-full">
            <h1 className="text-center text-[#133746] font-semibold text-2xl">
              Users Profiles
            </h1>
          </div>
          {/* <div className="grid sm:grid-cols-2 md:grid-cols-3 mt-2 gap-4 items-center justify-center">
            {users.map((user, index) => {
              return <UserListItem key={user._id} user={user} />;
            })}
          </div> */}
          <Users users={currentUsers} loading={isLoading} />
          <Pagination
            itemsPerPage={usersPerPage}
            totalItems={users.length}
            paginate={paginate}
            activePage={currentPage}
          />
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <ImSpinner10 size={48} className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ViewAllUsers;
