import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Divider,
  Paper,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t, i18n } = useTranslation();
  return (
    <Box
      sx={{
        p: 4,
        mx: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image="./ibrahimGraduation.jpeg"
              alt="Ibrahim Graduation"
              sx={{
                height: "70vh",
                objectFit: "cover",
              }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
              {t("home.title")}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PersonOutlineIcon sx={{ mr: 1 }} />
              <Typography variant="body1">{t("home.student")}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <InfoOutlinedIcon sx={{ mr: 1 }} />
              <Typography variant="body1">{t("home.description")}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <BuildOutlinedIcon sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {t("home.projectNote")}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
