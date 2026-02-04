import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
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

import useCart from "../../hooks/useCart";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";
import useUpdateQuantity from "../../hooks/useUpdateQuantity";

import { useTranslation } from "react-i18next";
export default function Cart() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { items, cartTotal, isLoading, isError } = useCart();
  const remove = useRemoveFromCart();
  const update = useUpdateQuantity();

  const [removingId, setRemovingId] = React.useState(null);
  const [updatingId, setUpdatingId] = React.useState(null);

  const currency = (v) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(v);

  if (isLoading) return <Typography>{t("buttons.loading")}</Typography>;
  if (isError) return <Typography>{t("cart.failedLoad")}</Typography>;

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
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: theme.palette.card.main,
          color: theme.palette.primary.main,
          borderRadius: 2,
          p: 2,
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ color: theme.palette.primary.main, fontWeight: 700 }}
              >
                {t("cart.product")}
              </TableCell>
              <TableCell
                sx={{ color: theme.palette.primary.main, fontWeight: 700 }}
              >
                {t("products.price")}
              </TableCell>
              <TableCell
                sx={{ color: theme.palette.primary.main, fontWeight: 700 }}
              >
                {t("cart.quantity")}
              </TableCell>
              <TableCell
                sx={{ color: theme.palette.primary.main, fontWeight: 700 }}
              >
                {t("cart.subtotal")}
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 700,
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
                    color: theme.palette.card.contrastText,
                    textAlign: "center",
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
                    "&:hover": { backgroundColor: "rgba(255,114,76,0.04)" },
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
                          color: theme.palette.primary.main,
                          fontWeight: 700,
                        }}
                      >
                        {item.productName ?? item.product?.title ?? "—"}
                      </Typography>
                      {item.product?.description && (
                        <Typography
                          sx={{
                            color: theme.palette.card.contrastText,
                            fontSize: "0.9rem",
                          }}
                        >
                          {item.product.description}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>

                  <TableCell sx={{ color: theme.palette.card.contrastText }}>
                    {currency(item.price ?? item.unitPrice ?? 0)}
                  </TableCell>

                  <TableCell sx={{ color: theme.palette.card.contrastText }}>
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
                        {updatingId === resolveId(item) && update.isLoading ? (
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
                        {updatingId === resolveId(item) && update.isLoading ? (
                          <CircularProgress size={16} color="inherit" />
                        ) : (
                          <AddIcon sx={{ fontSize: 18, color: "#fff" }} />
                        )}
                      </IconButton>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ color: theme.palette.card.contrastText }}>
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
                  sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                >
                  {t("cart.total")}
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                >
                  {currency(cartTotal)}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
