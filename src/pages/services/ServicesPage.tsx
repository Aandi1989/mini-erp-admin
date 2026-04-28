import { Paper, Typography } from "@mui/material";

export const ServicesPage = () => {
  return (
    <Paper className="feature-card" elevation={0}>
      <Typography variant="h5" gutterBottom>
        Services
      </Typography>
      <Typography color="text.secondary">
        This page will be useful later for modal forms, validation, and data-fetching exercises.
      </Typography>
    </Paper>
  );
};
