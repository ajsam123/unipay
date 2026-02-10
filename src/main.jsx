import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import { router } from "./router";
import "./style.css";

createRoot(document.getElementById("root")).render(
  <>
    <Toaster position="top" reverseOrder={false} />
    <RouterProvider router={router} />
  </>,
);
