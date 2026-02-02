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

export default function Home() {
  return (
    <Box sx={{ p: 4, mx: "auto" ,display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
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
              Ibrahim Abuhania
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PersonOutlineIcon sx={{ mr: 1 }} />
              <Typography variant="body1">
                Fourth-year Computer Science student
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <InfoOutlinedIcon sx={{ mr: 1 }} />
              <Typography variant="body1">
                Passionate about learning modern web technologies and software development.
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <BuildOutlinedIcon sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                This is a React project developed for Al-Maaref Academy.
              </Typography>
            </Box>

          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
}
