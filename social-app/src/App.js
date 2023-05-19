import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../src/components/Header";
import Profile from "../src/features/userFeature/Profile";
import Register from "../src/features/authFeature/Register";
import Login from "../src/features/authFeature/Login";
import ViewAllUsers from "./features/userFeature/ViewAllUsers";
import ViewSingleUser from "./features/userFeature/ViewSingleUser";
import ForgetPassword from "./features/authFeature/ForgetPassword";

function App() {
  return (
    <>
      <Router>
        <div className="w-screen h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<ViewAllUsers />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/single" element={<ViewSingleUser />} />
            <Route path="/resetpass" element={<ForgetPassword />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
