import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Stack,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";
import useUpdateQuantity from "../../hooks/useUpdateQuantity";
import { useTranslation } from "react-i18next";

export default function Cart() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { items, cartTotal, isLoading, isError } = useCart(i18n.language);
  const remove = useRemoveFromCart(i18n.language);
  const update = useUpdateQuantity(i18n.language);
  const navigate = useNavigate();
  const [removingId, setRemovingId] = React.useState(null);
  const [updatingId, setUpdatingId] = React.useState(null);

  const currency = (v) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(v);

  if (isLoading) return <Typography>{t("cart.loading")}</Typography>;
  if (isError) return <Typography>{t("cart.error")}</Typography>;

  const resolveId = (item) =>
    item.id ??
    item.cartItemId ??
    item.cartItemID ??
    item.cartId ??
    item.productId ??
    item.product?.id ??
    null;

  const handleRemove = (item) => {
    const idCandidate = resolveId(item);
    if (!idCandidate) {
      console.error("Cannot remove cart item - no id found for item:", item);
      return;
    }

    setRemovingId(idCandidate);
    remove.mutate(idCandidate, {
      onSuccess: () => setRemovingId(null),
      onError: (err) => {
        console.error("Remove failed:", err);
        setRemovingId(null);
      },
    });
  };

  const handleUpdateQuantity = (item, delta) => {
    const idCandidate = resolveId(item);
    if (!idCandidate) {
      console.error("Cannot update cart item - no id found for item:", item);
      return;
    }

    const current = item.count ?? item.quantity ?? 1;
    const newCount = Math.max(1, current + delta);
    if (newCount === current) return;

    setUpdatingId(idCandidate);
    update.mutate(
      { cartItemId: idCandidate, count: newCount },
      {
        onSuccess: () => setUpdatingId(null),
        onError: (err) => {
          console.error("Update failed:", err);
          setUpdatingId(null);
        },
      },
    );
  };

  return (
    <Box sx={{ px: { xs: 0, md: 1 }, py: 2 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          mb: 2,
          textAlign: { xs: "center", md: "start" },
        }}
      >
        {t("cart.title")}
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: 4,
          p: { xs: 1.5, md: 2.5 },
          boxShadow: "0 18px 40px rgba(42,44,65,0.08)",
          border: "1px solid rgba(42,44,65,0.06)",
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ color: theme.palette.text.primary, fontWeight: 800 }}
              >
                {t("cart.product")}
              </TableCell>
              <TableCell
                sx={{ color: theme.palette.text.primary, fontWeight: 800 }}
              >
                {t("products.price")}
              </TableCell>
              <TableCell
                sx={{ color: theme.palette.text.primary, fontWeight: 800 }}
              >
                {t("cart.quantity")}
              </TableCell>
              <TableCell
                sx={{ color: theme.palette.text.primary, fontWeight: 800 }}
              >
                {t("cart.subtotal")}
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                {t("cart.actions")}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  sx={{
                    color: theme.palette.text.secondary,
                    textAlign: "center",
                    py: 6,
                  }}
                >
                  {t("cart.empty")}
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{
                    "&:hover": { backgroundColor: "rgba(255,114,76,0.05)" },
                    transition: "background-color 200ms ease",
                  }}
                >
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: theme.palette.text.primary,
                          fontWeight: 700,
                        }}
                      >
                        {item.productName ?? item.product?.title ?? "—"}
                      </Typography>
                      {item.product?.description && (
                        <Typography
                          sx={{
                            color: theme.palette.text.secondary,
                            fontSize: "0.9rem",
                          }}
                        >
                          {item.product.description}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>

                  <TableCell sx={{ color: theme.palette.text.secondary }}>
                    {currency(item.price ?? item.unitPrice ?? 0)}
                  </TableCell>

                  <TableCell sx={{ color: theme.palette.text.secondary }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleUpdateQuantity(item, -1)}
                        disabled={
                          updatingId === resolveId(item) ||
                          (item.count ?? item.quantity ?? 1) <= 1
                        }
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          color: "#fff",
                          padding: 0.6,
                          borderRadius: 1,
                          "&:hover": { backgroundColor: "#e3623f" },
                          "&.Mui-disabled": { opacity: 0.6 },
                        }}
                      >
                        {updatingId === resolveId(item) && update.isPending ? (
                          <CircularProgress size={16} color="inherit" />
                        ) : (
                          <RemoveIcon sx={{ fontSize: 18, color: "#fff" }} />
                        )}
                      </IconButton>

                      <TextField
                        size="small"
                        value={item.count ?? item.quantity ?? 1}
                        inputProps={{
                          readOnly: true,
                          style: {
                            textAlign: "center",
                            width: 48,
                            color: theme.palette.primary.main,
                            fontWeight: 700,
                          },
                        }}
                        sx={{
                          "& .MuiInputBase-input": { padding: "6px 8px" },
                          backgroundColor: "transparent",
                        }}
                      />

                      <IconButton
                        size="small"
                        onClick={() => handleUpdateQuantity(item, 1)}
                        disabled={updatingId === resolveId(item)}
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          color: "#fff",
                          padding: 0.6,
                          borderRadius: 1,
                          "&:hover": { backgroundColor: "#e3623f" },
                          "&.Mui-disabled": { opacity: 0.6 },
                        }}
                      >
                        {updatingId === resolveId(item) && update.isPending ? (
                          <CircularProgress size={16} color="inherit" />
                        ) : (
                          <AddIcon sx={{ fontSize: 18, color: "#fff" }} />
                        )}
                      </IconButton>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ color: theme.palette.text.secondary }}>
                    {currency(
                      (item.price ?? item.unitPrice ?? 0) *
                        (item.count ?? item.quantity ?? 1),
                    )}
                  </TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={
                        removingId === resolveId(item) ? (
                          <CircularProgress size={16} color="inherit" />
                        ) : (
                          <DeleteOutlineIcon />
                        )
                      }
                      onClick={() => handleRemove(item)}
                      disabled={removingId === resolveId(item)}
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#e3623f",
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 20px rgba(255,114,76,0.12)",
                        },
                      }}
                    >
                      {removingId === resolveId(item)
                        ? t("cart.removing")
                        : t("cart.remove")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}

            {items.length > 0 && (
              <TableRow>
                <TableCell colSpan={3} sx={{ border: "none" }} />
                <TableCell
                  sx={{ fontWeight: 800, color: theme.palette.text.primary }}
                >
                  {t("cart.total")}
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 800, color: theme.palette.primary.main }}
                >
                  {currency(cartTotal)}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Paper
        sx={{
          mt: 2.5,
          p: { xs: 2, md: 2.5 },
          backgroundColor: theme.palette.background.paper,
          border: "1px solid rgba(42,44,65,0.06)",
          boxShadow: "0 18px 40px rgba(42,44,65,0.08)",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              {t("cart.total")}
            </Typography>
            <Typography variant="h5" fontWeight={800} color="primary.main">
              {currency(cartTotal)}
            </Typography>
          </Box>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              onClick={() => navigate("/products")}
              variant="outlined"
              disabled={items.length === 0}
              startIcon={<ShoppingBagOutlinedIcon />}
              sx={{ minWidth: { xs: "100%", sm: 190 }, py: 1.2 }}
            >
              {t("cart.continue")}
            </Button>
            <Button
              onClick={() => navigate("/checkout")}
              variant="contained"
              disabled={items.length === 0}
              endIcon={<ArrowForwardIcon />}
              sx={{ minWidth: { xs: "100%", sm: 190 }, py: 1.2 }}
            >
              {t("cart.checkout")}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
