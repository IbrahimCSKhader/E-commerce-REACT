import React from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import router from "./rout.jsx";
import i18n from "./i18n";
import { useEffect, useState } from "react";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const onLangChange = () => {
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
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
