import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useProductsByCategory from "../../hooks/useProductsByCategory";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import ProductCard from "../../components/ProductComponent/ProductCard";

export default function CategoryProducts() {
  const { categoryId } = useParams();
  const { state } = useLocation();
  const categoryName = state?.categoryName;
  const navigate = useNavigate();
  const { data = [], isLoading, isError } = useProductsByCategory(categoryId);

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
        <Alert severity="error">
          Failed to load products for this category
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2} sx={{ fontWeight: 'bold' }}>
        {categoryName ? categoryName : `Category ${categoryId}`}
      </Typography>
      <Grid container justifyContent="center" spacing={3}>
        {data.map((p) => (
          <Grid item key={p.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard
              product={p}
              onDetails={(id) => navigate(`/products/${id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
