import { alpha, createTheme } from "@mui/material/styles";

const buildTheme = (mode = "light") => {
  const isDark = mode === "dark";

  const palette = {
    mode,
    primary: {
      main: "#FF724C",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#F5B942",
      contrastText: isDark ? "#0F1220" : "#21263A",
    },
    navbar: {
      main: isDark ? "#0B0E18" : "#22263B",
      contrastText: "#F7F7FB",
    },
    card: {
      main: isDark ? "#1B2036" : "#2E3046",
      contrastText: "#F7F7FB",
    },
    background: {
      default: isDark ? "#0F1220" : "#F5F3EE",
      paper: isDark ? "#161A2D" : "#FFFFFF",
    },
    text: {
      primary: isDark ? "#F7F7FB" : "#21263A",
      secondary: isDark ? "#B9BED1" : "#5F6478",
    },
    divider: alpha(isDark ? "#F7F7FB" : "#21263A", 0.12),
  };

  return createTheme({
    palette,
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 800,
        letterSpacing: -1.4,
      },
      h2: {
        fontWeight: 800,
        letterSpacing: -1.1,
      },
      h3: {
        fontWeight: 800,
        letterSpacing: -0.8,
      },
      h4: {
        fontWeight: 800,
      },
      h5: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 700,
      },
      button: {
        textTransform: "none",
        fontWeight: 700,
      },
      body1: {
        lineHeight: 1.8,
      },
    },
    shape: {
      borderRadius: 18,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          html: {
            scrollBehavior: "smooth",
          },
          body: {
            minHeight: "100vh",
            backgroundColor: theme.palette.background.default,
            backgroundImage: isDark
              ? `radial-gradient(circle at top right, ${alpha("#FF724C", 0.18)}, transparent 28%), radial-gradient(circle at left center, ${alpha("#F5B942", 0.12)}, transparent 24%)`
              : `radial-gradient(circle at top right, ${alpha("#FF724C", 0.12)}, transparent 28%), radial-gradient(circle at left center, ${alpha("#F5B942", 0.1)}, transparent 24%)`,
            backgroundAttachment: "fixed",
            color: theme.palette.text.primary,
            transition: "background-color 200ms ease, color 200ms ease",
          },
          "::selection": {
            backgroundColor: alpha("#FF724C", 0.22),
            color: theme.palette.text.primary,
          },
        }),
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            padding: "10px 20px",
            boxShadow: "none",
            transition:
              "transform 180ms ease, background-color 180ms ease, color 180ms ease, box-shadow 180ms ease",
            "&:hover": {
              transform: "translateY(-1px)",
            },
          },
          containedPrimary: {
            backgroundColor: "#FF724C",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#e3623f",
              boxShadow: "0 12px 28px rgba(255,114,76,0.22)",
            },
          },
          outlinedPrimary: {
            borderColor: alpha("#FF724C", 0.42),
            "&:hover": {
              borderColor: "#FF724C",
              color: "#FF724C",
              backgroundColor: alpha("#FF724C", 0.08),
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            backgroundImage: "none",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            backgroundImage: "none",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  });
};

export default buildTheme;
