import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Stack,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useAuthStore from "../store/AuthStore";
import useThemeStore from "../store/useThemeStore";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const mode = useThemeStore((state) => state.mode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const openMenu = Boolean(menuAnchor);
  const isLoggedIn = hasHydrated && !!token;
  const profileLabel = i18n.language === "ar" ? "الملف الشخصي" : "Profile";

  const navItems = [
    {
      label: t("navbar.home"),
      path: "/home",
      icon: <HomeOutlinedIcon sx={{ color: "inherit" }} />,
    },
    {
      label: t("navbar.products"),
      path: "/products",
      icon: <Inventory2OutlinedIcon sx={{ color: "inherit" }} />,
    },
    {
      label: t("navbar.categories"),
      path: "/categories",
      icon: <CategoryOutlinedIcon sx={{ color: "inherit" }} />,
    },
    ...(isLoggedIn
      ? [
          {
            label: t("navbar.cart"),
            path: "/cart",
            icon: <ShoppingCartOutlinedIcon sx={{ color: "inherit" }} />,
          },
          {
            label: profileLabel,
            path: "/profile",
            icon: <AccountCircleOutlinedIcon sx={{ color: "inherit" }} />,
          },
        ]
      : []),
  ];

  const authButtonSx = {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: 999,
    px: 2.5,
    py: 1,
    fontWeight: 700,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      opacity: 0.9,
    },
  };

  const navItemMainParameters = {
    display: "flex",
    alignItems: "center",
    gap: 1,
    px: 2.25,
    py: 1,
    borderRadius: 999,
    textDecoration: "none",
    fontWeight: 600,
    color: theme.palette.navbar.contrastText,
    opacity: 0.92,
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      color: theme.palette.primary.main,
      opacity: 1,
    },
  };

  const selectedNavItem = {
    backgroundColor: alpha(theme.palette.primary.main, 0.16),
    color: theme.palette.primary.main,
    opacity: 1,
  };

  const matchesCurrentPath = (path) =>
    (path === "/home" && location.pathname === "/") ||
    location.pathname === path ||
    location.pathname.startsWith(`${path}/`);

  const handleLogout = () => {
    logout();
    navigate("/Auth/login", { replace: true });
  };

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLanguage);
  };

  const closeMobileMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <Box
      sx={{
        px: { xs: 1.5, md: 3 },
        pt: { xs: 1.5, md: 3 },
        pb: { xs: 2, md: 3 },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: theme.palette.navbar.main,
          borderRadius: 999,
          px: { xs: 1.5, md: 3 },
          width: "100%",
          maxWidth: 1320,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 76,
            display: "grid",
            gridTemplateColumns: {
              xs: "minmax(0, 1fr) auto",
              lg: "minmax(0, 1fr) auto minmax(0, 1fr)",
            },
            alignItems: "center",
            gap: { xs: 1, lg: 2 },
          }}
        >
          <Box
            sx={{
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Box
              sx={{ cursor: "pointer", minWidth: 0 }}
              onClick={() => navigate("/home")}
            >
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 800,
                  color: theme.palette.background.paper,
                }}
              >
                {t("navbar.brand")}{" "}
                <Box
                  component="span"
                  sx={{ color: theme.palette.primary.main }}
                >
                  {t("navbar.brandName")}
                </Box>
              </Typography>
            </Box>
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              display: { xs: "none", lg: "flex" },
              justifySelf: "center",
              p: 0.75,
              borderRadius: 999,
              backgroundColor: alpha(theme.palette.background.paper, 0.06),
              border: `1px solid ${alpha(
                theme.palette.background.paper,
                0.08,
              )}`,
            }}
          >
            {navItems.map((item) => (
              <Box
                key={item.path}
                component={NavLink}
                to={item.path}
                sx={{
                  ...navItemMainParameters,
                  ...(matchesCurrentPath(item.path) ? selectedNavItem : {}),
                }}
              >
                {item.icon}
                {item.label}
              </Box>
            ))}
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              minWidth: 0,
              width: "100%",
              justifyContent: "flex-end",
              gridColumn: { xs: 2, lg: 3 },
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.5}
              sx={{
                p: 0.5,
                borderRadius: 999,
                backgroundColor: alpha(theme.palette.background.paper, 0.06),
                border: `1px solid ${alpha(
                  theme.palette.background.paper,
                  0.08,
                )}`,
              }}
            >
              <Tooltip title={i18n.language === "ar" ? "العربية" : "English"}>
                <IconButton
                  onClick={toggleLanguage}
                  aria-label="toggle-language"
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 999,
                    color: theme.palette.background.paper,
                  }}
                >
                  <Box
                    component="img"
                    src={
                      i18n.language === "ar"
                        ? "/flag-for-flag-saudi-arabia.svg"
                        : "/flag-for-flag-united-kingdom.svg"
                    }
                    alt={i18n.language === "ar" ? "Arabic" : "English"}
                    sx={{
                      width: 24,
                      height: 18,
                      objectFit: "cover",
                      borderRadius: 0.5,
                      boxShadow: "0 0 0 1px rgba(255,255,255,0.14)",
                    }}
                  />
                </IconButton>
              </Tooltip>

              <Tooltip title={mode === "dark" ? "Light mode" : "Dark mode"}>
                <IconButton
                  onClick={toggleTheme}
                  aria-label="toggle-theme"
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 999,
                    color: theme.palette.background.paper,
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  }}
                >
                  {mode === "dark" ? (
                    <LightModeOutlinedIcon fontSize="small" />
                  ) : (
                    <DarkModeOutlinedIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                display: { xs: "none", lg: "flex" },
                alignItems: "center",
                minWidth: 0,
              }}
            >
              {!hasHydrated ? null : !isLoggedIn ? (
                <>
                  <Button
                    onClick={() => navigate("/Auth/login")}
                    sx={authButtonSx}
                  >
                    <LoginOutlinedIcon sx={{ mr: 1 }} />
                    {t("navbar.login")}
                  </Button>
                  <Button
                    onClick={() => navigate("/Auth/register")}
                    sx={authButtonSx}
                  >
                    <PersonAddAltOutlinedIcon sx={{ mr: 1 }} />
                    {t("navbar.register")}
                  </Button>
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      color: theme.palette.background.paper,
                      fontWeight: 600,
                      alignSelf: "center",
                      mr: 0.5,
                      maxWidth: { lg: 190, xl: 280 },
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t("navbar.welcome")}{" "}
                    <Box
                      component="span"
                      sx={{ color: theme.palette.primary.main }}
                    >
                      {user?.fullName || user?.name || user?.userName || "User"}
                    </Box>
                  </Typography>
                  <Button onClick={handleLogout} sx={authButtonSx}>
                    <LogoutOutlinedIcon sx={{ mr: 1 }} />
                    {t("navbar.logout")}
                  </Button>
                </>
              )}
            </Stack>

            <IconButton
              sx={{ display: { xs: "flex", lg: "none" } }}
              onClick={(event) => setMenuAnchor(event.currentTarget)}
            >
              <MenuIcon sx={{ color: theme.palette.background.paper }} />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={menuAnchor}
        open={openMenu}
        onClose={closeMobileMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {navItems.map((item) => (
          <MenuItem
            key={item.path}
            onClick={() => {
              navigate(item.path);
              closeMobileMenu();
            }}
          >
            {item.label}
          </MenuItem>
        ))}

        {!hasHydrated ? null : !isLoggedIn ? (
          <>
            <MenuItem
              onClick={() => {
                navigate("/Auth/login");
                closeMobileMenu();
              }}
            >
              {t("navbar.login")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/Auth/register");
                closeMobileMenu();
              }}
            >
              {t("navbar.register")}
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              onClick={() => {
                handleLogout();
                closeMobileMenu();
              }}
            >
              {t("navbar.logout")}
            </MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
}
