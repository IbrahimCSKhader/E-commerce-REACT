import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme.js";
import i18n from "./i18n.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </>,
);
