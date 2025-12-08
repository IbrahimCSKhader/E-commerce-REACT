import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#333", color: "white" }}>
      <Link
        to="/home"
        style={{ marginRight: "20px", color: "white", textDecoration: "none" }}
      >
        Home
      </Link>
      <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
        Cart
      </Link>
    </nav>
  );
}
