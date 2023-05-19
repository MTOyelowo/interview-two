import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { logoutUser, resetAuth } from "../features/authFeature/state/authSlice";

const Header = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logoutUser());
    dispatch(resetAuth());
    setShowMobileNav(false);
    navigate("/login");
  };

  const handleMenuPress = () => {
    setShowMobileNav(true);
  };
  const handleMenuClose = () => {
    setShowMobileNav(false);
  };

  return (
    <header className="flex flex-col w-screen border-b bg-white h-[10%] shadow-md">
      <nav className="flex m-2 justify-between font-serif items-center">
        <Link to="/">
          <div className="flex space-x-2 text-lg font-semibold font-serif text-[#133746]">
            Social Profile
          </div>
        </Link>
        <div className="hidden md:flex flex-row space-x-4 mr-4">
          <ul className="flex">
            {user ? (
              <>
                <li>
                  <LinkItem name="Home" href="/" />
                </li>
                <li>
                  <LinkItem name="Profile" href="/profile" />
                </li>
                <li>
                  <button
                    className="text-[#133746] cursor-pointer hover:rounded-full px-3 hover:bg-[#133746] hover:text-white"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <LinkItem name="Login" href="/login" />
                </li>
                <li>
                  <LinkItem name="Register" href="/register" />
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="flex md:hidden items-center justify-center text-[#133746]">
          <button
            className="hover:bg-[#133746] p-2 hover:rounded-full hover:text-white"
            onClick={handleMenuPress}
          >
            <IoIosMenu size={28} />
          </button>
        </div>
        {/*Mobile Nav*/}
        {showMobileNav && (
          <div className="flex flex-col z-10 right-0 absolute bg-[#133746] space-y-4 top-0 h-96 w-56 items-end">
            <div className="flex items-center justify-between w-full bg-white text-[#133746] p-2 mt-2">
              <button
                className="hover:bg-[#133746] text-[#133746] p-2 hover:rounded-full hover:text-white"
                onClick={handleMenuClose}
              >
                <IoIosClose size={32} />
              </button>
            </div>
            <ul>
              {user ? (
                <>
                  <li>
                    <MenuItem
                      name="Home"
                      href="/"
                      onClick={() => setShowMobileNav(false)}
                    />
                  </li>
                  <li>
                    <MenuItem
                      name="Profile"
                      href="/profile"
                      onClick={() => setShowMobileNav(false)}
                    />
                  </li>
                  <li>
                    <button
                      className="text-white cursor-pointer hover:rounded-full px-2"
                      onClick={onLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <MenuItem
                      name="Login"
                      href="/login"
                      onClick={() => setShowMobileNav(false)}
                    />
                  </li>
                  <li>
                    <MenuItem
                      name="Register"
                      href="/register"
                      onClick={() => setShowMobileNav(false)}
                    />
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

const LinkItem = ({ href, name }) => {
  return (
    <Link to={href}>
      <span className="text-[#133746] cursor-pointer hover:rounded-full p-1 px-3 hover:bg-[#133746] hover:text-white">
        {name}
      </span>
    </Link>
  );
};
const MenuItem = ({ href, name, onClick }) => {
  return (
    <Link to={href} onClick={onClick}>
      <span className="text-white cursor-pointer p-1 px-2">{name}</span>
    </Link>
  );
};

export default Header;
