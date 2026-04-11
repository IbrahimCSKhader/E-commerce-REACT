import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useCategories from "../../hooks/useCategories";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductComponent/ProductCard";

export default function Home() {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories();
  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useProducts();

  const featuredCategories = categories.slice(0, 6);
  const featuredProducts = products.slice(0, 6);

  return (
    <Box sx={{ minHeight: "100vh", pb: { xs: 6, md: 10 } }}>
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Card sx={{ overflow: "hidden" }}>
              <Box
                component="img"
                src="/ibrahimGraduation.jpeg"
                alt="Ibrahim Graduation"
                sx={{
                  width: "100%",
                  height: { xs: 360, md: 560 },
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 3, md: 4 },
                background: `linear-gradient(180deg, ${alpha(
                  theme.palette.background.paper,
                  0.98,
                )} 0%, ${alpha(theme.palette.primary.main, 0.04)} 100%)`,
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 800 }}>
                {t("home.name")}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PersonOutlineIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="body1">{t("home.studentYear")}</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <InfoOutlinedIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="body1">{t("home.passion")}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <BuildOutlinedIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="body2" color="text.secondary">
                  {t("home.schoolNote")}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 6, md: 8 } }}>
          <Stack spacing={1.2} sx={{ mb: 3 }}>
            <Typography
              variant="overline"
              color="primary.main"
              sx={{ fontWeight: 800 }}
            >
              {t("home.categoriesSection")}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {t("home.categoriesHint")}
            </Typography>
          </Stack>

          {categoriesLoading ? (
            <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : categoriesError ? (
            <Alert severity="error">{t("categories.failedLoad")}</Alert>
          ) : featuredCategories.length === 0 ? (
            <Alert severity="info">{t("categories.empty")}</Alert>
          ) : (
            <Grid container spacing={2.5}>
              {featuredCategories.map((category) => (
                <Grid item xs={12} sm={6} md={4} lg={2} key={category.id}>
                  <Card
                    sx={{
                      height: "100%",
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <CardActionArea
                      sx={{ height: "100%" }}
                      onClick={() =>
                        navigate(`/products/category/${category.id}`, {
                          state: { categoryName: category.name },
                        })
                      }
                    >
                      <CardContent sx={{ p: 2.5 }}>
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.1,
                            ),
                            color: theme.palette.primary.main,
                            mb: 2,
                          }}
                        >
                          <CategoryOutlinedIcon />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>
                          {category.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 1 }}
                        >
                          {t("home.categoryCard")}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        <Box sx={{ mt: { xs: 6, md: 8 } }}>
          <Stack spacing={1.2} sx={{ mb: 3 }}>
            <Typography
              variant="overline"
              color="primary.main"
              sx={{ fontWeight: 800 }}
            >
              {t("home.productsSection")}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {t("home.productsHint")}
            </Typography>
          </Stack>

          {productsLoading ? (
            <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : productsError ? (
            <Alert severity="error">{t("products.failedDetails")}</Alert>
          ) : featuredProducts.length === 0 ? (
            <Alert severity="info">{t("products.notFound")}</Alert>
          ) : (
            <Grid container spacing={3} justifyContent="center">
              {featuredProducts.map((product) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={product.id}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <ProductCard
                    product={product}
                    onDetails={(id) => id && navigate(`/products/${id}`)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
}
