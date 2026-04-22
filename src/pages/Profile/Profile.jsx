import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useProfile from "../../hooks/useProfile";
import useProfileOrders from "../../hooks/useProfileOrders";
import { extractApiErrors } from "../../utils/api";

export default function Profile() {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const location = useLocation();
  const { data, isLoading, isError, error } = useProfile();
  const orders = useProfileOrders(data);
  const isOrdersTab = location.pathname.startsWith("/profile/orders");

  const labels = {
    title: i18n.language === "ar" ? "الملف الشخصي" : "Profile",
    subtitle:
      i18n.language === "ar"
        ? "بدّل بين معلومات الحساب وسجل الأوردرات من نفس الصفحة."
        : "Switch between account information and order history in the same page.",
    infoTab:
      i18n.language === "ar" ? "معلومات الملف" : "Profile Information",
    ordersTab:
      i18n.language === "ar" ? "طلباتي" : "Profile Orders",
    failed:
      i18n.language === "ar"
        ? "فشل تحميل بيانات الملف الشخصي."
        : "Failed to load profile data.",
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "40vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Alert severity="error">
          {extractApiErrors(error, labels.failed).join(" ")}
        </Alert>
      </Container>
    );
  }

  const tabButtonSx = (isActive) => ({
    borderRadius: 999,
    px: 2.5,
    py: 1.2,
    fontWeight: 700,
    textTransform: "none",
    color: isActive ? theme.palette.primary.contrastText : "text.primary",
    backgroundColor: isActive
      ? theme.palette.primary.main
      : alpha(theme.palette.primary.main, 0.08),
    "&:hover": {
      backgroundColor: isActive
        ? theme.palette.primary.main
        : alpha(theme.palette.primary.main, 0.14),
    },
  });

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Stack spacing={3}>
        <Box textAlign={{ xs: "center", md: "start" }}>
          <Typography
            variant="overline"
            color="primary.main"
            sx={{ fontWeight: 800 }}
          >
            Account
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, mt: 1 }}>
            {labels.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {labels.subtitle}
          </Typography>
        </Box>

        <Paper
          sx={{
            p: 1.2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Button
            component={NavLink}
            to="/profile"
            end
            sx={tabButtonSx(!isOrdersTab)}
          >
            {labels.infoTab}
          </Button>
          <Button
            component={NavLink}
            to="/profile/orders"
            sx={tabButtonSx(isOrdersTab)}
          >
            {labels.ordersTab}
          </Button>
        </Paper>

        <Outlet
          context={{
            profile: data,
            orders,
            i18n,
          }}
        />
      </Stack>
    </Container>
  );
}
