import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        "https://knowledgeshop.runasp.net/api/Categories"
      );

      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.log(e);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading)
    return (
      <Box p={3} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

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
            <Grid item xs={12} sm={6} md={4} key={cat.id ?? cat.categoryId ?? cat.name}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6">
                    {cat.name ?? cat.categoryName ?? "Unnamed Category"}
                  </Typography>

                  {/* اختياري: اعرض أي بيانات إضافية */}
                  {/* <Typography variant="body2" color="text.secondary">
                    ID: {cat.id ?? cat.categoryId}
                  </Typography> */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
