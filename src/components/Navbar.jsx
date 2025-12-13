import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
export default function Navbar() {
  // return (
  //   <nav style={{ padding: "10px", color: "black" }}>
  //     <Link
  //       to="/home"
  //       style={{ marginRight: "20px", color: "black", textDecoration: "none" }}
  //     >
  //       Home
  //     </Link>
  //     <Link to="/cart" style={{ color: "black", textDecoration: "none" }}>
  //       Cart
  //     </Link>
  //   </nav>
  // );
    return (
    <Box sx={{ display: 'flex',  gap:2}}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Box>
<Link
  component={RouterLink}
  to="/Home"
  color="inherit"
  underline="none"
  sx={{ mx: 1 }}
>
  Home
</Link>            
          
           
           
           
<Link
  component={RouterLink}
  to="/Cart"
  color="inherit"
  underline="none"
  sx={{ mx: 1 }}
>
  Cart
</Link>            
<Link
  component={RouterLink}
  to="/Register"
  color="inherit"
  underline="none"
  sx={{ mx: 1 }}
>
  Register
</Link>            
<Link
  component={RouterLink}
  to="/Login"
  color="inherit"
  underline="none"
  sx={{ mx: 1 }}
>
  Login
</Link>            
          </Box>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
