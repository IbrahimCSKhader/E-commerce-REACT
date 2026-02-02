import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProductDetails from "../../hooks/useProductDetails";

import {
  Box,
  Grid,
  Typography,
  CardMedia,
  Rating,
  Button,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useProductDetails(id);

  if (isLoading) {
    return (
      <Box py={6} display="flex" justifyContent="center">
        <CircularProgress size={50} />
      </Box>
    );
  }

  if (isError && !data) {
    return (
      <Box py={6} display="flex" justifyContent="center">
        <Alert severity="error">Failed to load product details</Alert>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box py={6} display="flex" justifyContent="center">
        <Alert severity="info">Product not found.</Alert>
      </Box>
    );
  }

  return (
    <Box px={{ xs: 2, md: 6 }} py={6}>
      <Grid container spacing={6} justifyContent="center" alignItems="center">
        {/* IMAGE */}
        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <Box
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              backgroundColor: "#fafafa",
              p: 2,
              maxWidth: 500,
              mx: "auto",
            }}
          >
            <CardMedia
              component="img"
              image={data?.image ?? ""}
              alt={data?.name ?? ""}
              sx={{
                width: "100%",
                height: 420,
                objectFit: "contain",
              }}
            />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
        >
          <Typography variant="h4" fontWeight={700}>
            {data?.name ?? "—"}
          </Typography>

          <Typography variant="h5" fontWeight={600} color="success.main" mt={1}>
            ${data?.price ?? "—"}
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Rating value={data?.rate ?? 0} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary">
              ({data?.rate ?? 0})
            </Typography>
          </Box>

          <Divider sx={{ my: 3, width: "60%" }} />

          <Typography
            variant="body1"
            color="text.secondary"
            lineHeight={1.8}
            maxWidth={450}
          >
            {data.description}
          </Typography>

          <Box
            mt={4}
            display="flex"
            gap={2}
            justifyContent="center"
            flexWrap="wrap"
          >
            <Button variant="contained" size="large" sx={{ px: 4 }}>
              Add to Cart
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
