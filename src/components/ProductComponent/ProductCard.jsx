import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import InfoIcon from "@mui/icons-material/ReadMore";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAddToCart from "../../hooks/useCart";
function ProductCard({ product, onDetails }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { mutate: addToCart, isLoading } = useAddToCart(() => {
    navigate("/cart");
  });
  return (
    <Card
      sx={{
        width: 300,
        mt: 5,
        mb: 5,
        backgroundColor: theme.palette.card?.main ?? "#2E3046",
        color: theme.palette.card?.contrastText ?? "#F4F4F8",
        borderRadius: 2,
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardMedia component="img" height="340" image={product.image} />

      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {product.name}
        </Typography>
        <Typography sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
          ${product.price}
        </Typography>
        <Rating
          value={product.rate}
          precision={0.5}
          readOnly
          icon={<StarIcon sx={{ color: "#FFC107" }} />}
          emptyIcon={
            <StarBorderIcon
              sx={{
                color: "#ffffff",
                bgcolor: "transparent",
                p: "2px",
                borderRadius: "4px",
              }}
            />
          }
          sx={{ mt: 1 }}
        />
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          p: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddShoppingCartIcon />}
          onClick={() =>
            addToCart({
              productId: product.id,
            })
          }
          disabled={isLoading}
          sx={{
            borderRadius: "10px",
            padding: "10px 18px",
            whiteSpace: "nowrap",
            textTransform: "none",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxShadow: "none",
          }}
        >
          {t("products.addToCart")}
        </Button>

        <Button
          startIcon={<InfoIcon />}
          onClick={() => {
            if (!product?.id) return;
            if (typeof onDetails === "function") {
              onDetails(product.id);
            } else {
              navigate(`/products/${product.id}`);
            }
          }}
          sx={{ color: "rgba(255,255,255,0.86)", textTransform: "none" }}
        >
          {t("products.viewDetails")}
        </Button>
      </CardActions>
    </Card>
  );
}
export default ProductCard;
