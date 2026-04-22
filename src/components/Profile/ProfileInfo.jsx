import {
  Alert,
  Avatar,
  Box,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import useAuthStore from "../../store/AuthStore";

function formatFieldLabel(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (letter) => letter.toUpperCase());
}

function formatFieldValue(value, labels) {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "boolean") {
    return value ? labels.yes : labels.no;
  }

  if (value === null || value === undefined || value === "") {
    return "--";
  }

  return String(value);
}

export default function ProfileInfo({ profile, i18n }) {
  const storedUser = useAuthStore((state) => state.user);

  const labels = {
    title: i18n.language === "ar" ? "معلومات الملف الشخصي" : "Profile Information",
    subtitle:
      i18n.language === "ar"
        ? "بيانات حسابك الحالية كما وصلتنا من الـ API."
        : "Your current account details returned from the API.",
    accountOverview:
      i18n.language === "ar" ? "نظرة عامة" : "Overview",
    accountDetails:
      i18n.language === "ar" ? "تفاصيل إضافية" : "Additional Details",
    email: i18n.language === "ar" ? "البريد الإلكتروني" : "Email",
    phone: i18n.language === "ar" ? "رقم الهاتف" : "Phone",
    role: i18n.language === "ar" ? "الدور" : "Role",
    userName: i18n.language === "ar" ? "اسم المستخدم" : "Username",
    blocked: i18n.language === "ar" ? "محظور" : "Blocked",
    noData:
      i18n.language === "ar"
        ? "لا توجد تفاصيل إضافية لهذا الحساب."
        : "No additional account details are available for this account.",
    yes: i18n.language === "ar" ? "نعم" : "Yes",
    no: i18n.language === "ar" ? "لا" : "No",
  };

  const safeProfile =
    profile && typeof profile === "object" && !Array.isArray(profile) ? profile : {};
  const mergedProfile = {
    ...storedUser,
    ...safeProfile,
  };

  const displayName =
    mergedProfile.fullName ||
    mergedProfile.name ||
    mergedProfile.userName ||
    mergedProfile.username ||
    "User";

  const email = mergedProfile.email || "--";
  const phone = mergedProfile.phoneNumber || mergedProfile.phone || "--";
  const role = mergedProfile.role || "--";
  const userName =
    mergedProfile.userName || mergedProfile.username || mergedProfile.name || "--";
  const isBlocked =
    mergedProfile.isBlocked ?? mergedProfile.blocked ?? mergedProfile.lockedOut;

  const detailEntries = Object.entries(safeProfile).filter(([key, value]) => {
    if (
      ["orders", "orderHistory", "orderHistories", "checkouts", "purchases"].includes(
        key,
      )
    ) {
      return false;
    }

    const valueType = typeof value;
    return (
      valueType === "string" ||
      valueType === "number" ||
      valueType === "boolean" ||
      (Array.isArray(value) &&
        value.every((item) => ["string", "number"].includes(typeof item)))
    );
  });

  return (
    <Stack spacing={3}>
      <Paper
        sx={{
          p: { xs: 3, md: 4 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "center" },
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "center", sm: "center" }}
        >
          <Avatar
            sx={{
              width: 84,
              height: 84,
              fontSize: 30,
              fontWeight: 800,
              bgcolor: "primary.main",
            }}
          >
            {displayName?.charAt(0)?.toUpperCase() || "U"}
          </Avatar>

          <Box textAlign={{ xs: "center", sm: "start" }}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {labels.title}
            </Typography>
            <Typography variant="h5" sx={{ mt: 0.75, fontWeight: 700 }}>
              {displayName}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              {labels.subtitle}
            </Typography>
          </Box>
        </Stack>

        {isBlocked ? (
          <Chip
            label={labels.blocked}
            color="error"
            sx={{ fontWeight: 700 }}
          />
        ) : null}
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: { xs: 3, md: 4 }, height: "100%" }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
              {labels.accountOverview}
            </Typography>

            <Stack spacing={2}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <MailOutlineIcon color="primary" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {labels.email}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {email}
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <LocalPhoneOutlinedIcon color="primary" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {labels.phone}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {phone}
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <ShieldOutlinedIcon color="primary" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {labels.role}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {role}
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <BadgeOutlinedIcon color="primary" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {labels.userName}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {userName}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper sx={{ p: { xs: 3, md: 4 }, height: "100%" }}>
            <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 3 }}>
              <AccountCircleOutlinedIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                {labels.accountDetails}
              </Typography>
            </Stack>

            {detailEntries.length === 0 ? (
              <Alert severity="info">{labels.noData}</Alert>
            ) : (
              <Grid container spacing={2}>
                {detailEntries.map(([key, value]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        borderColor: "divider",
                        backgroundColor: "background.default",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {formatFieldLabel(key)}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 0.75, fontWeight: 700 }}>
                        {formatFieldValue(value, labels)}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}
