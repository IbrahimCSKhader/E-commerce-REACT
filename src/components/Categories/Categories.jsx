import axiosInstance from "../../API/axiosInstance";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import useQuery from "../../hooks/useCategories";

export default function Categories() {
  const fetchCategories = async () => {
    const res = await axiosInstance.get("/Categories");
    return Array.isArray(res.data) ? res.data : [];
  };

  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    staleTime: 5 * 60 * 1000,
    queryFn: fetchCategories,
  });

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
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={cat.id ?? cat.categoryId ?? cat.name}
            >
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6">
                    {cat.name ?? cat.categoryName ?? "Unnamed Category"}
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
