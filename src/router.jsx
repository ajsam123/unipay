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
import VerificationCentrePage from "./superadmin/VerificationCentrePage";

/* ================= ROOT ROUTE ================= */

const rootRoute = createRootRoute({
  component: App,
});

/* ================= AUTH ROUTES ================= */

const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth",
  component: AuthLayout,
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
  // beforeLoad: () => {
  //   const token = localStorage.getItem("access");

  //   if (!token) {
  //     throw redirect({ to: routes.LOGIN });
  //   }
  // },
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

export const verificationCentre = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: routes.VERIFICATIONCENTRE,
  component: VerificationCentrePage,
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
  ]),
  appLayoutRoute.addChildren([
    dashboardRoute,
    profileRoute,
    payoutRoute,
    paymentPagesRoute,
    transactionsPageRoute,
    verificationCentre,
  ]),
]);

export const router = createRouter({ routeTree });
