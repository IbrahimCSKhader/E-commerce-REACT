import React from "react";
import useProducts from "../../hooks/useProducts";

// import the Card from mui
import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import ProductCard from "../../components/ProductComponent/ProductCard";
export default function Products() {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useProducts();
  if (isLoading) {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={3}>
        <Alert severity="error">Failed to load categories</Alert>
      </Box>
    );
  }

  return (
    <Grid container justifyContent="center" spacing={3}>
      {data.map((p) => (
        <Grid item key={p.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard
            product={p}
            onDetails={(id) => id && navigate(`/products/${id}`)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
