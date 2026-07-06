import {
  createRouter,
  createRootRoute,
  createRoute,
  redirect,
} from "@tanstack/react-router";

// layouts
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import App from "./App";

// pages
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/admin/Login";
import Signup from "./pages/admin/Signup";
import OnboardingOne from "./pages/admin/OnboardingOne";
import ForgotPassword from "./pages/admin/ForgotPassword";
import VerifyEmailPage from "./pages/admin/VerifyEmailPage";
import LoginOtp from "./pages/admin/LogInOtp";
import ForgotPasswordOtp from "./pages/admin/ForgotPasswordOtp";
import ResetPassword from "./pages/admin/ResetPassword";

import Dashboard from "./pages/admin/Dashboard";
import Profile from "./pages/admin/Profile";
import Payout from "./pages/admin/Payout";
import PaymentPages from "./pages/admin/PaymentPages";

// constants
import { routes } from "./constants/routes";
import z from "zod";
import TransactionsPage from "./pages/admin/TransactionsPage";
import VerificationCentrePage from "./superadmin/SuperAdminVerification";
import PaymentPage from "./pages/student/PaymentPage";
import SuccessPage from "./pages/success_page/SuccessPage";
import SuperAdminLogin from "./superadmin/superAdminLogin";
import SuperAdminDashboard from "./superadmin/superAdminDashboard";
import SuperAdminAppLayout from "./layouts/SuperAdminAppLayout";
import SuperAdminVerification from "./superadmin/SuperAdminVerification";
import SuperAdminUsers from "./superadmin/SuperAdminUsers";

/* ================= ROOT ROUTE ================= */

const rootRoute = createRootRoute({
  component: App,
});

/* ================= AUTH ROUTES ================= */

const homepageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.HOMEPAGE,
  component: Homepage,
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes.PAYMENTSUCCESSPAGE,
  component: SuccessPage,
  validateSearch: z.object({
    reference: z.string(),
    txref: z.string().optional(),
  }),
});

const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth",
  component: AuthLayout,
});

const publicPaymentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pay/$slug",
  component: PaymentPage,
});

const loginRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: routes.LOGIN,
  component: Login,
});

const signupRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: routes.SIGNUP,
  component: Signup,
});

const onboardingOneRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: routes.ONBOARDINGONE,
  component: OnboardingOne,
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: routes.FORGOTPASSWORD,
  component: ForgotPassword,
});

const verifyEmailRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: routes.VERIFYEMAIL,
  validateSearch: z.object({
    email: z.string().email(),
  }),

  beforeLoad: ({ search }) => {
    if (!search.email) {
      throw redirect({ to: routes.LOGIN });
    }
  },
  component: VerifyEmailPage,
});

const loginOtpRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  validateSearch: z.object({
    email: z.string().email(),
  }),

  beforeLoad: ({ search }) => {
    if (!search.email) {
      throw redirect({ to: routes.LOGIN });
    }
  },
  path: routes.LOGINOTP,
  component: LoginOtp,
});

const forgotPasswordOtpRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: routes.FORGOTPASSWORDOTP,
  validateSearch: z.object({
    email: z.string().email(),
  }),

  beforeLoad: ({ search }) => {
    if (!search.email) {
      throw redirect({ to: routes.LOGIN });
    }
  },
  component: ForgotPasswordOtp,
});

const resetPasswordRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: routes.RESETPASSWORD,
  validateSearch: z.object({
    email: z.string().email(),
    otp: z.string().min(4),
  }),

  beforeLoad: ({ search }) => {
    if (!search.email || !search.otp) {
      throw redirect({ to: routes.FORGOTPASSWORD });
    }
  },
  component: ResetPassword,
});

/* ================= APP (PROTECTED) ROUTES ================= */

const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app",
  beforeLoad: () => {
    const token = localStorage.getItem("access");

    if (!token) {
      throw redirect({ to: routes.LOGIN });
    }
  },
  component: AppLayout,
});

const dashboardRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: routes.DASHBOARD,
  component: Dashboard,
});

const profileRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: routes.PROFILE,
  component: Profile,
});

const payoutRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: routes.PAYOUT,
  component: Payout,
});

const paymentPagesRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: routes.PAYMENTPAGES,
  component: PaymentPages,
});

export const transactionsPageRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: routes.TRANSACTION,
  component: TransactionsPage,
});

/** SUPER ADMIN */

// Super Admin Login

const superAdminLoginRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: routes.SUPERADMINLOGIN,
  component: SuperAdminLogin,
});

// Super Admin App Layout

const superAdminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: SuperAdminAppLayout,
  id: "super-admin",
  beforeLoad: () => {
    const token = localStorage.getItem("access");

    if (!token) {
      throw redirect({
        to: routes.SUPERADMINLOGIN,
      });
    }
  },
});

const superAdminDashboard = createRoute({
  getParentRoute: () => superAdminLayoutRoute,
  path: routes.SUPERADMINDASHBOARD,
  component: SuperAdminDashboard,
});

/// Route that concerns fetching all users

const superAdminUsers = createRoute({
  getParentRoute: () => superAdminLayoutRoute,
  path: routes.ADMINUSERS,
  component: SuperAdminUsers,
});

export const superAdminVerification = createRoute({
  getParentRoute: () => superAdminLayoutRoute,
  path: routes.SUPERADMINVERIFICATION,
  component: SuperAdminVerification,
});
/* ================= ROUTE TREE ================= */

const routeTree = rootRoute.addChildren([
  authLayoutRoute.addChildren([
    loginRoute,
    signupRoute,
    onboardingOneRoute,
    forgotPasswordRoute,
    verifyEmailRoute,
    loginOtpRoute,
    forgotPasswordOtpRoute,
    resetPasswordRoute,
    superAdminLoginRoute,
  ]),
  appLayoutRoute.addChildren([
    dashboardRoute,
    profileRoute,
    payoutRoute,
    paymentPagesRoute,
    transactionsPageRoute,
  ]),

  superAdminLayoutRoute.addChildren([
    superAdminDashboard,
    superAdminUsers,
    superAdminVerification,
  ]),
  homepageRoute,
  publicPaymentRoute,
  paymentSuccessRoute,
]);

export const router = createRouter({ routeTree });
