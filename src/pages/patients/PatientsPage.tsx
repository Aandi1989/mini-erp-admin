import { Paper, Typography } from "@mui/material";

export const PatientsPage = () => {
  return (
    <Paper className="feature-card" elevation={0}>
      <Typography variant="h5" gutterBottom>
        Patients
      </Typography>
      <Typography color="text.secondary">
        This page will later help us practice URL filters, lists, loading states, and detail
        screens.
      </Typography>
    </Paper>
  );
};
