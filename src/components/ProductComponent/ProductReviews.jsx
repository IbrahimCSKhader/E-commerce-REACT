import {
  Alert,
  Avatar,
  Box,
  Divider,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

function formatReviewDate(value, language) {
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return "--";
  }

  return new Intl.DateTimeFormat(language === "ar" ? "ar" : "en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsedDate);
}

export default function ProductReviews({ reviews, averageRating, i18n }) {
  const safeReviews = Array.isArray(reviews) ? reviews : [];

  const labels = {
    title: i18n.language === "ar" ? "المراجعات" : "Reviews",
    subtitle:
      i18n.language === "ar"
        ? "آراء المستخدمين الذين جرّبوا هذا المنتج."
        : "Feedback from customers who tried this product.",
    empty:
      i18n.language === "ar"
        ? "لا توجد مراجعات لهذا المنتج حتى الآن."
        : "There are no reviews for this product yet.",
    count: i18n.language === "ar" ? "عدد المراجعات" : "Review Count",
  };

  return (
    <Paper sx={{ p: { xs: 3, md: 4 }, height: "100%" }}>
      <Stack spacing={3}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {labels.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
              {labels.subtitle}
            </Typography>
          </Box>

          <Box textAlign={{ xs: "start", sm: "end" }}>
            <Rating value={Number(averageRating || 0)} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {labels.count}: {safeReviews.length}
            </Typography>
          </Box>
        </Stack>

        {safeReviews.length === 0 ? (
          <Alert severity="info">{labels.empty}</Alert>
        ) : (
          <Stack spacing={2}>
            {safeReviews.map((review, index) => (
              <Paper
                key={`${review.userName}-${review.createdAt}-${index}`}
                variant="outlined"
                sx={{
                  p: 2.5,
                  borderColor: "divider",
                  backgroundColor: "background.default",
                }}
              >
                <Stack spacing={1.5}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={1.5}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        {(review?.userName || "U").charAt(0).toUpperCase()}
                      </Avatar>

                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                          {review?.userName || "--"}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatReviewDate(review?.createdAt, i18n.language)}
                        </Typography>
                      </Box>
                    </Stack>

                    <Rating value={Number(review?.rating || 0)} readOnly />
                  </Stack>

                  <Divider />

                  <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
                    {review?.comment || "--"}
                  </Typography>
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
