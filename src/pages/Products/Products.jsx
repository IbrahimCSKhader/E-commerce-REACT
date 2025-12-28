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
          <Card sx={{ width: 300, maxWidth: 500, mt: 5, mb: 5 }}>
            <CardMedia
              component="img"
              alt="product img"
              height="340"
              image={p.image}
            />
            <CardContent>
              <Typography gutterBottom variant=" h5" component="div">
                {p.name}
              </Typography>

              <Typography
                gutterBottom
                variant=" h6"
                component="div"
                sx={{ color: "green" }}
              >
                {p.price}
              </Typography>
              <Rating value={p.rate} readOnly />
            </CardContent>
            <CardActions>
              <Button size="medium">Add to cart</Button>
              <Button
                size="medium"
                onClick={() => navigate(`/products/${p.id}`)}
              >
                Details
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
