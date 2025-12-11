import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", color: "black" }}>
      <Link
        to="/home"
        style={{ marginRight: "20px", color: "black", textDecoration: "none" }}
      >
        Home
      </Link>
      <Link to="/cart" style={{ color: "black", textDecoration: "none" }}>
        Cart
      </Link>
    </nav>
  );
}
