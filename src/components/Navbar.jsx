import { useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>News</Typography>

          <Box>
            <Link component={RouterLink} to="/home" color="inherit" underline="none" sx={{ mx: 1 }}>Home</Link>

            {console.log(token)}

            {token ? (
              <>
                <Link component={RouterLink} to="/cart" color="inherit" underline="none" sx={{ mx: 1 }}>Cart</Link>
                <Button color="inherit" onClick={handleLogout} sx={{ mx: 1 }}>Logout</Button>
              </>
            ) : (
              <>
                <Link component={RouterLink} to="/login" color="inherit" underline="none" sx={{ mx: 1 }}>Login</Link>
                <Link component={RouterLink} to="/register" color="inherit" underline="none" sx={{ mx: 1 }}>Register</Link>
              </>
            )}

            <Link component={RouterLink} to="/categories" color="inherit" underline="none" sx={{ mx: 1 }}>Categories</Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
