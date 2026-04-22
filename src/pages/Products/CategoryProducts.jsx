import { useParams, useNavigate, useLocation } from "react-router-dom";
import useProductsByCategory from "../../hooks/useProductsByCategory";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import ProductCard from "../../components/ProductComponent/ProductCard";
import { useTranslation } from "react-i18next";

export default function CategoryProducts() {
  const { t } = useTranslation();
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
        <Alert severity="error">{t("products.failedCategoryLoad")}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 } }}>
      <Stack spacing={1} sx={{ mb: 3, textAlign: { xs: "center", md: "start" } }}>
        <Typography variant="overline" color="primary.main" sx={{ fontWeight: 800 }}>
          Collection
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {categoryName
            ? categoryName
            : t("products.categoryWithId", { id: categoryId })}
        </Typography>
      </Stack>

      <Grid container justifyContent="center" spacing={3}>
        {data.map((product) => (
          <Grid
            item
            key={product.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ProductCard
              product={product}
              onDetails={(id) => navigate(`/products/${id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
