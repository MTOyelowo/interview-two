import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { ImSpinner6 } from "react-icons/im";
import { registerUser, resetAuth } from "./state/authSlice";
import AlertModal from "../../components/AlertModal";
import CountryCodes from "../../app/mocks/CountryCodes.json";
import classNames from "classnames";

const commonInput =
  "w-full bg-transparent outline-none border border-gray-300 focus:border-blue-300 rounded transition p-2";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [selectedCountry, setSelectedCountry] = useState("");
  const registeredUser = useSelector((state) => state.auth.user);
  const [showAlert, setShowAlert] = useState(false);
  const [showRegisterSuccess, setShowRegisterSuccess] = useState(false);
  const [showRegisterError, setShowRegisterError] = useState(false);
  const [showFormError, setShowFormError] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const { user, isLoading, isError, isSuccess } = useSelector(
    (state) => state.auth
  );

  const timerId = useRef(null);

  useEffect(() => {
    if (showAlert) {
      timerId.current = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    if (showRegisterError) {
      timerId.current = setTimeout(() => {
        setShowRegisterError(false);
      }, 3000);
    }
    if (showRegisterSuccess) {
      timerId.current = setTimeout(() => {
        setShowRegisterSuccess(false);
      }, 3000);
    }
    if (showFormError) {
      timerId.current = setTimeout(() => {
        setShowFormError(false);
      }, 3000);
    }
    if (showPasswordCheck) {
      timerId.current = setTimeout(() => {
        setShowPasswordCheck(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timerId.current);
    };
  }, [
    showAlert,
    showFormError,
    showPasswordCheck,
    showRegisterError,
    showRegisterSuccess,
  ]);

  useEffect(() => {
    if (isError) {
      setShowRegisterError(true);
    }

    if (isSuccess) {
      setShowRegisterSuccess(true);
    }

    if (user) {
      navigate("/");
    }

    // navigate("/login");

    dispatch(resetAuth());
  }, [
    user,
    navigate,
    dispatch,
    registeredUser,
    isSuccess,
    isError,
    showRegisterSuccess,
  ]);

  const handleCountrySelect = (event) => {
    const country = event?.target.value;
    setSelectedCountry(country);
  };

  const onChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userDetails = {
      ...userData,
      dial: selectedCountry,
    };

    const { firstName, lastName, email, password, phone } = userData;

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      phone === "" ||
      selectedCountry === ""
    )
      return setShowFormError(true);
    if (userData.password !== userData.confirmPassword)
      return setShowPasswordCheck(true);

    dispatch(registerUser(userDetails));
  };

  return (
    <div className="flex flex-col items-center justify-center h-[90%] w-screen">
      {showFormError && (
        <span className="text-sm text-red-600 animate-bounce">
          Please fill all fields in the form
        </span>
      )}
      {showPasswordCheck && (
        <span className="text-sm text-red-600 animate-bounce">
          Password and Confirm Password should be same
        </span>
      )}
      <section className="flex flex-col items-center justify-center border-b p-2 text-[#133746]">
        <AiOutlineUser size={30} />
        <p className="text-lg font-semibold">Please create an account</p>
      </section>

      <section className="w-[80%] sm:w-96">
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={onChange}
            placeholder="Enter first name"
          />
          <Input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={onChange}
            placeholder="Enter last name"
          />
          <Input
            type="email"
            name="email"
            value={userData.email}
            onChange={onChange}
            placeholder="Enter email"
          />
          <Input
            type="password"
            name="password"
            value={userData.password}
            onChange={onChange}
            placeholder="Enter password"
          />
          <Input
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={onChange}
            placeholder="Confirm Password"
          />

          <select
            id="selectedCountry"
            onChange={handleCountrySelect}
            className={classNames(commonInput, "italic")}
          >
            <option className="text-gray">Country</option>
            {CountryCodes.map((country, index) => {
              return (
                <option key={index} value={country.dial_code}>
                  {country.name} ({country.dial_code})
                </option>
              );
            })}
          </select>

          <Input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={onChange}
            placeholder="Enter Phone number"
          />

          <div className="form-group">
            <button
              type="submit"
              className="w-full bg-[#133746] outline-none border rounded transition p-2 text-white"
            >
              {isLoading ? <ImSpinner6 className="animate-spin" /> : "Submit"}
            </button>
          </div>
        </form>
      </section>
      {showRegisterError && (
        <div className="flex items-center justify-center absolute -top-4 z-10 w-full">
          <AlertModal
            text="An account with this email already exists."
            status={"fail"}
          />
        </div>
      )}
      {showRegisterSuccess && (
        <div className="flex items-center justify-center absolute -top-4 z-10 w-full">
          <AlertModal text="Registration Successful" status="success" />
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

export default Register;
