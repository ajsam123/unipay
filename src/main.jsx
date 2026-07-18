import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./style.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerStyle={{
        top: 20,
        right: 20,
      }}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#FFFFFF",
          color: "#111827",
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          padding: "14px 16px",
          fontSize: "14px",
          fontWeight: 500,
          boxShadow:
            "0 10px 25px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(0, 0, 0, 0.04)",
          maxWidth: "400px",
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: "#16A34A",
            secondary: "#FFFFFF",
          },
        },
        error: {
          duration: 4500,
          iconTheme: {
            primary: "#DC2626",
            secondary: "#FFFFFF",
          },
        },
        loading: {
          duration: Infinity,
        },
      }}
    />

    <ReactQueryDevtools initialIsOpen={false} />
    <RouterProvider router={router} />
  </QueryClientProvider>,
);
