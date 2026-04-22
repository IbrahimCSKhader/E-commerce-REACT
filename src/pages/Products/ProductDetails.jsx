import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import useProductDetails from "../../hooks/useProductDetails";
import useAddToCart from "../../hooks/useAddToCart";
import ProductReviewForm from "../../components/ProductComponent/ProductReviewForm";
import ProductReviews from "../../components/ProductComponent/ProductReviews";

export default function ProductDetails() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useProductDetails(id);
  const { mutate: addToCart, isPending } = useAddToCart();

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
        <Alert severity="error">{t("products.failedDetails")}</Alert>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box py={6} display="flex" justifyContent="center">
        <Alert severity="info">{t("products.notFound")}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Grid container spacing={6} justifyContent="center" alignItems="center">
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
            {data?.name ?? "--"}
          </Typography>

          <Typography variant="h5" fontWeight={600} color="success.main" mt={1}>
            ${data?.price ?? "--"}
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Rating value={data?.rate ?? 0} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary">
              ({data?.rate ?? 0}) | {data?.reviews?.length ?? 0}
            </Typography>
          </Box>

          <Divider sx={{ my: 3, width: "60%" }} />

          <Typography
            variant="body1"
            color="text.secondary"
            lineHeight={1.8}
            maxWidth={450}
          >
            {data?.description}
          </Typography>

          <Box
            mt={4}
            display="flex"
            gap={2}
            justifyContent="center"
            flexWrap="wrap"
          >
            <Button
              onClick={() =>
                addToCart(
                  { productId: data.id, Count: 1 },
                  {
                    onSuccess: (res) =>
                      console.log("Add to cart success:", res?.data ?? res),
                    onError: (err) =>
                      console.error(
                        "Add to cart error:",
                        err?.response?.data ?? err,
                      ),
                  },
                )
              }
              variant="contained"
              size="large"
              disabled={isPending}
              sx={{ px: 4 }}
            >
              {t("products.addToCart")}
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate(-1)}
            >
              {t("buttons.back")}
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: { xs: 2, md: 3 } }}>
        <Grid item xs={12} md={5}>
          <ProductReviewForm productId={data.id} i18n={i18n} />
        </Grid>
        <Grid item xs={12} md={7}>
          <ProductReviews
            reviews={data?.reviews}
            averageRating={data?.rate}
            i18n={i18n}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
