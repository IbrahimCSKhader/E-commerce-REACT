import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        px: { xs: 1.5, md: 3 },
        pb: { xs: 2, md: 3 },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1320,
          py: 2.5,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "center" },
          justifyContent: "space-between",
          gap: 1,
          textAlign: { xs: "center", md: "start" },
        }}
      >
        <Typography variant="body2" color="text.secondary">
          &copy; 2026 {t("footer.rights")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("footer.contact")}
        </Typography>
      </Container>
    </Box>
  );
}
