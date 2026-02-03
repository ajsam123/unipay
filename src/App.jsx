import { Route, Routes } from "react-router";
import "./style.css";
import { routes } from "./constants/routes";
import Signup from "./pages/admin/Signup";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AuthLayout from "./layouts/AuthLayout";
import OtpPage from "./components/OtpForm";
import OnboardingOne from "./pages/admin/OnboardingOne";
import OnboardingTwo from "./pages/admin/OnboardingTwo";
import ForgotPassword from "./pages/admin/ForgotPassword";
import VerifyEmailPage from "./pages/admin/VerifyEmailPage";
import LoginOtp from "./pages/admin/LogInOtp";
import { Toaster } from "react-hot-toast";
import ForgotPasswordOtp from "./pages/admin/ForgotPasswordOtp";
import ResetPassword from "./pages/admin/ResetPassword";
import AppLayout from "./layouts/AppLayout";
import Profile from "./pages/admin/Profile";
import Payout from "./pages/admin/Payout";
import PaymentPages from "./pages/admin/PaymentPages";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <div>
      <Toaster position="top" reverseOrder={false} />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={routes.LOGIN} element={<Login />} />
          <Route path={routes.SIGNUP} element={<Signup />} />
          <Route path={routes.ONBOARDINGONE} element={<OnboardingOne />} />
          <Route path={routes.FORGOTPASSWORD} element={<ForgotPassword />} />
          <Route path={routes.VERIFYEMAIL} element={<VerifyEmailPage />} />
          <Route path={routes.LOGINOTP} element={<LoginOtp />} />
          <Route
            path={routes.FORGOTPASSWORDOTP}
            element={<ForgotPasswordOtp />}
          />
          <Route path={routes.RESETPASSWORD} element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            {" "}
            <Route path="/*" element={<Dashboard />} />
            <Route path={routes.PROFILE} element={<Profile />} />
            <Route path={routes.PAYOUT} element={<Payout />} />
            <Route path={routes.PAYMENTPAGES} element={<PaymentPages />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
