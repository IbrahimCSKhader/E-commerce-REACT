import { Box, CircularProgress } from "@mui/material";
import { Navigate } from "react-router-dom";
import useAuthStore from "./store/AuthStore";

export default function PublicOnlyRoute({ children }) {
  const token = useAuthStore((state) => state.token);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  if (!hasHydrated) {
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

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
