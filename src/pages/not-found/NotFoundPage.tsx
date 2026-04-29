import { Button, Paper, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <Paper className="feature-card" elevation={0}>
      <Stack spacing={2}>
        <Typography variant="h5">Page not found</Typography>
        <Typography color="text.secondary">
          The address you opened does not match any page in Mini ERP Admin.
        </Typography>
        <Button component={NavLink} to="/dashboard" variant="contained" sx={{ alignSelf: "flex-start" }}>
          Go to dashboard
        </Button>
      </Stack>
    </Paper>
  );
};
