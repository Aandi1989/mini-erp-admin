import { Paper, Stack, Typography } from "@mui/material";

export const DashboardPage = () => {
  return (
    <Stack spacing={3}>
      <Paper className="feature-card" elevation={0}>
        <Typography variant="h5" gutterBottom>
          Why this shell exists
        </Typography>
        <Typography color="text.secondary">
          This app is intentionally starting with structure first. We want the same top-level
          ideas as the real ERP UI before we add business logic.
        </Typography>
      </Paper>

      <Paper className="feature-card" elevation={0}>
        <Typography variant="h6" gutterBottom>
          What we will add next
        </Typography>
        <Typography color="text.secondary">
          Query params, service layer, Redux Toolkit, forms, MobX reading practice, and real
          debugging habits.
        </Typography>
      </Paper>
    </Stack>
  );
};
