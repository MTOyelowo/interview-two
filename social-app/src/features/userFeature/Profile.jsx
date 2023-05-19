import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../assets/profile.png";
import { CiEdit } from "react-icons/ci";
import { HiOutlineX } from "react-icons/hi";
import ModalContainer from "../../components/ModalContainer";
import CountryCodes from "../../app/mocks/CountryCodes.json";
import classNames from "classnames";
import { updateUserProfile } from "./state/usersSlice";
import { ImSpinner6 } from "react-icons/im";
import AlertModal from "../../components/AlertModal";

const commonInput =
  "w-full bg-transparent outline-none border border-gray-300 focus:border-blue-300 rounded transition p-2";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess } = useSelector(
    (state) => state.auth
  );

  const { users } = useSelector((state) => state.users);

  const myProfile = users.find((self) => self.email === user.email);

  const [showEditForm, setShowEditForm] = useState(false);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);
  const [showUpdateError, setShowUpdateError] = useState(false);
  const [showFormError, setShowFormError] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: myProfile.firstName,
    lastName: myProfile.lastName,
    email: myProfile.email,
    password: myProfile.password,
    confirmPassword: myProfile.password,
    phone: myProfile.phone,
  });
  const [selectedCountry, setSelectedCountry] = useState(myProfile.dial);

  const onClose = () => {
    setShowEditForm(false);
  };

  const timerId = useRef(null);

  useEffect(() => {
    if (showUpdateError) {
      timerId.current = setTimeout(() => {
        setShowUpdateError(false);
      }, 3000);
    }
    if (showUpdateSuccess) {
      timerId.current = setTimeout(() => {
        setShowUpdateSuccess(false);
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
  }, [showFormError, showPasswordCheck, showUpdateError, showUpdateSuccess]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (isError) {
      setShowUpdateError(true);
    }

    if (isSuccess) {
      setShowUpdateSuccess(true);
    }
  }, [user, navigate, dispatch, isSuccess, isError]);

  const handleCountrySelect = (event) => {
    const country = event?.target.value;
    setSelectedCountry(country);
  };

  const onChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const profileDetails = {
      ...profileData,
      dial: selectedCountry,
    };

    const { firstName, lastName, email, password, phone } = profileData;

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      phone === "" ||
      selectedCountry === ""
    )
      return setShowFormError(true);
    if (profileData.password !== profileData.confirmPassword)
      return setShowPasswordCheck(true);

    dispatch(updateUserProfile(profileDetails));
  };

  return (
    <div className="max-w-3xl mx-auto mt-4 ">
      {user && (
        <>
          <section className="flex items-center justify-center w-full h-12 mb-3">
            <div className="border-b w-full pb-1">
              <h1 className="text-center text-[#133746] font-semibold text-2xl">
                Welcome {user && user.firstName}
              </h1>
            </div>
          </section>
          <div className="relative flex flex-col p-4 text-xs sm:text-md items-center justify-center rounded-2xl space-y-4">
            <div className="flex flex-col items-center justify-center">
              <img src={profile} alt="profile" className="w-40 h-40" />
              <div className="flex space-x-2">
                <div className="flex space-x-2 font-bold text-2xl">
                  <p>{myProfile.firstName}</p>
                  <p>{myProfile.lastName}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="flex space-x-2 text-base">
                  <p>{myProfile.email}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="flex space-x-2">
                  <p>{myProfile.phone}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowEditForm(true)}
              className="absolute flex items-center top-0 right-5 w-10 h-10 bg-[#133746] p-2 text-white rounded-full hover:scale-95"
            >
              <CiEdit size={30} />
            </button>
          </div>
        </>
      )}
      {showEditForm && (
        <ModalContainer visible={showEditForm} onClose={onClose}>
          <div className="relative bg-white max-w-xl h-3/4">
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
            <div className="flex justify-between pb-2">
              <span className="text-[#133746] font-semibold text-lg">
                Edit your profile
              </span>
              <button
                onClick={onClose}
                className="bg-[#133746] rounded-full p-1 text-white place-self-end"
              >
                <HiOutlineX size={20} />
              </button>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={onChange}
                placeholder="Enter first name"
              />
              <Input
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={onChange}
                placeholder="Enter last name"
              />
              <Input
                type="email"
                name="email"
                value={profileData.email}
                onChange={onChange}
                placeholder="Enter email"
              />
              <Input
                type="password"
                name="password"
                value={profileData.password}
                onChange={onChange}
                placeholder="Enter password"
              />
              <Input
                type="password"
                name="confirmPassword"
                value={profileData.confirmPassword}
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
                value={profileData.phone}
                onChange={onChange}
                placeholder="Enter Phone number"
              />

              <div className="form-group">
                <button
                  type="submit"
                  className="w-full bg-[#133746] outline-none border rounded transition p-2 text-white"
                >
                  {isLoading ? (
                    <ImSpinner6 className="animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
            {showUpdateError && (
              <div className="flex items-center justify-center absolute -top-4 z-10 w-full">
                <AlertModal
                  text="Sorry, profile update failed"
                  status={"fail"}
                />
              </div>
            )}
            {showUpdateSuccess && (
              <div className="flex items-center justify-center absolute -top-4 z-10 w-full">
                <AlertModal text="Registration Successful" status="success" />
              </div>
            )}
          </div>
        </ModalContainer>
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
export default Profile;
