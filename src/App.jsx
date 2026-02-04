import React from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import router from "./rout.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
