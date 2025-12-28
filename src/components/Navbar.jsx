import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import AuthStore from "../store/AuthStore";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

export default function Navbar() {
  const navigate = useNavigate();
  const token = AuthStore((state) => state.token);
  const logout = AuthStore((state) => state.logout);
const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/Auth/login");
  };

  const navItemSx = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 16px",
    borderRadius: "999px",
    textDecoration: "none",
    color: "rgba(255,255,255,0.85)",
    fontWeight: 600,
    transition: "0.2s ease",
    "&:hover": {
      background: "rgba(255,255,255,0.12)",
      color: "white",
    },
  };

  const navItemActiveSx = {
    background: "rgba(255,255,255,0.18)",
    color: "white",
  };

  return (
    <Box
      sx={{
        padding: "24px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background:
            "linear-gradient(90deg,#0f1026 0%,#141536 50%,#1c1d40 100%)",
          borderRadius: "999px",
          padding: "10px 18px",
          boxShadow:
            "0 20px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
          width: "100%",
          maxWidth: "1400px",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: "72px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: { xs: "none", lg: "flex" }, gap: "10px" }}>
            {!token ? (
              <>
                <Button
                  onClick={() => navigate("/Auth/login")}
                  sx={{
                    background: "#ff8a3d",
                    color: "white",
                    borderRadius: "999px",
                    padding: "8px 18px",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { background: "#ff7a1f" },
                  }}
                >
                  <LoginOutlinedIcon sx={{ mr: 1 }} />
                  Login
                </Button>

                <Button
                  onClick={() => navigate("/Auth/register")}
                  sx={{
                    background: "#ff8a3d",
                    color: "white",
                    borderRadius: "999px",
                    padding: "8px 18px",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { background: "#ff7a1f" },
                  }}
                >
                  <PersonAddAltOutlinedIcon sx={{ mr: 1 }} />
                  Register
                </Button>
              </>
            ) : (
              <Button
                onClick={handleLogout}
                sx={{
                  background: "#ff8a3d",
                  color: "white",
                  borderRadius: "999px",
                  padding: "8px 18px",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": { background: "#ff7a1f" },
                }}
              >
                <LogoutOutlinedIcon sx={{ mr: 1 }} />
                Logout
              </Button>
            )}
          </Box>

          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              gap: "10px",
              padding: "8px",
              background: "rgba(255,255,255,0.07)",
              borderRadius: "999px",
            }}
          >
            <NavLink
              to="/home"
              style={({ isActive }) =>
                isActive ? { ...navItemSx, ...navItemActiveSx } : navItemSx
              }
            >
              <HomeOutlinedIcon sx={{ color: "#4dabf7" }} />
              Home
            </NavLink>

            <NavLink
              to="/products"
              style={({ isActive }) =>
                isActive ? { ...navItemSx, ...navItemActiveSx } : navItemSx
              }
            >
              <Inventory2OutlinedIcon sx={{ color: "#b197fc" }} />
              Products
            </NavLink>

            <NavLink
              to="/categories"
              style={({ isActive }) =>
                isActive ? { ...navItemSx, ...navItemActiveSx } : navItemSx
              }
            >
              <CategoryOutlinedIcon sx={{ color: "#63e6be" }} />
              Categories
            </NavLink>
{token && (
  <NavLink
    to="/cart"
    style={({ isActive }) =>
      isActive ? { ...navItemSx, ...navItemActiveSx } : navItemSx
    }
  >
    <ShoppingCartOutlinedIcon sx={{ color: "#ffd43b" }} />
    Cart
  </NavLink>
)}
          </Box>

          <Box
            onClick={() => navigate("/home")}
            sx={{ cursor: "pointer" }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 800,
                color: "white",
                "& span": { color: "#ff8a3d" },
              }}
            >
              E-commerce <span>Ibrahim</span>
            </Typography>
          </Box>
          <IconButton
  onClick={() => setOpenMenu(true)}
  sx={{
    display: { xs: "flex", lg: "none" },
    color: "white",
    ml: 1,
  }}
>
  <MenuIcon />
</IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
  anchor="left"
  open={openMenu}
  onClose={() => setOpenMenu(false)}
>
  <Box
    sx={{
      width: 260,
      p: 2,
      display: "flex",
      flexDirection: "column",
      gap: 1.5,
    }}
  >
    <Button onClick={() => navigate("/home")}>Home</Button>
    <Button onClick={() => navigate("/products")}>Products</Button>
    <Button onClick={() => navigate("/categories")}>Categories</Button>
    <Button onClick={() => navigate("/cart")}>Cart</Button>

    <Box sx={{ my: 1, borderTop: "1px solid #ddd" }} />

    {!token ? (
      <>
        <Button onClick={() => navigate("/Auth/login")}>
          Login
        </Button>
        <Button onClick={() => navigate("/Auth/register")}>
          Register
        </Button>
      </>
    ) : (
      <Button onClick={handleLogout}>
        Logout
      </Button>
    )}
  </Box>
</Drawer>

    </Box>
  );
}
