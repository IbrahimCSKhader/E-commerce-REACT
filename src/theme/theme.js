import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF724C",
      contrastText: "#F4F4F8",
    },
    secondary: {
      main: "#F5B942",
      contrastText: "#2A2C41",
    },
    navbar: {
      main: "#2A2C41",
      contrastText: "#F4F4F8",
    },
    card: {
      main: "#2E3046",
      contrastText: "#F4F4F8",
    },
    background: {
      default: "#E2E8F0",
      paper: "#FFFFFF",
      th: "#7e4932",
    },
    text: {
      primary: "#2A2C41",
      secondary: "#000000",
    },
  },

  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,

    h1: {
      fontWeight: 800,
      fontSize: "3rem",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2.4rem",
    },
    h3: {
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          padding: "8px 20px",
          transition:
            "transform 200ms ease, background-color 200ms ease, color 200ms ease",
        },
        containedPrimary: {
          backgroundColor: "#FF724C",
          color: "#F4F4F8",
          "&:hover": {
            backgroundColor: "#e3623f",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 20px rgba(255,114,76,0.12)",
          },
        },
        outlinedPrimary: {
          borderColor: "rgba(255,255,255,0.08)",
          "&:hover": {
            borderColor: "#FF724C",
            color: "#FF724C",
            backgroundColor: "rgba(255,114,76,0.04)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#2E3046",
          color: "#F4F4F8",
          border: "1px solid rgba(0,0,0,0.06)",
          transition: "transform 200ms ease, box-shadow 200ms ease",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#2A2C41",
        },
      },
    },
  },
});

export default theme;
