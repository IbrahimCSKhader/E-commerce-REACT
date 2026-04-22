import React from "react";
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useCheckout from "../../hooks/useCheckout";
import { useTranslation } from "react-i18next";

export default function CheckOut() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { items, cartTotal, isError, isLoading } = useCart();
  const [paymentMethod, setPaymentMethod] = React.useState("cash");
  const [successMessage, setSuccessMessage] = React.useState("");
  const {
    mutate: checkout,
    isPending: isCheckoutLoading,
    error: checkoutError,
  } = useCheckout();

  const currency = (value) =>
    new Intl.NumberFormat(i18n.language === "ar" ? "ar-US" : "en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(value || 0));

  const paymentMethodLabel =
    paymentMethod === "visa" ? t("checkout.visa") : t("checkout.cash");

  const handlePayNow = () => {
    if (!items.length) {
      return;
    }

    const apiPaymentMethod = paymentMethod === "cash" ? "Cash" : "Visa";

    checkout(
      {
        paymentMethod: apiPaymentMethod,
        orderSnapshot: {
          items,
          cartTotal,
        },
      },
      {
        onSuccess: (response) => {
          if (response?.url) {
            window.location.href = response.url;
            return;
          }

          setSuccessMessage(
            t("checkout.success") || "Checkout successful! Redirecting...",
          );

          setTimeout(() => {
            navigate("/home");
          }, 2000);
        },
        onError: (err) => {
          console.error("Checkout error:", err);
        },
      },
    );
  };

  if (isLoading) {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <Typography variant="h6">{t("cart.loading")}</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <Typography variant="h6" color="error">
          {t("cart.error")}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "transparent" }}>
      {successMessage && (
        <Alert severity="success" sx={{ mb: 0, mx: 0, borderRadius: 0 }}>
          {successMessage}
        </Alert>
      )}

      {checkoutError && (
        <Alert severity="error" sx={{ mb: 0, mx: 0, borderRadius: 0 }}>
          {checkoutError.message ||
            t("checkout.error") ||
            "Checkout failed. Please try again."}
        </Alert>
      )}

      <Stack spacing={0}>
        <Box
          sx={{
            py: 3,
            px: { xs: 2, md: 4 },
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="overline" color="text.secondary">
            {t("checkout.summary")}
          </Typography>
          <Typography variant="h4" fontWeight={800} color="text.primary">
            {t("checkout.title")}
          </Typography>
        </Box>

        <Box
          sx={{
            py: 3,
            px: { xs: 2, md: 4 },
            backgroundColor: "background.paper",
          }}
        >
          {items.length === 0 ? (
            <Alert severity="info">{t("cart.empty")}</Alert>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 800, py: 2 }}>
                      {t("cart.product")}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 2 }}>
                      {t("products.price")}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 2 }}>
                      {t("cart.quantity")}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 2 }}>
                      {t("cart.total")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell sx={{ fontWeight: 600, py: 2 }}>
                        {item.productName ?? item.product?.title ?? "--"}
                      </TableCell>
                      <TableCell align="right" sx={{ py: 2 }}>
                        {currency(item.price ?? 0)}
                      </TableCell>
                      <TableCell align="right" sx={{ py: 2 }}>
                        {item.quantity ?? item.count ?? 1}
                      </TableCell>
                      <TableCell align="right" sx={{ py: 2 }}>
                        {currency(
                          (item.price ?? 0) *
                            (item.quantity ?? item.count ?? 1),
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>

        {items.length > 0 && (
          <Box
            sx={{
              py: 2.5,
              px: { xs: 2, md: 4 },
              backgroundColor: "rgba(255,114,76,0.05)",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Box sx={{ minWidth: { xs: "100%", md: 320 }, textAlign: "right" }}>
              <Typography variant="body2" color="text.secondary">
                {t("cart.total")}
              </Typography>
              <Typography variant="h5" fontWeight={800} color="primary.main">
                {currency(cartTotal)}
              </Typography>
            </Box>
          </Box>
        )}

        {items.length > 0 && (
          <Box
            sx={{
              py: 3,
              px: { xs: 2, md: 4 },
              backgroundColor: "background.paper",
            }}
          >
            <Stack spacing={2} sx={{ maxWidth: 420, ml: { md: "auto" } }}>
              <FormControl fullWidth>
                <InputLabel id="paymentMethod-label">
                  {t("checkout.paymentMethod")}
                </InputLabel>
                <Select
                  labelId="paymentMethod-label"
                  id="paymentMethod"
                  value={paymentMethod}
                  label={t("checkout.paymentMethod")}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                >
                  <MenuItem value="cash">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LocalAtmOutlinedIcon fontSize="small" />
                      {t("checkout.cash")}
                    </Box>
                  </MenuItem>
                  <MenuItem value="visa">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CreditCardOutlinedIcon fontSize="small" />
                      {t("checkout.visa")}
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>

              <Box
                sx={{ py: 2, px: 2, backgroundColor: "rgba(255,114,76,0.08)" }}
              >
                <Typography variant="caption" color="text.secondary">
                  {t("checkout.paymentMethod")}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                  {paymentMethod === "cash" ? (
                    <LocalAtmOutlinedIcon fontSize="small" color="primary" />
                  ) : (
                    <CreditCardOutlinedIcon fontSize="small" color="primary" />
                  )}
                  <Typography variant="body1" fontWeight={700}>
                    {paymentMethodLabel}
                  </Typography>
                </Stack>
              </Box>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ pt: 1 }}
              >
                <Button
                  onClick={() => navigate("/cart")}
                  variant="outlined"
                  fullWidth
                  disabled={isCheckoutLoading}
                >
                  {t("checkout.backToCart")}
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ minHeight: 48 }}
                  disabled={!items.length || isCheckoutLoading}
                  startIcon={
                    isCheckoutLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <ShoppingCartCheckoutOutlinedIcon />
                    )
                  }
                  onClick={handlePayNow}
                >
                  {isCheckoutLoading
                    ? t("checkout.processing") || "Processing..."
                    : t("checkout.payNow")}
                </Button>
              </Stack>
            </Stack>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
