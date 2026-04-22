import {
  Alert,
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

function formatCurrency(value, language) {
  return new Intl.NumberFormat(language === "ar" ? "ar-US" : "en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value || 0));
}

function formatDate(value, language) {
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return "--";
  }

  return new Intl.DateTimeFormat(language === "ar" ? "ar" : "en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsedDate);
}

function resolveStatusColor(statusValue) {
  const normalizedValue = String(statusValue || "").toLowerCase();

  if (normalizedValue.includes("pending")) {
    return "warning";
  }

  if (normalizedValue.includes("cancel")) {
    return "error";
  }

  return "success";
}

export default function ProfileOrders({ orders, i18n }) {
  const labels = {
    title: i18n.language === "ar" ? "طلباتي" : "Profile Orders",
    subtitle:
      i18n.language === "ar"
        ? "الأوردرات المعادة من الـ Profile API أو المحفوظة محلياً بعد Checkout."
        : "Orders returned from the Profile API or stored locally after checkout.",
    empty:
      i18n.language === "ar"
        ? "لا يوجد أوردرات لعرضها حالياً."
        : "There are no orders to display right now.",
    paymentMethod: i18n.language === "ar" ? "طريقة الدفع" : "Payment Method",
    createdAt: i18n.language === "ar" ? "التاريخ" : "Created At",
    items: i18n.language === "ar" ? "المنتجات" : "Items",
    sourceApi: i18n.language === "ar" ? "من السيرفر" : "From API",
    sourceLocal:
      i18n.language === "ar" ? "محفوظ محلياً" : "Saved locally",
  };

  return (
    <Paper sx={{ p: { xs: 3, md: 4 } }}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={1.25} alignItems="center">
          <ReceiptLongOutlinedIcon color="primary" />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {labels.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {labels.subtitle}
            </Typography>
          </Box>
        </Stack>

        {orders.length === 0 ? (
          <Alert severity="info">{labels.empty}</Alert>
        ) : (
          <Stack spacing={2}>
            {orders.map((order) => (
              <Paper
                key={`${order.id}-${order.createdAt}`}
                variant="outlined"
                sx={{
                  p: 2.5,
                  borderColor: "divider",
                  backgroundColor: "background.default",
                }}
              >
                <Stack spacing={2}>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", md: "center" }}
                    spacing={1.5}
                  >
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        #{order.id}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800, mt: 0.25 }}>
                        {formatCurrency(order.total, i18n.language)}
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      <Chip
                        label={order.status}
                        color={resolveStatusColor(order.status)}
                        sx={{ fontWeight: 700 }}
                      />
                      <Chip
                        label={
                          order.source === "api" ? labels.sourceApi : labels.sourceLocal
                        }
                        variant="outlined"
                      />
                    </Stack>
                  </Stack>

                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    divider={<Divider flexItem orientation="vertical" />}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <LocalAtmOutlinedIcon fontSize="small" color="primary" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {labels.paymentMethod}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {order.paymentMethod || "--"}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <CalendarMonthOutlinedIcon fontSize="small" color="primary" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {labels.createdAt}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {formatDate(order.createdAt, i18n.language)}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <ShoppingBagOutlinedIcon fontSize="small" color="primary" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {labels.items}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {order.items.length}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>

                  <Divider />

                  <Stack spacing={1.25}>
                    {order.items.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        --
                      </Typography>
                    ) : (
                      order.items.map((item) => (
                        <Stack
                          key={`${order.id}-${item.id}`}
                          direction={{ xs: "column", sm: "row" }}
                          justifyContent="space-between"
                          spacing={0.5}
                        >
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            x{item.quantity} • {formatCurrency(item.subtotal, i18n.language)}
                          </Typography>
                        </Stack>
                      ))
                    )}
                  </Stack>

                  {order.paymentUrl ? (
                    <>
                      <Divider />
                      <Typography variant="body2" color="text.secondary">
                        {order.paymentUrl}
                      </Typography>
                    </>
                  ) : null}
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
