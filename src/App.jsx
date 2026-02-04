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
import i18n from "./i18n";
import { useEffect } from "react";

export default function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    const onLangChange = () => {
      // Invalidate queries to refetch data in the new language
      queryClient.invalidateQueries();
      console.log("Language changed - invalidating queries");
    };

    i18n.on && i18n.on("languageChanged", onLangChange);
    return () => {
      i18n.off && i18n.off("languageChanged", onLangChange);
    };
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
