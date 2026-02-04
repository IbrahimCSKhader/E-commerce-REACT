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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";

import AuthStore from "../store/AuthStore";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { alpha } from "@mui/material/styles"; //  للمصداقية هاي من اقتراحات شات عشان نجيب

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

  const toggleLanguage = () => {
    const newLng = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLng);
  };

  const token = AuthStore((state) => state.token);
  const logout = AuthStore((state) => state.logout);
  const user = AuthStore((state) => state.user);

  const [controleTheMenu, setControleTheMenu] = useState(null);
  const openMenu = Boolean(controleTheMenu);

  const handleLogout = () => {
    logout();
    navigate("/Auth/login");
  };

  const navItemMainParameters = {
    display: "flex",
    alignItems: "center",
    gap: 1.2,
    px: 2.5,
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

  const navItemActive = {
    backgroundColor: alpha(theme.palette.primary.main, 0.16),

    color: theme.palette.primary.main,
    opacity: 1,
  };
  const authButtonSx = {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: 999,
    px: 2.5,
    py: 1,
    fontWeight: 600,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      opacity: 0.9,
    },
  };

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: theme.palette.navbar.main,
          borderRadius: 999,
          px: 3,
          width: "100%",
          maxWidth: 1400,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 72,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 1 }}>
            {!token ? (
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
                    mr: 2,
                  }}
                >
                  {t("navbar.welcome")} {""}
                  <Box
                    component="span"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    {user?.name}
                  </Box>
                </Typography>

                <Button onClick={handleLogout} sx={authButtonSx}>
                  <LogoutOutlinedIcon sx={{ mr: 1 }} />
                  {t("navbar.logout")}
                </Button>
              </>
            )}
          </Box>

          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              gap: 3,
              p: 1,
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRadius: 999,
            }}
          >
            <Box
              component={NavLink}
              to="/home"
              sx={{
                ...navItemMainParameters,
                ...(location.pathname === "/home" && navItemActive),
              }}
            >
              <HomeOutlinedIcon sx={{ color: "inherit" }} />
              {t("navbar.home")}
            </Box>

            <Box
              component={NavLink}
              to="/products"
              sx={{
                ...navItemMainParameters,
                ...(location.pathname === "/products" && navItemActive),
              }}
            >
              <Inventory2OutlinedIcon sx={{ color: "inherit" }} />
              {t("navbar.products")}
            </Box>

            <Box
              component={NavLink}
              to="/categories"
              sx={{
                ...navItemMainParameters,
                ...(location.pathname === "/categories" && navItemActive),
              }}
            >
              <CategoryOutlinedIcon sx={{ color: "inherit" }} />
              {t("navbar.categories")}
            </Box>

            {token && (
              <Box
                component={NavLink}
                to="/cart"
                sx={{
                  ...navItemMainParameters,
                  ...(location.pathname === "/cart" && navItemActive),
                }}
              >
                <ShoppingCartOutlinedIcon sx={{ color: "inherit" }} />
                {t("navbar.cart")}
              </Box>
            )}
          </Box>

          <Box sx={{ cursor: "pointer" }} onClick={() => navigate("/home")}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, color: theme.palette.background.paper }}
            >
              {t("navbar.brand")}{" "}
              <Box component="span" sx={{ color: theme.palette.primary.main }}>
                {t("navbar.brandName")}
              </Box>
            </Typography>
          </Box>

          <Tooltip title={i18n.language === "ar" ? "العربية" : "English"}>
            <IconButton
              onClick={toggleLanguage}
              sx={{ ml: 1 }}
              aria-label="toggle-language"
              title={i18n.language === "ar" ? "العربية" : "English"}
            >
              <Box
                component="img"
                src={
                  i18n.language === "ar"
                    ? "/flag-for-flag-saudi-arabia.svg"
                    : "/flag-for-flag-united-kingdom.svg"
                }
                alt={i18n.language === "ar" ? "علم السعودية" : "علم بريطانيا"}
                sx={{
                  width: 28,
                  height: 20,
                  objectFit: "cover",
                  borderRadius: 0.5,
                }}
              />
            </IconButton>
          </Tooltip>

          {/* Mobile Menu Button */}
          <IconButton
            sx={{ display: { xs: "flex", lg: "none" } }}
            onClick={(e) => setControleTheMenu(e.currentTarget)}
          >
            <MenuIcon sx={{ color: theme.palette.background.paper }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={controleTheMenu}
        open={openMenu}
        onClose={() => setControleTheMenu(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            navigate("/home");
            setControleTheMenu(null);
          }}
        >
          {t("navbar.home")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/products");
            setControleTheMenu(null);
          }}
        >
          {t("navbar.products")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/categories");
            setControleTheMenu(null);
          }}
        >
          {t("navbar.categories")}
        </MenuItem>

        {token && (
          <MenuItem
            onClick={() => {
              navigate("/cart");
              setControleTheMenu(null);
            }}
          >
            {t("navbar.cart")}
          </MenuItem>
        )}

        {!token ? (
          <>
            <MenuItem
              onClick={() => {
                navigate("/Auth/login");
                setControleTheMenu(null);
              }}
            >
              {t("navbar.login")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/Auth/register");
                setControleTheMenu(null);
              }}
            >
              {t("navbar.register")}
            </MenuItem>
          </>
        ) : (
          <MenuItem
            onClick={() => {
              handleLogout();
              setControleTheMenu(null);
            }}
          >
            {t("navbar.logout")}
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
}
