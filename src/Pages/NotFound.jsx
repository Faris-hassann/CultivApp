import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f9fafb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%" }}>
        <CardContent sx={{ pt: 4 }}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <ErrorOutlineIcon color="error" sx={{ fontSize: 32 }} />
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              404 Page Not Found
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" mt={2}>
            Did you forget to add the page to the router?
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
