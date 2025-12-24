import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import useCategories from "../../hooks/useCategories";

export default function Categories() {
  console.log("Categories Component Rendered");


  const {
    data: categories = [],
    isLoading,
    isError,
  } = useCategories();

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
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Categories 
      </Typography>

      {categories.length === 0 ? (
        <Alert severity="info">No categories found.</Alert>
      ) : (
        <Grid container spacing={2}>
          {categories.map((cat) => (
            <Grid item xs={12} sm={6} md={4} key={cat.id}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6">
                    {cat.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
