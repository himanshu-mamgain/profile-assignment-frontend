import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpVerification from "./pages/otp-verification/OtpVerification";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "./layout/protected-route/ProtectedRoute";
import Error from "./pages/error/Error.page";

function App() {
  const { isLoggedIn } = useSelector((state: { auth: any }) => state.auth);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
