import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./style.css";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top" reverseOrder={false} />
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </>,
);
