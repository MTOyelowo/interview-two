import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, resetAuth } from "./state/authSlice";
import classNames from "classnames";
import { AiOutlineLogin } from "react-icons/ai";
import AlertModal from "../../components/AlertModal";
import { ImSpinner6 } from "react-icons/im";

const commonInput =
  "w-full bg-transparent outline-none border border-gray-300 focus:border-blue-300 rounded transition p-2";

const Login = () => {
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const timerId = useRef(null);

  useEffect(() => {
    if (showLoginError) {
      timerId.current = setTimeout(() => {
        setShowLoginError(false);
      }, 3000);
    }
    if (showLoginSuccess) {
      timerId.current = setTimeout(() => {
        setShowLoginSuccess(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timerId.current);
    };
  }, [showLoginError, showLoginSuccess]);

  useEffect(() => {
    if (isError) {
      setShowLoginError(true);
    }

    if (isSuccess) {
      setShowLoginSuccess(true);
    }

    if (user) {
      navigate("/");
    }

    dispatch(resetAuth());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userCredentials = {
      email,
      password,
    };

    dispatch(loginUser(userCredentials));
  };

  return (
    <div className="flex flex-col items-center justify-center h-[90%] w-screen">
      <section className="flex flex-col items-center justify-center border-b p-2 text-[#133746]">
        <AiOutlineLogin size={30} />
        <p className="text-lg font-semibold">Please login to access platform</p>
      </section>

      <section className="w-[80%] sm:w-96">
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter email"
          />
          <Input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter password"
          />

          <div>
            <button
              type="submit"
              className="w-full bg-[#133746] outline-none rounded transition p-2 text-white"
            >
              {isLoading ? <ImSpinner6 className="animate-spin" /> : "Login"}
            </button>
          </div>
        </form>

        <div className="flex justify-evenly">
          <Link
            to="/resetpass"
            className="flex w-full p-2 text-red-500 text-base text-center"
          >
            Forgot password?
          </Link>
          <Link
            to="/register"
            className="flex w-full p-2 justify-end text-blue-500 text-sm text-center"
          >
            <div
              className="flex flex-col space-y-1
            "
            >
              <span>Don't have an account?</span>
              <span>Click here to Sign Up</span>
            </div>
          </Link>
        </div>
      </section>
      {showLoginError && (
        <div className="flex items-center justify-center absolute -top-4 z-10 w-full">
          <AlertModal text="Invalid login credentials" status={"fail"} />
        </div>
      )}
      {showLoginSuccess && (
        <div className="flex items-center justify-center absolute -top-4 z-10 w-full">
          <AlertModal text="Login Successful" status="success" />
        </div>
      )}
    </div>
  );
};

const Input = ({ name, value, placeholder, label, onChange, type }) => {
  return (
    <label className="block relative">
      <span className="absolute top-1/2 -translate-y-1/2 text-sm font-semibold text-primary-dark dark:text-primary pl-2">
        {label}
      </span>
      <input
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        className={classNames(commonInput, "italic")}
        onChange={onChange}
      />
    </label>
  );
};

export default Login;
