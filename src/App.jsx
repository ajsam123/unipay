import { Route, Routes } from "react-router";
import "./style.css";
import { routes } from "./constants/routes";
import Signup from "./pages/admin/Signup";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AuthLayout from "./layouts/AuthLayout";
import OtpPage from "./pages/admin/OtpPage";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={routes.LOGIN} element={<Login />} />
          <Route path={routes.SIGNUP} element={<Signup />} />
          <Route path={routes.CONFIRMOTP} element={<OtpPage />} />
        </Route>
        <Route path={routes.DASHBOARD} element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
