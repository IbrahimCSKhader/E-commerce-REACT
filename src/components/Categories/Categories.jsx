import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import { useTranslation } from "react-i18next";

export default function Categories() {
  const { t, i18n } = useTranslation();
  console.log("Categories Component Rendered");

  const navigate = useNavigate();
  const { data: categories = [], isLoading, isError } = useCategories();

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
        <Alert severity="error">{t("categories.failedLoad")}</Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        {t("navbar.categories")}
      </Typography>

      {categories.length === 0 ? (
        <Alert severity="info">{t("categories.noneFound")}</Alert>
      ) : (
        <Grid container spacing={2}>
          {categories.map((cat) => (
            <Grid item xs={12} sm={6} md={4} key={cat.id}>
              <Card sx={{ height: "100%" }}>
                <CardActionArea
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "stretch",
                    transition:
                      "transform 200ms ease, background-color 200ms ease",
                    "&:hover": {
                      backgroundColor: "rgba(255,114,76,0.08)",
                      transform: "translateY(-6px)",
                    },
                    "&:hover .category-title": {
                      color: "primary.main",
                    },
                  }}
                  onClick={() =>
                    navigate(`/products/category/${cat.id}`, {
                      state: { categoryName: cat.name },
                    })
                  }
                >
                  <CardContent sx={{ width: "100%" }}>
                    <Typography
                      variant="h6"
                      className="category-title"
                      sx={{ transition: "color 200ms ease" }}
                    >
                      {cat.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
